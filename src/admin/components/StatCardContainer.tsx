import { JSX } from "@emotion/react/jsx-runtime";
import { Box } from "@mui/material"
import { StatCard } from "./StatCard"

interface StatCardContainerProps {
  statCardData: {
    id: number;
    value: number;
    label: string;
    note: string;
    icon: JSX.Element;
  }[]
}

export const StatCardContainer = ({statCardData} : StatCardContainerProps) => {

  return (
    <Box       
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      gap={3}
    >
      {statCardData.map((stat) => (
        <StatCard
          key={stat.id}
          dataNumber={stat.value}
          label={stat.label}
          note={stat.note}
          icon={stat.icon}
        />
      ))}
    </Box>
  )
}
