PONG.Paddle = function(player, board){

    this.height = 70;
    this.width = 15;
    var sidePadding = 20;

    this.player = player;
    this.y = (board.height - this.height) / 2;
    if(player === 1){
        this.x = sidePadding;
    }else {
        this.x = board.width - sidePadding - this.width;
    }

    this.draw = function(ctx){
        ctx.fillStyle = "#EEE";
        ctx.fillRect(this.x,this.y,this.width, this.height);
    };

};
