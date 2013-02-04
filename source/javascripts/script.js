$(function(){

    //var tweetBubble = $('.tweet-bubble');
    //tweetBubble.hover(function(e){
    //    e.stopPropagation();
    //}, hideTweetBubble);

    //var tweetBubbleHitArea = $('.tweet-bubble-hit-area')
    //tweetBubbleHitArea.hover(function(e){
    //    tweetBubble.css({
    //        display: 'block',
    //        opacity: 1
    //    });
    //}, hideTweetBubble);

    //function hideTweetBubble(e){
    //    var currentElement = $(e.relatedTarget);
    //    //if exited to the hit area or the tweetBubble the don't do anything
    //    if(currentElement.is(tweetBubble) || currentElement.is(tweetBubbleHitArea)){
    //        return;
    //    }
    //    //otherwise lets hide it
    //    tweetBubble.css({
    //        display: 'none',
    //        opacity: 0
    //    });
    //}

    var imageCrops = $('.image-crop');
    var pieceInfos = $('.piece-info');
    imageCrops.each(function(index){
        var $this = $(this);
        var pieceInfo = pieceInfos.eq(index);
        var images = $this.find("img");
        var closeLink = $this.find(".close-link");
        var nextImg = $this.find(".next-image");
        var prevImg = $this.find(".prev-image");
        var imageCSS = {
            'margin-left': images.css('margin-left'),
            'margin-top': images.css('margin-top')
        };
        var position = $this.position();
        var originalCSS = {
            top: position.top,
            left: position.left,
            width: $this.width(),
            height: $this.height(),
            'z-index': 0
        };
        //set position explicitly so animation works properly
        $this.css(originalCSS);

        images.each(function(index){
            var curImage = $(this);
            var nextImage = images.eq(index+1);
            if(nextImage.length === 0) nextImage = images.eq(0);
            var prevImage = images.eq(index-1);
            if(prevImage.length === 0) prevImage = images.eq(images.length -1);
            curImage.data('next', nextImage);
            curImage.data('prev', prevImage);
        });

        nextImg.add(prevImg).click(function(){
            var next = "next";
            if(this === prevImg.get(0)) next = "prev";
            var curImg = images.filter(":visible");
            var nextImg = curImg.data(next);
            curImg.hide();
            nextImg.show();
        });

        images.add(closeLink).click(function(){
            var activeCropCSS = {
                top: 0,
                left: 0,
                width: images.width(),
                height: images.height()
            };

            var activeImgCSS = {
                'margin-left': '0px',
                'margin-top': '0px'
            };
            if($this.is('.active-image')){
                $this.animate(originalCSS, 500, function(){
                    $this.removeClass('active-image');
                });
                images.animate(imageCSS, 500);
                pieceInfo.slideUp();
            } else {
                $this.addClass('active-image').animate(activeCropCSS, 500);
                images.animate(activeImgCSS, 500, function(){
                });
                pieceInfo.slideDown();
            }
        });
        images.hover(function(){
            closeLink.toggleClass('close-hover');
        }, function(){
            closeLink.toggleClass('close-hover');
        });
    });
    //after setting each imageCrops calculated top and left property
    //lets set their position to absolute so animation will work well
    imageCrops.css({
        position: 'absolute'
    });
});
