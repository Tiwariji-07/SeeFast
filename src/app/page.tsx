/**
 * Main Page - Seefast UI
 * =======================
 * Implements the clean, grid-dot layout with floating prompt bar.
 */

"use client";

import { useState } from "react";
import { Canvas, ChatBox } from "@/components";
import { queryAgent, Widget } from "@/lib/api";

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await queryAgent(query);
      setMessage(response.message);
      setWidgets(response.widgets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setWidgets([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col bg-dot-pattern">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo area */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Seefast</span>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* Context/Breadcrumb */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <svg className="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
              <span className="text-sm font-medium text-gray-700">Marketing Dashboard - Q3</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <svg className="text-gray-400 w-full h-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-6 py-8">

          {/* Agent Message Banner */}
          {message && (
            <div className="mb-8 p-4 bg-blue-50/80 border border-blue-100 rounded-xl flex items-start justify-between shadow-sm backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="mt-0.5 p-1 bg-blue-100 rounded-md text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <p className="text-gray-700 font-medium pt-0.5">{message}</p>
              </div>
              <button
                onClick={() => setMessage("")}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-blue-100 rounded transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {error}
            </div>
          )}

          {/* Canvas Area */}
          <div className="mb-32 min-h-[500px]">
            {widgets.length > 0 ? (
              <Canvas widgets={widgets} />
            ) : (
              /* Empty State Placeholder - Shows grid area */
              <div className="border-2 border-dashed border-gray-200 rounded-2xl h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                <div className="p-4 bg-white rounded-xl shadow-sm mb-4">
                  <svg className="text-gray-300" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                </div>
                <p className="font-medium text-gray-600 mb-1">Need more insights?</p>
                <p className="text-sm text-gray-400">Ask a question below to generate new charts on this canvas.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Prompt Input */}
      <div className="fixed bottom-8 left-0 right-0 z-40">
        <div className="max-w-2xl mx-auto px-4">
          <ChatBox onSubmit={handleQuery} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
