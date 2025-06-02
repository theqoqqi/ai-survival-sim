import React from 'react';
import WorldMap from '../../core/WorldMap';
import Action from '../../core/actions/Action';
import JumpAction from '../../core/actions/JumpAction';
import styles from './TestActionsPanel.module.css';
import { DetailsPanel } from './DetailsPanel';
import InventoryItem from '../../core/InventoryItem';
import { AddInventoryItemAction } from '../../core/actions/AddInventoryItemAction';
import { RemoveInventoryItemAction } from '../../core/actions/RemoveInventoryItemAction';
import { AddItemToStackAction } from '../../core/actions/AddItemToStackAction';
import { SetTileFeatureAction } from '../../core/actions/SetTileFeatureAction';
import { AgentMove } from '../../agent/AgentMove';

interface TestActionsPanelProps {
    worldMap: WorldMap;
    onApplyMove: (action: AgentMove) => void;
}

export const TestActionsPanel: React.FC<TestActionsPanelProps> = ({
    worldMap,
    onApplyMove,
}) => {
    const apply = (action: Action<any>) => {
        onApplyMove({
            actions: [action],
            thought: '',
            narrativeEvents: [],
        });
    };

    const move = (byX: number, byY: number) => {
        const tile = worldMap.findEntityTile('player');

        if (!tile) {
            return;
        }

        apply(new JumpAction('player', {
            x: tile.position.x + byX,
            y: tile.position.y + byY,
        }));
    };

    const addItem = () => {
        const item: InventoryItem = {
            id: 'apple',
            icon: '🍎',
            title: 'Яблоко',
            description: 'Сочное красное яблоко',
            amount: 1,
        };

        apply(new AddInventoryItemAction('player', item));
    };

    const addItemToStack = () => {
        apply(new AddItemToStackAction('player', 'apple', 1));
    };

    const removeItem = () => {
        apply(new RemoveInventoryItemAction('player', 'apple', 1));
    };

    const removeAllItems = () => {
        apply(new RemoveInventoryItemAction('player', 'apple'));
    };

    const setTreeFeature = () => {
        apply(new SetTileFeatureAction({ x: 8, y: 1 }, {
            icon: '🌳',
            title: 'Дерево',
            description: 'Большое зеленое дерево',
        }));
    };

    const setMountainFeature = () => {
        apply(new SetTileFeatureAction({ x: 8, y: 1 }, {
            icon: '⛰️',
            title: 'Гора',
            description: 'Большая гора',
        }));
    };

    const clearFeature = () => {
        apply(new SetTileFeatureAction({ x: 8, y: 1 }));
    };

    return (
        <DetailsPanel
            header='Тестовые действия'
            classNames={{ body: styles.body }}
            collapsedByDefault
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

            <button onClick={addItem}>
                Add new stack of 🍎
            </button>
            <button onClick={addItemToStack}>
                Add 🍎 to existing stack
            </button>
            <button onClick={removeItem}>
                Remove one 🍎
            </button>
            <button onClick={removeAllItems}>
                Remove all 🍎
            </button>

            <button onClick={setTreeFeature}>
                Set tile feature 🌳 at (8, 1)
            </button>
            <button onClick={setMountainFeature}>
                Set tile feature ⛰️ at (8, 1)
            </button>
            <button onClick={clearFeature}>
                Clear tile feature at (8, 1)
            </button>
        </DetailsPanel>
    );
};
