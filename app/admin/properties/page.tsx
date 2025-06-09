"use client"
import { Properties } from "@/src/admin/components";
import { DashBoardInfoType } from "@/src/admin/schemas";
import { useQueryClient } from "@tanstack/react-query";


const PropertiesView = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<DashBoardInfoType>(["dashboardData"]);

  if (data) return <Properties properties={data.properties}/>
};

export default PropertiesView;