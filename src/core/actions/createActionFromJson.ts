import JumpAction from './JumpAction';
import { AddInventoryItemAction } from './AddInventoryItemAction';
import { AddItemToStackAction } from './AddItemToStackAction';
import { RemoveInventoryItemAction } from './RemoveInventoryItemAction';
import { SetTileFeatureAction } from './SetTileFeatureAction';
import Action from './Action';

const factories: Record<string, (json: any) => Action<any>> = {
    'jump': JumpAction.fromJson,
    'addItem': AddInventoryItemAction.fromJson,
    'addItemToStack': AddItemToStackAction.fromJson,
    'removeItem': RemoveInventoryItemAction.fromJson,
    'setTileFeature': SetTileFeatureAction.fromJson,
};

export default function createActionFromJson(json: any): Action<any> | null {
    const actionType = json.type as string;
    const factory = factories[actionType];

    if (!factory) {
        return null;
    }

    return factory(json);
}
