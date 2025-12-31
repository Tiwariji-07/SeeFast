"use client";

import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface PieChartData {
    labels: string[];
    values: number[];
}

interface PieChartProps {
    data: PieChartData;
    config?: {
        title?: string;
        donut?: boolean;
    };
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export const PieChartWidget = ({ data, config }: PieChartProps) => {
    // Transform to Recharts format
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.values[index],
    }));

    return (
        <div className="h-full w-full">
            {config?.title && (
                <h3 className="font-semibold text-gray-700 mb-2">{config.title}</h3>
            )}
            <ResponsiveContainer width="100%" height="85%">
                <RechartsPieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={config?.donut ? 40 : 0}
                        outerRadius={80}
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};
