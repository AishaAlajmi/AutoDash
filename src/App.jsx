// File: src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  Brush, // <-- added
} from "recharts";
import { Icons } from "./pages/Icons";
import { Footer } from "./components/footer";
import { getDynamicIcon } from "./pages/IconMapper";
import {
  BRAND_NAME,
  LogoMark,
  themes,
  chartOptions,
} from "./pages/LogoAndTheme";
import {
  hexToRgba,
  isExcelSerial,
  excelSerialToDate,
  asTimestamp,
  formatDateShort,
  downsampleEveryN,
  buildStats,
  answerFromStats,
  renderMarkdownSafe,
  buildLocalFallback,
} from "./pages/dataAnalysis";
import { SAMPLE_ROWS } from "./pages/SampleData";

// >>> NEW: import AI engine functions
import { analyzeDatasetWithAI, answerQuestionWithAI } from "./lib/engine";
const getOneClickColor = (theme) => {
  if (theme === "Light") return "#7c3aed"; // Light primary color
  if (theme === "Dark") return "#60a5fa"; // Dark primary color
  return "#c026d3"; // Colorful primary color
};
const App = () => {
  const [file, setFile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isXLSXLoaded, setIsXLSXLoaded] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [chatHistory, setChatHistory] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isThemesSectionOpen, setIsThemesSectionOpen] = useState(true);
  const chatEndRef = useRef(null);

  const currentTheme = themes[selectedTheme];
  const oneClickColor = getOneClickColor(currentTheme);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.onload = () => setIsXLSXLoaded(true);
    script.onerror = () =>
      setError("Failed to load a required library. Please refresh.");
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  // ====== AI: file upload -> analysis (moved AI parts into engine.js) ======
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    if (!isXLSXLoaded) {
      setError("The app is still setting up. Try again in a moment.");
      return;
    }

    setFile(uploadedFile);
    setIsLoading(true);
    setError(null);
    setDashboardData(null);
    setChatHistory([]);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const wsname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = jsonData[0];
        const fileData = jsonData.slice(1).map((row) => {
          const obj = {};
          headers.forEach((header, i) => {
            obj[header] = row[i];
          });
          return obj;
        });
        const stats = buildStats(fileData);

        // >>> moved AI call to engine:
        const parsedResult = await analyzeDatasetWithAI({ headers, fileData });

        const totalRecords = fileData.length;
        const totalRecordsMetric = {
          title: "Total Records",
          value: totalRecords.toString(),
          description: "Total number of entries in the dataset.",
        };
        const updatedMetrics = (parsedResult.keyMetrics || []).map((metric) => {
          const t = (metric.title || "").toLowerCase();
          if (t.includes("total employees") || t.includes("total records")) {
            return {
              ...metric,
              value: totalRecords.toString(),
              title: "Total Records",
            };
          }
          return metric;
        });
        if (!updatedMetrics.some((m) => m.title === "Total Records")) {
          updatedMetrics.unshift(totalRecordsMetric);
        }

        setDashboardData({
          originalData: fileData,
          analysisText: parsedResult.analysisText || "",
          keyMetrics: updatedMetrics,
          charts: (parsedResult.charts || []).map((chart) => ({
            ...chart,
            currentType: chart.type,
          })),
          stats, // <--- NEW
        });
      } catch (err) {
        console.error(err);
        setError(
          "Failed to analyze data. Please ensure your file has a valid format and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(uploadedFile);
  };

  // ====== AI: chat submit (moved AI parts into engine.js) ======
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userQuery.trim() || !dashboardData) return;

    const newChatHistory = [...chatHistory, { role: "user", text: userQuery }];
    setChatHistory(newChatHistory);
    setUserQuery("");

    const localAnswer = answerFromStats(
      userQuery,
      dashboardData.stats,
      newChatHistory
    );

    if (localAnswer) {
      setChatHistory((current) => [
        ...current,
        { role: "ai", text: localAnswer },
      ]);
      return;
    }

    try {
      setChatHistory((current) => [
        ...current,
        { role: "ai", text: "Analyzing...", isThinking: true },
      ]);
      const fullData = dashboardData.originalData;
      const preStats = dashboardData.stats;

      // >>> moved AI call to engine:
      const aiResponseText = await answerQuestionWithAI({
        userQuery,
        fullData,
        preStats,
      });

      setChatHistory((current) => {
        const updated = current.slice(0, -1);
        return [...updated, { role: "ai", text: aiResponseText }];
      });
    } catch (err) {
      console.error("Error with chat API call:", err);
      setChatHistory((current) => {
        const updated = current.slice(0, -1);
        return [
          ...updated,
          { role: "ai", text: "Sorry, I couldn't process that request." },
        ];
      });
    }
  };

  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const resetDashboard = () => {
    setFile(null);
    setDashboardData(null);
    setIsLoading(false);
    setError(null);
    setChatHistory([]);
  };

  const handleChartTypeChange = (chartIndex, newType) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      const updatedCharts = [...prev.charts];
      updatedCharts[chartIndex].currentType = newType;
      return { ...prev, charts: updatedCharts };
    });
  };
  const getMetricIcon = (title) => {
    return getDynamicIcon(title);
  };
  const getChartColors = () => currentTheme.chartColors;

  const renderChart = (chartConfig, chartIndex) => {
    if (!dashboardData || !dashboardData.originalData) return null;
    let { title, dataKey, nameKey, currentType } = chartConfig;

    // ----- NEW: Check for valid time data and switch chart type if needed
    if (currentType === "line") {
      const hasTimeData = dashboardData.originalData.some((item) => {
        const x = item[nameKey];
        return asTimestamp(x) !== null;
      });
      if (!hasTimeData) {
        currentType = "bar"; // Fallback to a different chart type
      }
    }

    const aggregatedData = dashboardData.originalData.reduce((acc, item) => {
      const key = item[nameKey];
      if (key === undefined || key === null || key === "") return acc;
      let value = parseFloat(item[dataKey]);
      if (isNaN(value)) value = 1;
      const existing = acc.find((d) => d.name === key);
      if (existing) {
        existing.value += value;
        existing.count += 1;
      } else {
        acc.push({ name: key, value, count: 1 });
      }
      return acc;
    }, []);

    if (aggregatedData.length === 0) return null;

    const pieData = aggregatedData.map((item) => ({
      name: item.name,
      value: item.count,
    }));

    const pieTotal = pieData.reduce((s, d) => s + Number(d.value || 0), 0);
    const colors = getChartColors(chartIndex);

    const CustomPieLegend = (props) => {
      const { payload } = props;
      return (
        <div className="flex flex-col h-full overflow-y-auto w-1/2 md:w-1/3 p-2 scrollbar-thin">
          <ul className="list-none space-y-1">
            {payload.map((entry, index) => (
              <li
                key={`legend-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs opacity-80">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    // taller card for dense line charts
    const cardClass = `w-full ${currentType === "line" ? "h-96" : "h-72"} ${
      currentTheme.cardBg
    } rounded-2xl shadow-xl p-4 transition-transform duration-300 hover:scale-[1.01] border border-white/40 flex flex-col`;

    const chartWrapper = (chartComponent) => (
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-lg font-semibold ${currentTheme.text} text-center`}
          >
            {title}
          </h2>

          <select
            value={currentType}
            onChange={(e) => handleChartTypeChange(chartIndex, e.target.value)}
            className={`p-2 rounded-lg text-sm border backdrop-blur ${currentTheme.dropdownBg} ${currentTheme.dropdownText} ${currentTheme.dropdownBorder}`}
          >
            {/* Apply styles to the options as well if needed, though they usually inherit from the select */}
            {chartOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            {chartComponent}
          </ResponsiveContainer>
        </div>
      </div>
    );

    switch (currentType) {
      case "bar":
        return chartWrapper(
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id={`colorBar-${chartIndex}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.9} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-25}
              textAnchor="end"
              height={60}
              interval={0}
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: currentTheme.tooltipText,
              }}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill={`url(#colorBar-${chartIndex})`}
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        );

      case "line": {
        let timeData = dashboardData.originalData
          .map((item) => {
            const x = item[nameKey];
            const y = parseFloat(item[dataKey]);
            const ts = asTimestamp(x);
            // Ensure both a valid timestamp and a numeric value exist
            if (ts !== null && !isNaN(y)) {
              return { ts, value: y };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a, b) => a.ts - b.ts);

        if (timeData.length === 0) {
          return (
            <div className={cardClass}>
              <div className="p-4 text-center text-sm opacity-60">
                No valid date/time data found for this chart.
              </div>
            </div>
          );
        }
        const aggregatedByDay = [];
        for (const row of timeData) {
          const dayKey = formatDateShort(row.ts);
          const last = aggregatedByDay[aggregatedByDay.length - 1];
          if (last && last.day === dayKey) {
            last.value += row.value;
            last.ts = row.ts;
          } else {
            aggregatedByDay.push({ day: dayKey, ts: row.ts, value: row.value });
          }
        }

        const plotData = downsampleEveryN(aggregatedByDay, 200);

        const tickCount = Math.min(8, plotData.length);
        const ticks = [];
        if (plotData.length) {
          const step = Math.max(1, Math.floor(plotData.length / tickCount));
          for (let i = 0; i < plotData.length; i += step)
            ticks.push(plotData[i].ts);
          if (ticks[ticks.length - 1] !== plotData[plotData.length - 1].ts) {
            ticks.push(plotData[plotData.length - 1].ts);
          }
        }

        return chartWrapper(
          <LineChart
            data={plotData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey="ts"
              domain={["dataMin", "dataMax"]}
              ticks={ticks}
              tickFormatter={formatDateShort}
              tickMargin={10}
              stroke="#6b7280"
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              labelFormatter={(ts) => formatDateShort(ts)}
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: currentTheme.tooltipText,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={getChartColors()[1]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={500}
            />
            <Brush
              dataKey="ts"
              height={24}
              travellerWidth={8}
              tickFormatter={formatDateShort}
              stroke={getChartColors()[1]}
            />
          </LineChart>
        );
      }

      case "area":
        return chartWrapper(
          <AreaChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id={`colorArea-${chartIndex}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[1]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: currentTheme.tooltipText,
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors[1]}
              fill={`url(#colorArea-${chartIndex})`}
              strokeWidth={3}
              activeDot={{ r: 8, strokeWidth: 2, fill: colors[1] }}
              animationDuration={800}
            />
          </AreaChart>
        );

      case "pie":
        return (
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-semibold ${currentTheme.text} text-center`}
              >
                {title}
              </h2>

              <select
                value={currentType}
                onChange={(e) =>
                  handleChartTypeChange(chartIndex, e.target.value)
                }
                className={`p-2 rounded-lg text-sm border backdrop-blur ${currentTheme.dropdownBg} ${currentTheme.dropdownText} ${currentTheme.dropdownBorder}`}
              >
                {/* Apply styles to the options as well if needed, though they usually inherit from the select */}
                {chartOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-row items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aggregatedData.map((d) => ({
                      name: d.name,
                      value: d.count ?? d.value,
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    labelLine={false}
                    animationDuration={800}
                    label={({ name, value }) => {
                      const pie = aggregatedData.map((i) => ({
                        name: i.name,
                        value: i.count ?? i.value,
                      }));
                      const total = pie.reduce(
                        (s, d) => s + Number(d.value || 0),
                        0
                      );
                      const v = Number(value || 0);
                      const pct = total ? (v / total) * 100 : 0;
                      return `${name}: ${pct.toFixed(1)}%`;
                    }}
                  >
                    {aggregatedData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          currentTheme.chartColors[
                            index % currentTheme.chartColors.length
                          ]
                        }
                        stroke="white"
                        strokeWidth={3}
                        className="transition-all duration-300 hover:brightness-110"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => {
                      const pie = aggregatedData.map((i) => ({
                        name: i.name,
                        value: i.count ?? i.value,
                      }));
                      const total = pie.reduce(
                        (s, d) => s + Number(d.value || 0),
                        0
                      );
                      const v = Number(value || 0);
                      const pct = total ? (v / total) * 100 : 0;
                      return [`${pct.toFixed(1)}%`, name];
                    }}
                    contentStyle={{
                      backgroundColor: currentTheme.tooltipBg,
                      border: "none",
                      borderRadius: 8,
                      color: currentTheme.tooltipText,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <CustomPieLegend
                payload={aggregatedData.map((entry, index) => ({
                  value: entry.name,
                  id: `pie-legend-${index}`,
                  type: "square",
                  color:
                    currentTheme.chartColors[
                      index % currentTheme.chartColors.length
                    ],
                }))}
              />
            </div>
          </div>
        );

      case "composed":
        return chartWrapper(
          <ComposedChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id={`composedBarGradient-${chartIndex}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-25}
              textAnchor="end"
              height={60}
              interval={0}
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: currentTheme.tooltipText,
              }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="value"
              fill={`url(#composedBarGradient-${chartIndex})`}
              stroke={colors[0]}
            />
            <Bar
              yAxisId="right"
              dataKey="count"
              barSize={20}
              fill={colors[1]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke={colors[2]}
              strokeWidth={2}
            />
          </ComposedChart>
        );

      case "hbar":
        return chartWrapper(
          <BarChart
            data={aggregatedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id={`colorHBar-${chartIndex}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              horizontal={false}
            />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#6b7280"
              // Removed the fixed width property
              interval={0}
              tickFormatter={(value) =>
                value?.length > 20 ? value.substring(0, 20) + "…" : value
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: currentTheme.tooltipText,
              }}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill={`url(#colorHBar-${chartIndex})`}
              radius={[0, 10, 10, 0]}
              animationDuration={800}
            />
          </BarChart>
        );
      default:
        return null;
    }
  };

  const loadSample = () => {
    const headers = ["Region", "Month", "Sales", "Profit", "Channel"];
    const parsed = buildLocalFallback(headers, SAMPLE_ROWS);
    setDashboardData({
      originalData: SAMPLE_ROWS,
      analysisText: `Demo dataset with ${SAMPLE_ROWS.length} rows across regions and channels. Use the chat to ask questions like “Total Sales by Region?”.`,
      keyMetrics: [
        {
          title: "Total Records",
          value: String(SAMPLE_ROWS.length),
          description: "Rows in the sample dataset.",
        },
        {
          title: "Sum",
          value: String(SAMPLE_ROWS.reduce((s, r) => s + r.Sales, 0)),
          description: "Total Sales.",
        },
        {
          title: "Average",
          value: (
            SAMPLE_ROWS.reduce((s, r) => s + r.Sales, 0) / SAMPLE_ROWS.length
          ).toFixed(2),
          description: "Avg Sales per row.",
        },
        {
          title: "Unique Categories",
          value: String(new Set(SAMPLE_ROWS.map((r) => r.Region)).size),
          description: "Distinct Regions.",
        },
      ],
      charts: [
        {
          type: "bar",
          title: "Sales by Region",
          dataKey: "Sales",
          nameKey: "Region",
          currentType: "bar",
        },
        {
          type: "line",
          title: "Profit by Month",
          dataKey: "Profit",
          nameKey: "Month",
          currentType: "line",
        },
        {
          type: "pie",
          title: "Channel Share (by Sales)",
          dataKey: "Sales",
          nameKey: "Channel",
          currentType: "pie",
        },
        {
          type: "area",
          title: "Sales Area by Region",
          dataKey: "Sales",
          nameKey: "Region",
          currentType: "area",
        },
        {
          type: "composed",
          title: "Composed View",
          dataKey: "Sales",
          nameKey: "Region",
          currentType: "composed",
        },
      ],
    });
    setError(null);
    setFile(null);
  };

  /***********************************
   * Render
   ***********************************/
  return (
    <div
      className={`flex min-h-screen ${currentTheme.background}`}
      style={{
        ["--primary"]: currentTheme.primary,
        ["--secondary"]: currentTheme.secondary,
        ["--accent"]: currentTheme.accent,
        ["--primary-20"]: hexToRgba(currentTheme.primary, 0.2),
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes float { 0% { transform: translateY(0)} 50% { transform: translateY(-6px)} 100% { transform: translateY(0)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: var(--primary) transparent; }
        .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: var(--primary); border-radius: 4px; }
        .focus-ring-theme:focus { outline: none; box-shadow: 0 0 0 4px var(--primary-20); }
        .Light-bg { background: radial-gradient(1200px 600px at -10% -10%, var(--primary) 0%, transparent 60%),
                                  radial-gradient(800px 400px at 110% 10%, var(--secondary) 0%, transparent 60%),
                                  radial-gradient(700px 300px at 50% 120%, var(--accent) 0%, transparent 60%); }
      `}</style>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg md:hidden transition-all duration-300 bg-white/80 backdrop-blur ${currentTheme.text}`}
      >
        {isSidebarOpen ? <Icons.X /> : <Icons.Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col w-72 ${currentTheme.sidebarBg} ${
          currentTheme.sidebarText
        } shadow-2xl p-6 z-40 md:z-auto md:flex`}
      >
        <div className="flex items-center mb-8">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur mr-3 animate-float">
            <LogoMark size={36} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            {BRAND_NAME}
          </span>
        </div>

        {/* Theme picker */}
        <div className="mb-6">
          <button
            onClick={() => setIsThemesSectionOpen(!isThemesSectionOpen)}
            className="flex justify-between items-center w-full mb-2 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
          >
            <h3 className="text-xs font-semibold uppercase opacity-70 tracking-wider">
              Themes
            </h3>
            {isThemesSectionOpen ? (
              <Icons.ChevronDown />
            ) : (
              <Icons.ChevronRight />
            )}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isThemesSectionOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col space-y-2">
              {Object.keys(themes).map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedTheme(k)}
                  className={`py-2 px-4 rounded-xl text-left transition-all duration-200 font-medium ${
                    selectedTheme === k
                      ? "bg-white/10 ring-2 ring-white/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  {themes[k].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        {!dashboardData ? (
          <div className="mt-auto space-y-3">
            <button
              onClick={loadSample}
              className="w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 text-slate-900"
              style={{ backgroundColor: "#ffffff" }}
            >
              Load Sample Data
            </button>
            <p className="text-xs opacity-70">
              Tip: you can try AutoDash without uploading anything.
            </p>
          </div>
        ) : (
          <button
            onClick={resetDashboard}
            className="mt-auto w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 text-white"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <span className="inline-flex items-center gap-2">
              <Icons.RefreshCcw /> Reset
            </span>
          </button>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Light header */}
        <div className="Light-bg p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-white/50 backdrop-blur">
                <LogoMark />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm mt-2">
                  {BRAND_NAME}
                </h1>{" "}
                <div className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-white/60"></div>
              </div>
            </div>
            <p
              className="text-white/90 max-w-2xl"
              style={{ textShadow: "2px 2px 4px rgba(38, 0, 0, 0.5)" }}
            >
              Transform your spreadsheets into automated, interactive dashboards
              with{" "}
              <span className="font-semibold" style={{ color: oneClickColor }}>
                one click
              </span>
              .
            </p>
          </div>
        </div>
        <div className="p-4 md:p-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Upload / Empty state */}
            {!dashboardData && !isLoading && (
              <div
                className={`p-6 md:p-8 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl border border-white/50 ${currentTheme.cardBg}`}
              >
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <label
                      htmlFor="file-upload"
                      className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-200 bg-white/50 ${currentTheme.text} focus-ring-theme`}
                      style={{ borderColor: "var(--primary)" }}
                    >
                      <div className="h-12 w-12 mb-4 animate-bounce">
                        <Icons.Upload />
                      </div>
                      <span className="text-base font-semibold">
                        {isXLSXLoaded
                          ? "Click to upload your Excel or CSV file"
                          : "Loading setup..."}
                      </span>
                      <span className="text-sm opacity-75 mt-1">
                        .xlsx or .csv format
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".xlsx, .xls, .csv"
                        onChange={handleFileUpload}
                        disabled={!isXLSXLoaded}
                      />
                    </label>
                    {file && (
                      <p
                        className={`mt-4 text-center font-medium ${currentTheme.text} opacity-80`}
                      >
                        File selected:{" "}
                        <span style={{ color: "var(--primary)" }}>
                          {file.name}
                        </span>
                      </p>
                    )}
                  </div>

                  <div
                    className={`text-sm leading-6 ${currentTheme.cardText} opacity-80`}
                  >
                    <div className="mb-2 font-semibold">How it works</div>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Upload an Excel/CSV file.</li>
                      <li>We analyze headers + sample rows.</li>
                      <li>AI drafts a summary, metrics, and charts.</li>
                      <li>Interact with charts and ask questions.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96">
                <div
                  className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4"
                  style={{ borderColor: "var(--primary)" }}
                ></div>
                <p
                  className={`mt-6 text-xl font-medium ${currentTheme.text} opacity-80`}
                >
                  Analyzing your data...
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-xl relative text-center shadow-md">
                {error}
              </div>
            )}

            {/* Dashboard */}
            {dashboardData && (
              <div className="mt-12">
                {/* Key metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {dashboardData.keyMetrics?.map((metric, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02] border border-white/40 ${currentTheme.cardBg} ${currentTheme.text}`}
                    >
                      <div
                        className="p-3 rounded-full mb-2"
                        style={{
                          backgroundColor: currentTheme.iconBg,
                          color: "var(--primary)",
                          border: `1px solid ${currentTheme.iconBorder}`,
                        }}
                      >
                        {getMetricIcon(metric.title)}
                      </div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">
                        {metric.title}
                      </h3>
                      <div
                        className="mt-1 text-3xl font-extrabold"
                        style={{ color: "var(--primary)" }}
                      >
                        {metric.value}
                      </div>
                      <p className="mt-1 text-sm opacity-70">
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI Analysis */}
                {dashboardData.analysisText && (
                  <div
                    className={`p-6 rounded-3xl shadow-lg border border-white/40 mb-8 ${currentTheme.cardBg} ${currentTheme.text}`}
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-3">
                      AI Analysis & Insights
                    </h2>
                    <p className="leading-relaxed whitespace-pre-wrap opacity-90">
                      {dashboardData.analysisText}
                    </p>
                  </div>
                )}

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dashboardData.charts?.map((chart, index) => (
                    <div key={index}>{renderChart(chart, index)}</div>
                  ))}
                </div>

                {/* Chat */}
                <div className="mt-8">
                  <div
                    className={`p-6 rounded-3xl shadow-lg border border-white/40 mb-8 ${currentTheme.cardBg} ${currentTheme.text}`}
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                      <Icons.HelpCircle /> Ask a Data Analyst
                    </h2>
                    <div className="flex flex-col h-80 overflow-y-auto pr-2 scrollbar-thin">
                      {chatHistory.length > 0 ? (
                        chatHistory.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex items-start mb-4 ${
                              msg.role === "user" ? "justify-end" : ""
                            }`}
                          >
                            <div
                              className={`rounded-xl p-3 max-w-[80%] shadow-sm border ${
                                currentTheme.chatBorder
                              } ${
                                msg.role === "user"
                                  ? `${currentTheme.chatUserBg} ${currentTheme.text}`
                                  : `${currentTheme.chatAiBg} backdrop-blur ${currentTheme.text}`
                              }`}
                            >
                              <p className="font-semibold text-xs opacity-70 mb-1">
                                {msg.role === "user" ? "You" : "AI"}
                              </p>
                              <div
                                className="leading-6"
                                dangerouslySetInnerHTML={{
                                  __html: renderMarkdownSafe(msg.text),
                                }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-center opacity-60">
                          Ask about your data, e.g. “What is total sales by
                          region?”
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    <form
                      onSubmit={handleChatSubmit}
                      className="mt-4 flex gap-2"
                    >
                      <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="Ask a question about your data..."
                        className={`flex-1 p-3 border rounded-xl focus-ring-theme bg白/80 backdrop-blur ${currentTheme.text}`.replace(
                          "白",
                          "white"
                        )}
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
