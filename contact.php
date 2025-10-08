<?php
// contact.php - お問い合わせフォーム処理（工事中対応）

// 工事中メッセージの追加
$maintenance_message = "現在サイトをリニューアル中です。お問い合わせは正常に受け付けています。";

// PHPMailerの読み込み
require_once 'phpmailer/src/Exception.php';
require_once 'phpmailer/src/PHPMailer.php';
require_once 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// エラーレポート設定（本番環境では0に設定）
error_reporting(E_ALL);
ini_set('display_errors', 0); // 本番環境ではエラー表示を無効化
ini_set('log_errors', 1); // エラーログに記録

// セキュリティヘッダーの設定
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// CORS設定（開発環境用）
header('Access-Control-Allow-Origin: http://localhost:8000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// レスポンス用の配列
$response = array();

// 環境変数の読み込み
function loadEnv($file = '.env') {
    if (!file_exists($file)) {
        return;
    }
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // コメント行をスキップ
        }
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// .envファイルを読み込み
loadEnv(__DIR__ . '/.env');

// セキュリティ対策: レート制限（DOS攻撃対策）
function checkRateLimit($ip) {
    $rate_limit_file = 'rate_limit.json';
    $max_requests = getenv('RATE_LIMIT_MAX_REQUESTS') ?: 5; // 1時間あたりの最大リクエスト数
    $time_window = getenv('RATE_LIMIT_TIME_WINDOW') ?: 3600; // 1時間（秒）

    $current_time = time();
    $rate_data = array();

    // 既存のレート制限データを読み込み
    if (file_exists($rate_limit_file)) {
        $rate_data = json_decode(file_get_contents($rate_limit_file), true) ?: array();
    }

    // 古いエントリを削除
    foreach ($rate_data as $stored_ip => $timestamps) {
        $rate_data[$stored_ip] = array_filter($timestamps, function($timestamp) use ($current_time, $time_window) {
            return ($current_time - $timestamp) < $time_window;
        });
        if (empty($rate_data[$stored_ip])) {
            unset($rate_data[$stored_ip]);
        }
    }

    // 現在のIPのリクエスト数をチェック
    if (!isset($rate_data[$ip])) {
        $rate_data[$ip] = array();
    }

    if (count($rate_data[$ip]) >= $max_requests) {
        return false; // レート制限に達した
    }

    // 現在のリクエストを記録
    $rate_data[$ip][] = $current_time;

    // ファイルに保存
    file_put_contents($rate_limit_file, json_encode($rate_data), LOCK_EX);

    return true; // 許可
}

// CSRF対策: リファラーチェック
function checkReferer() {
    $allowed_domains_str = getenv('ALLOWED_DOMAINS') ?: 'lea-schritt.com,localhost,127.0.0.1';
    $allowed_domains = explode(',', $allowed_domains_str);

    if (!isset($_SERVER['HTTP_REFERER'])) {
        return false;
    }

    $referer = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);

    foreach ($allowed_domains as $domain) {
        if (strpos($referer, $domain) !== false) {
            return true;
        }
    }

    return false;
}

