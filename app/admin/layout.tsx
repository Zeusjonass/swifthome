"use client";

import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Header, SideBar, DashboardDataProvider } from "@/src/admin/components";
import { mainTheme } from "@/src/admin/theme";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Head from 'next/head';

const drawerWidth = 294;
const headerHeight = 96;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/');
    }
  }, [authStatus, router]);

  if (authStatus === 'configuring' || authStatus === 'unauthenticated') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SnackbarProvider>
            <CssBaseline />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Header headerHeight={headerHeight} />
                <Box sx={{ display: "flex", flex: 1 }}>
                  <SideBar drawerWidth={drawerWidth} headerHeight={headerHeight} />
                  <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
                      <DashboardDataProvider>{children}</DashboardDataProvider>
                  </Box>
                </Box>
              </Box>
          </SnackbarProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
