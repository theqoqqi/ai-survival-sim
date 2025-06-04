import React from 'react';
import Entity from '../../core/Entity';
import styles from './EntityDetailsPanel.module.css';
import InventoryItem from '../../core/InventoryItem';
import { SidebarPanel } from './SidebarPanel';
import Inventory from '../../core/Inventory';
import { useComponentTranslation } from '../../i18n';

const Header: React.FC<{ entity: Entity }> = ({ entity }) => {
    const { t } = useComponentTranslation(EntityDetailsPanel);

    return (
        <>
            <span className={styles.icon}>{entity.icon}</span>
            <div className={styles.entityNames}>
                <span className={styles.title}>{entity.title}</span>
                <div className={styles.id}>{t('id')}: {entity.id}</div>
            </div>
        </>
    );
};

const EmptyMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.empty}>{message}</div>
);

const InventoryView: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
    const { t } = useComponentTranslation(EntityDetailsPanel);
    const items = inventory.getItems();

    return (
        <div className={styles.inventory}>
            <div className={styles.inventoryTitle}>{t('inventory')}</div>
            {items.length > 0 && <InventoryItemList items={items} />}
            {items.length === 0 && <EmptyMessage message={t('emptyInventory')} />}
        </div>
    );
};

const InventoryItemList: React.FC<{ items: InventoryItem[] }> = ({ items }) => (
    <div className={styles.inventoryList}>
        {items.map((item) => (
            <InventoryItemView key={item.id} item={item} />
        ))}
    </div>
);

const InventoryItemView: React.FC<{ item: InventoryItem }> = ({ item }) => (
    <div className={styles.inventoryItem}>
        <span className={styles.itemIcon}>{item.icon}</span>
        <div className={styles.itemInfo}>
            <span className={styles.itemTitle}>{item.title}</span>
            <span className={styles.itemId}>ID: {item.id}</span>
            <span className={styles.itemDescription}>{item.description}</span>
        </div>
        <span className={styles.itemAmount}>×{item.amount}</span>
    </div>
);

interface EntityDetailsPanelProps {
    entity: Entity | null;
}

export const EntityDetailsPanel: React.FC<EntityDetailsPanelProps> = ({ entity }) => {
    const { t } = useComponentTranslation(EntityDetailsPanel);

    if (!entity) {
        return (
            <section className={styles.container}>
                <EmptyMessage message={t('selectEntity')} />
            </section>
        );
    }

    return (
        <SidebarPanel
            header={<Header entity={entity} />}
            emptyMessage={t('selectEntity')}
            classNames={{ header: styles.header, body: styles.body }}
        >
            <InventoryView inventory={entity.inventory} />
        </SidebarPanel>
    );
};
