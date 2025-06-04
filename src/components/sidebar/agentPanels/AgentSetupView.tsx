import React from 'react';
import { PersistentField } from '../../util/PersistentField';
import styles from './AgentSetupView.module.css';
import { AgentDriverOptions } from '../../../agent/drivers/AgentDriver';

interface AgentSetupViewProps {
    storageKeyPrefix: string;
    onCreateAgent: (options: AgentDriverOptions) => void;
}

export const AgentSetupView: React.FC<AgentSetupViewProps> = ({ storageKeyPrefix, onCreateAgent }) => {
    const [apiKey, setApiKey] = React.useState<string>('');
    const [baseUrl, setBaseUrl] = React.useState<string>('');
    const [modelName, setModelName] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('Не инициализирован');

    const initializeAgent = () => {
        if (!apiKey || !baseUrl) {
            setStatus('Укажите API Key и Base URL');
            return;
        }

        try {
            setStatus('Агент готов');
            onCreateAgent({
                apiKey,
                apiBaseUrl: baseUrl,
                modelName,
            });
        } catch (e) {
            setStatus('Ошибка: ' + (e as Error)?.message);
            console.error(e);
        }
    };

    return (
        <div className={styles.agentSetupView}>
            <PersistentField
                type='text'
                label='Base URL'
                storageKey={`${storageKeyPrefix}_baseUrl`}
                value={baseUrl}
                onChange={setBaseUrl}
            />
            <PersistentField
                type='password'
                label='API Key'
                storageKey={`${storageKeyPrefix}_apiKey`}
                value={apiKey}
                onChange={setApiKey}
            />
            <PersistentField
                type='text'
                label='Model Name'
                storageKey={`${storageKeyPrefix}_modelName`}
                value={modelName}
                onChange={setModelName}
            />
            <button onClick={initializeAgent}>
                Инициализировать агента
            </button>
            <div>Статус: {status}</div>
        </div>
    );
};