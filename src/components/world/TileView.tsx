import React from 'react';
import Tile, { TileFeature } from '../../core/Tile';
import styles from './TileView.module.css';

interface TileViewProps {
    tile: Tile
    onClick?: (tile: Tile) => void,
}

function getTooltipText(terrainTitle: string, feature: TileFeature | null) {
    const lines = [
        terrainTitle,
        feature && `${feature.icon} ${feature.title}`,
        feature?.description,
    ];

    return lines.filter(Boolean).join('\n');
}

const TileView: React.FC<TileViewProps> = ({ tile, onClick }) => {
    const { icon } = tile.data.feature ?? { icon: ' ' };
    const { color, title: terrainTitle } = tile.data.terrain;
    const tileFeature = tile.data.feature;

    const tooltip = getTooltipText(terrainTitle, tileFeature);

    return (
        <div
            className={styles.tileView}
            style={{ backgroundColor: color }}
            title={tooltip}
            onClick={() => onClick?.(tile)}
        >
            <span>{icon}</span>
            <div className={styles.entities}>
                {tile.entities.map(entity => entity.icon)}
            </div>
        </div>
    );
};

export default TileView;
