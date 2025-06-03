import React from 'react';
import WorldMap from '../../core/WorldMap';
import { DetailsPanel } from './DetailsPanel';
import { PersistentField } from '../util/PersistentField';
import styles from './ImportExportPanel.module.css';

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
    const [importJson, setImportJson] = React.useState('');
    const [message, setMessage] = React.useState<string | null>(null);

    const handleExport = () => {
        setImportJson(JSON.stringify(worldMap.toJson(), null, 2));
    };

    const handleDownload = () => {
        const json = JSON.stringify(worldMap.toJson(), null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'worldMap.json';
        a.click();

        URL.revokeObjectURL(url);
        setMessage('Карта успешно экспортирована.');
    };

    const handleImport = React.useCallback(() => {
        try {
            const json = JSON.parse(importJson);
            const importedMap = WorldMap.fromJson(json);

            onImport(importedMap);

            setMessage('Карта успешно импортирована.');
        } catch (e) {
            console.error('Ошибка импорта карты:', e);

            setMessage('❌ Ошибка импорта карты: ' + ((e as Error).message));
        }
    }, [importJson, onImport]);

    React.useEffect(() => {
        if (autoImport && importJson) {
            handleImport();
        }
    }, [autoImport, handleImport, importJson]);

    return (
        <DetailsPanel
            header="Импорт / Экспорт карты"
            classNames={{ body: styles.body }}
            collapsedByDefault
        >
            <PersistentField
                type="textarea"
                label="Вставьте JSON для импорта"
                storageKey="importWorldMap"
                value={importJson}
                onChange={setImportJson}
            />

            <div className={styles.buttonGroup}>
                <button onClick={handleExport}>Экспортировать</button>
                <button onClick={handleDownload}>Скачать карту</button>
                <button onClick={handleImport}>Импортировать</button>
            </div>

            {message && <div className={styles.message}>{message}</div>}
        </DetailsPanel>
    );
};
