import WorldMap from '../../core/WorldMap';
import React from 'react';
import TileView from './TileView';
import styles from './WorldMapView.module.css';
import Tile from '../../core/Tile';

interface WorldMapViewProps {
    worldMap: WorldMap;
    onClickTile: (tile: Tile) => void,
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({ worldMap, onClickTile }) => {

    const gridStyle: React.CSSProperties = {
        '--width': worldMap.width,
        '--height': worldMap.height,
    } as React.CSSProperties;

    return (
        <div className={styles.worldMapView} style={gridStyle}>
            {worldMap.grid.toArray().flat().map(tile => (
                <TileView
                    key={`${tile.position.x}-${tile.position.y}`}
                    tile={tile}
                    onClick={onClickTile}
                />
            ))}
        </div>
    );
};
