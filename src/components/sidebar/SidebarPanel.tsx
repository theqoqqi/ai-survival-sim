import React, { Children } from 'react';
import styles from './SidebarPanel.module.css';
import { useComponentTranslation } from '../../i18n';

interface SidebarPanelProps {
    header?: React.ReactNode;
    classNames?: {
        header?: string;
        body?: string;
    };
    refs?: {
        header?: React.RefObject<HTMLDivElement | null>;
        body?: React.RefObject<HTMLDivElement | null>;
    };
    emptyMessage?: string;
    collapsedByDefault?: boolean;
    children?: React.ReactNode;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
    header,
    classNames,
    refs,
    emptyMessage,
    collapsedByDefault,
    children,
}) => {
    const { t } = useComponentTranslation(SidebarPanel);
    const [collapsed, setCollapsed] = React.useState(collapsedByDefault);

    if (!Children.count(children)) {
        return (
            <section className={styles.container}>
                <div className={styles.empty}>{emptyMessage || t('empty')}</div>
            </section>
        );
    }

    return (
        <section className={styles.container + ' ' + (collapsed ? styles.collapsed : '')}>
            <div className={styles.headerWrapper}>
                <header
                    ref={refs?.header}
                    className={`${styles.header} ${classNames?.header ?? ''}`}
                >
                    {header}
                </header>
                <button
                    onClick={() => setCollapsed(prev => !prev)}
                    className={styles.toggleButton}
                >
                    {collapsed ? '▼' : '▲'}
                </button>
            </div>
            <div
                ref={refs?.body}
                className={`${styles.body} ${classNames?.body ?? ''} ${collapsed ? styles.collapsed : ''}`}
            >
                {children}
            </div>
        </section>
    );
};
