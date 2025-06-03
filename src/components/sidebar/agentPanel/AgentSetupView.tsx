import { Agent } from '../../../agent/Agent';
import React from 'react';
import { PersistentField } from '../../util/PersistentField';
import styles from './AgentSetupView.module.css';
import ChatGptAgentDriver from '../../../agent/drivers/ChatGptAgentDriver';

interface AgentSetupViewProps {
    onAgentCreated: (agent: Agent) => void;
}

export const AgentSetupView: React.FC<AgentSetupViewProps> = ({ onAgentCreated }) => {
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
            const driverOptions = {
                apiKey,
                apiBaseUrl: baseUrl,
                modelName,
            };

            const a = new Agent(new ChatGptAgentDriver(driverOptions));

            setStatus('Агент готов');
            onAgentCreated(a);
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
                storageKey='agent_baseUrl'
                defaultValue=''
                onValueChange={setBaseUrl}
            />
            <PersistentField
                type='password'
                label='API Key'
                storageKey='agent_apiKey'
                defaultValue=''
                onValueChange={setApiKey}
            />
            <PersistentField
                type='text'
                label='Model Name'
                storageKey='agent_modelName'
                defaultValue='gpt-4o-mini'
                onValueChange={setModelName}
            />
            <button onClick={initializeAgent}>
                Инициализировать агента
            </button>
            <div>Статус: {status}</div>
        </div>
    );
};