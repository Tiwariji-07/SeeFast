"use client";

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

interface BarChartData {
    labels: string[];
    values: number[];
}

interface BarChartProps {
    data: BarChartData;
    config?: {
        title?: string;
        subtitle?: string;
        color?: string;
    };
}

export const BarChartWidget = ({ data, config }: BarChartProps) => {
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.values[index],
    }));

    // Match the reference blues
    const BAR_Color = "#3b82f6";

    return (
        <div className="h-full w-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    {config?.title && (
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">{config.title}</h3>
                    )}
                    {config?.subtitle && (
                        <p className="text-xs text-gray-400 mt-0.5">{config.subtitle}</p>
                    )}
                </div>
                <button className="text-gray-300 hover:text-gray-500 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </button>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        dy={10}
                    />
                    <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar
                        dataKey="value"
                        fill={config?.color || BAR_Color}
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};