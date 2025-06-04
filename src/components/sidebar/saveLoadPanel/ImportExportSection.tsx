import React from 'react';
import WorldMap from '../../../core/WorldMap';
import { PersistentField } from '../../util/PersistentField';
import styles from './ImportExportSection.module.css';
import { useComponentTranslation } from '../../../i18n';

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
    const { t } = useComponentTranslation(ImportExportSection);
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
        setStatus(t('mapExportedSuccess'));
    };

    const handleImport = React.useCallback(() => {
        try {
            const json = JSON.parse(importJson);
            const importedMap = WorldMap.fromJson(json);

            onImport(importedMap);

            setStatus(t('mapImportedSuccess'));
        } catch (e) {
            console.error(t('mapImportError') + ':', e);

            setStatus('❌ ' + t('mapImportError') + ': ' + ((e as Error).message));
        }
    }, [importJson, onImport, setStatus, t]);

    React.useEffect(() => {
        if (autoImport && importJson) {
            handleImport();
        }
    }, [autoImport, handleImport, importJson]);

    return (
        <>
            <PersistentField
                type='textarea'
                label={t('pasteJsonForImport')}
                storageKey='importWorldMap'
                value={importJson}
                onChange={setImportJson}
            />

            <div className={styles.buttonGroup}>
                <button onClick={handleExport}>{t('showCurrentMapJson')}</button>
                <button onClick={handleDownload}>{t('downloadJson')}</button>
                <button onClick={handleImport}>{t('loadMapFromJson')}</button>
            </div>
        </>
    );
};
