"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

interface ChatBoxProps {
    onSubmit: (message: string) => void;
    isLoading?: boolean;
}

export const ChatBox = ({ onSubmit, isLoading = false }: ChatBoxProps) => {
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSubmit(input.trim());
            setInput("");
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <form
                onSubmit={handleSubmit}
                className="w-full relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 pl-4 pr-1 py-1 transition-shadow hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-300 ring-4 ring-gray-50/50"
            >
                {/* Plus Icon (Left) */}
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your data..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400"
                />

                {/* Mic Icon (Right) */}
                <div className="flex items-center gap-1 pr-1">
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </button>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`
                h-10 w-10 flex items-center justify-center rounded-full transition-all
                ${input.trim()
                                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"}
            `}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </form>
            <p className="text-xs text-gray-400">AI generated content may be inaccurate.</p>
        </div>
    );
};
