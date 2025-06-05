
export interface AgentDriverOptions {
    apiKey: string;
    apiBaseUrl: string;
    modelName?: string;
    gpt4FreeMode?: boolean;
    provider?: string;
    useMessageHistory?: boolean;
}

export interface AgentDriverResponse {
    content: string | null;
    usedTokens: any;
}

export default interface AgentDriver {

    setSystemPrompt(prompt: string): void;

    prompt(prompt: string): Promise<AgentDriverResponse>;
}
