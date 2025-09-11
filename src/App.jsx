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
} from "recharts";

// Inline SVG icons to replace lucide-react dependency
const Icons = {
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  RefreshCcw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11A8.1 8.1 0 0 0 4.5 19.5a5.2 5.2 0 0 0 1.25 1.5l.5.5"/><path d="M19 2l2 2-2 2"/><path d="M4 13a8.1 8.1 0 0 0 15.5-2.5 5.2 5.2 0 0 0-1.25-1.5l-.5-.5"/><path d="M5 22l-2-2 2-2"/></svg>
  ),
  Upload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.101"/><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/></svg>
  ),
  BarChart2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
  ),
  PieChartIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
  ),
  LineChartIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
  ),
  HelpCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  UserCheck: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 10 16 16l-3-3"/></svg>
  ),
  UserX: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="17" y2="22"/><line x1="22" x2="17" y1="17" y2="22"/></svg>
  ),
  DollarSign: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Clipboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="4" width="6" height="4" rx="1" ry="1"/><path d="M18 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 8h-6"/></svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  )
};

// Theme configurations
const themes = {
  default: {
    name: "Default",
    background: "bg-gray-100",
    text: "text-gray-800",
    cardBg: "bg-white",
    sidebarBg: "bg-gray-900",
    sidebarText: "text-gray-100",
    primary: "#6366f1",
    secondary: "#10b981",
    accent: "#f59e0b",
    chartColors: [
      "#6366f1",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#3b82f6",
      "#14b8a6",
      "#eab308",
    ],
    tooltipBg: "bg-gray-800",
    tooltipText: "text-white",
  },
  dark: {
    name: "Dark",
    background: "bg-gray-900",
    text: "text-gray-100",
    cardBg: "bg-gray-800",
    sidebarBg: "bg-gray-950",
    sidebarText: "text-gray-100",
    primary: "#60a5fa",
    secondary: "#34d399",
    accent: "#fde047",
    chartColors: [
      "#60a5fa",
      "#34d399",
      "#fde047",
      "#fb7185",
      "#818cf8",
      "#2dd4bf",
      "#facc15",
    ],
    tooltipBg: "bg-gray-700",
    tooltipText: "text-white",
  },
  vibrant: {
    name: "Vibrant",
    background: "bg-indigo-50",
    text: "text-gray-800",
    cardBg: "bg-white",
    sidebarBg: "bg-indigo-600",
    sidebarText: "text-white",
    primary: "#c026d3",
    secondary: "#db2777",
    accent: "#f43f5e",
    chartColors: [
      "#c026d3",
      "#db2777",
      "#f43f5e",
      "#ef4444",
      "#f97316",
      "#eab308",
      "#84cc16",
    ],
    tooltipBg: "bg-white",
    tooltipText: "text-gray-800",
  },
};

const chartOptions = ["bar", "line", "area", "pie", "composed", "hbar"];

