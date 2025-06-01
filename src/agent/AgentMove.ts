import { SerializedMoveAction } from '../core/actions/MoveAction';
import { SerializedAddInventoryItemAction } from '../core/actions/AddInventoryItemAction';
import { SerializedAddItemToStackAction } from '../core/actions/AddItemToStackAction';
import { SerializedRemoveInventoryItemAction } from '../core/actions/RemoveInventoryItemAction';
import { SerializedSetTileFeatureAction } from '../core/actions/SetTileFeatureAction';
import Action from '../core/actions/Action';
import createActionFromJson from '../core/actions/createActionFromJson';

export type SerializedAction = SerializedMoveAction
    | SerializedAddInventoryItemAction
    | SerializedAddItemToStackAction
    | SerializedRemoveInventoryItemAction
    | SerializedSetTileFeatureAction;

export interface AgentMove {
    actions: Action<any>[];
    thought: string;
}

export interface SerializedAgentMove {
    actions: SerializedAction[];
    thought: string,
}

export function parseMove(responseContent: string): AgentMove {
    const responseJson = JSON.parse(responseContent) as SerializedAgentMove;

    return {
        actions: responseJson.actions.map(createActionFromJson).filter(Boolean).map(action => action!),
        thought: responseJson.thought,
    };
}
