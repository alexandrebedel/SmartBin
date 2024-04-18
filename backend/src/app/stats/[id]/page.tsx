"use client";
import AreaChart from "@/app/components/AreaChart";
import PieChart from "@/app/components/PieChart";
import useStatsDetails from "@/app/hooks/useStatsDetails";
import { useState, useEffect } from 'react';

export default function StatsDetail({ params }: { params: { id: string } }) {

  // const {statsDetails} = useStatsDetails({id: params.id});

  const [statsDetails, setStatsDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch the stats details from the backend API
    const fetchStatsDetails = async () => {
      try {
        const response = await fetch(`/api/trash/${params.id}`);
        const data = await response.json();
        setStatsDetails(data);
      } catch (error) {
        console.error('Error fetching stats details:', error);
      }
    };

    fetchStatsDetails();
  }, [
  ]);


  return (
    <div>
      <div>My Post: {params.id}</div>
      <div>
      <PieChart data={statsDetails?.stats && Object.values(statsDetails?.stats.totalTrashByType)  || []} />
      <AreaChart />
    </div>
    </div>
  );
}
