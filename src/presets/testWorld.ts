import WorldMap from '../core/WorldMap';
import Entity from '../core/Entity';

export function createTestWorld(): WorldMap {
    const worldMap = new WorldMap({
        width: 10,
        height: 10,
        emptyTileData: {
            terrain: {
                title: 'Равнина',
                color: '#fafffa',
            },
            feature: null,
        },
    });

    for (let y = 0; y < 10; y++) {
        worldMap.setTileData(6, y, {
            terrain: {
                title: 'Река',
                color: '#fafbff',
            },
            feature: null,
        });
    }

    worldMap.getTile(6, 3).data.feature = {
        title: 'Мост',
        icon: '🌉',
        description: 'Старый дряхлый мост, проходящий через реку',
    };

    const trees = [
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 8, y: 6 },
        { x: 9, y: 7 },
        { x: 9, y: 8 },
    ];

    for (let tree of trees) {
        worldMap.setTileData(tree.x, tree.y, {
            terrain: {
                title: 'Равнина',
                color: '#fafffa',
            },
            feature: {
                title: 'Дерево',
                icon: '🌲',
                description: 'Обычное дерево',
            },
        });
    }

    worldMap.addEntity(3, 5, new Entity({
        id: 'player',
        icon: '👤',
        title: 'Игрок',
        inventory: [
            {
                id: 'apple',
                icon: '🍎',
                title: 'Яблоко',
                description: 'Не очень вкусное на вид яблоко',
                amount: 2,
            },
            {
                id: 'bottleWithWater',
                icon: '💧',
                title: 'Бутылка с водой',
                description: 'Полупустая бутылка с питьевой водой',
                amount: 1,
            },
            {
                id: 'axe',
                icon: '🪓',
                title: 'Топор',
                description: 'Старый топор, который вот-вот сломается',
                amount: 1,
            },
        ],
    }));

    return worldMap;
}
