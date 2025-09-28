import os
import subprocess
import sys

def create_sample_video():
    """サンプル動画を作成する"""
    
    # FFmpegが利用可能かチェック
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        print("FFmpegが見つかりました。サンプル動画を作成します...")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("FFmpegが見つかりません。手動で動画を作成してください。")
        print("以下の手順でサンプル動画を作成できます：")
        print("1. scripts/generate-sample-video.html をブラウザで開く")
        print("2. ブラウザの録画機能またはOBS Studioで録画")
        print("3. 30-60秒の動画を録画")
        print("4. public/videos/hero-background.mp4 として保存")
        return False
    
    # サンプル動画を作成
    output_path = "public/videos/hero-background.mp4"
    
    # グラデーション背景の動画を作成
    cmd = [
        'ffmpeg',
        '-f', 'lavfi',
        '-i', 'testsrc2=size=1920x1080:duration=30:rate=30',
        '-f', 'lavfi',
        '-i', 'color=c=blue:size=1920x1080:duration=30:rate=30',
        '-filter_complex', '[0:v][1:v]blend=all_mode=overlay:all_opacity=0.3[out]',
        '-map', '[out]',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-y',
        output_path
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"サンプル動画を作成しました: {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"動画作成に失敗しました: {e}")
        return False

if __name__ == "__main__":
    create_sample_video()
