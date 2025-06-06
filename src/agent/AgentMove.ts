import { SerializedJumpAction } from '../core/actions/JumpAction';
import { SerializedMoveAction } from '../core/actions/MoveAction';
import { SerializedAddInventoryItemAction } from '../core/actions/AddInventoryItemAction';
import { SerializedAddItemToStackAction } from '../core/actions/AddItemToStackAction';
import { SerializedRemoveInventoryItemAction } from '../core/actions/RemoveInventoryItemAction';
import { SerializedSetTileFeatureAction } from '../core/actions/SetTileFeatureAction';
import Action from '../core/actions/Action';
import createActionFromJson from '../core/actions/createActionFromJson';

export type SerializedAction = SerializedJumpAction
    | SerializedMoveAction
    | SerializedAddInventoryItemAction
    | SerializedAddItemToStackAction
    | SerializedRemoveInventoryItemAction
    | SerializedSetTileFeatureAction;

export interface AgentMove {
    actions: Action<any>[];
    thought: string;
    narrativeEvents: string[];
    debugReason;
}

export interface SerializedAgentMove {
    actions: SerializedAction[];
    thought: string,
    narrativeEvents: string[],
    debugReason;
}

export function parseMove(moveJson: SerializedAgentMove): AgentMove {
    return {
        actions: moveJson.actions.map(createActionFromJson).filter(Boolean).map(action => action!),
        thought: moveJson.thought,
        narrativeEvents: moveJson.narrativeEvents,
        debugReason: moveJson.debugReason,
    };
}
