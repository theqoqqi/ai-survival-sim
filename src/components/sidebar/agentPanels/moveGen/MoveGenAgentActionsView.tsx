import { MoveGenAgent } from '../../../../agent/MoveGenAgent';
import { AgentMove } from '../../../../agent/AgentMove';
import WorldMap from '../../../../core/WorldMap';
import Entity from '../../../../core/Entity';
import React from 'react';
import styles from './MoveGenAgentActionsView.module.css';
import { PersistentField } from '../../../util/PersistentField';
import { useComponentTranslation } from '../../../../i18n';

interface MoveGenAgentActionsViewProps {
    agent: MoveGenAgent;
    worldMap: WorldMap;
    playerEntity: Entity;
    onApplyMove: (move: AgentMove) => void;
}

export const MoveGenAgentActionsView: React.FC<MoveGenAgentActionsViewProps> = ({
    agent,
    worldMap,
    playerEntity,
    onApplyMove,
}) => {
    const { t } = useComponentTranslation(MoveGenAgentActionsView);
    const [status, setStatus] = React.useState<string>(t('readyForMoveRequest'));
    const [globalTarget, setGlobalTarget] = React.useState<string>('');

    React.useEffect(() => {
        agent.globalTarget = globalTarget;
    }, [agent, globalTarget]);

    const performAction = async () => {
        setStatus(t('generatingMove'));

        try {
            const response = await agent.generateMove(worldMap, playerEntity);

            if (!response.move) {
                setStatus(response.error ?? t('failedToGenerateMove'));
                return;
            }

            onApplyMove(response.move);
            setStatus(t('moveGeneratedSuccessfully'));
        } catch (e) {
            setStatus(t('moveGenerationError'));
            console.error(e);
        }
    };

    return (
        <div className={styles.agentActionsView}>
            <PersistentField
                type='textarea'
                label={t('globalTarget')}
                storageKey='agent_globalTarget'
                value={globalTarget}
                onChange={setGlobalTarget}
            />
            <div>
                {t('status')}: {status}
            </div>
            <button onClick={performAction}>
                {t('nextMove')}
            </button>
        </div>
    );
};
