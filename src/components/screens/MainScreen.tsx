import React from 'react';
import styles from './MainScreen.module.css';
import { TileDetailsPanel } from '../sidebar/TileDetailsPanel';
import Tile from '../../core/Tile';
import { WorldMapView } from '../world/WorldMapView';
import WorldMap from '../../core/WorldMap';
import { createTestWorld } from '../../presets/testWorld';
import Entity from '../../core/Entity';
import { EntityDetailsPanel } from '../sidebar/EntityDetailsPanel';
import { TestActionsPanel } from '../sidebar/TestActionsPanel';
import { MoveGenAgentPanel } from '../sidebar/agentPanel/MoveGenAgentPanel';
import { AgentMove } from '../../agent/AgentMove';
import { MoveListPanel } from '../sidebar/moveListPanel/MoveListPanel';
import { ImportExportPanel } from '../sidebar/ImportExportPanel';
import { WorldGenAgentPanel } from '../sidebar/agentPanel/WorldGenAgentPanel';

export default function MainScreen() {
    const [selectedTile, setSelectedTile] = React.useState<Tile | null>(null);
    const [selectedEntity, setSelectedEntity] = React.useState<Entity | null>(null);
    const [worldMap, setWorldMap] = React.useState<WorldMap | null>(null);
    const [appliedMoves, setAppliedMoves] = React.useState<AgentMove[]>([]);
    const onClickTile = (tile: Tile) => {
        setSelectedTile(tile);
        setSelectedEntity(null);
    };
    const onClickEntity = (entity: Entity) => {
        setSelectedEntity(entity);
    };
    const handleApplyMove = (move: AgentMove) => {
        if (!worldMap) {
            return;
        }

        move.actions.forEach(action => action.apply(worldMap));
        setAppliedMoves(prev => [...prev, move]);
    };

    React.useEffect(() => {
        setWorldMap(createTestWorld());
    }, []);

    if (!worldMap) {
        return <div>Loading...</div>;
    }

    const player = worldMap.findEntity('player') ?? null;

    return (
        <div className={styles.mainScreen}>
            <div className={styles.sidebar + ' ' + styles.moves}>
                <MoveListPanel moves={appliedMoves} />
            </div>
            <div className={styles.worldMapContainer}>
                <WorldMapView
                    key={appliedMoves.length}
                    worldMap={worldMap}
                    onClickTile={onClickTile}
                />
            </div>
            <div className={styles.sidebar}>
                {selectedEntity && <EntityDetailsPanel entity={selectedEntity} />}
                {!selectedEntity && (
                    <TileDetailsPanel
                        tile={selectedTile}
                        onClickEntity={onClickEntity}
                    />
                )}
                <ImportExportPanel
                    worldMap={worldMap}
                    onImport={setWorldMap}
                    autoImport
                />
                <TestActionsPanel
                    worldMap={worldMap}
                    onApplyMove={handleApplyMove}
                />
                <WorldGenAgentPanel
                    onGenerateWorld={setWorldMap}
                />
                {player && (
                    <MoveGenAgentPanel
                        worldMap={worldMap}
                        playerEntity={player}
                        onApplyMove={handleApplyMove}
                    />
                )}
            </div>
        </div>
    );
}
