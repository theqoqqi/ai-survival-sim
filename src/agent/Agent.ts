import AgentDriver, { AgentDriverResponse } from './drivers/AgentDriver';

export interface AgentResponse {
    error?: string;
}

export default abstract class Agent {

    protected readonly driver: AgentDriver;

    constructor(driver: AgentDriver) {
        this.driver = driver;
    }

    async prompt(prompt: string): Promise<AgentDriverResponse> {
        const systemPrompt = this.buildSystemPrompt();

        this.driver.setSystemPrompt(systemPrompt);

        return await this.driver.prompt(prompt);
    }

    protected parseJson<T>(text: string) {
        return JSON.parse(text) as T;
    }

    protected abstract buildSystemPrompt(): string;
}
