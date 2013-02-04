PONG.Board = function(canvas){

    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;

    this.draw = function(ctx){
        ctx.fillStyle = "#666";
        ctx.fillRect(0,0,this.width,this.height);
    };

};
