import React from 'react';
import WorldMap from '../../../core/WorldMap';
import { SidebarPanel } from '../SidebarPanel';
import styles from './SaveLoadPanel.module.css';
import { SaveLoadSection } from './SaveLoadSection';
import { ImportExportSection } from './ImportExportSection';

interface SaveLoadPanelProps {
    worldMap: WorldMap;
    onImport: (importedMap: WorldMap) => void;
    autoImport?: boolean;
}

export const SaveLoadPanel: React.FC<SaveLoadPanelProps> = ({
    worldMap,
    onImport,
    autoImport,
}) => {
    const [message, setMessage] = React.useState<string | null>(null);

    return (
        <SidebarPanel
            header='Сохранение и загрузка карты'
            classNames={{ body: styles.body }}
            collapsedByDefault
        >
            <ImportExportSection
                worldMap={worldMap}
                onImport={onImport}
                onUpdateStatus={setMessage}
                autoImport={autoImport}
            />

            <div className={styles.separator} />

            <SaveLoadSection
                worldMap={worldMap}
                onImport={onImport}
                onUpdateStatus={setMessage}
            />

            {message && <div className={styles.message}>{message}</div>}
        </SidebarPanel>
    );
};
