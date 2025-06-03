import WorldMap from '../core/WorldMap';
import Entity from '../core/Entity';
import systemPrompt from './systemPrompt';
import { AgentMove, parseMove } from './AgentMove';
import { Vectors } from '../core/util/Vector';
import AgentDriver from './drivers/AgentDriver';

interface MoveGenAgentResponse {
    move?: AgentMove;
    error?: string;
}

export class MoveGenAgent {

    private readonly driver: AgentDriver;

    private readonly moveHistory: AgentMove[] = [];

    public globalTarget: string = 'Survive';

    constructor(driver: AgentDriver) {
        this.driver = driver;
    }

    public async generateMove(worldMap: WorldMap, entity: Entity): Promise<MoveGenAgentResponse> {
        const systemPrompt = this.buildSystemPrompt();
        const userPrompt = this.buildUserPrompt(worldMap, entity);

        this.driver.setSystemPrompt(systemPrompt);
        const response = await this.driver.prompt(userPrompt);

        if (!response.content) {
            console.warn('Agent: empty response from AI');

            return { error: 'Empty response from AI' };
        }

        try {
            const move = parseMove(response.content);

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

    private buildSystemPrompt(): string {
        return systemPrompt.trim();
    }

    private buildUserPrompt(worldMap: WorldMap, entity: Entity): string {
        const playerTile = worldMap.findEntityTile(entity.id);

        if (!playerTile) {
            throw new Error('Failed to find player tile');
        }

        const adjacentTiles = worldMap.getTilesInRadius(playerTile.position.x, playerTile.position.y, 1)
            .filter(tile => !Vectors.equals(tile.position, playerTile.position))
            .map(tile => tile.toJson())
            .map(tile => ({
                relativePosition: Vectors.subtract(tile.position, playerTile.position),
                tileInfo: `${tile.data.terrain.title}. ${tile.data.feature?.icon} ${tile.data.feature?.title ?? 'ничего интересного'}.`,
            }));
        const visibleTiles = worldMap.getTilesInRadius(playerTile.position.x, playerTile.position.y, 3)
            .map(tile => tile.toJson());
        const latestThoughts = this.moveHistory.slice(-5).map(move => move.thought);

        const moveContext = {
            globalTarget: this.globalTarget,
            previousMoves: this.moveHistory,
            latestThoughts,
            playerTile,
            adjacentTiles,
            visibleTiles,
        };

        console.log('moveContext', moveContext);

        return JSON.stringify(moveContext);
    }
}
