import React from 'react';
import WorldMap from '../../../../core/WorldMap';
import { WorldGenAgent } from '../../../../agent/WorldGenAgent';
import { WorldGenAgentActionsView } from './WorldGenAgentActionsView';
import { AgentDriverOptions } from '../../../../agent/drivers/AgentDriver';
import ChatGptAgentDriver from '../../../../agent/drivers/ChatGptAgentDriver';
import { AgentPanel } from '../AgentPanel';
import { useComponentTranslation } from '../../../../i18n';

interface WorldGenAgentPanelProps {
    onGenerateWorld: (world: WorldMap) => void;
}

export const WorldGenAgentPanel: React.FC<WorldGenAgentPanelProps> = ({ onGenerateWorld }) => {
    const { t } = useComponentTranslation('WorldGenAgentPanel');
    const [agent, setAgent] = React.useState<WorldGenAgent | null>(null);

    const onCreateAgent = (options: AgentDriverOptions) => {
        setAgent(new WorldGenAgent(new ChatGptAgentDriver({
            ...options,
            useMessageHistory: false,
        })));
    };

    return (
        <AgentPanel
            header={t('title')}
            storageKeyPrefix='agents_worldGen'
            agent={agent}
            onCreateAgent={onCreateAgent}
        >
            {agent && (
                <WorldGenAgentActionsView agent={agent} onGenerateWorld={onGenerateWorld} />
            )}
        </AgentPanel>
    );
};
