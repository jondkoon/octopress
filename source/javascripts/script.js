$(function(){

   //$('.portfolio-image').hover(function(){
   //    grayscale.reset(this);
   //}, function(){
   //    grayscale(this);
   //});
   //grayscale($('.portfolio-image'));

   var images = $('.image-crop');
   var pieceInfos = $('.piece-info');
   images.each(function(index){
       var $this = $(this);
       var pieceInfo = pieceInfos.eq(index);
       var img = $this.find("img");
       var closeLink = $this.find(".close-link");
       var nextImg = $this.find(".next-image");
       var prevImg = $this.find(".prev-image");
       var imageCSS = {
           'margin-left': img.css('margin-left'),
           'margin-top': img.css('margin-top')
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

       nextImg.click(function(){
           var curImg = img.filter(":visible");
           var nextImg = curImg.next("img");
           if(nextImg.length != 1){
               nextImg = img.eq(0);
           }
           curImg.hide();
           nextImg.show();
       });

       img.add(closeLink).click(function(){
           var activeCropCSS = {
               top: 0,
               left: 0,
               width: img.width(),
               height: img.height()
           };

           var activeImgCSS = {
               'margin-left': '0px',
               'margin-top': '0px',
           };
           if($this.is('.active-image')){
               $this.animate(originalCSS, 500, function(){
                   $this.removeClass('active-image');
               });
               img.animate(imageCSS, 500);
               pieceInfo.slideUp();
           } else {
               $this.addClass('active-image').animate(activeCropCSS, 500);
               img.animate(activeImgCSS, 500, function(){
               });
               pieceInfo.slideDown();
           }
       });
   });
   //after setting each images calculated top and left property
   //lets set their position to absolute so animation will work well
   images.css({
       position: 'absolute'
   });

   setTimeout(function(){
       //images.eq(0).find(".close-link").trigger('click');
   }, 500);
});
