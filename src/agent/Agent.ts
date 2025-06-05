import AgentDriver, { AgentDriverResponse } from './drivers/AgentDriver';

export interface AgentResponse {
    error?: string;
}

export default abstract class Agent {

    protected readonly driver: AgentDriver;

    constructor(driver: AgentDriver) {
        this.driver = driver;
    }

    async prompt(prompt: string, systemPromptVariables?: Record<string, string>): Promise<AgentDriverResponse> {
        const systemPrompt = this.buildSystemPrompt(systemPromptVariables);

        this.driver.setSystemPrompt(systemPrompt);

        return await this.driver.prompt(prompt);
    }

    protected parseJson<T>(text: string) {
        return JSON.parse(text) as T;
    }

    protected buildSystemPrompt(variables?: Record<string, string>): string {
        const template = this.getSystemPromptTemplate().trim();

        return template.replace(/\{\{(\w+)}}/g, (placeholder, variableName) => {
            return variables?.[variableName] ?? placeholder;
        });
    }

    protected abstract getSystemPromptTemplate(): string;
}
