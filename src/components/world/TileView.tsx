import React from 'react';
import Tile, { TileContent } from '../../core/Tile';
import styles from './TileView.module.css';

interface TileViewProps {
    tile: Tile
    onClick?: (tile: Tile) => void,
}

function getTooltipText(terrainTitle: string, content: TileContent | null) {
    const lines = [
        terrainTitle,
        content && `${content.icon} ${content.title}`,
        content?.description,
    ];

    return lines.filter(Boolean).join('\n');
}

const TileView: React.FC<TileViewProps> = ({ tile, onClick }) => {
    const { icon } = tile.data.content ?? { icon: ' ' };
    const { color, title: terrainTitle } = tile.data.terrain;
    const content = tile.data.content;

    const tooltip = getTooltipText(terrainTitle, content);

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
