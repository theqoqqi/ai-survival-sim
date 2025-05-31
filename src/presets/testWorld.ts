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
            content: null,
        },
    });

    for (let y = 0; y < 10; y++) {
        let content = null;

        if (y === 3) {
            content = {
                title: 'Мост',
                icon: '🌉',
                description: 'Старый дряхлый мост, проходящий через реку',
            };
        }

        worldMap.setTileData(6, y, {
            terrain: {
                title: 'Река',
                color: '#fafbff',
            },
            content,
        });
    }

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
            content: {
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
        initialItems: [],
    }));

    return worldMap;
}
