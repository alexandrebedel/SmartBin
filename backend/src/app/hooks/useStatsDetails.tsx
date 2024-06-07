"use client";
import { useState, useEffect } from "react";

const useStatsDetails = ({ id }: { id: string }) => {
  const [statsDetails, setStatsDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch the stats details from the backend API
    const fetchStatsDetails = async () => {
      try {
        const response = await fetch(`https://smart-bin-jade.vercel.app/api/trash/${id}`);
        const data = await response.json();
        setStatsDetails(data);
      } catch (error) {
        console.error("Error fetching stats details:", error);
      }
    };

    fetchStatsDetails();
  }, []);

  console.log(statsDetails);

  return statsDetails;
};

export default useStatsDetails;
