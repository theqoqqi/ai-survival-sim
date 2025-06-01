import React from 'react';
import WorldMap from '../../core/WorldMap';
import Action from '../../core/actions/Action';
import MoveAction from '../../core/actions/MoveAction';
import styles from './TestActionsPanel.module.css';
import { DetailsPanel } from './DetailsPanel';

interface TestActionsPanelProps {
    worldMap: WorldMap;
    onApplyAction: (action: Action<any>) => void;
}

export const TestActionsPanel: React.FC<TestActionsPanelProps> = ({
    worldMap,
    onApplyAction,
}) => {
    const apply = (action: Action<any>) => {
        action.apply(worldMap);
        onApplyAction(action);
    };

    const move = (byX: number, byY: number) => {
        const tile = worldMap.findEntityTile('player');

        if (!tile) {
            return;
        }

        apply(new MoveAction('player', {
            x: tile.position.x + byX,
            y: tile.position.y + byY,
        }));
    };

    return (
        <DetailsPanel
            header='Тестовые действия'
            classNames={{ body: styles.body }}
        >
            <div className={styles.moveControls}>
                <div />
                <button onClick={() => move(0, -1)}>↑</button>
                <div />

                <button onClick={() => move(-1, 0)}>←</button>
                <div />
                <button onClick={() => move(1, 0)}>→</button>

                <div />
                <button onClick={() => move(0, 1)}>↓</button>
                <div />
            </div>
        </DetailsPanel>
    );
};
