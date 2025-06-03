import { WorldGenAgent } from '../../../agent/WorldGenAgent';
import WorldMap from '../../../core/WorldMap';
import React from 'react';
import styles from './WorldGenAgentActionsView.module.css';
import { PersistentField } from '../../util/PersistentField';

interface WorldGenAgentActionsViewProps {
    agent: WorldGenAgent;
    onGenerateWorld: (world: WorldMap) => void;
}

export const WorldGenAgentActionsView: React.FC<WorldGenAgentActionsViewProps> = ({
    agent,
    onGenerateWorld,
}) => {
    const [status, setStatus] = React.useState<string>('Готов к генерации');
    const [prompt, setPrompt] = React.useState<string>('');
    const [width, setWidth] = React.useState<number>(10);
    const [height, setHeight] = React.useState<number>(10);

    const performGeneration = async () => {
        setStatus('Генерация мира...');

        try {
            const response = await agent.generateWorld({
                width,
                height,
                prompt,
            });

            if (!response.world) {
                setStatus(response.error ?? 'Не удалось сгенерировать карту');
                return;
            }

            onGenerateWorld(response.world);
            setStatus('Карта успешно сгенерирована');
        } catch (e) {
            setStatus('Ошибка генерации карты');
            console.error(e);
        }
    };

    return (
        <div className={styles.agentActionsView}>
            <PersistentField
                type='textarea'
                label='Описание мира'
                storageKey='agent_worldGen_prompt'
                value={prompt}
                onChange={setPrompt}
            />
            <PersistentField
                type='number'
                label='Ширина'
                storageKey='agent_worldGen_width'
                value={width}
                onChange={value => setWidth(Number(value))}
            />
            <PersistentField
                type='number'
                label='Высота'
                storageKey='agent_worldGen_height'
                value={height}
                onChange={value => setHeight(Number(value))}
            />
            <div>
                Статус: {status}
            </div>
            <button onClick={performGeneration}>Сгенерировать мир</button>
        </div>
    );
};
