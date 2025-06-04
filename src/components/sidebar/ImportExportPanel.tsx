import React from 'react';
import WorldMap from '../../core/WorldMap';
import { DetailsPanel } from './DetailsPanel';
import styles from './ImportExportPanel.module.css';
import { SaveLoadSection } from './SaveLoadSection';
import { ImportExportSection } from './ImportExportSection';

interface ImportExportPanelProps {
    worldMap: WorldMap;
    onImport: (importedMap: WorldMap) => void;
    autoImport?: boolean;
}

export const ImportExportPanel: React.FC<ImportExportPanelProps> = ({
    worldMap,
    onImport,
    autoImport,
}) => {
    const [message, setMessage] = React.useState<string | null>(null);

    return (
        <DetailsPanel
            header='Импорт / Экспорт карты'
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
        </DetailsPanel>
    );
};
