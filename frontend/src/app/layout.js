import "./globals.css";
import StytchProvider from "../components/StytchProvider";

// Font imports
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({ subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata = {
  title: "Stytch Next.js App Router Example",
  description: "An example Next.js App Router application using Stytch for authentication",
};

export default function RootLayout({ children }) {
  return (
    <StytchProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main>
            <div className="container">{children}</div>
          </main>
        </body>
      </html>
    </StytchProvider>
  );
}