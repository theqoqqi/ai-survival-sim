import React from 'react';
import styles from './ActionItem.module.css';
import Action from '../../../core/actions/Action';

interface ActionItemProps {
    action: Action<any>;
}

export const ActionItem: React.FC<ActionItemProps> = ({ action }) => (
    <div className={styles.actionItem}>
        <span className={styles.actionType}>{action.type}</span>
        <pre className={styles.actionJson}>
            {JSON.stringify(action.toJson(), null, 2)}
        </pre>
    </div>
);
