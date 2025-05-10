import "./globals.css";
import Providers from "@/providers/Providers";
import { initMocks } from "@/mocks";
import { SpeedInsights } from "@vercel/speed-insights/next";

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
