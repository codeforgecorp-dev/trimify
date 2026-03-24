"use client";
import React, { useState } from "react";
import { useEffect } from "react"; // Import useEffect for side effects
import { useSearchParams } from "next/navigation";
import Logout from "@/app/components/Logout";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function UserUrl() {
  const params=useParams()
  const shortName = params.analytics; // Extract the shortName from the route parameters
  console.log(shortName)
  const [analytics, setanalytics] = useState(); // State for the data
  const [clicks, setclicks] = useState("");
  const [clicksPerDay, setclicksPerDay] = useState([]);
  const [showChart, setshowChart] = useState(false);
  const [analyticsPage, setanalyticsPage] = useState(true)
   let searchParams=useSearchParams()
    let username=searchParams.get("username")
    
  useEffect(() => {
   
   
    if(width<600){
      
    const alertDisplay = alert("For better Experience please open on desktop")}
    async function fetchData() {
      let a = await fetch(`/api/analytics/${shortName}/`);
      let result = await a.json();
      setanalytics(result.analytics); // Set the data in state
      setclicks(result.clicks);
    }
    const results = fetchData();
  }, [shortName]); // Dependency array to run effect only when shortName changes

  useEffect(() => {
    if (!analytics) return;
    function getLast7Days() {
      const today = new Date();
      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        last7Days.push(pastDate.toLocaleDateString());
      }
      return last7Days;
    }
    function getClicksPerDay() {
      const last7Days = getLast7Days(); // 👈 یہ وہی فنکشن جو آپ نے اوپر بنایا
      const clicksPerDay = {};

      // initialize all 7 days with 0
      last7Days.forEach((date) => {
        clicksPerDay[date] = 0;
      });

      // count clicks per day
      analytics.forEach((entry) => {
        const dateStr = new Date(entry.timestamp).toLocaleDateString();
        if (clicksPerDay[dateStr] !== undefined) {
          clicksPerDay[dateStr]++;
        }
      });
      return clicksPerDay;
    }

    const clicksperday = getClicksPerDay();

    setclicksPerDay(clicksperday);
  }, [analytics]);
  const chartData = Object.entries(clicksPerDay).map(([date, clicks]) => ({
    date,
    clicks,
  }));
  function useWindowWidth() {
    const [width, setWidth] = useState(() => window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }
  const width = useWindowWidth();
  const handleShowChart = () => {
    setshowChart(!showChart);
  };
  return (
    <>
      <Logout shortName={shortName} analyticsPage = {analyticsPage} />
      <head>
        <title>Analytic Page - Trimify</title>
        <meta
          name="description"
          content="Analytics Page of short URL where user can see the analytics of there specific short URL"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div
        className="hero relative w-full  z-10  md:p-4"
        style={{ minHeight: "calc(100vh - 63px)", height: "full" }}
      >
        <div className="p-4 relative w-full bg-white z-10 mx-auto min-h-full md:rounded-lg shadow-lg py-6 ">
        <div className="md:absolute md:top-8 md:bottom-0 w-[250px] cursor-pointer gap-2 h-[45px] flex items-center justify-center p-2   ">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center p-1 hover:bg-gray-400 transition-all ease-in-out duration-300">
        <Link href={`/user/${username}/dashboard`}><Image src={"/left-arrow.png"} className="   md:w-[28px] md:h-[28px] " width={20} height={20}/></Link></div>
        <p className="md:font-bold">Go Back to Dashboard</p>
        </div>  
        
          <h2 className="bree-bold font-bold text-3xl md:text-5xl text-center  ">
            Performance Summary
          </h2>
          <div className="md:mt-2 mt-6 md:my-13">
            {/* Total Clicks Card Centered */}
            <div className=" gap-2 flex flex-col justify-center ">
              <div className="bg-blue-100 text-blue-900 mt-4 font-semibold p-3 rounded-lg md:rounded-xl  md:p-6 shadow-md text-center w-40 mx-auto">
                <p className=" text-sm">Total Clicks</p>
                <p className="text-2xl font-bold">{clicks}</p>
              </div>
              <button
                style={{ cursor: "pointer" }}
                onClick={handleShowChart}
                className="cursor-pointer z-10 roboto-bold mt-4 text-blue-600 underline "
              >
                {showChart ? "Hide Chart" : "Show Chart of Last 7 days"}
              </button>
              {showChart && (
                <>
                  <div className="w-full min-w-[400px] md:max-w-[700px] mx-auto md:pr-0 pr-20">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis
                          dataKey="date"
                          interval={0}
                          angle={width < 600 ? -60 : 0} // Optional: adjust angle based on screen width
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <h2 className="text-center bree-bold mb-2 md:mb-0">
                    Click Counts on Last 7 days
                  </h2>
                </>
              )}
            </div>
          </div>
          <div className="w-full overflow-x-auto min-h-full ">
            <h2 className=" md:bree-bold mt-6  md:mt-2 text-2xl mb-2">
              Recent 30 Clicks
            </h2>
            <table className="table-auto w-full min-h-full text-center border-collapse border border-slate-400 overflow-x-scroll">
              <thead className="bg-gray-200">
                <tr>
                  <th className="roboto-bold text-xl w-[16.6%] px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Date
                      <Image
                        src="/date.png"
                        width={28}
                        height={28}
                        alt="date"
                      />
                    </div>
                  </th>
                  <th className="roboto-bold text-xl w-[16.6%] px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Time
                      <Image
                        src="/time.png"
                        width={32}
                        height={32}
                        alt="time"
                      />
                    </div>
                  </th>
                  <th className="roboto-bold text-xl w-[16.6%] px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Device
                      <Image
                        src="/device.png"
                        width={28}
                        height={28}
                        alt="device"
                      />
                    </div>
                  </th>
                  <th className="roboto-bold w-[16.6%] text-xl px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Browser
                      <Image
                        src="/browser.png"
                        width={28}
                        height={28}
                        alt="browser"
                      />
                    </div>
                  </th>
                  <th className="roboto-bold w-[16.6%] text-xl px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      City
                      <Image
                        src="/city.png"
                        width={28}
                        height={28}
                        alt="city"
                      />
                    </div>
                  </th>
                  <th className="roboto-bold  w-[16.6%] text-xl px-4 py-2 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Country
                      <Image
                        src="/country.png"
                        width={28}
                        height={28}
                        alt="country"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  analytics
                    ?.slice(-30)
                    .reverse()
                    .map((item, index) => (
                      <tr key={index} className="border-t border-slate-300">
                        <td className="px-4 py-2">
                          <div className="flex justify-center">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center ">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="py-2 pr-8">
                          <div className="flex justify-center">
                            {item.Device}
                          </div>
                        </td>
                        <td className="py-2 pr-13">
                          <div className="flex justify-center">
                            {item.Browser}
                          </div>
                        </td>
                        <td className=" py-2  pr-4">
                          <div className="flex justify-center ">
                            {item.City} (approx)
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {item.countryName}
                            <Image
                              src={item.countryFlag}
                              width={32}
                              height={32}
                              alt="Country Flag"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
            {analytics?.length===0 && (
                  <div className="w-full min-h-[30vh] text-black flex items-center justify-center">
                    <h2 className="text-center text-4xl inter-semi">Nothing Found</h2>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}
