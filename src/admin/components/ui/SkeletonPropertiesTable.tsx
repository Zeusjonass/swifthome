"use client";
import { Box, Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";

export const SkeletonPropertiesTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
    <Skeleton variant="rounded" width={200} height={50} sx={{ my: '48px' }} />
    
    <Box sx={{ mt: 6, p: 2, border: "2px solid #D4D4D4", borderRadius: "20px" }}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Skeleton variant="text" width={160} height={32} />
        <Skeleton variant="rounded" width={isSmallScreen ? "100%" : 240} height={40} />
      </Box>

      <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: "1px solid #D4D4D4",
              borderRadius: "20px",
              padding: 2,
              flexDirection: isSmallScreen ? "column" : "row",
              gap: 2,
            }}
          >
            {/* Imagen y título */}
            <Box display="flex" alignItems="center" sx={{ width: isSmallScreen ? "100%" : "30%" }}>
              <Skeleton variant="rectangular" width={89} height={63} sx={{ borderRadius: "16px", mr: 2 }} />
              <Skeleton variant="text" width={100} height={24} />
            </Box>

            {/* Fecha, precio, estado */}
            <Box display="flex" gap={2} sx={{ width: isSmallScreen ? "100%" : "50%", flexWrap: "wrap" }}>
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={80} height={24} />
              <Skeleton variant="rounded" width={120} height={32} />
            </Box>

            {/* Botón */}
            <Skeleton variant="rounded" width={100} height={40} />
          </Box>
        ))}
      </Stack>
    </Box>
    </>
  );
};
