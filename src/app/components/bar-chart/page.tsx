"use client";
import React, { useState, useEffect } from "react";
import { Chart as RChart } from "primereact/chart";
import { useSearchParams } from "next/navigation";
import { ResponseData } from "../line-chart/page";
import { getColumnsData, getFuncColumnsData } from "@/app/services/DbService";

export default function BarChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const searchParams = useSearchParams();

  const x = searchParams.get("x") || "";
  const viewName = searchParams.get("viewName") || "";
  const y = JSON.parse(decodeURIComponent(searchParams.get("y") || "[]"));
  const connectionString = searchParams.get("connStr") || "";
  const isFunc = searchParams.get("isFunc") === "true"; // Function mı yoksa View mı

  useEffect(() => {
    const func = async () => {
      console.log("isFunc: ", isFunc);
      let response: ResponseData;

      if (isFunc) {
        response = await getFuncColumnsData(connectionString, viewName, x, y);
      } else {
        response = await getColumnsData(connectionString, viewName, x, y);
      }

      const xLabels = response.xColumn.values;

      const datasets = response.yColumn.flatMap((yCol) =>
        yCol.column.map((col) => ({
          label: col.name,
          data: col.values.map((value) => parseFloat(value.replace(",", "."))),
          fill: false,
          tension: 0.4,
        }))
      );
      console.log("Datasets: ", datasets);

      const data = {
        labels: xLabels,
        datasets: datasets,
      };
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          title: {
            display: true,
            text: viewName, // Grafiğin başlığı
            color: textColor,
            font: {
              size: 20,
            },
          },
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      setChartData(data);
      setChartOptions(options);
    };
    func();
  }, []);

  return (
    <div className="card">
      <RChart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
