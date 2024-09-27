import Chart from "@/components/dashboard/Chart";
import GenderChart from "@/components/dashboard/GenderChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointmentsPerMonth, getTotalAppointments, getTotalBlogs, getTotalUsers, getUserGenderData } from "@/lib/action";
import { Separator } from "@radix-ui/react-separator";
import { CalendarCheck2, Shapes, Users } from "lucide-react";

const Home = async () => {
  const users = await getTotalUsers();
  const blogs = await getTotalBlogs();
  const appointments = await getTotalAppointments();
  const appointmentChartData = await getAppointmentsPerMonth();
  const userGenderChartData3 = await getUserGenderData();
  
  return (
    <div className="p-4 min-h-screen">
      <p className="text-4xl text-white w-full font-extrabold border-b-[2px] border-gray-700 mb-4">
        Dashboard
      </p>
      <Separator className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 text-white border-[1px] border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-gray-100">Total Appointments</CardTitle>
              <CalendarCheck2 className="text-gray-400" strokeWidth={1.5} />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{appointments}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white border-[1px] border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-gray-100">Total Users</CardTitle>
              <Users className="text-gray-400" strokeWidth={1.5} />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{users}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white border-[1px] border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-gray-100">Blog Posts</CardTitle>
              <Shapes className="text-gray-400" strokeWidth={1.5} />
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{blogs}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/5 w-full">
            <Card className=" bg-gray-900 text-white border-[1px] border-gray-700 rounded-lg shadow-lg mt-5 transition-transform transform hover:-translate-x-2">
              <CardHeader className="flex flex-row gap-2  items-center text-lg">
                <CalendarCheck2 className="text-gray-400 text-lg" strokeWidth={1.5} />
                <CardTitle className="text-gray-400 text-lg">Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart chartData={appointmentChartData} name='appointment' />
              </CardContent>
            </Card>
          </div>
          <Card className="lg:w-2/5 w-full  bg-gray-900 text-white border-[1px] border-gray-700 rounded-lg shadow-lg mt-5 transition-transform transform hover:translate-x-2">
            <CardHeader className="flex flex-row gap-2  items-center text-lg">
              <Users className="text-gray-400 text-lg" strokeWidth={1.5} />
              <CardTitle className="text-gray-400 text-lg">Gender Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <GenderChart chartData={userGenderChartData3} />
            </CardContent>
          </Card>
        </div>
      </Separator>
    </div>
  );
}


export default Home;