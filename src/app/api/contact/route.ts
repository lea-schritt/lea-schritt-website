import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      company, 
      position, 
      email, 
      consultationType, 
      contactMethod, 
      details,
      background,
      startTiming,
      budget,
      companySize,
      preferredDate1,
      preferredDate2
    } = body

    // バリデーション
    if (!name || !email) {
      return NextResponse.json(
        { error: '名前とメールアドレスは必須です' },
        { status: 400 }
      )
    }

    // メール送信設定（Outlook Exchange）
    const transporter = nodemailer.createTransporter({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // 環境変数から取得
        pass: process.env.EMAIL_PASS, // 環境変数から取得
      },
    })

    // 管理者宛メール（info@lea-schritt.com）
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@lea-schritt.com',
      subject: `【Lea Schritt】無料相談申し込み - ${name}様`,
      html: `
        <h2>無料相談申し込み</h2>
        <p>以下の内容で無料相談のお申し込みがありました。</p>
        
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>お名前</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>会社名</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${company || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>役職</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${position || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>メール</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>ご相談内容</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${consultationType || '未選択'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>ご相談の背景</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${background || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>ご希望開始時期</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${startTiming || '未選択'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>ご予算感</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${budget || '未選択'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>従業員数/売上規模</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${companySize || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>希望連絡方法</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${contactMethod || '未選択'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>希望日程（第1希望）</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${preferredDate1 || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>希望日程（第2希望）</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${preferredDate2 || '未入力'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>詳細</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${details || '未入力'}</td>
          </tr>
        </table>
        
        <p>申し込み日時: ${new Date().toLocaleString('ja-JP')}</p>
      `,
    }

    // 申し込み者宛自動返信メール
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '【Lea Schritt】無料相談申し込みありがとうございます',
      html: `
        <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; line-height: 1.6; color: #333;">
          <h2>${name}様</h2>
          
          <p>このたびは Lea Schritt（レアシュリット）の無料相談に<br>
          お申込みいただきありがとうございます。</p>
          
          <p>以下の内容で承りました。</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <p><strong>■ お名前：</strong> ${name}</p>
            <p><strong>■ 会社名：</strong> ${company || '未入力'}</p>
            <p><strong>■ 役職：</strong> ${position || '未入力'}</p>
            <p><strong>■ ご相談内容：</strong> ${consultationType || '未選択'}</p>
            <p><strong>■ ご相談の背景：</strong> ${background || '未入力'}</p>
            <p><strong>■ ご希望開始時期：</strong> ${startTiming || '未選択'}</p>
            <p><strong>■ ご予算感：</strong> ${budget || '未選択'}</p>
            <p><strong>■ 希望連絡方法：</strong> ${contactMethod || '未選択'}</p>
            <p><strong>■ 希望日程：</strong> 第1希望: ${preferredDate1 || '未入力'} / 第2希望: ${preferredDate2 || '未入力'}</p>
          </div>
          
          <p>担当者より【1〜2営業日以内】にご連絡し、<br>
          詳細のヒアリング日程をご調整いたします。</p>
          
          <p>※事前に課題資料や数値データなどをご準備いただけると、<br>
          より具体的なご提案が可能です。</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Lea Schritt 株式会社</strong><br>
            DX支援・データ利活用・AI/IT戦略コンサルティング</p>
            <p>Website: <a href="https://lea-schritt.com" style="color: #007bff;">https://lea-schritt.com</a><br>
            Email: info@lea-schritt.com</p>
          </div>
        </div>
      `,
    }

    // メール送信
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(customerMailOptions)

    return NextResponse.json(
      { message: 'メール送信が完了しました' },
      { status: 200 }
    )

  } catch (error) {
    console.error('メール送信エラー:', error)
    
    // 開発環境でのテスト用ログ
    if (process.env.NODE_ENV === 'development') {
      console.log('=== コンタクトフォーム送信データ ===')
      console.log('名前:', name)
      console.log('会社名:', company)
      console.log('メール:', email)
      console.log('ご相談内容:', consultationType)
      console.log('詳細:', details)
      console.log('送信先: info@lea-schritt.com')
      console.log('===============================')
    }
    
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    )
  }
}
