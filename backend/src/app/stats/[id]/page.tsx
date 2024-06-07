"use client";
import AreaChart from "@/app/components/AreaChart";
import PieChart from "@/app/components/PieChart";
import useStatsDetails from "@/app/hooks/useStatsDetails";
import { useState, useEffect } from "react";

type DatePickerProps = {
  selectedDate: string;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  handleDateChange,
}) => {
  const formatDateToFrench = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center">
      {/* <div className="bg-white p-4 rounded-lg shadow-lg"> */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Changer la date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <p className="mt-2 text-sm text-gray-600">
          Date sélectionner :{" "}
          <span className="font-medium text-gray-800">
            {formatDateToFrench(selectedDate)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default function StatsDetail({ params }: { params: { id: string } }) {
  // const {statsDetails} = useStatsDetails({id: params.id});

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Janvier est 0!
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [statsDetails, setStatsDetails] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  useEffect(() => {
    // Fetch the stats details from the backend API
    const fetchStatsDetails = async () => {
      try {
        const response = await fetch(`/api/trash/${params.id}`);
        const data = await response.json();
        // const filteredData = data.;
        setStatsDetails(data);
      } catch (error) {
        console.error("Error fetching stats details:", error);
      }
    };

    fetchStatsDetails();
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const result =
    statsDetails?.trashData
      ?.filter((trash: any) => trash.createdAt.includes(selectedDate))
      .reduce(
        (acc: any, cur: any) => {
          // Obtenez le jour de la semaine
          const date = new Date(cur.createdAt);
          const dayOfWeek = date.getDay() - 1;

          // Incrémentez le compteur pour ce trashType à l'index correspondant au jour de la semaine
          acc[cur.trashType][dayOfWeek]++;

          return acc;
        },
        {
          glass: [0, 0, 0, 0, 0, 0, 0],
          trash: [0, 0, 0, 0, 0, 0, 0],
          recyclable: [0, 0, 0, 0, 0, 0, 0],
        }
      ) || {};

  return (
    <div className="p-8">
      <div className="mb-8">Poubelle Id : {params.id}</div>
      <div>
        <div className="mb-8">
          <DatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="flex justify-center">
          <PieChart
            data={
              (statsDetails?.stats &&
                Object.values(statsDetails?.stats.totalTrashByType)) ||
              []
            }
          />
        </div>
        <AreaChart data={result} />
      </div>
    </div>
  );
}
