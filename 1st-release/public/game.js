export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function start() {
        const frequency = 2000

        setInterval(addFruit, frequency)
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width - 1)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height - 1)
        const playerW = 'playerW' in command ? command.playerW : 1
        const playerH = 'playerH' in command ? command.playerH : 1

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            w: playerW,
            h: playerH
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            playerW: playerW,
            playerH: playerH
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width - 1)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height - 1)
        const fruitW = command ? command.fruitW : 1
        const fruitH = command ? command.fruitH : 1

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
            w: fruitW,
            h: fruitH
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY,
            fruitW: fruitW,
            fruitH: fruitH
        })
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId
        })
    }
    
    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0)
            },
            ArrowRight(player) {
                player.x = Math.min(player.x + 1, state.screen.width - 1)
            },
            ArrowDown(player) {
                player.y = Math.min(player.y + 1, state.screen.height - 1)
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
        setState,
        subscribe,
        start,
        state
    }
}