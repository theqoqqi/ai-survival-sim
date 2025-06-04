import WorldMap from '../../../core/WorldMap';
import React from 'react';
import styles from './SaveLoadSection.module.css';
import { useComponentTranslation } from '../../../i18n';

interface SavedWorlds {
    [name: string]: string;
}

interface SaveLoadSectionProps {
    worldMap: WorldMap;
    onImport: (importedMap: WorldMap) => void;
    onUpdateStatus: (status: string | null) => void;
}

export const SaveLoadSection: React.FC<SaveLoadSectionProps> = ({
    worldMap,
    onImport,
    onUpdateStatus,
}) => {
    const { t } = useComponentTranslation('SaveLoadSection');
    const [saveName, setSaveName] = React.useState('');
    const [savedNames, setSavedNames] = React.useState<string[]>([]);
    const [selectedName, setSelectedName] = React.useState<string>('');

    const setStatus = (status: string) => {
        onUpdateStatus(status);
    };

    const loadSavedNames = () => {
        const stored = localStorage.getItem('savedWorlds');

        try {
            const parsed: SavedWorlds = JSON.parse(stored ?? '{}');

            setSavedNames(Object.keys(parsed));
        } catch {
            setSavedNames([]);
        }
    };

    React.useEffect(() => {
        loadSavedNames();
    }, []);

    const handleSave = () => {
        if (!saveName.trim()) {
            setStatus(t('enterNameForSaving'));
            return;
        }

        const json = JSON.stringify(worldMap.toJson());
        const stored = localStorage.getItem('savedWorlds');
        const all: SavedWorlds = stored ? JSON.parse(stored) : {};

        all[saveName] = json;

        localStorage.setItem('savedWorlds', JSON.stringify(all));
        setStatus(t('worldSavedAs', { saveName }));

        setSaveName('');
        loadSavedNames();
    };

    const handleLoad = () => {
        if (!selectedName) {
            setStatus(t('selectSavedWorld'));
            return;
        }

        const stored = localStorage.getItem('savedWorlds');

        if (!stored) {
            setStatus(t('savedWorldsNotFound'));
            return;
        }

        try {
            const all: SavedWorlds = JSON.parse(stored);
            const json = all[selectedName];

            if (!json) {
                setStatus(t('worldNotFound', { selectedName }));
                return;
            }

            const parsed = JSON.parse(json);
            const importedMap = WorldMap.fromJson(parsed);

            onImport(importedMap);
            setStatus(t('worldLoadedSuccessfully', { selectedName }));
        } catch (e) {
            console.error(t('worldLoadError'), e);
            setStatus('❌ ' + t('worldLoadError'));
        }
    };

    const handleDelete = () => {
        if (!selectedName) {
            setStatus(t('selectWorldToDelete'));
            return;
        }

        const stored = localStorage.getItem('savedWorlds');

        if (!stored) {
            setStatus(t('savedWorldsNotFound'));
            return;
        }

        try {
            const all: SavedWorlds = JSON.parse(stored);

            if (!(selectedName in all)) {
                setStatus(t('worldNotFound', { selectedName }));
                return;
            }

            if (!window.confirm(t('confirmDeleteWorld', { selectedName }))) {
                return;
            }

            delete all[selectedName];

            localStorage.setItem('savedWorlds', JSON.stringify(all));
            setStatus(t('worldDeleted', { selectedName }));

            setSelectedName('');
            loadSavedNames();
        } catch (e) {
            console.error(t('worldDeleteError'), e);
            setStatus('❌ ' + t('worldDeleteError'));
        }
    };

    return (
        <div className={styles.saveLoadSection}>
            <div>{t('savedMaps')}</div>
            <div className={styles.saveLoadGrid}>
                <input
                    type='text'
                    placeholder={t('worldName')}
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className={styles.saveInput}
                />
                <button onClick={handleSave}>{t('saveMap')}</button>

                <select
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    className={styles.loadSelect}
                >
                    <option value=''>— {t('selectWorld')} —</option>
                    {savedNames.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <div className={styles.savedMapControls}>
                    <button onClick={handleLoad}>{t('load')}</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};
