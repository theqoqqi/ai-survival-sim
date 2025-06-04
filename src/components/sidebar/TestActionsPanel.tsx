import React from 'react';
import WorldMap from '../../core/WorldMap';
import Action from '../../core/actions/Action';
import JumpAction from '../../core/actions/JumpAction';
import styles from './TestActionsPanel.module.css';
import { SidebarPanel } from './SidebarPanel';
import InventoryItem from '../../core/InventoryItem';
import { AddInventoryItemAction } from '../../core/actions/AddInventoryItemAction';
import { RemoveInventoryItemAction } from '../../core/actions/RemoveInventoryItemAction';
import { AddItemToStackAction } from '../../core/actions/AddItemToStackAction';
import { SetTileFeatureAction } from '../../core/actions/SetTileFeatureAction';
import { AgentMove } from '../../agent/AgentMove';
import { useComponentTranslation } from '../../i18n';

interface TestActionsPanelProps {
    worldMap: WorldMap;
    onApplyMove: (action: AgentMove) => void;
}

export const TestActionsPanel: React.FC<TestActionsPanelProps> = ({
    worldMap,
    onApplyMove,
}) => {
    const { t } = useComponentTranslation(TestActionsPanel);

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
            title: t('apple'),
            description: t('juicyRedApple'),
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
            title: t('tree'),
            description: t('largeGreenTree'),
        }));
    };

    const setMountainFeature = () => {
        apply(new SetTileFeatureAction({ x: 8, y: 1 }, {
            icon: '⛰️',
            title: t('mountain'),
            description: t('largeMountain'),
        }));
    };

    const clearFeature = () => {
        apply(new SetTileFeatureAction({ x: 8, y: 1 }));
    };

    return (
        <SidebarPanel
            header={t('testActions')}
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
                {t('addNewStackOfApple')}
            </button>
            <button onClick={addItemToStack}>
                {t('addAppleToExistingStack')}
            </button>
            <button onClick={removeItem}>
                {t('removeOneApple')}
            </button>
            <button onClick={removeAllItems}>
                {t('removeAllApples')}
            </button>

            <button onClick={setTreeFeature}>
                {t('setTreeFeature')} 🌳 {t('atCoordinates', { x: 8, y: 1 })}
            </button>
            <button onClick={setMountainFeature}>
                {t('setMountainFeature')} ⛰️ {t('atCoordinates', { x: 8, y: 1 })}
            </button>
            <button onClick={clearFeature}>
                {t('clearTileFeature')} {t('atCoordinates', { x: 8, y: 1 })}
            </button>
        </SidebarPanel>
    );
};
