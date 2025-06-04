import React from 'react';
import { PersistentField } from '../../util/PersistentField';
import styles from './AgentSetupView.module.css';
import { AgentDriverOptions } from '../../../agent/drivers/AgentDriver';
import { useComponentTranslation } from '../../../i18n';

interface AgentSetupViewProps {
    storageKeyPrefix: string;
    onCreateAgent: (options: AgentDriverOptions) => void;
}

export const AgentSetupView: React.FC<AgentSetupViewProps> = ({ storageKeyPrefix, onCreateAgent }) => {
    const { t } = useComponentTranslation(AgentSetupView);
    const [apiKey, setApiKey] = React.useState<string>('');
    const [baseUrl, setBaseUrl] = React.useState<string>('');
    const [modelName, setModelName] = React.useState<string>('');
    const [gpt4FreeMode, setGpt4FreeMode] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<string>(t('notInitialized'));

    const initializeAgent = () => {
        if (!apiKey || !baseUrl) {
            setStatus(t('specifyApiKeyAndBaseUrl'));
            return;
        }

        try {
            setStatus(t('agentReady'));
            onCreateAgent({
                apiKey,
                apiBaseUrl: baseUrl,
                modelName,
                gpt4FreeMode,
            });
        } catch (e) {
            setStatus(t('error') + ': ' + (e as Error)?.message);
            console.error(e);
        }
    };

    return (
        <div className={styles.agentSetupView}>
            <PersistentField
                type='text'
                label={t('baseUrl')}
                storageKey={`${storageKeyPrefix}_baseUrl`}
                value={baseUrl}
                onChange={setBaseUrl}
            />
            <PersistentField
                type='password'
                label={t('apiKey')}
                storageKey={`${storageKeyPrefix}_apiKey`}
                value={apiKey}
                onChange={setApiKey}
            />
            <PersistentField
                type='text'
                label={t('modelName')}
                storageKey={`${storageKeyPrefix}_modelName`}
                value={modelName}
                onChange={setModelName}
            />
            <PersistentField
                type='checkbox'
                label={t('gpt4FreeMode')}
                storageKey={`${storageKeyPrefix}_gpt4FreeMode`}
                value={gpt4FreeMode}
                onChange={value => setGpt4FreeMode(value === 'true')}
            />
            <button onClick={initializeAgent}>
                {t('initializeAgent')}
            </button>
            <div>{t('status')}: {status}</div>
        </div>
    );
};
