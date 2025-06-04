
import React from 'react';
import { SidebarPanel } from '../SidebarPanel';
import styles from './AgentPanel.module.css';
import { AgentSetupView } from './AgentSetupView';
import Agent from '../../../agent/Agent';
import { AgentDriverOptions } from '../../../agent/drivers/AgentDriver';

interface AgentPanelProps {
    header: React.ReactNode;
    storageKeyPrefix: string;
    agent: Agent | null;
    onCreateAgent: (options: AgentDriverOptions) => void;
    children: React.ReactNode | React.ReactNode[];
}

export const AgentPanel: React.FC<AgentPanelProps> = ({
    header,
    storageKeyPrefix,
    agent,
    onCreateAgent,
    children,
}) => {
    return (
        <SidebarPanel header={header} classNames={{ body: styles.body }}>
            {!agent && <AgentSetupView storageKeyPrefix={storageKeyPrefix} onCreateAgent={onCreateAgent} />}
            {children}
        </SidebarPanel>
    );
};
