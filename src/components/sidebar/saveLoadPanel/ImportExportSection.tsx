import React from 'react';
import WorldMap from '../../../core/WorldMap';
import { PersistentField } from '../../util/PersistentField';
import styles from './ImportExportSection.module.css';

interface ImportExportSectionProps {
    worldMap: WorldMap;
    onImport: (importedMap: WorldMap) => void;
    onUpdateStatus: (status: string | null) => void;
    autoImport?: boolean;
}

export const ImportExportSection: React.FC<ImportExportSectionProps> = ({
    worldMap,
    onImport,
    onUpdateStatus,
    autoImport,
}) => {
    const [importJson, setImportJson] = React.useState('');

    const setStatus = React.useCallback((status: string) => {
        onUpdateStatus(status);
    }, [onUpdateStatus]);

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
        setStatus('Карта успешно экспортирована.');
    };

    const handleImport = React.useCallback(() => {
        try {
            const json = JSON.parse(importJson);
            const importedMap = WorldMap.fromJson(json);

            onImport(importedMap);

            setStatus('Карта успешно импортирована.');
        } catch (e) {
            console.error('Ошибка импорта карты:', e);

            setStatus('❌ Ошибка импорта карты: ' + ((e as Error).message));
        }
    }, [importJson, onImport, setStatus]);

    React.useEffect(() => {
        if (autoImport && importJson) {
            handleImport();
        }
    }, [autoImport, handleImport, importJson]);

    return (
        <>
            <PersistentField
                type='textarea'
                label='Вставьте JSON для импорта'
                storageKey='importWorldMap'
                value={importJson}
                onChange={setImportJson}
            />

            <div className={styles.buttonGroup}>
                <button onClick={handleExport}>Показать&nbsp;JSON текущей&nbsp;карты</button>
                <button onClick={handleDownload}>Скачать JSON</button>
                <button onClick={handleImport}>Загрузить&nbsp;карту из&nbsp;этого&nbsp;JSON</button>
            </div>
        </>
    );
};