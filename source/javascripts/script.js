$(function(){

    useJquery();

   function useJquery(){
       var images = $('.image-crop');
       images.each(function(){
           var $this = $(this);
           var img = $this.find("img");
           var imageCSS = {
               height: img.height(),
               width: img.width(),
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

           var activeCropCSS = {
               top: 0,
               left: 0,
               width: imageCSS.width,
               height: imageCSS.height,
           };

           var activeImgCSS = {
               'margin-left': '0px',
               'margin-top': '0px',
           };

           $this.click(function(){
               if($this.is('.active-image')){
                   $this.animate(originalCSS, 500, function(){
                       $this.removeClass('active-image');
                   });
                   img.animate(imageCSS, 500);
               } else {
                   $this.addClass('active-image').animate(activeCropCSS, 500);
                   img.animate(activeImgCSS, 500);
               }
           });
       });
        images.css({
            position: 'absolute'
        });
   }

   function useCSS(){
        $(".image-crop").click(function(){
            var $this = $(this);
            $this.toggleClass('active-image')
       }).each(function(){
           var $this = $(this);
           var position = $this.position();
           $this.css({
               top: position.top,
               left: position.left,
           });
       }).css({
           position: "absolute"
       });
   }

});
