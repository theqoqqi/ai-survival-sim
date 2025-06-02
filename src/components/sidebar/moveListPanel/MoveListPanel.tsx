import React from 'react';
import styles from './MoveListPanel.module.css';
import { AgentMove } from '../../../agent/AgentMove';
import { DetailsPanel } from '../DetailsPanel';
import { MoveItem } from './MoveItem';

interface MoveListPanelProps {
    moves: AgentMove[];
}

export const MoveListPanel: React.FC<MoveListPanelProps> = ({ moves }) => {
    const bodyRef = React.useRef<HTMLDivElement>(null);
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = -bodyRef.current.scrollHeight;
        }
    }, [moves]);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <DetailsPanel
            header='Ходы'
            classNames={{ body: styles.body }}
            refs={{ body: bodyRef }}
        >
            {moves.map((move, index) => (
                <MoveItem
                    key={index}
                    number={index + 1}
                    move={move}
                    isExpanded={expandedIndex === index}
                    onToggle={() => toggleExpand(index)}
                />
            ))}
        </DetailsPanel>
    );
};

