/**
 * API Client
 * ===========
 * Functions to communicate with the backend.
 * 
 * BUSINESS LOGIC: This is where we call our agent!
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types matching our backend response
export interface Widget {
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

export interface QueryResponse {
    message: string;
    widgets: Widget[];
}

/**
 * Send a query to the agent and get visualization widgets back.
 * 
 * @param message - The user's natural language question
 * @param sessionId - Session ID for conversation memory (future)
 * @returns Promise with agent's response containing widgets
 */
export async function queryAgent(
    message: string,
    sessionId: string = "default"
): Promise<QueryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            session_id: sessionId,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${error}`);
    }

    return response.json();
}
