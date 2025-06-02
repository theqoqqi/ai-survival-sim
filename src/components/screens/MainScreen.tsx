import React from 'react';
import styles from './MainScreen.module.css';
import { TileDetailsPanel } from '../sidebar/TileDetailsPanel';
import Tile from '../../core/Tile';
import { WorldMapView } from '../world/WorldMapView';
import WorldMap from '../../core/WorldMap';
import { createTestWorld } from '../../presets/testWorld';
import Entity from '../../core/Entity';
import { EntityDetailsPanel } from '../sidebar/EntityDetailsPanel';
import Action from '../../core/actions/Action';
import { TestActionsPanel } from '../sidebar/TestActionsPanel';
import { AgentMove } from '../../agent/AgentMove';
import { MoveListPanel } from '../sidebar/moveListPanel/MoveListPanel';

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
    const handleTestAction = (action: Action<any>) => {
        if (!worldMap) {
            return;
        }

        handleApplyMove({
            actions: [action],
            thought: '',
        });
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
                <TestActionsPanel
                    worldMap={worldMap}
                    onApplyAction={handleTestAction}
                />
            </div>
        </div>
    );
}