// 入力サニタイゼーション関数
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// POSTリクエストの確認
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // IPアドレス取得
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    // レート制限チェック
    if (!checkRateLimit($ip_address)) {
        $response['success'] = false;
        $response['message'] = 'リクエストが多すぎます。しばらく時間をおいて再度お試しください。';
        header('Content-Type: application/json');
        http_response_code(429); // Too Many Requests
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }

    // リファラーチェック（開発環境では無効化可能）
    if (!checkReferer() && $ip_address !== '127.0.0.1' && $ip_address !== '::1') {
        $response['success'] = false;
        $response['message'] = '不正なリクエストです。';
        header('Content-Type: application/json');
        http_response_code(403); // Forbidden
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }

    // フォームデータの取得とサニタイズ
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // バリデーション
    $errors = array();
    
    if (empty($name)) {
        $errors[] = 'お名前を入力してください。';
    }
    
    if (empty($email)) {
        $errors[] = 'メールアドレスを入力してください。';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = '有効なメールアドレスを入力してください。';
    }
    
    if (empty($message)) {
        $errors[] = 'メッセージを入力してください。';
    }
    
    // 追加フィールドの取得とサニタイズ
    $company = isset($_POST['company']) ? sanitize_input($_POST['company']) : '';
    $position = isset($_POST['position']) ? sanitize_input($_POST['position']) : '';
    $consultationType = isset($_POST['consultationType']) ? sanitize_input($_POST['consultationType']) : '';
    $contactMethod = isset($_POST['contactMethod']) ? sanitize_input($_POST['contactMethod']) : '';
    $background = isset($_POST['background']) ? sanitize_input($_POST['background']) : '';
    $startTiming = isset($_POST['startTiming']) ? sanitize_input($_POST['startTiming']) : '';
    $budget = isset($_POST['budget']) ? sanitize_input($_POST['budget']) : '';
    $companySize = isset($_POST['companySize']) ? sanitize_input($_POST['companySize']) : '';
    $preferredDate1 = isset($_POST['preferredDate1']) ? sanitize_input($_POST['preferredDate1']) : '';
    $preferredDate2 = isset($_POST['preferredDate2']) ? sanitize_input($_POST['preferredDate2']) : '';
    $details = isset($_POST['details']) ? sanitize_input($_POST['details']) : '';

    // 入力の長さ制限（DOS攻撃対策）
    if (strlen($name) > 100 || strlen($company) > 200 || strlen($email) > 100 ||
        strlen($background) > 2000 || strlen($details) > 2000 || strlen($message) > 2000) {
        $errors[] = '入力内容が長すぎます。';
    }

    // エラーがない場合、メール送信処理
    if (empty($errors)) {

        try {
            // PHPMailerインスタンスの作成
            $mail = new PHPMailer(true);

            // SMTPの設定（Outlook/Microsoft 365）
            $mail->isSMTP();
            $mail->Host       = getenv('SMTP_HOST') ?: 'smtp-mail.outlook.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('SMTP_USERNAME') ?: 'info@lea-schritt.com';
            $mail->Password   = getenv('SMTP_PASSWORD'); // 環境変数から読み込み
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = getenv('SMTP_PORT') ?: 587;
            $mail->CharSet    = 'UTF-8';

            // 送信元・送信先の設定
            $mail->setFrom($email, $name);
            $mail->addAddress('info@lea-schritt.com', 'Lea Schritt');
            $mail->addReplyTo($email, $name);

            // メール内容の設定
            $mail->isHTML(true);
            $mail->Subject = '【Webサイトお問い合わせ】' . $consultationType . ' - ' . $name . '様より';

            // メール本文の作成
            $mailBody = "
            <html>
            <head>
                <style>
                    body { font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background-color: #4CAF50; color: white; }
                </style>
            </head>
            <body>
                <h2>Webサイトからのお問い合わせ</h2>
                <table>
                    <tr><th>項目</th><th>内容</th></tr>
                    <tr><td><strong>氏名</strong></td><td>{$name}</td></tr>
                    <tr><td><strong>会社名</strong></td><td>{$company}</td></tr>
                    <tr><td><strong>役職</strong></td><td>{$position}</td></tr>
                    <tr><td><strong>メールアドレス</strong></td><td>{$email}</td></tr>
                    <tr><td><strong>ご相談内容</strong></td><td>{$consultationType}</td></tr>
                    <tr><td><strong>希望連絡方法</strong></td><td>{$contactMethod}</td></tr>
                    <tr><td><strong>ご相談の背景・課題感</strong></td><td>" . nl2br(htmlspecialchars($background)) . "</td></tr>
                    <tr><td><strong>詳細なご相談内容</strong></td><td>" . nl2br(htmlspecialchars($details)) . "</td></tr>
                    <tr><td><strong>ご希望の開始時期</strong></td><td>{$startTiming}</td></tr>
                    <tr><td><strong>ご予算感</strong></td><td>{$budget}</td></tr>
                    <tr><td><strong>従業員数/売上規模</strong></td><td>{$companySize}</td></tr>
                    <tr><td><strong>希望日程（第1希望）</strong></td><td>{$preferredDate1}</td></tr>
                    <tr><td><strong>希望日程（第2希望）</strong></td><td>{$preferredDate2}</td></tr>
                    <tr><td><strong>送信日時</strong></td><td>" . date('Y-m-d H:i:s') . "</td></tr>
                </table>
            </body>
            </html>
            ";

            $mail->Body = $mailBody;
            $mail->AltBody = strip_tags(str_replace('<br>', "\n", $mailBody));

            // メール送信
            $mail->send();

            // JSONファイルにも保存（バックアップ）
            $contact_file = 'contacts.json';
            $contact_data = array(
                'timestamp' => date('Y-m-d H:i:s'),
                'name' => $name,
                'company' => $company,
                'position' => $position,
                'email' => $email,
                'consultationType' => $consultationType,
                'contactMethod' => $contactMethod,
                'background' => $background,
                'details' => $details,
                'startTiming' => $startTiming,
                'budget' => $budget,
                'companySize' => $companySize,
                'preferredDate1' => $preferredDate1,
                'preferredDate2' => $preferredDate2,
                'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            );

            $existing_contacts = array();
            if (file_exists($contact_file)) {
                $existing_data = file_get_contents($contact_file);
                if ($existing_data) {
                    $existing_contacts = json_decode($existing_data, true) ?: array();
                }
            }

            $existing_contacts[] = $contact_data;
            $json_data = json_encode($existing_contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            file_put_contents($contact_file, $json_data, LOCK_EX);

            $response['success'] = true;
            $response['message'] = 'お問い合わせを受け付けました。ありがとうございます。3営業日以内にご連絡いたします。';

        } catch (Exception $e) {
            $response['success'] = false;
            $response['message'] = 'メール送信に失敗しました。エラー: ' . $mail->ErrorInfo;
        }

    } else {
        $response['success'] = false;
        $response['message'] = implode('<br>', $errors);
    }
    
} else {
    $response['success'] = false;
    $response['message'] = '不正なリクエストです。';
}

// JSONレスポンス
header('Content-Type: application/json');
echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
?>
