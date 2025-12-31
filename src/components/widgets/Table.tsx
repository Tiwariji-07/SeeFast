interface TableData {
    columns: string[];
    rows: any[][];
}

interface TableProps {
    data: TableData;
    config?: {
        title?: string;
    };
}

export const TableWidget = ({ data, config }: TableProps) => {
    return (
        <div className="h-full flex flex-col">
            {config?.title && (
                <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">{config.title}</h3>
                </div>
            )}

            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 sticky top-0">
                        <tr>
                            {data.columns.map((col, i) => (
                                <th key={i} className="px-4 py-3 font-semibold tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-3 font-medium text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
