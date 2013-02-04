PONG.Keys = function(){
    var that = this;
    this.keys = {};

    this.init = function(){
        $(window).keydown(function(event){
            that.keys[event.keyCode] = true;
            return false;
        });
        $(window).keyup(function(event){
            that.keys[event.keyCode] = false;
            return false;
        });
    };
};
