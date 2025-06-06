import WorldMap from '../core/WorldMap';
import Entity from '../core/Entity';
import moveGenSystemPrompt from './moveGenSystemPrompt';
import { AgentMove, parseMove, SerializedAgentMove } from './AgentMove';
import { Vectors } from '../core/util/Vector';
import Agent, { AgentResponse } from './Agent';

interface MoveGenAgentResponse extends AgentResponse {
    move?: AgentMove;
}

interface MoveGenOptions {
    worldMap: WorldMap;
    playerEntity: Entity;
    globalTarget: string;
    systemPromptVariables?: Record<string, string>;
}

export class MoveGenAgent extends Agent {

    private readonly moveHistory: AgentMove[] = [];

    public async generateMove(options: MoveGenOptions): Promise<MoveGenAgentResponse> {
        const userPrompt = this.buildUserPrompt(options);
        const response = await this.prompt(userPrompt, options.systemPromptVariables);

        if (!response.content) {
            return { error: 'Empty response from AI' };
        }

        try {
            const parsedJson = this.parseJson<SerializedAgentMove>(response.content);
            const move = parseMove(parsedJson);

            console.log('Parsed move:', move);
            console.log(response.usedTokens);

            this.moveHistory.push(move);

            return { move };
        } catch (e) {
            console.warn('Failed to parse move', response.content, e);

            const errorMessage = 'Failed to parse move: ' + ((e as Error)?.message ?? '');

            return { error: errorMessage };
        }
    }

    protected getSystemPromptTemplate(): string {
        return moveGenSystemPrompt;
    }

    private buildUserPrompt(options: MoveGenOptions): string {
        const playerTile = options.worldMap.findEntityTile(options.playerEntity.id);

        if (!playerTile) {
            throw new Error('Failed to find player tile');
        }

        const adjacentTiles = options.worldMap.getTilesInRadius(playerTile.position.x, playerTile.position.y, 1)
            .filter(tile => !Vectors.equals(tile.position, playerTile.position))
            .map(tile => tile.toJson())
            .map(tile => ({
                relativePosition: Vectors.subtract(tile.position, playerTile.position),
                tileInfo: `${tile.data.terrain.title}. ${tile.data.feature?.icon} ${tile.data.feature?.title ?? 'ничего интересного'}.`,
            }));
        const visibleTiles = options.worldMap.getTilesInRadius(playerTile.position.x, playerTile.position.y, 3)
            .map(tile => tile.toJson());
        const latestThoughts = this.moveHistory.slice(-5).map(move => move.thought);

        const moveContext = {
            globalTarget: options.globalTarget,
            previousMoves: this.moveHistory,
            latestThoughts,
            playerTile: playerTile.toJson(),
            adjacentTiles,
            visibleTiles,
        };

        console.log('moveContext', moveContext);

        return JSON.stringify(moveContext);
    }
}
