
interface MetricCardData {
    value: string;
    label: string;
    subtext?: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
}

interface MetricCardProps {
    data: MetricCardData;
    config?: Record<string, unknown>;
}

export const MetricCardWidget = ({ data }: MetricCardProps) => {
    const changeColor = {
        positive: "text-green-700 bg-green-100",
        negative: "text-red-700 bg-red-100",
        neutral: "text-gray-600 bg-gray-100",
    };

    // Icon based on change type
    const ChangeIcon = ({ type }: { type: string }) => {
        if (type === 'positive') return <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
        if (type === 'negative') return <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>;
        return null;
    };

    return (
        <div className="h-full flex flex-col justify-between">
            {/* Header with Menu Dots */}
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{data.label}</p>
                <button className="text-gray-300 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                </button>
            </div>

            {/* Main Value and Badge */}
            <div className="flex items-end gap-3 mb-1">
                <p className="text-4xl font-bold text-gray-900 tracking-tight">{data.value}</p>

                {data.change && (
                    <div className={`flex items-center px-2 py-0.5 rounded text-xs font-bold mb-1.5 ${changeColor[data.changeType || "neutral"]}`}>
                        <ChangeIcon type={data.changeType || "neutral"} />
                        {data.change}
                    </div>
                )}
            </div>

            {/* Subtext */}
            {data.subtext && (
                <p className="text-sm text-gray-400 font-medium">{data.subtext}</p>
            )}
        </div>
    );
};
