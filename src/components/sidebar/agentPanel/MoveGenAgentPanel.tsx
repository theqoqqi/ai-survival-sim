import React from 'react';
import WorldMap from '../../../core/WorldMap';
import Entity from '../../../core/Entity';
import { MoveGenAgent } from '../../../agent/MoveGenAgent';
import { AgentMove } from '../../../agent/AgentMove';
import { DetailsPanel } from '../DetailsPanel';
import styles from './MoveGenAgentPanel.module.css';
import { MoveGenAgentActionsView } from './MoveGenAgentActionsView';
import { AgentSetupView } from './AgentSetupView';
import { AgentDriverOptions } from '../../../agent/drivers/AgentDriver';
import ChatGptAgentDriver from '../../../agent/drivers/ChatGptAgentDriver';

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
        <DetailsPanel header='AI-агент' classNames={{ body: styles.body }}>
            {!agent ? (
                <AgentSetupView onCreateAgent={onCreateAgent} />
            ) : (
                <MoveGenAgentActionsView
                    agent={agent}
                    worldMap={worldMap}
                    playerEntity={playerEntity}
                    onApplyMove={onApplyMove}
                />
            )}
        </DetailsPanel>
    );
};
