$(function(){

	//Check for canvas support
	if (!document.createElement('canvas').getContext) return;

	//Remove the fallback image and create the canvas =D
    header = $("header")
    header.find(".background").replaceWith("<canvas width='" + header.innerWidth() + "' height='" + header.innerHeight() + "'></canvas>");
	canvas = header.find("canvas")[0];
	 //Keep it the size of the screen
	 $(window).resize(function(){
         w = header.innerWidth();
         h = header.innerHeight();
         header.find("canvas").width(w).height(h);
	 })

	var image, vertices=[];
	function doDelaunay(x, y){
		//Add to the list
		vertices.push({x: x, y: y});
		
		//Calculate delaunay
		var d = new Delaunay(canvas.width, canvas.height, vertices);
  		var triangles = d.split();
  		
  		//Get the drawing canvas
		ctx = canvas.getContext('2d');
		//Clear
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//Draw the background image
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		//Get the pixels we've just drawn
		region = ctx.getImageData(0, 0, canvas.width, canvas.height);

  		//Calculate average color and draw
  		var tri, box;
  		for(var i=0,n=triangles.length; i<n; i++){
  			tri = triangles[i];

  			//For this triangle, calculate the bounding box (performance)
  			box={x1:9999,y1:9999,x2:0,y2:0};
  			for (var j=0; j<3; j++) {
  				if(box.x1 > tri[j].x) box.x1 = tri[j].x;
  				if(box.y1 > tri[j].y) box.y1 = tri[j].y;
  				if(box.x2 < tri[j].x) box.x2 = tri[j].x;
  				if(box.y2 < tri[j].y) box.y2 = tri[j].y;
  			};
        //Now that we have the bounding box, its time to loop through
  			//it and calculate the average color
  			box.w = box.x2-box.x1;
  			box.h = box.y2-box.y1;
  			initialOffset = (box.y1 * region.width + box.x1);
  			var r=0,g=0,b=0, color;
  			for(var h=0; h < box.h; h++){
  				for (var w = 0; w < box.w; w++) {
  				// 	color = region.data[w*region.height+h];
  				// 	r += (color & 0xff0000) >> 16;
						// g += (color & 0x00ff00) >> 8;
						// b += color & 0x0000ff;
						r += region.data[(initialOffset+(h*region.width+w))*4];
						g += region.data[(initialOffset+(h*region.width+w))*4+1];
						b += region.data[(initialOffset+(h*region.width+w))*4+2];
  				};
  			}
  			r /= box.w*box.h;
  			g /= box.w*box.h;
  			b /= box.w*box.h;
  			
  			//Draw the triangle
  			ctx.fillStyle = "rgba("+parseInt(r)+","+parseInt(g)+","+parseInt(b)+",0.8)";
  			ctx.beginPath();
    		ctx.moveTo(tri[0].x, tri[0].y);
			ctx.lineTo(tri[1].x, tri[1].y);
			ctx.lineTo(tri[2].x, tri[2].y);
			ctx.fill();
		}
	}
  function initializeDelaunay(){
		$(canvas).click(function(e){
      off = $(this).offset();
      doDelaunay(parseInt(e.pageX - off.left), parseInt(e.pageY - off.top));
		});
		
		// Generate the first triangles (animation)
		setInterval(function(){
			if (vertices.length > 20) return

      centerX = canvas.width/2;
      centerY = canvas.height/2;

			var w = canvas.width*0.6;
			var h = canvas.height*0.6;
			doDelaunay(parseInt(centerX + (Math.random()*w - w/2)), parseInt(centerY + (Math.random()*h - h/2)));
		}, 350);
	}

	//Load background image
    idx = Math.floor(Math.random()*5)+1;
    bgColors = {
        1: "#0F0009",
        2: "#0F0700",
        3: "#140007",
        4: "#0F0700",
        5: "#020E00",
    };
	(image = $("<img>").attr("src", "images/bg" + idx +".jpg")).load(function(){
		initializeDelaunay();
        $("html").css({background: bgColors[idx]});
	})
	image = image[0]

  //
  // Phospr animation for Giraboorger
  //

  player_giraboorguer = new PhosphorPlayer('anim_target_giraboorguer');
  phosphorCallback_giraboorguer = function(data) {

    /**
     * Instantiate the player.  The player supports a variate of callbacks for deeper integration into your site.
     */

     giraboorguer_framecount = data.frames.length;
     player_giraboorguer.load_animation({
      imageArray:["giraboorguer_atlas000.jpg"],
      imagePath: "/images/work/",
      animationData: data,
      loop: true,
      onLoad: function() {
        player_giraboorguer.play();

        /**
         * If your Phosphor composition was created with the "interactive" mode set, the code below enables that
         * interation.  Handlers are registered for both mouse drag and touch events.
         */

         var trappedMouse = false;
         var trappedXPos;

         var enableInteractivity = false;

         if(enableInteractivity) {
          $("#anim_target_giraboorguer").mousedown(function(e){
            e.preventDefault();
            player_giraboorguer.stop();
            trappedMouse = true;
            trappedXPos = e.pageX;
            $(document).bind('mousemove',function(event) {
              if(trappedMouse){
                var pos =  (event.pageX - trappedXPos) / 5;
                var seekTime = (giraboorguer_framecount + player_giraboorguer.currentFrameNumber() + parseInt(pos)) % giraboorguer_framecount;
                player_giraboorguer.setCurrentFrameNumber(seekTime);
                trappedXPos = event.pageX;
              }

            });

          });

          $(document).mouseup(function(e){
            trappedMouse = false;
            $(document).unbind('mousemove');
          });

        

          $("#anim_target_giraboorguer").bind("touchstart",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           player_giraboorguer.stop();
           trappedMouse = true;
           trappedXPos = e.pageX;
           $(document).bind('touchmove', function(e) {
            if(trappedMouse){
              var e = e.originalEvent;
              e.preventDefault();
              var pos =  (e.pageX - trappedXPos) / 5;
              var seekTime = (giraboorguer_framecount + player_giraboorguer.currentFrameNumber() + parseInt(pos)) % giraboorguer_framecount;
              player_giraboorguer.setCurrentFrameNumber(seekTime);
              trappedXPos = e.pageX;
            }
           });
         });

          $("#anim_target_giraboorguer").bind("touchend",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           trappedMouse = false;
           player_giraboorguer.play(true);
           $(document).unbind('touchmove');
         });

        }

      }
    });
   }
   var jsonpScript = document.createElement("script");
   jsonpScript.type = "text/javascript";
   jsonpScript.id = "jsonPinclude_giraboorguer";
   jsonpScript.src = "javascripts/giraboorguer_animationData.jsonp";
   document.getElementsByTagName("head")[0].appendChild(jsonpScript);

  //
  // Work carousel
  //
  $('.work').scrollable({circular: true, touch: false, onSeek:carouselSeek }).autoscroll({interval: 10000}).navigator('.workNavi');

  // Plays/pauses the phospr on the first index
  function carouselSeek(event){
    if(event.target.getIndex() != 0) {
      player_giraboorguer.stop()
    } else {
      player_giraboorguer.play()
    }
  }


})
