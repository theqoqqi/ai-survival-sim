import WorldMap from '../../../core/WorldMap';
import React from 'react';
import styles from './SaveLoadSection.module.css';

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
            setStatus('Введите имя для сохранения мира.');
            return;
        }

        const json = JSON.stringify(worldMap.toJson());
        const stored = localStorage.getItem('savedWorlds');
        const all: SavedWorlds = stored ? JSON.parse(stored) : {};

        all[saveName] = json;

        localStorage.setItem('savedWorlds', JSON.stringify(all));
        setStatus(`Мир сохранён как "${saveName}".`);

        setSaveName('');
        loadSavedNames();
    };

    const handleLoad = () => {
        if (!selectedName) {
            setStatus('Выберите сохранённый мир.');
            return;
        }

        const stored = localStorage.getItem('savedWorlds');

        if (!stored) {
            setStatus('Сохранённые миры не найдены.');
            return;
        }

        try {
            const all: SavedWorlds = JSON.parse(stored);
            const json = all[selectedName];

            if (!json) {
                setStatus(`Мир "${selectedName}" не найден.`);
                return;
            }

            const parsed = JSON.parse(json);
            const importedMap = WorldMap.fromJson(parsed);

            onImport(importedMap);
            setStatus(`Мир "${selectedName}" успешно загружен.`);
        } catch (e) {
            console.error('Ошибка загрузки мира:', e);
            setStatus('❌ Ошибка при загрузке сохранённого мира.');
        }
    };

    const handleDelete = () => {
        if (!selectedName) {
            setStatus('Выберите мир для удаления.');
            return;
        }

        const stored = localStorage.getItem('savedWorlds');

        if (!stored) {
            setStatus('Сохранённые миры не найдены.');
            return;
        }

        try {
            const all: SavedWorlds = JSON.parse(stored);

            if (!(selectedName in all)) {
                setStatus(`Мир "${selectedName}" не найден.`);
                return;
            }

            if (!window.confirm(`Вы уверены, что хотите удалить мир "${selectedName}"?`)) {
                return;
            }

            delete all[selectedName];

            localStorage.setItem('savedWorlds', JSON.stringify(all));
            setStatus(`Мир "${selectedName}" удалён.`);

            setSelectedName('');
            loadSavedNames();
        } catch (e) {
            console.error('Ошибка удаления мира:', e);
            setStatus('❌ Ошибка при удалении сохранённого мира.');
        }
    };

    return (
        <div className={styles.saveLoadSection}>
            <div>Сохраненные карты</div>
            <div className={styles.saveLoadGrid}>
                <input
                    type='text'
                    placeholder='Имя мира'
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className={styles.saveInput}
                />
                <button onClick={handleSave}>Сохранить карту</button>

                <select
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    className={styles.loadSelect}
                >
                    <option value=''>— Выберите мир —</option>
                    {savedNames.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <div className={styles.savedMapControls}>
                    <button onClick={handleLoad}>Загрузить</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};