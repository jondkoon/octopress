(function(){

    window.onload = draw;

    function draw(){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var height = canvas.height;
        var width = canvas.width;
        var cell_size = 3;
        var red_color = "rgb(255,0,0)";
        var white_color = "rgb(255,255,255)";
        var cur_color = red_color;
        var tiles = [];
        var tile_arr = [];
        var tile_count = 0;

        for(var i = 0; i*cell_size < width; i++){
            tile_arr[i] = [];
            for(var j = 0; j*cell_size < height; j++){
                var tile = new Tile(i,j, false,i*cell_size,j*cell_size,cell_size,cell_size);
                tiles.push(tile);
                tile_arr[i].push(tile);
            }
        }

        for(var i = 0; i < tiles.length; i++){
            tiles[i].draw();
        }

        function Tile(i,j, alive, x, y, width, height){

            this.id = tile_count++;

            var new_alive = false;

            this.alive = function(a){
                if(a !== undefined){
                    alive = a;
                }
                return alive;
            }

            this.tick = function(){
                var nCount = this.neighbors();
                new_alive = alive;
                if(nCount <= 1){
                    new_alive = false;
                } else if(nCount >= 4){
                    new_alive = false;
                } else if(nCount === 3){
                    new_alive = true;
                }
            }

            this.step = function(){
                alive = new_alive;
            }

            this.neighbors = function(){
                var nCount = 0;
                for(var z = -1; z <= 1; z++){
                    for (var x = -1; x <= 1; x++){
                        if(z === 0 && x === 0){
                            continue;
                        }
                        nCount += neighbor_alive(i+z,j+x) ? 1:0;
                    }
                }
                return nCount;

                function neighbor_alive(i,j){
                    var tile;
                    try {
                        tile = tile_arr[i][j];
                    } catch(error){
                    }
                    if(tile !== undefined){
                        return tile.alive();
                    } else {
                        return false;
                    }
                }
            }

            this.toggle = function(){
                alive = !alive;
            }

            this.clicked = function(){
                this.toggle();
                this.draw();
            }

            this.draw = function(){
                var color = alive ? red_color : white_color;
                ctx.fillStyle = color;
                ctx.fillRect(x,y,width,height);
            }

            this.hit = function(point){
                return (point.x >= x && point.x <= (x+width) && point.y >= y && point.y <= (y+height));
            }
        }



        var changed_tiles = [];
        function catchClick(event){
            if(!mouse_down){
                return;
            }
            var x = event.offsetX;
            var y = event.offsetY;
            for(var i = 0; i < tiles.length; i++){
                var tile = tiles[i];
                //if we hit this tile and it has not already been changed
                if(tile.hit({x:x,y:y}) && !changed_tiles[tile.id]){
                    changed_tiles[tile.id] = true;
                    tile.clicked();
                    break;
                }
            }
        }

        canvas.onmousemove = catchClick;

        var mouse_down = false;
        canvas.onmousedown = function(event){
            mouse_down = true;
            catchClick(event);
        };

        canvas.onmouseup = function(){
            mouse_down = false;
            //clear changed tiles on mouse up
            changed_tiles = [];
        };


        function step(){
            for(var i = 0; i < tiles.length; i++){
                var tile = tiles[i];
                tile.tick();
            }
            for(var i = 0; i < tiles.length; i++){
                var tile = tiles[i];
                tile.step();
                tile.draw();
            }
        }

        var start_btn = document.getElementById('start_btn');
        var stop_btn = document.getElementById('stop_btn');
        var step_btn = document.getElementById('step_btn');
        var clear_btn = document.getElementById('clear_btn');

        var timer_id = 0;

        step_btn.onclick = function(){
            step();
        }

        start_btn.onclick = function(){
            console.log('click');
            timer_id = setInterval(step, 1000/15);                      
        }

        stop_btn.onclick = function(){
            clearInterval(timer_id);
        }
        
        clear_btn.onclick = function(){
            for(var i = 0; i < tiles.length; i++){
                tiles[i].alive(false);
                tiles[i].draw();
            }
        }
    }

})()
