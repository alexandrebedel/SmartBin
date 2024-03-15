import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import Image from "next/image";

export function DashboardCard({ image, title, data }: any) {
  return (
    <Card>
      <CardHeader>
        <Image className="object-contain w-[320px] h-[215px]" src={image} height={200} width={200} alt=""></Image>
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Total : {data}</CardDescription>
      </CardContent>
    </Card>
  );
}
