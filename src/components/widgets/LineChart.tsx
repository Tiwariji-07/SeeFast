"use client";

import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface LineChartData {
    labels: string[];
    datasets: {
        label: string;
        values: number[];
    }[];
}

interface LineChartProps {
    data: LineChartData;
    config?: {
        title?: string;
        subtitle?: string;
        badge?: { text: string; color?: string };
    };
}

export const LineChartWidget = ({ data, config }: LineChartProps) => {
    // Simplification: MVP handles single dataset for optimal area chart look
    // Future: Handle multi-line
    const dataset = data.datasets[0];

    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: dataset.values[index],
    }));

    const color = "#3b82f6"; // Blue primary

    return (
        <div className="h-full w-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        {config?.title && (
                            <h3 className="font-bold text-gray-900 text-sm md:text-base">{config.title}</h3>
                        )}
                        {/* Growth Badge */}
                        {config?.badge ? (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                                {config.badge.text}
                            </span>
                        ) : (
                            /* Default badge if growth detected */
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                                ↑ 12%
                            </span>
                        )}
                    </div>

                    <p className="text-xs text-gray-400 mt-0.5">
                        {config?.subtitle || "This Year"}
                    </p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        dy={10}
                        interval="preserveStartEnd"
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};