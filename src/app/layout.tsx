  import './globals.css';
  import type { Metadata } from 'next';
  import { Inter } from 'next/font/google';
  import { ThemeProvider } from '@/components/theme-provider';
  import { Header } from '@/components/layout/Header';
  import { Footer } from '@/components/layout/Footer';
  import { Toaster } from '@/components/ui/sonner';

  const inter = Inter({ subsets: ['latin'] });

  export const metadata: Metadata = {
    title: 'Dropify - AI Automation Hub',
    description: 'Drop. Download. Automate. Your one-click hub for AI automation files.',

  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className} >
            <div className="flex min-h-screen flex-col">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            <Toaster />
          </ThemeProvider>
            </div>
        </body>
      </html>
    );
  }
