import React from 'react';
import styles from './MoveItem.module.css';
import { AgentMove } from '../../../agent/AgentMove';
import { ActionList } from './ActionList';
import { useComponentTranslation } from '../../../i18n';

interface MoveItemProps {
    number: number;
    move: AgentMove;
    isExpanded: boolean;
    onToggle: () => void;
}

export const MoveItem: React.FC<MoveItemProps> = ({ number, move, isExpanded, onToggle }) => {
    const { t } = useComponentTranslation(MoveItem);

    return (
        <div className={styles.moveItem}>
            <div
                className={styles.moveHeader}
                onClick={onToggle}
                style={{ cursor: 'pointer', userSelect: 'none' }}
            >
                <strong>{t('moveNumber', { number })}.</strong> {move.thought}
            </div>
            <ul className={styles.narrativeEvents}>
                {move.narrativeEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ul>
            {isExpanded && <ActionList actions={move.actions} />}
        </div>
    );
};
