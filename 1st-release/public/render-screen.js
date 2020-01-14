export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.clearRect(0, 0, 10, 10)

    for (const playersId in game.state.players) {
        const player = game.state.players[playersId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, player.w, player.h)
    }

    for (const  fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, fruit.w, fruit.h)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if (currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, currentPlayer.w, currentPlayer.h)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}