const App = () => {
  const [file, setFile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isXLSXLoaded, setIsXLSXLoaded] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [chatHistory, setChatHistory] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isThemesSectionOpen, setIsThemesSectionOpen] = useState(true);
  const chatEndRef = useRef(null);

  const currentTheme = themes[selectedTheme];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.onload = () => {
      console.log("XLSX library loaded successfully.");
      setIsXLSXLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load XLSX library.");
      setError(
        "Failed to load a required library. Please try refreshing the page."
      );
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!isXLSXLoaded) {
      setError(
        "The application is still setting up. Please wait a moment and try again."
      );
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

        const totalRecords = fileData.length;

        const dataSample = JSON.stringify(fileData.slice(0, 5));

        const prompt = `You are a data analyst. Analyze the provided dataset with the following headers: ${headers.join(", ")}.
          
          Here is a small sample of the data to understand the structure:
          ${dataSample}

          1. Provide a concise narrative summary of the data, highlighting key trends, relationships, and patterns you find.
          2. Identify and calculate 4-5 key metrics from the data that would be most useful for a business professional. These metrics should be highly relevant to the dataset. For example, if it's a sales dataset, calculate total revenue. If it's a financial dataset, calculate total profit.
          3. Generate a JSON object with a dashboard configuration for this data. The JSON must follow this exact structure, with meaningful dataKeys and nameKeys based on the provided dataset. The charts should be varied and logical for the type of data. The dataKeys for the charts should be numeric or counts of categorical values.
          
          {
            "analysisText": "A detailed narrative summary of the data, highlighting key insights and trends.",
            "keyMetrics": [
              { "title": "Metric Title", "value": "Metric Value", "description": "Short description of the metric." }
            ],
            "charts": [
              { "type": "bar", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
              { "type": "line", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
              { "type": "pie", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
              { "type": "area", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
              { "type": "composed", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" }
            ]
          }
          `;

        console.log("Sending prompt to AI for dashboard generation.");

        const payload = {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                analysisText: { type: "STRING" },
                keyMetrics: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      title: { type: "STRING" },
                      value: { type: "STRING" },
                      description: { type: "STRING" },
                    },
                  },
                },
                charts: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      type: { type: "STRING" },
                      title: { type: "STRING" },
                      dataKey: { type: "STRING" },
                      nameKey: { type: "STRING" },
                    },
                  },
                },
              },
            },
          },
        };

        const apiKey ="AIzaSyDNmQrw2ApzivQfHFkiUqpDYPauMNwB8nI";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw API response:", result);

        const jsonString = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!jsonString) {
          console.error(
            "API response was empty or malformed:",
            JSON.stringify(result, null, 2)
          );
          throw new Error("No valid response from AI.");
        }

        let parsedResult;
        try {
          parsedResult = JSON.parse(jsonString);
        } catch (parseError) {
          console.error("Failed to parse JSON string:", jsonString);
          throw new Error("Failed to parse AI response. The response format was invalid.");
        }

        const totalRecordsMetric = {
            title: "Total Records",
            value: totalRecords.toString(),
            description: "Total number of entries in the dataset.",
        };

        const updatedMetrics = parsedResult.keyMetrics.map(metric => {
          if (metric.title.toLowerCase().includes("total employees") || metric.title.toLowerCase().includes("total records")) {
            return { ...metric, value: totalRecords.toString(), title: "Total Records" };
          }
          return metric;
        });
        
        if (!updatedMetrics.some(m => m.title === "Total Records")) {
            updatedMetrics.unshift(totalRecordsMetric);
        }

        setDashboardData({
          originalData: fileData,
          analysisText: parsedResult.analysisText,
          keyMetrics: updatedMetrics,
          charts: parsedResult.charts.map(chart => ({ ...chart, currentType: chart.type })),
        });
      } catch (err) {
        console.error("Error processing file or calling API:", err);
        setError(
          "Failed to analyze data. Please ensure your file has a valid format and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(uploadedFile);
  };
  
  const analyzeSimpleCount = (query, data, chatHistory) => {
    const lowerQuery = query.toLowerCase().trim();
    if (data.length === 0) return null;

    const headers = Object.keys(data[0]);

    if (lowerQuery.includes('number of column')) {
      return `The dataset contains ${headers.length} columns.`;
    }

    const countMatch = lowerQuery.match(/(?:number of|how many|count of|\#)\s+(.*?)(?:\s+in)?\s*(\w+)?/i);
    if (countMatch) {
      const valueOrColumn = countMatch[1].trim().replace(/['"`?]/g, '');
      const potentialColumn = countMatch[2] ? countMatch[2].toLowerCase() : null;

      if (potentialColumn) {
        const foundHeader = headers.find(h => h.toLowerCase() === potentialColumn);
        if (foundHeader) {
          const count = data.filter(item => 
            String(item[foundHeader]).toLowerCase() === valueOrColumn.toLowerCase()
          ).length;
          return `The number of '${valueOrColumn}' in the '${foundHeader}' column is ${count}.`;
        }
      } 
      
      else {
          const foundHeader = headers.find(h => h.toLowerCase() === valueOrColumn.toLowerCase());
          if(foundHeader) {
            const count = data.length;
            return `The dataset contains ${count} entries for the column '${foundHeader}'.`;
          }
      }
    }
    
    const followUpMatch = lowerQuery.match(/^(?:and|\?)?\s*(\w+)\s*$/i);
    if (followUpMatch && chatHistory.length >= 2) {
      const lastAiMessage = chatHistory[chatHistory.length - 1].text;
      
      const lastColumnMatch = lastAiMessage.match(/'(.*?)' column/i);
      const prevQueryWasCount = lastAiMessage.includes("number of");

      if (lastColumnMatch && prevQueryWasCount) {
        const lastColumn = lastColumnMatch[1];
        const followUpValue = followUpMatch[1].trim().replace(/['"`?]/g, '').toLowerCase();
        
        const foundHeader = headers.find(h => h.toLowerCase() === lastColumn.toLowerCase());
        if (foundHeader) {
          const count = data.filter(item => 
            String(item[foundHeader]).toLowerCase() === followUpValue
          ).length;
          return `The number of '${followUpValue.toUpperCase()}' in the '${foundHeader}' column is ${count}.`;
        }
      }
    }

    return null;
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userQuery.trim() || !dashboardData) return;

    const newChatHistory = [...chatHistory, { role: "user", text: userQuery }];
    setChatHistory(newChatHistory);
    setUserQuery("");

    const localAnswer = analyzeSimpleCount(userQuery, dashboardData.originalData, newChatHistory);

    if (localAnswer) {
      setChatHistory((current) => [...current, { role: "ai", text: localAnswer }]);
      return;
    }

    try {
      setChatHistory((current) => [...current, { role: "ai", text: "Analyzing...", isThinking: true }]);

      const fullData = JSON.stringify(dashboardData.originalData);

      const prompt = `You are a data analyst. You are given a full dataset in JSON format.
      Your task is to answer a user's question about the data.
      The user's question is: "${userQuery}".
      The dataset is: ${fullData}.
      Answer the user's question concisely and accurately based ONLY on the provided dataset. Do not make up any information.`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const apiKey ="AIzaSyDNmQrw2ApzivQfHFkiUqpDYPauMNwB8nI";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setChatHistory((current) => {
          const updatedHistory = current.slice(0, -1);
          return [...updatedHistory, { role: "ai", text: "Sorry, I couldn't process that request. There was an API error." }];
        });
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      const aiResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!aiResponseText) {
        setChatHistory((current) => {
          const updatedHistory = current.slice(0, -1);
          return [...updatedHistory, { role: "ai", text: "Sorry, I couldn't process that request. No valid response from AI." }];
        });
        throw new Error("No valid response from AI.");
      }

      setChatHistory((current) => {
        const updatedHistory = current.slice(0, -1);
        return [...updatedHistory, { role: "ai", text: aiResponseText }];
      });

    } catch (err) {
      console.error("Error with chat API call:", err);
      setChatHistory((current) => {
        const updatedHistory = current.slice(0, -1);
        return [...updatedHistory, { role: "ai", text: "Sorry, I couldn't process that request." }];
      });
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const resetDashboard = () => {
    setFile(null);
    setDashboardData(null);
    setIsLoading(false);
    setError(null);
    setChatHistory([]);
  };

  const handleChartTypeChange = (chartIndex, newType) => {
    setDashboardData(prev => {
      if (!prev) return prev;
      const updatedCharts = [...prev.charts];
      updatedCharts[chartIndex].currentType = newType;
      return { ...prev, charts: updatedCharts };
    });
  };

  const getMetricIcon = (title) => {
    switch (title) {
      case "Total Records":
        return Icons.Users();
      case "Active Employees":
        return Icons.UserCheck();
      case "Terminated Employees":
        return Icons.UserX();
      case "Average Salary":
        return Icons.DollarSign();
      case "Most Common Termination Reason":
        return Icons.Clipboard();
      default:
        return Icons.Activity();
    }
  };

  const getChartColors = (chartIndex) => {
    return currentTheme.chartColors;
  };

  const renderChart = (chartConfig, chartIndex) => {
    if (!dashboardData || !dashboardData.originalData) {
      return null;
    }

    const { title, dataKey, nameKey, currentType } = chartConfig;

    const aggregatedData = dashboardData.originalData.reduce((acc, item) => {
      const key = item[nameKey];
      if (key === undefined || key === null || key === "") {
        return acc;
      }

      let value = parseFloat(item[dataKey]);
      if (isNaN(value)) {
        value = 1;
      }

      const existing = acc.find((d) => d.name === key);
      if (existing) {
        existing.value += value;
        existing.count += 1;
      } else {
        acc.push({ name: key, value: value, count: 1 });
      }
      return acc;
    }, []);

    if (aggregatedData.length === 0) {
      return null;
    }

    const pieData = aggregatedData.map((item) => ({
      name: item.name,
      value: item.value,
    }));

    // ********** NEW: pre-compute total for correct percentages **********
    const pieTotal = pieData.reduce((s, d) => s + Number(d.value || 0), 0);
    // *******************************************************************

    const colors = getChartColors(chartIndex);
    
    // Custom Legend Component to handle overflow for pie chart
    const CustomPieLegend = (props) => {
      const { payload } = props;
      return (
        <div className="flex flex-col h-full overflow-y-auto w-1/2 md:w-1/3 p-2 scrollbar-thin">
          <ul className="list-none space-y-1">
            {payload.map((entry, index) => (
              <li key={`legend-${index}`} className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-xs opacity-80">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };


    const chartWrapper = (chartComponent) => (
      <div
        className={`w-full h-72 ${currentTheme.cardBg} rounded-2xl shadow-xl p-4 transition-transform duration-300 hover:scale-[1.01] border border-gray-200 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${currentTheme.text} text-center`}>
            {title}
          </h2>
          <select
            value={currentType}
            onChange={(e) => handleChartTypeChange(chartIndex, e.target.value)}
            className={`p-1 rounded-md text-sm border ${currentTheme.cardBg} ${currentTheme.text}`}
          >
            {chartOptions.map(option => (
              <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
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
          <BarChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`colorBar-${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: currentTheme.tooltipText }}
              itemStyle={{ color: currentTheme.tooltipText }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar
              dataKey="value"
              fill={`url(#colorBar-${chartIndex})`}
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        );
      case "line":
        return chartWrapper(
          <LineChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" interval="preserveStartEnd" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: currentTheme.tooltipText }}
              itemStyle={{ color: currentTheme.tooltipText }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors[1]}
              strokeWidth={3}
              dot={{ fill: colors[1], stroke: "none", r: 4 }}
              activeDot={{ r: 8, strokeWidth: 2, fill: colors[1] }}
              animationDuration={800}
            />
          </LineChart>
        );
      case "area":
        return chartWrapper(
          <AreaChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id={`colorArea-${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[1]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: currentTheme.tooltipText }}
              itemStyle={{ color: currentTheme.tooltipText }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
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
          <div
            className={`w-full h-72 ${currentTheme.cardBg} rounded-2xl shadow-xl p-4 transition-transform duration-300 hover:scale-[1.01] border border-gray-200 flex flex-col`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${currentTheme.text} text-center`}>
                {title}
              </h2>
              <select
                value={currentType}
                onChange={(e) => handleChartTypeChange(chartIndex, e.target.value)}
                className={`p-1 rounded-md text-sm border ${currentTheme.cardBg} ${currentTheme.text}`}
              >
                {chartOptions.map(option => (
                  <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-row items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    labelLine={false}
                    animationDuration={800}
                    // ********** NEW: show percentage on slice labels **********
                    label={({ name, value }) => {
                      const v = Number(value || 0);
                      const pct = pieTotal ? (v / pieTotal) * 100 : 0;
                      return `${name}: ${pct.toFixed(1)}%`;
                    }}
                    // ***********************************************************
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          currentTheme.chartColors[
                          index % currentTheme.chartColors.length
                          ]
                        }
                        stroke={currentTheme.cardBg}
                        strokeWidth={3}
                        className="transition-all duration-300 hover:brightness-125"
                      />
                    ))}
                  </Pie>
                  {/* ********** NEW: tooltip percent fixed using total ********** */}
                  <Tooltip
                    formatter={(value, name) => {
                      const v = Number(value || 0);
                      const pct = pieTotal ? (v / pieTotal) * 100 : 0;
                      return [`${pct.toFixed(1)}%`, name];
                    }}
                    contentStyle={{
                      backgroundColor: currentTheme.tooltipBg,
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: currentTheme.tooltipText }}
                    itemStyle={{ color: currentTheme.tooltipText }}
                  />
                  {/* *********************************************************** */}
                </PieChart>
              </ResponsiveContainer>
              <CustomPieLegend payload={pieData.map((entry, index) => ({
                value: entry.name,
                id: `pie-legend-${index}`,
                type: 'square',
                color: currentTheme.chartColors[index % currentTheme.chartColors.length]
              }))} />
            </div>
          </div>
        );
      case "composed":
        return chartWrapper(
          <ComposedChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`composedBarGradient-${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: currentTheme.tooltipText }}
              itemStyle={{ color: currentTheme.tooltipText }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Area yAxisId="left" type="monotone" dataKey="value" fill={`url(#composedBarGradient-${chartIndex})`} stroke={colors[0]} />
            <Bar yAxisId="right" dataKey="count" barSize={20} fill={colors[1]} />
            <Line yAxisId="left" type="monotone" dataKey="value" stroke={colors[2]} strokeWidth={2} />
          </ComposedChart>
        );
      case "hbar":
        return chartWrapper(
          <BarChart data={aggregatedData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`colorHBar-${chartIndex}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#6b7280" 
                width={200}
                interval={0}
                tickFormatter={(value) => {
                  return value.length > 20 ? value.substring(0, 20) + '...' : value;
                }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: currentTheme.tooltipBg,
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: currentTheme.tooltipText }}
              itemStyle={{ color: currentTheme.tooltipText }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
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

  return (
    <div className={`flex min-h-screen font-sans ${currentTheme.background}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: ${currentTheme.primary} transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: ${currentTheme.primary};
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>

      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg md:hidden transition-all duration-300 ${currentTheme.cardBg} ${currentTheme.text}`}
      >
        {isSidebarOpen ? <Icons.X /> : <Icons.Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col w-64 ${currentTheme.sidebarBg} ${currentTheme.sidebarText} shadow-2xl p-6 z-40 md:z-auto md:flex`}
      >
        <div className="flex items-center mb-10">
          <svg
            className={`h-10 w-10`}
            style={{ color: currentTheme.primary }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-2xl font-bold">DataSphere</span>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <button
            onClick={() => setIsThemesSectionOpen(!isThemesSectionOpen)}
            className="flex justify-between items-center w-full mb-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <h3 className="text-sm font-semibold uppercase opacity-70 tracking-wider">
              Themes
            </h3>
            {isThemesSectionOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
          </button>
          <div className={`transition-all duration-300 overflow-hidden ${isThemesSectionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col space-y-2">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`py-2 px-4 rounded-xl text-left transition-all duration-200 font-medium ${selectedTheme === themeKey
                    ? `bg-gray-700 shadow-lg text-white`
                    : "hover:bg-gray-800"
                    }`}
                >
                  {themes[themeKey].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {dashboardData && (
          <button
            onClick={resetDashboard}
            className={`mt-auto w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300
              bg-indigo-600 text-white hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-opacity-50`}
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Icons.RefreshCcw /> Reset
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in-down">
            <h1
              className={`text-4xl md:text-5xl font-extrabold ${currentTheme.text} mb-2`}
            >
              DataSphere Dashboard
            </h1>
            <p className={`text-lg ${currentTheme.text} opacity-75`}>
              Upload your Excel or CSV file and get instant, interactive data
              insights.
            </p>
          </header>

          {/* File Upload Section */}
          {!dashboardData && !isLoading && (
            <div
              className={`p-6 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 ${currentTheme.cardBg}`}
            >
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-200
                  ${!isXLSXLoaded
                    ? "opacity-50 cursor-not-allowed border-gray-300"
                    : `border-indigo-300 hover:bg-gray-50`
                  } ${currentTheme.text}`}
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
                  <span style={{ color: currentTheme.primary }}>
                    {file.name}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
              <p
                className={`mt-6 text-xl font-medium ${currentTheme.text} opacity-80`}
              >
                Analyzing your data...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl relative text-center shadow-md">
              <span className="block sm:inline font-medium">{error}</span>
            </div>
          )}

          {/* Dashboard Display */}
          {dashboardData && (
            <div className="mt-12 animate-fade-in-up">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {dashboardData.keyMetrics && dashboardData.keyMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03] border border-gray-200 ${currentTheme.cardBg} ${currentTheme.text}`}
                  >
                    <div className={`p-3 rounded-full mb-2`} style={{ backgroundColor: `${currentTheme.primary}20`, color: currentTheme.primary }}>
                      {getMetricIcon(metric.title)}
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">
                      {metric.title}
                    </h3>
                    <div
                      className="mt-1 text-3xl font-extrabold"
                      style={{ color: currentTheme.primary }}
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
              <div
                className={`p-6 rounded-3xl shadow-lg border border-gray-200 mb-8 ${currentTheme.cardBg} ${currentTheme.text}`}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3">
                  AI Analysis & Insights
                </h2>
                <p className="leading-relaxed whitespace-pre-wrap opacity-90">
                  {dashboardData.analysisText}
                </p>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dashboardData.charts && dashboardData.charts.map((chart, index) => (
                  <div key={index}>{renderChart(chart, index)}</div>
                ))}
              </div>

              {/* Chat Section for advanced analysis */}
              <div className="mt-8">
                <div className={`p-6 rounded-3xl shadow-lg border border-gray-200 mb-8 ${currentTheme.cardBg} ${currentTheme.text}`}>
                  <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center">
                    <Icons.HelpCircle /> Ask a Data Analyst
                  </h2>
                  <div className="flex flex-col h-80 overflow-y-auto pr-2 scrollbar-thin">
                    {chatHistory.length > 0 ? (
                      chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-start mb-4 ${msg.role === "user" ? "justify-end" : ""}`}>
                          <div className={`rounded-xl p-3 max-w-[80%] shadow-sm ${msg.role === "user" ? "bg-indigo-100 text-indigo-900" : "bg-gray-100 text-gray-800"}`}>
                            <p className="font-semibold text-xs opacity-70 mb-1">{msg.role === "user" ? "You" : "AI"}</p>
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center opacity-50">
                        Ask me anything about your data, like "What is the average salary?"
                      </div>
                    )}
                    <div ref={chatEndRef}></div>
                  </div>
                  <form onSubmit={handleChatSubmit} className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Ask a question about your data..."
                      className={`flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary} ${currentTheme.cardBg} ${currentTheme.text}`}
                    />
                    <button
                      type="submit"
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-opacity-50`}
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
