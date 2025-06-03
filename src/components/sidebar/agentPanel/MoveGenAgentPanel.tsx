import React from 'react';
import WorldMap from '../../../core/WorldMap';
import Entity from '../../../core/Entity';
import { MoveGenAgent } from '../../../agent/MoveGenAgent';
import { AgentMove } from '../../../agent/AgentMove';
import { MoveGenAgentActionsView } from './MoveGenAgentActionsView';
import { AgentDriverOptions } from '../../../agent/drivers/AgentDriver';
import ChatGptAgentDriver from '../../../agent/drivers/ChatGptAgentDriver';
import { AgentPanel } from './AgentPanel';

interface MoveGenAgentPanelProps {
    worldMap: WorldMap;
    playerEntity: Entity;
    onApplyMove: (move: AgentMove) => void;
}

export const MoveGenAgentPanel: React.FC<MoveGenAgentPanelProps> = ({
    worldMap,
    playerEntity,
    onApplyMove,
}) => {
    const [agent, setAgent] = React.useState<MoveGenAgent | null>(null);
    const onCreateAgent = (options: AgentDriverOptions) => {
        setAgent(new MoveGenAgent(new ChatGptAgentDriver(options)));
    };

    return (
        <AgentPanel
            header='AI-агент'
            storageKeyPrefix='agents_moveGen'
            agent={agent}
            onCreateAgent={onCreateAgent}
        >
            {agent && (
                <MoveGenAgentActionsView
                    agent={agent}
                    worldMap={worldMap}
                    playerEntity={playerEntity}
                    onApplyMove={onApplyMove}
                />
            )}
        </AgentPanel>
    );
};
