import React from 'react';
import styles from './MoveItem.module.css';
import { AgentMove } from '../../../agent/AgentMove';
import { ActionList } from './ActionList';

interface MoveItemProps {
    number: number;
    move: AgentMove;
    isExpanded: boolean;
    onToggle: () => void;
}

export const MoveItem: React.FC<MoveItemProps> = ({ number, move, isExpanded, onToggle }) => (
    <div className={styles.moveItem}>
        <div
            className={styles.moveHeader}
            onClick={onToggle}
            style={{ cursor: 'pointer', userSelect: 'none' }}
        >
            <strong>Ход {number}.</strong> {move.thought}
        </div>
        {isExpanded && <ActionList actions={move.actions} />}
    </div>
);
