import AgentDriver, { AgentDriverOptions, AgentDriverResponse } from './AgentDriver';
import ChatGptApi, { MessageParam } from '../../api/chatGpt/ChatGptApi';
import { getProvidersString } from '../../g4f/providers';

export default class ChatGptAgentDriver implements AgentDriver {

    private readonly chatApi: ChatGptApi;

    private systemPrompt: string = '';

    private readonly messageHistory: MessageParam[] = [];

    private readonly gpt4FreeMode: boolean = false;

    constructor(options: AgentDriverOptions) {
        this.chatApi = new ChatGptApi(options.apiKey, options.apiBaseUrl, {
            defaultModelName: options.modelName ?? 'gpt-4o-mini',
        });
        this.gpt4FreeMode = options.gpt4FreeMode ?? false;
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
            extraOptions: this.getExtraOptions(),
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

    private getExtraOptions() {
        if (!this.gpt4FreeMode) {
            return {};
        }

        return {
            provider: getProvidersString(this.chatApi.defaultModelName),
        };
    }
}
