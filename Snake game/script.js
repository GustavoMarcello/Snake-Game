let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
// set direção inicial
let direction = "right "
// definindo a comida em posições aleatórias
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// criando o fundo
function createBG(){
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function createFood(){
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

// movimentando a snake
function update(event){
    if (event.keyCode == 37 && direction != "right"){
        direction = "left"
    }
    if (event.keyCode == 38 && direction != "down"){
        direction = "up"
    }
    if (event.keyCode == 39 && direction != "left"){
        direction = "right"
    }
    if (event.keyCode == 40 && direction != "up"){
        direction = "down"
    }
}

function startGame(){
    // permite que a snake atravesse as paredes
    if (snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0
    }
    if (snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box
    }
    if (snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0
    }
    if (snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box
    }

    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert('Game Over =(')
        }
    }

    createBG();
    createSnake();
    createFood();   

    // coordenadas iniciais 
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // movimentações da snake
    if (direction == "right") snakeX += box
    if (direction == "left") snakeX -= box
    if (direction == "up") snakeY -= box
    if (direction == "down") snakeY += box

    // faz a snake aumentar de tamanho ao "comer" a fruta
    if(snakeX != food.x || snakeY != food.y){  
    // retira o oltimo elemento da snake
    snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
 
    // adiciona a cabeça a snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
} 

let game = setInterval(startGame, 100)