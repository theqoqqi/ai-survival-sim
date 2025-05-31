import React from 'react';
import Entity from '../core/Entity';
import styles from './EntityDetailsPanel.module.css';
import InventoryItem from '../core/InventoryItem';
import { DetailsPanel } from './DetailsPanel';
import Inventory from '../core/Inventory';

const Header: React.FC<{ entity: Entity }> = ({ entity }) => (
    <>
        <span className={styles.icon}>{entity.icon}</span>
        <div className={styles.entityNames}>
            <span className={styles.title}>{entity.title}</span>
            <div className={styles.id}>ID: {entity.id}</div>
        </div>
    </>
);

const EmptyMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.empty}>{message}</div>
);

const InventoryView: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
    const items = inventory.getItems();

    return (
        <div className={styles.inventory}>
            <div className={styles.inventoryTitle}>Инвентарь</div>
            {items.length > 0 && <InventoryItemList items={items} />}
            {items.length === 0 && <EmptyMessage message="Инвентарь пуст" />}
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
    if (!entity) {
        return (
            <section className={styles.container}>
                <EmptyMessage message="Выберите сущность" />
            </section>
        );
    }

    return (
        <DetailsPanel
            header={<Header entity={entity} />}
            emptyMessage="Выберите сущность"
            classNames={{ header: styles.header, body: styles.body }}
        >
            <InventoryView inventory={entity.inventory} />
        </DetailsPanel>
    );
};
