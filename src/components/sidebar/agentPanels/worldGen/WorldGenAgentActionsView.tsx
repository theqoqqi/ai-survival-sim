import { WorldGenAgent } from '../../../../agent/WorldGenAgent';
import WorldMap from '../../../../core/WorldMap';
import React from 'react';
import styles from './WorldGenAgentActionsView.module.css';
import { PersistentField } from '../../../util/PersistentField';
import { useComponentTranslation } from '../../../../i18n';

interface WorldGenAgentActionsViewProps {
    agent: WorldGenAgent;
    onGenerateWorld: (world: WorldMap) => void;
}

export const WorldGenAgentActionsView: React.FC<WorldGenAgentActionsViewProps> = ({
    agent,
    onGenerateWorld,
}) => {
    const { t, i18n } = useComponentTranslation('WorldGenAgentActionsView');
    const [status, setStatus] = React.useState<string>(t('readyForGeneration'));
    const [prompt, setPrompt] = React.useState<string>('');
    const [width, setWidth] = React.useState<number>(10);
    const [height, setHeight] = React.useState<number>(10);

    const performGeneration = async () => {
        setStatus(t('generatingWorld'));

        try {
            const systemPromptVariables = i18n.getResourceBundle(i18n.language, 'worldGenPrompt');
            const response = await agent.generateWorld({
                width,
                height,
                prompt,
                systemPromptVariables,
            });

            if (!response.world) {
                setStatus(response.error ?? t('failedToGenerateMap'));
                return;
            }

            onGenerateWorld(response.world);
            setStatus(t('mapGeneratedSuccessfully'));
        } catch (e) {
            setStatus(t('mapGenerationError'));
            console.error(e);
        }
    };

    return (
        <div className={styles.agentActionsView}>
            <PersistentField
                type='textarea'
                label={t('worldDescription')}
                storageKey='agent_worldGen_prompt'
                value={prompt}
                onChange={setPrompt}
            />
            <PersistentField
                type='number'
                label={t('width')}
                storageKey='agent_worldGen_width'
                value={width}
                onChange={value => setWidth(Number(value))}
            />
            <PersistentField
                type='number'
                label={t('height')}
                storageKey='agent_worldGen_height'
                value={height}
                onChange={value => setHeight(Number(value))}
            />
            <div>
                {t('status')}: {status}
            </div>
            <button onClick={performGeneration}>{t('generateWorld')}</button>
        </div>
    );
};
