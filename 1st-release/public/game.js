export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 9,
            height: 9
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY
        const playerW = command.playerW
        const playerH = command.playerH

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            w: playerW,
            h: playerH
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY
        const fruitW = command.fruitW
        const fruitH = command.fruitH

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
            w: fruitW,
            h: fruitH
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }
    
    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0)
            },
            ArrowRight(player) {
                player.x = Math.min(player.x + 1, state.screen.width)
            },
            ArrowDown(player) {
                player.y = Math.min(player.y + 1, state.screen.height)
            },
            ArrowLeft(player) {
                player.x = Math.max(player.x - 1, 0)
            }
        }

        const player = state.players[command.playerId]
        const playerId = command.playerId
        const keyPressed = command.keyPressed
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitColision(playerId)
        }
    }

    function checkForFruitColision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
            }
        }
    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}