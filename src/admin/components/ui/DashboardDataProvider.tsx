"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData, getClientQuestions } from "@/src/admin/api";
import { Typography } from "@mui/material";
import { SkeletonDashboard, SkeletonQuestions } from "@/src/admin/components";
import { SkeletonPropertiesTable } from "./SkeletonPropertiesTable";
import { usePathname } from "next/navigation";

interface DashboardDataProviderProps {
  children: React.ReactNode;
}

export const DashboardDataProvider = ({
  children,
}: DashboardDataProviderProps) => {
  const location = usePathname();

  const { error, isFetching } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const { error: questionsError, isFetching: isFetchingQuestions } = useQuery({
    queryKey: ["clientQuestions"],
    queryFn: getClientQuestions,
    refetchOnWindowFocus: false,
  });

  if (error || questionsError) {
    return (
      <Typography>
        Error: {error?.message || questionsError?.message}
      </Typography>
    );
  }

  const skeletonLocation = () => {
    switch (location) {
      case "/admin":
        return <SkeletonDashboard />;
      case "/admin/questions":
        return <SkeletonQuestions />;
      case "/admin/properties":
        return <SkeletonPropertiesTable />;
      default:
        return <SkeletonDashboard />;
    }
  }

    return isFetching || isFetchingQuestions ? (
      skeletonLocation()
    ) : (
      <>{children}</>
    );
};
