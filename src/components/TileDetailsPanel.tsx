import React from 'react';
import Tile, { TileContent, TileTerrain } from '../core/Tile';
import TileView from './world/TileView';
import styles from './TileDetailsPanel.module.css';
import Entity from '../core/Entity';
import { DetailsPanel } from './DetailsPanel';

const TerrainInfo: React.FC<{ terrain: TileTerrain }> = ({ terrain }) => (
    <div className={styles.terrainLine}>
        Местность: <span style={{ backgroundColor: terrain.color }}>{terrain.title}</span>
    </div>
);

const ContentInfo: React.FC<{ content: TileContent | null }> = ({ content }) => {
    if (!content) {
        return (
            <div className={styles.emptyContent}>
                Пусто
            </div>
        );
    }

    return (
        <>
            <div className={styles.field}>Объект: <span>{content.icon} {content.title}</span></div>
            <div className={styles.field}>{content.description}</div>
        </>
    );
};

const EntityList: React.FC<{ entities: Entity[] }> = ({ entities }) => {
    if (entities.length === 0) {
        return null;
    }

    return (
        <div className={styles.entityList}>
            Сущности:
            {entities.map((ent) => (
                <div key={ent.id} className={styles.entityListItem}>
                    <span className={styles.entityIcon}>{ent.icon}</span>
                    <span className={styles.entityTitle}>{ent.title}</span>
                </div>
            ))}
        </div>
    );
};

interface TileDetailsPanelProps {
    tile: Tile | null;
}

export const TileDetailsPanel: React.FC<TileDetailsPanelProps> = ({ tile }) => {
    if (!tile) {
        return (
            <DetailsPanel emptyMessage='Выберите тайл' />
        );
    }

    const {
        position: { x, y },
        data: { terrain, content },
        entities,
    } = tile;

    return (
        <DetailsPanel
            header={`X: ${x}, Y: ${y}`}
            classNames={{ body: styles.body }}
        >
            <div className={styles.tileWrapper}>
                <TileView tile={tile} />
            </div>

            <div className={styles.info}>
                <TerrainInfo terrain={terrain} />
                <ContentInfo content={content} />
                <EntityList entities={entities} />
            </div>
        </DetailsPanel>
    );
};