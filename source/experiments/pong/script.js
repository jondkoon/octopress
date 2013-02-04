$(function(){
    var canvas = document.getElementById('board');
    var ctx = PONG.ctx = canvas.getContext('2d');
    var board = new PONG.Board(canvas);
    var paddle_1 = new PONG.Paddle(1,board);
    var paddle_2 = new PONG.Paddle(2,board);

    var keys = new PONG.Keys();
    keys.init();

    var player_1 = new PONG.Player(1,board, paddle_1,keys.keys);
    var player_2 = new PONG.Player(2,board, paddle_2,keys.keys);
    var ball = new PONG.Ball(board,paddle_1,paddle_2, player_1, player_2);

    function draw(){
        player_1.move();
        player_2.move();
        ball.move();
        board.draw(ctx);
        ball.draw(ctx);
        paddle_1.draw(ctx);
        paddle_2.draw(ctx);
    }

    setInterval(draw,16);

});
