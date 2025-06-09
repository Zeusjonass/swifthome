"use client"
import { Dashboard } from '@/src/admin/components';
import { DashBoardInfoType } from '@/src/admin/schemas';
import { useQueryClient } from '@tanstack/react-query';

const page = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<DashBoardInfoType>(["dashboardData"]);

  if (data) return <Dashboard data={data}/>
}

export default page