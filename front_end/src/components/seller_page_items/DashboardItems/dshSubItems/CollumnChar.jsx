import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CollumnChar({ data, color, title }) {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.type === "revenueMng") {
        renderDataRevenueEachMonth();
      } else {
        renderDataSaleMng();
      }
    }
  }, [data]);

  const renderDataRevenueEachMonth = () => {
    let dataArr = [];
    data.sumRevenueEachMonthShop.map((e) =>
      dataArr.push({ name: e.month, revenue: e.revenue })
    );
    setDisplayData(dataArr);
  };

  const renderDataSaleMng = () => {
    if (data) {
      let dataArr = [];
      data.data.map((e) =>
        dataArr.push({ id: `ID: ${e.id}`, value: e.data, name: e.name })
      );
      setDisplayData(dataArr);
    } else {
      return [];
    }
  };

  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {data !== undefined && data !== null && data.type == "revenueMng" && (
            <p className="label">{`${label} : ${payload[0].value}`}</p>
          )}
          {data !== undefined && data !== null && data.type == "saleMng" && (
            <p className="label">{`${label} : ${payload[0].value}`}</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {data ? (
        <div className="w-full h-full flex justify-center items-center flex-col">
          {title && <p className="text-md">{title}</p>}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={displayData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={data && data.type === "revenueMng" ? "name" : "id"}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey={
                  displayData.length !== 0
                    ? Object.keys(displayData[0])[1]
                    : "key"
                }
                barSize={20}
                fill={color ? color : ""}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
