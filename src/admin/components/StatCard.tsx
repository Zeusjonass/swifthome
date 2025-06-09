import { JSX } from "@emotion/react/jsx-runtime";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CountUp from "react-countup";

interface StatCardProps {
  dataNumber: number;
  label: string;
  note: string;
  icon: JSX.Element;
}

export const StatCard = ({ dataNumber, label, note, icon }: StatCardProps) => {
  const hasDecimal = Number.isInteger(dataNumber) === false;

  return (
    <Card
      sx={{
        mx: 1,
        width: "192px",
        height: "134px",
        border: "1px solid #E2E1E1",
        borderRadius: "10px",
        px: "12px",
        py: "16px",
        boxShadow: 'none'
      }}
    >
      <CardContent sx={{ px: "0px", py: "0px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              <CountUp
                end={dataNumber}
                duration={2}
                decimals={hasDecimal ? 1 : 0}
              />
            </Typography>
            {icon && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "44.39px",
                  height: "44.39px",
                  backgroundColor: "iconColor.contrastText",
                  borderRadius: "100%",
                  color: "iconColor.main",
                }}
              >
                {icon}
              </Box>
            )}
          </Box>

          <Box>
            <Typography variant="body1" sx={{ fontSize: "0.75rem" }}>
              {label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.625rem", color: '#A1A1A1' }}
            >
              {note}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};