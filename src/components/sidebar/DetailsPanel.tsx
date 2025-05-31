import React, { Children } from 'react';
import styles from './DetailsPanel.module.css';

interface DetailsPanelProps {
    header?: React.ReactNode;
    classNames?: {
        header?: string;
        body?: string;
    };
    emptyMessage?: string;
    children?: React.ReactNode;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
    header,
    classNames,
    emptyMessage = 'Ничего не выбрано',
    children,
}) => {
    if (!Children.count(children)) {
        return (
            <section className={styles.container}>
                <div className={styles.empty}>{emptyMessage}</div>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <header className={styles.header + ' ' + (classNames?.header ?? '')}>{header}</header>
            <div className={styles.body + ' ' + (classNames?.body ?? '')}>
                {children}
            </div>
        </section>
    );
};
