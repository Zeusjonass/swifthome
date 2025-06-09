"use client";
import {Box, Skeleton, IconButton, Checkbox, Stack} from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

export const SkeletonQuestions = () => {
  const fakeRows = Array.from({ length: 5 });

  return (
    <Box
      sx={{
        mt: 6,
        width: "100%",
        border: "2px solid #D4D4D4",
        borderRadius: "20px",
        p: 2,
      }}
    >
      <Skeleton variant="text" width={600} height={32} />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mt: 2, mb: 2 }}
      >
        <Skeleton variant="text" width={120} height={28} />
        <IconButton>
          <SaveOutlined />
        </IconButton>
      </Box>

      <Stack spacing={2}>
        {fakeRows.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #D4D4D4",
              borderRadius: "20px",
              px: 2,
              py: 1.5,
            }}
          >
            <Checkbox disabled sx={{ mr: 2 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ flexGrow: 1 }} />
            <Skeleton variant="circular" width={24} height={24} sx={{ ml: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
