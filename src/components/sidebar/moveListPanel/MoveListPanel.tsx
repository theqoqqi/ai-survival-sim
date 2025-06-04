import React from 'react';
import styles from './MoveListPanel.module.css';
import { AgentMove } from '../../../agent/AgentMove';
import { SidebarPanel } from '../SidebarPanel';
import { MoveItem } from './MoveItem';
import { useComponentTranslation } from '../../../i18n';

interface MoveListPanelProps {
    moves: AgentMove[];
}

export const MoveListPanel: React.FC<MoveListPanelProps> = ({ moves }) => {
    const { t } = useComponentTranslation('MoveListPanel');
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        const body = bodyRef.current;

        if (body) {
            body.scrollTop = -body.scrollHeight;
        }
    }, [moves]);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <SidebarPanel
            header={t('moves')}
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
        </SidebarPanel>
    );
};
