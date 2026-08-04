import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import ApolloClientProvider from "@/lib/apollo/provider";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { LocalAuthProvider } from "@/lib/auth/LocalAuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talbiun Lodge | Mongolian Steppe Retreat",
  description: "Experience authentic Mongolian steppe life in luxury gers.",
  metadataBase: new URL("https://talbiun-lodge.vercel.app"),
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "mn" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--color-foreground)]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ApolloClientProvider>
            <AuthProvider>
              <LocalAuthProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </LocalAuthProvider>
            </AuthProvider>
          </ApolloClientProvider>
        </NextIntlClientProvider>
        <div className="grain-overlay" />
      </body>
    </html>
  );
}