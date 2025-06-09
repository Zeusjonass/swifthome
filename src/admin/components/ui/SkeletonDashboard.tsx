"use client";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, useMediaQuery, useTheme } from "@mui/material";

export const SkeletonDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          placeItems: "center",
          alignItems: isSmallScreen ? "flex-start" : "center",
          mt: 5,
        }}
      >
        <Skeleton variant="circular" width={isSmallScreen ? 60 : 80} height={isSmallScreen ? 60 : 80} />
        <Skeleton variant="text" width={isSmallScreen ? 200 : 300} height={36} sx={{ fontSize: isSmallScreen ? '1.5rem' : '1.875rem', ml: 2 }} />
      </Box>

      <Skeleton variant="rounded" width={200} height={50} sx={{ mt: 2 }} />

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        {[0, 1, 2].map((index) => (
          <Box key={index} sx={{ width: '30%', minWidth: '200px' }}>
            <Skeleton variant="rounded" width="100%" height={120} />
            <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="40%" />
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 2 }}>
        <Box sx={{ width: isSmallScreen ? '100%' : '60%', border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
          <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
          {[0, 1, 2].map((index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="70%" />
            </Box>
          ))}
        </Box>
        <Box sx={{ width: isSmallScreen ? '100%' : '40%', border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
          <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Box>
      </Box>

      <Box sx={{ mt: 4, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
        <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {[0, 1, 2].map((index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="rectangular" width={80} height={60} sx={{ mr: 2 }} />
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};