"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import HeaderConnectivity from "./Components/HeaderConnectivity";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface GasDataResponse {
  flow: number;
  totalflow: number;
  timestamp: string;
}

export default function HomePage() {
  const [data, setData] = useState<GasDataResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<GasDataResponse[]>("/api/gas-data");
        setData(response.data.slice(-12));
      } catch (err) {
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const latest = data[data.length - 1];

  const chartData = {
    labels: data.map((point) => new Date(point.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Flow",
        data: data.map((point) => point.flow),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        tension: 0.3,
        fill: true,
      },
      /* {
        label: "Total Flow",
        data: data.map((point) => point.totalflow),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.3,
        fill: true,
      }, */
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Trend Flow Gas",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-4">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-row items-center  justify-between rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
          <div>
            <p className="text-lg uppercase tracking-[0.3em] text-slate-500 sm:text-sm">
              Sensync Technology
            </p>
            <h1 className="text-3xl font-semibold">Gas Monitoring Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Lihat tren flow dan total flow secara real-time.
            </p>
          </div>
          <HeaderConnectivity />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
            <h2 className="text-2xl font-semibold">Grafik Flow Gas</h2>
            {loading ? (
              <div className="mt-8 text-slate-400">Memuat data...</div>
            ) : error ? (
              <div className="mt-8 rounded-2xl bg-rose-950/50 p-4 text-rose-200">
                {error}
              </div>
            ) : (
              <div className="mt-6">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
            <h2 className="text-2xl font-semibold">Ringkasan Flow</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Flow Saat Ini
                </p>
                <p className="mt-3 text-4xl font-semibold">
                  {latest ? latest.flow.toFixed(3) : "-"}
                </p>
                <p className="text-slate-400">l/min</p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Total Flow
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {latest ? latest.totalflow.toFixed(3) : "-"}
                </p>
                <p className="text-slate-400">m³</p>
              </div>
              {/* <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Jumlah Sampel
                </p>
                <p className="mt-3 text-3xl font-semibold">{data.length}</p>
              </div> */}
            </div>
          </div>
        </div>
        <footer className="mt-2 text-center text-xs text-zinc-500">
          <p>&copy; {currentYear} Sensync. All rights reserved.</p>
        </footer>
      </section>
    </main>
  );
}
