"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Header, SideBar, DashboardDataProvider } from "@/src/admin/components";
import { mainTheme } from "@/src/admin/theme";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const drawerWidth = 294;
const headerHeight = 96;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

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
