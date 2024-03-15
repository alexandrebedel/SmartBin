import PieChart from "@/app/components/Piechart";


export default function StatsDetail({ params }: { params: { id: string } }) {

  return (
    <div>
      <div>My Post: {params.id}</div>
      <div>
      <PieChart/>
    </div>
    </div>
  );
}
