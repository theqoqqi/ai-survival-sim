import React from 'react';
import styles from './MainScreen.module.css';
import { TileDetailsPanel } from '../TileDetailsPanel';
import Tile from '../../core/Tile';
import { WorldMapView } from '../world/WorldMapView';
import WorldMap from '../../core/WorldMap';
import { createTestWorld } from '../../presets/testWorld';

export default function MainScreen() {
    const [selectedTile, setSelectedTile] = React.useState<Tile | null>(null);
    const [worldMap, setWorldMap] = React.useState<WorldMap | null>(null);

    React.useEffect(() => {
        setWorldMap(createTestWorld());
    }, []);

    if (!worldMap) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.mainScreen}>
            <div className={styles.worldMapContainer}>
                <WorldMapView
                    worldMap={worldMap}
                    onClickTile={setSelectedTile}
                />
            </div>
            <div className={styles.sidebar}>
                <TileDetailsPanel tile={selectedTile}/>
            </div>
        </div>
    );
}
