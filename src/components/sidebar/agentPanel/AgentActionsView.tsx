import { MoveGenAgent } from '../../../agent/MoveGenAgent';
import { AgentMove } from '../../../agent/AgentMove';
import WorldMap from '../../../core/WorldMap';
import Entity from '../../../core/Entity';
import React from 'react';
import styles from './AgentActionsView.module.css';
import { PersistentField } from '../../util/PersistentField';

interface AgentActionsViewProps {
    agent: MoveGenAgent;
    worldMap: WorldMap;
    playerEntity: Entity;
    onApplyMove: (move: AgentMove) => void;
}

export const AgentActionsView: React.FC<AgentActionsViewProps> = ({
    agent,
    worldMap,
    playerEntity,
    onApplyMove,
}) => {
    const [status, setStatus] = React.useState<string>('Готов к запросу хода');

    const handleTargetChange = (newValue: string) => {
        agent.globalTarget = newValue;
    };

    const performAction = async () => {
        setStatus('Генерация хода...');

        try {
            const response = await agent.generateMove(worldMap, playerEntity);

            if (!response.move) {
                setStatus(response.error ?? 'Не удалось сгенерировать ход');
                return;
            }

            onApplyMove(response.move);
            setStatus('Действие выполнено');
        } catch (e) {
            setStatus('Ошибка во время работы агента');
            console.error(e);
        }
    };

    return (
        <div className={styles.agentActionsView}>
            <PersistentField
                type='textarea'
                label='Глобальная цель'
                storageKey='agent_globalTarget'
                onValueChange={handleTargetChange}
            />
            <div>
                Статус: {status}
            </div>
            <button onClick={performAction}>
                Следующий ход
            </button>
        </div>
    );
};
