import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lea Schritt｜データ×AIで成果まで伴走実装するコンサルティング",
  description: "Lea Schritt は、経営・データ・ITの三刀流で成果まで伴走実装。BI/営業改革、離反・貸倒検知、内製化支援まで一気通貫で支援。",
  keywords: "DX,データ可視化,BI,Power BI,Tableau,AI導入,RAG,AIエージェント,離反検知,貸倒検知,内製化,長崎 コンサル,九州 コンサル,伴走 実装",
  authors: [{ name: "Lea Schritt", url: "https://lea-schritt.co.jp" }],
  openGraph: {
    title: "Lea Schritt｜データ×AIで成果まで伴走実装するコンサルティング",
    description: "経営・データ・ITの三刀流で成果まで伴走実装。BI/営業改革、離反・貸倒検知、内製化支援まで一気通貫で支援。",
    type: "website",
    locale: "ja_JP",
    siteName: "Lea Schritt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lea Schritt｜データ×AIで成果まで伴走実装するコンサルティング",
    description: "経営・データ・ITの三刀流で成果まで伴走実装。BI/営業改革、離反・貸倒検知、内製化支援まで一気通貫で支援。",
  },
  robots: "index, follow",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
