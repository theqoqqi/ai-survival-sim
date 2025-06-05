import JumpAction from './JumpAction';
import MoveAction from './MoveAction';
import { AddInventoryItemAction } from './AddInventoryItemAction';
import { AddItemToStackAction } from './AddItemToStackAction';
import { RemoveInventoryItemAction } from './RemoveInventoryItemAction';
import { SetTileFeatureAction } from './SetTileFeatureAction';
import Action from './Action';
import { AddEntityVarAction } from './AddEntityVarAction';
import { RemoveEntityVarAction } from './RemoveEntityVarAction';
import { SetEntityVarValueAction } from './SetEntityVarValueAction';

const factories: Record<string, (json: any) => Action<any>> = {
    'jump': JumpAction.fromJson,
    'move': MoveAction.fromJson,
    'addItem': AddInventoryItemAction.fromJson,
    'addItemToStack': AddItemToStackAction.fromJson,
    'removeItem': RemoveInventoryItemAction.fromJson,
    'setTileFeature': SetTileFeatureAction.fromJson,
    'addEntityVar': AddEntityVarAction.fromJson,
    'removeEntityVar': RemoveEntityVarAction.fromJson,
    'setEntityVarValue': SetEntityVarValueAction.fromJson,
};

export default function createActionFromJson(json: any): Action<any> | null {
    const actionType = json.type as string;
    const factory = factories[actionType];

    if (!factory) {
        return null;
    }

    return factory(json);
}
