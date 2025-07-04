"use client";
import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePathname } from "next/navigation";
import { configureAmplify } from "@/src/lib/amplifyClient";
import Header from "@/src/swifthome/components/Header";
import Footer from "@/src/swifthome/components/Footer";
import { Amplify } from "aws-amplify";
import awsExports from '@/src/swifthome/aws-exports.js';

Amplify.configure({ ...awsExports });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const location = usePathname();
  const isViewAdmin = /^\/admin(\/.*)?$/.test(location);

  useEffect(() => {
    configureAmplify();
  }, []);

  return (
    <Authenticator.Provider>
      <QueryClientProvider client={queryClient}>
        {!isViewAdmin && <Header />}
        {children}
        {!isViewAdmin && <Footer />}
      </QueryClientProvider>
    </Authenticator.Provider>
  );
}