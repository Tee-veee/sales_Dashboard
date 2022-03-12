import { useContext, useEffect } from "react";
import DarkModeContext from "../../context/DarkModeContext";
import ThemeContext from "../../context/ThemeContext";
// RECHARTS
import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import SalesContext from "../../context/SalesContext";

function AnalyticsComponent() {
  const { darkMode } = useContext(DarkModeContext);
  const { accentColor } = useContext(ThemeContext);
  const {
    getUserSalesPercentages,
    getClientSalesPercentages,
    analyticPieChartSP,
    analyticPieChartCN,
    getProductSalesData,
    analyticBarChartPN,
  } = useContext(SalesContext);

  useEffect(() => {
    getUserSalesPercentages();
    getClientSalesPercentages();
    getProductSalesData();
  }, []);

  return (
    <main className="w-full h-full flex-col ">
      <header className="w-fit pt-10 px-6">
        <h1
          className={`text-3xl ${darkMode ? " text-white" : "text-stone-700"}`}
        >
          Analytics
        </h1>
      </header>
      <section className="w-full px-4  flex flex-col md:flex-row ">
        <section className="p-2 mt-2 w-full   flex flex-col space-y-2 md:space-y-2  ">
          <div className="flex flex-col md:flex-row md:space-y-0 space-y-2 h-full mt-20 ">
            <div className="w-[300px] h-[300px] xl:w-[500px] xl:h-[300px] flex-col items-center text-center">
              <h1
                className={`text-3xl  ${
                  darkMode ? " text-white" : "text-stone-700"
                }`}
              >
                Sales Person{" "}
                <span
                  className={`text-lg ${
                    darkMode ? " text-white" : "text-stone-700"
                  }`}
                >
                  (% of Total)
                </span>
              </h1>
              {analyticPieChartSP && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="sales"
                      isAnimationActive={false}
                      data={analyticPieChartSP}
                      outerRadius={90}
                      fill={accentColor}
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="w-[300px] h-[300px] xl:w-[500px] xl:h-[300px] flex-col items-center text-center ">
              <h1
                className={`text-3xl  ${
                  darkMode ? " text-white" : "text-stone-700"
                }`}
              >
                Client Sales{" "}
                <span
                  className={`text-lg ${
                    darkMode ? " text-white" : "text-stone-700"
                  }`}
                >
                  (% of total)
                </span>
              </h1>
              {analyticPieChartCN && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="sales"
                      isAnimationActive={false}
                      data={analyticPieChartCN}
                      outerRadius={90}
                      fill={accentColor}
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            {analyticBarChartPN && (
              <div className="w-full  flex flex-col ">
                <h1
                  className={`text-3xl text-center  ${
                    darkMode ? " text-white" : "text-stone-700"
                  }`}
                >
                  Product Sales{" "}
                  <span
                    className={`text-lg ${
                      darkMode ? " text-white" : "text-stone-700"
                    }`}
                  >
                    (total units)
                  </span>
                </h1>
                <ResponsiveContainer width="80%" height="100%">
                  <BarChart width={500} height={300} data={analyticBarChartPN}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="sales" fill={accentColor} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default AnalyticsComponent;
