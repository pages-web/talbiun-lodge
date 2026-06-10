import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import ApolloClientProvider from "@/lib/apollo/provider";
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
  description: "Experience authentic Mongolian steppe life in luxury gers. Traditional hospitality meets modern comfort on the open grasslands.",
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F5F0E8] text-[#2C1810]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ApolloClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
