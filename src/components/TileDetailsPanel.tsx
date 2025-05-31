import React from 'react';
import Tile, { TileContent, TileTerrain } from '../core/Tile';
import TileView from './world/TileView';
import styles from './TileDetailsPanel.module.css';
import Entity from '../core/Entity';

interface TileDetailsPanelProps {
    tile: Tile | null;
}

const Header: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <header className={styles.header}>{`X: ${x}, Y: ${y}`}</header>
);

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

export const TileDetailsPanel: React.FC<TileDetailsPanelProps> = ({ tile }) => {
    if (!tile) {
        return (
            <section className={styles.container}>
                <div className={styles.empty}>Выберите тайл</div>
            </section>
        );
    }

    const {
        position: { x, y },
        data: { terrain, content },
        entities,
    } = tile;

    return (
        <section className={styles.container}>
            <Header x={x} y={y} />

            <div className={styles.main}>
                <div className={styles.tileWrapper}>
                    <TileView tile={tile} />
                </div>

                <div className={styles.info}>
                    <TerrainInfo terrain={terrain} />
                    <ContentInfo content={content} />
                    <EntityList entities={entities} />
                </div>
            </div>
        </section>
    );
};