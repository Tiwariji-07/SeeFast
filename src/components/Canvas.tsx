"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
    TableWidget,
    BarChartWidget,
    LineChartWidget,
    PieChartWidget,
    MetricCardWidget,
} from "./widgets";
import ReactGridLayout, { useContainerWidth } from "react-grid-layout";

// Map component names to actual React components
const COMPONENT_MAP: Record<string, React.FC<any>> = {
    Table: TableWidget,
    BarChart: BarChartWidget,
    LineChart: LineChartWidget,
    PieChart: PieChartWidget,
    MetricCard: MetricCardWidget,
};

// Widget type definition (matches backend response)
interface Widget {
    id: string;
    component: string;
    position: {
        column: number;
        row: number;
        width: number;
        height: number;
    };
    data: any;
    config?: Record<string, any>;
}

interface CanvasProps {
    widgets: Widget[];
}

export const Canvas = ({ widgets }: CanvasProps) => {
    const { containerRef, width, mounted } = useContainerWidth()


    // Convert our position format to react-grid-layout format
    const layout = widgets.map((widget) => ({
        i: widget.id,
        x: widget.position.column - 1, // Grid is 0-indexed
        y: widget.position.row - 1,
        w: widget.position.width,
        h: widget.position.height,
    }));

    // Show empty state if no widgets
    if (widgets.length === 0) {
        return (
            <div className="h-96 flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <p className="text-lg">No visualizations yet</p>
                    <p className="text-sm">Ask a question to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef}>
            {mounted && (
                <ReactGridLayout
                    className="layout"
                    layout={layout}
                    gridConfig={{ rowHeight: 120, cols: 12 }}
                    width={width}
                    dragConfig={{ enabled: false }}
                    resizeConfig={{ enabled: false }}
                    autoSize={true}
                >
                    {widgets.map((widget) => {
                        const Component = COMPONENT_MAP[widget.component];

                        if (!Component) {
                            return (
                                <div key={widget.id} className="bg-red-50 rounded-lg p-4">
                                    <p className="text-red-600">Unknown component: {widget.component}</p>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={widget.id}
                                className="bg-white rounded-lg shadow-sm border p-4 overflow-hidden"
                            >
                                <Component data={widget.data} config={widget.config} />
                            </div>
                        );
                    })}
                </ReactGridLayout>
            )}
        </div>
    );
};
