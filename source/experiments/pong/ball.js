PONG.Ball = function(board,paddle_1,paddle_2, player_1, player_2){

    var that = this;
    this.radius = 5;
    var startX = this.x = board.width / 2;
    var startY = this.y = board.height / 2;
    this.color = "#52FF94";
    this.dx = 3;
    this.dy = 3;

    this.move = function(){
        if(this.y >= paddle_1.y && this.y <= paddle_1.y + paddle_1.height && this.x + this.dx - this.radius <= paddle_1.x + paddle_1.width ){
            this.dx *= -1;
        } else if(this.y >= paddle_2.y && this.y <= paddle_2.y + paddle_2.height && this.x + this.dx + this.radius >= paddle_2.x){
            this.dx *= -1;
        }
        if(this.x + this.dx + this.radius > board.width){
            resetBall();
            player_1.addPoints(1);
        } else if(this.x + this.dx - this.radius < 0){
            resetBall();
            player_2.addPoints(1);
        }
        if(this.y + this.dy + this.radius > board.height || this.y + this.dy - this.radius < 0){
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
    };

    this.draw = function(ctx){
        ctx.fillStyle = this.color; 
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
    };

    function resetBall(){
        that.x = startX;
        that.y = startY;
    }

};
