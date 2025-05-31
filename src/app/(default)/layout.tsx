import Providers from '../providers';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="p-8">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
