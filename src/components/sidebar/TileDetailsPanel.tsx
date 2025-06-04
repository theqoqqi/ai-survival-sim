import React from 'react';
import Tile, { TileFeature, TileTerrain } from '../../core/Tile';
import TileView from '../world/TileView';
import styles from './TileDetailsPanel.module.css';
import Entity from '../../core/Entity';
import { SidebarPanel } from './SidebarPanel';
import { useComponentTranslation } from '../../i18n';

const TerrainInfo: React.FC<{ terrain: TileTerrain }> = ({ terrain }) => {
    const { t } = useComponentTranslation(TileDetailsPanel);

    return (
        <div className={styles.terrainLine}>
            {t('terrain')}: <span style={{ backgroundColor: terrain.color }}>{terrain.title}</span>
        </div>
    );
};

const FeatureInfo: React.FC<{ feature: TileFeature | null }> = ({ feature }) => {
    const { t } = useComponentTranslation(TileDetailsPanel);

    if (!feature) {
        return (
            <div className={styles.emptyFeature}>
                {t('empty')}
            </div>
        );
    }

    return (
        <>
            <div className={styles.field}>{t('object')}: <span>{feature.icon} {feature.title}</span></div>
            <div className={styles.field}>{feature.description}</div>
        </>
    );
};

interface EntityListProps {
    entities: Entity[];
    onClickEntity?: (entity: Entity) => void;
}

const EntityList: React.FC<EntityListProps> = ({ entities, onClickEntity }) => {
    const { t } = useComponentTranslation(TileDetailsPanel);

    if (entities.length === 0) {
        return null;
    }

    return (
        <div className={styles.entityList}>
            {t('entities')}:
            {entities.map((ent) => (
                <div key={ent.id} className={styles.entityListItem} onClick={() => onClickEntity?.(ent)}>
                    <span className={styles.entityIcon}>{ent.icon}</span>
                    <span className={styles.entityTitle}>{ent.title}</span>
                </div>
            ))}
        </div>
    );
};

interface TileDetailsPanelProps {
    tile: Tile | null;
    onClickEntity?: (entity: Entity) => void;
}

export const TileDetailsPanel: React.FC<TileDetailsPanelProps> = ({ tile, onClickEntity }) => {
    const { t } = useComponentTranslation(TileDetailsPanel);

    if (!tile) {
        return (
            <SidebarPanel emptyMessage={t('selectTile')} />
        );
    }

    const {
        position: { x, y },
        data: { terrain, feature },
        entities,
    } = tile;

    return (
        <SidebarPanel
            header={`${t('coordinates')}: X: ${x}, Y: ${y}`}
            classNames={{ body: styles.body }}
        >
            <div className={styles.tileWrapper}>
                <TileView tile={tile} />
            </div>

            <div className={styles.info}>
                <TerrainInfo terrain={terrain} />
                <FeatureInfo feature={feature} />
                <EntityList entities={entities} onClickEntity={onClickEntity} />
            </div>
        </SidebarPanel>
    );
};
