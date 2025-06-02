import React from 'react';
import styles from './ActionList.module.css';
import Action from '../../../core/actions/Action';
import { ActionItem } from './ActionItem';

interface ActionListProps {
    actions: Action<any>[];
}

export const ActionList: React.FC<ActionListProps> = ({ actions }) => (
    <div className={styles.actionList}>
        {actions.map((action, aIdx) => (
            <ActionItem key={aIdx} action={action} />
        ))}
    </div>
);

