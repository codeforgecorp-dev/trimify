"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Logout from "@/app/components/Logout";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Clock,
  Laptop,
  Globe,
  MapPin,
  Flag,
  Flame,
  Sparkles,
} from "lucide-react";

export default function UserUrl() {
  const params = useParams();
  const shortName = params.analytics;
  const [analytics, setanalytics] = useState();
  const [clicks, setclicks] = useState("");
  const [clicksPerDay, setclicksPerDay] = useState([]);
  const [showChart, setshowChart] = useState(true);
  const [analyticsPage] = useState(true);
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "user";

  useEffect(() => {
    async function fetchData() {
      try {
        let a = await fetch(`/api/analytics/${shortName}/`);
        let result = await a.json();
        setanalytics(result.analytics);
        setclicks(result.clicks);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    }
    fetchData();
  }, [shortName]);

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
      const last7Days = getLast7Days();
      const clicksPerDay = {};
      last7Days.forEach((date) => {
        clicksPerDay[date] = 0;
      });
      analytics.forEach((entry) => {
        const dateStr = new Date(entry.timestamp).toLocaleDateString();
        if (clicksPerDay[dateStr] !== undefined) {
          clicksPerDay[dateStr]++;
        }
      });
      return clicksPerDay;
    }
    setclicksPerDay(getClicksPerDay());
  }, [analytics]);

  const chartData = Object.entries(clicksPerDay).map(([date, clicksCount]) => ({
    date,
    clicks: clicksCount,
  }));

  const handleShowChart = () => {
    setshowChart(!showChart);
  };

  return (
    <>
      <Logout shortName={shortName} analyticsPage={analyticsPage} />
      <div className="min-h-[calc(100vh-64px)] w-full bg-halftone-warm p-4 sm:p-6 md:p-8 select-none">
        <div className="max-w-6xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-8 flex flex-col gap-8">
          {/* Top Bar with Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-3 border-black">
            <Link
              href={`/user/${username}/dashboard`}
              className="brutal-btn bg-white hover:bg-[#FFFDF0] px-4 py-2 font-bungee text-xs text-black flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>BACK TO DASHBOARD</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LINK: /{shortName}</span>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center">
            <h1 className="font-bungee text-3xl sm:text-5xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
              PERFORMANCE SUMMARY
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Detailed engagement, geographic data, and device distribution.
            </p>
          </div>

          {/* KPI Total Clicks Card */}
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-[#FEF3C7] border-3 border-black shadow-[5px_5px_0px_#000] text-center w-full max-w-xs rotate-[-1deg]">
              <span className="font-bungee text-xs text-black/70 uppercase tracking-widest block mb-1">
                TOTAL ENGAGEMENTS
              </span>
              <div className="font-bungee text-5xl sm:text-6xl text-[#EF4444] drop-shadow-[2px_2px_0px_#000]">
                {clicks !== "" ? clicks : "0"}
              </div>
              <span className="font-space text-xs font-black text-black uppercase mt-1 block">
                Verified Redirect Clicks
              </span>
            </div>

            <button
              onClick={handleShowChart}
              className="brutal-btn brutal-btn-yellow px-5 py-2 font-bungee text-xs tracking-wider cursor-pointer"
            >
              {showChart ? "HIDE CHART" : "SHOW 7-DAY TREND 📊"}
            </button>
          </div>

          {/* Recharts Chart */}
          {showChart && (
            <div className="p-4 sm:p-6 bg-[#FFFDF0] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col items-center">
              <h3 className="font-bungee text-base sm:text-lg text-black mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#EF4444]" />
                <span>CLICKS OVER LAST 7 DAYS</span>
              </h3>
              <div className="w-full h-[300px] sm:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#000000" opacity={0.15} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#000000", fontSize: 11, fontWeight: "bold" }}
                    />
                    <YAxis
                      tick={{ fill: "#000000", fontSize: 11, fontWeight: "bold" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFDF0",
                        border: "2px solid #000000",
                        boxShadow: "3px 3px 0px #000000",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar dataKey="clicks" fill="#EF4444" stroke="#000000" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent 30 Clicks Table */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bungee text-xl sm:text-2xl text-black flex items-center gap-2">
                <span>RECENT CLICKS LOG</span>
              </h2>
              <span className="font-bungee text-xs px-2.5 py-1 bg-[#FACC15] border-2 border-black shadow-[1px_1px_0px_#000]">
                LAST 30 HITS
              </span>
            </div>

            <div className="w-full overflow-x-auto border-3 border-black shadow-[5px_5px_0px_#000]">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead className="bg-[#FACC15] text-black border-b-3 border-black font-bungee">
                  <tr>
                    <th className="p-3 border-r-2 border-black">
                      <div className="flex items-center justify-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>DATE</span>
                      </div>
                    </th>
                    <th className="p-3 border-r-2 border-black">
                      <div className="flex items-center justify-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>TIME</span>
                      </div>
                    </th>
                    <th className="p-3 border-r-2 border-black">
                      <div className="flex items-center justify-center gap-1.5">
                        <Laptop className="w-4 h-4" />
                        <span>DEVICE</span>
                      </div>
                    </th>
                    <th className="p-3 border-r-2 border-black">
                      <div className="flex items-center justify-center gap-1.5">
                        <Globe className="w-4 h-4" />
                        <span>BROWSER</span>
                      </div>
                    </th>
                    <th className="p-3 border-r-2 border-black">
                      <div className="flex items-center justify-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>CITY</span>
                      </div>
                    </th>
                    <th className="p-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <Flag className="w-4 h-4" />
                        <span>COUNTRY</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-2 divide-black/10 font-space font-bold bg-white">
                  {analytics
                    ?.slice(-30)
                    .reverse()
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#FEF3C7] transition-colors"
                      >
                        <td className="p-3 border-r-2 border-black/10">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </td>
                        <td className="p-3 border-r-2 border-black/10">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-3 border-r-2 border-black/10">
                          <span className="px-2 py-0.5 bg-[#FFFDF0] border border-black text-[11px]">
                            {item.Device || "Desktop"}
                          </span>
                        </td>
                        <td className="p-3 border-r-2 border-black/10">
                          {item.Browser || "Unknown"}
                        </td>
                        <td className="p-3 border-r-2 border-black/10">
                          {item.City || "Unknown"} (approx)
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <span>{item.countryName || "Unknown"}</span>
                            {item.countryFlag && (
                              <Image
                                src={item.countryFlag}
                                width={24}
                                height={24}
                                alt="flag"
                                className="border border-black"
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {(!analytics || analytics.length === 0) && (
                <div className="p-12 text-center bg-white">
                  <h3 className="font-bungee text-lg text-black/50">
                    NO CLICKS RECORDED YET FOR THIS LINK
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
