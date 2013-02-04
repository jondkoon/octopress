PONG.Player = function(player, board, paddle, keys){

    this.score = 0;

    var up, down;
    if(player === 1){
        up = 65; //a key
        down = 90; //z key
    } else {
        up = 38; //up key
        down = 40; //down key
    }

    var speed = 5;

    this.addPoints = function(points){
        this.score += points;
    };

    this.move = function(){
        if(keys[up]){
            if(paddle.y - speed <= speed){
                paddle.y = 0
            } else {
                paddle.y -= speed;
            }
        }
        if(keys[down]){
            if(paddle.y + paddle.height + speed >= board.height){
                paddle.y = board.height - paddle.height;
            } else {
                paddle.y += speed;
            }
        }
    };

};
