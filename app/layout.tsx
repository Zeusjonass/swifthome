"use client";
import "./globals.css";
import { Amplify } from "aws-amplify";
import awsExports from '@/src/swifthome/aws-exports.js';
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { configureAmplify } from "@/src/lib/amplifyClient";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@/src/swifthome/components/Header";
import Footer from "@/src/swifthome/components/Footer";
import { usePathname } from "next/navigation";

Amplify.configure(awsExports);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    configureAmplify();
  }, []);
  const location = usePathname();
  const isViewAdmin = /^\/admin(\/.*)?$/.test(location);
  const queryClient = new QueryClient();

  return (
    <html lang="es">
      <body>
        <Authenticator.Provider>
          <QueryClientProvider client={queryClient}>
            {!isViewAdmin && <Header />}
              {children}
             {!isViewAdmin && <Footer />}
          </QueryClientProvider>
        </Authenticator.Provider>
      </body>
    </html>
  );
}
