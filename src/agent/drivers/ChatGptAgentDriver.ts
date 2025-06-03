import AgentDriver, { AgentDriverOptions, AgentDriverResponse } from './AgentDriver';
import ChatGptApi, { MessageParam } from '../../api/chatGpt/ChatGptApi';

export default class ChatGptAgentDriver implements AgentDriver {

    private readonly chatApi: ChatGptApi;

    private systemPrompt: string = '';

    private readonly messageHistory: MessageParam[] = [];

    constructor(options: AgentDriverOptions) {
        this.chatApi = new ChatGptApi(options.apiKey, options.apiBaseUrl, {
            defaultModelName: options.modelName ?? 'gpt-4o-mini',
        });
    }

    setSystemPrompt(prompt: string): void {
        this.systemPrompt = prompt;
    }

    async prompt(prompt: string): Promise<AgentDriverResponse> {
        const promptMessage: MessageParam = {
            role: 'user',
            content: prompt,
        };

        const response = await this.chatApi.createChatCompletion({
            systemPrompt: this.systemPrompt,
            messages: [
                ...this.messageHistory,
                promptMessage,
            ],
        });

        if (!response.content) {
            return {
                content: null,
                usedTokens: null,
            };
        }

        this.messageHistory.push(promptMessage);
        this.messageHistory.push({
            role: 'assistant',
            content: response.content,
        });

        return {
            content: response.content,
            usedTokens: response.usedTokens,
        };
    }
}
