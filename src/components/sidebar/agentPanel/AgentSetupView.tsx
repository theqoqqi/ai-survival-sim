import { Agent } from '../../../agent/Agent';
import React from 'react';
import { AgentConfigInput } from './AgentConfigInput';
import styles from './AgentSetupView.module.css';

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
            const a = new Agent({
                apiKey,
                apiBaseUrl: baseUrl,
                modelName,
            });

            setStatus('Агент готов');
            onAgentCreated(a);
        } catch (e) {
            setStatus('Ошибка: ' + (e as Error)?.message);
            console.error(e);
        }
    };

    return (
        <div className={styles.agentSetupView}>
            <AgentConfigInput
                type='text'
                label='Base URL'
                storageKey='agent_baseUrl'
                defaultValue=''
                onValueChange={setBaseUrl}
            />
            <AgentConfigInput
                type='password'
                label='API Key'
                storageKey='agent_apiKey'
                defaultValue=''
                onValueChange={setApiKey}
            />
            <AgentConfigInput
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