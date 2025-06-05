import WorldMap, { SerializedWorldMap } from '../core/WorldMap';
import worldGenSystemPrompt from './worldGenSystemPrompt';
import Agent, { AgentResponse } from './Agent';

interface WorldGenAgentResponse extends AgentResponse {
    world?: WorldMap;
}

interface WorldGenOptions {
    width: number;
    height: number;
    prompt: string;
}

export class WorldGenAgent extends Agent {

    public async generateWorld(options: WorldGenOptions): Promise<WorldGenAgentResponse> {
        const userPrompt = this.buildUserPrompt(options);
        const response = await this.prompt(userPrompt, {
            textLanguage: 'Russian',
        });

        if (!response.content) {
            return { error: 'Empty response from AI' };
        }

        try {
            const parsedJson = this.parseJson<SerializedWorldMap>(response.content);
            const world = WorldMap.fromJson(parsedJson);

            console.log('Parsed world:', world);
            console.log(response.usedTokens);

            return { world };
        } catch (e) {
            console.warn('Failed to parse world', response.content, e);

            const errorMessage = 'Failed to parse world: ' + ((e as Error)?.message ?? '');

            return { error: errorMessage };
        }
    }

    protected getSystemPromptTemplate(): string {
        return worldGenSystemPrompt;
    }

    private buildUserPrompt(options: WorldGenOptions): string {
        return JSON.stringify(options);
    }
}
