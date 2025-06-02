import React from 'react';
import WorldMap from '../../../core/WorldMap';
import Entity from '../../../core/Entity';
import { Agent } from '../../../agent/Agent';
import { AgentMove } from '../../../agent/AgentMove';
import { DetailsPanel } from '../DetailsPanel';
import styles from './AgentPanel.module.css';
import { AgentActionsView } from './AgentActionsView';
import { AgentSetupView } from './AgentSetupView';

interface AgentPanelProps {
    worldMap: WorldMap;
    playerEntity: Entity;
    onApplyMove: (move: AgentMove) => void;
}

export const AgentPanel: React.FC<AgentPanelProps> = ({
    worldMap,
    playerEntity,
    onApplyMove,
}) => {
    const [agent, setAgent] = React.useState<Agent | null>(null);

    return (
        <DetailsPanel header='AI-агент' classNames={{ body: styles.body }}>
            {!agent ? (
                <AgentSetupView onAgentCreated={setAgent} />
            ) : (
                <AgentActionsView
                    agent={agent}
                    worldMap={worldMap}
                    playerEntity={playerEntity}
                    onApplyMove={onApplyMove}
                />
            )}
        </DetailsPanel>
    );
};
