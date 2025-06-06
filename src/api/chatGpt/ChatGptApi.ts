import OpenAI from 'openai';
import {ChatCompletion} from 'openai/resources/chat/completions';

export type MessageParam = {
    role: 'system' | 'user' | 'assistant',
    content: string,
};

export type ChatCompletionOptions = {
    messages?: MessageParam[],
    prompt?: string,
    systemPrompt?: string,
    model?: string,
    maxCompletionTokens?: number,
    temperature?: number,
    extraOptions?: {
        [key: string]: any,
    },
};

export type ChatCompletionTokenUsage = {
    request: {
        uncached: number,
        cached: number,
    },
    response: number,
};

export type ChatCompletionResult = {
    model: string,
    content: string | null,
    usedTokens: ChatCompletionTokenUsage,
};

export default class ChatGptApi {

    private openai: OpenAI;

    public readonly defaultModelName: string;

    constructor(apiKey: string, baseURL: string, options: { defaultModelName: string }) {
        this.openai = new OpenAI({
            apiKey,
            baseURL,
            dangerouslyAllowBrowser: true,
        });

        this.defaultModelName = options.defaultModelName;
    }

    public async createChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResult> {
        const {
            model = this.defaultModelName,
        } = options;

        const chatCompletion = await this.openai.chat.completions.create({
            model: model,
            messages: this.getMessages(options) as any[],
            max_completion_tokens: options.maxCompletionTokens,
            temperature: options.temperature,
            ...options.extraOptions,
        });

        console.log(chatCompletion);

        return this.buildResult(chatCompletion, options);
    }

    private buildResult(chatCompletion: ChatCompletion, options: ChatCompletionOptions) {
        const cachedRequestTokens = chatCompletion.usage!.prompt_tokens_details?.cached_tokens ?? 0;
        const uncachedRequestTokens = chatCompletion.usage!.prompt_tokens - cachedRequestTokens;
        const responseTokens = chatCompletion.usage!.completion_tokens;

        return {
            model: options.model!,
            content: chatCompletion.choices[0].message.content,
            usedTokens: {
                request: {
                    uncached: uncachedRequestTokens,
                    cached: cachedRequestTokens,
                },
                response: responseTokens,
            },
        };
    }

    private getMessages(options: ChatCompletionOptions): MessageParam[] {
        let messages: MessageParam[] = [...(options.messages ?? [])];

        if (messages.length === 0) {
            messages.push({
                role: 'user',
                content: options.prompt ?? '',
            });
        }

        if (options.systemPrompt) {
            messages.unshift({
                role: 'system',
                content: options.systemPrompt,
            });
        }

        return messages;
    }
}
