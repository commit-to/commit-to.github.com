(function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());function PhosphorPlayer(a){var d=this;this.bindId=a;this.frameworkVersion=1;var e=function(n){var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o=0;var s=0;var i=[];var k=function(B){if(!B){return}var E,C,A,I,G,F,D,z=0,y=0,H=(B.length/4)*3;for(z=0;z<H;z+=3){I=q.indexOf(B.charAt(y++));G=q.indexOf(B.charAt(y++));F=q.indexOf(B.charAt(y++));D=q.indexOf(B.charAt(y++));E=(I<<2)|(G>>4);C=((G&15)<<4)|(F>>2);A=((F&3)<<6)|D;i.push(E);i.push(C);i.push(A)}};var u=function(){while(s<0){o--;s+=8}while(s>7){o++;s-=8}};var p=function(){var y=m(8);return y};var j=function(A){var y=0,z;for(z=0;z<A;z++){y=(y<<8)+p()}return y};var m=function(B){var y=0;if(B>8){y+=m(8)<<(B-8);B-=8}if((s+B)>8){var A=8-s;y+=m(A)<<(B-A);B-=A}var z=8-B-s;var D=255>>(8-B);D=D<<z;var C=i[o]&D;y+=(C>>z);s+=B;u();return y};var l=function(y){o+=y};var x=function(y){s+=y;u()};var t=function(){return(o>=i.length)};var r=function(){return o};var w=function(z,y){o=z;s=y;u()};var v=function(){return i.length};k(n);return{readByte:p,readBytes:j,readBits:m,skipBytes:l,skipBits:x,eof:t,bytePos:r,jumpToOffsetByteBits:w,byteLength:v}};this._debug=false;this._canvas=null;this._imgArray=[];this._animationId=-1;this._currentFrameNumber=0;this._frameCount=0;this._loop=false;this._jsonData=null;this._atlasImagetheresLoaded=false;this._onLoadHandler="";this._currentFrameCallback=null;this._playbackFinishedCallback=null;var c=function(k){var i=d._canvas.getContext("2d");var l="Phosphor Framework Version Mismatch!";var j=i.measureText(l);i.fillStyle="red";i.fillRect(d._canvas.width/2-j.width/2-5,d._canvas.height/2-20,j.width+25,30);i.fillStyle="white";i.font="normal 12px Letter Faces";i.fillText(l,d._canvas.width/2-j.width/2,d._canvas.height/2);console.log(l+" Confirm that your phosphor framework is the same or newer than the composition.  Composition version: "+k+", framework version: "+d.frameworkVersion)};var h=function(C,I,J){J=(typeof J==="undefined")?false:J;var D=d._canvas.getContext("2d");var l=false;var F=e(C);if(F){while((F.byteLength()-F.bytePos())>10){F.skipBytes(1);var H=F.readByte();var s=F.readBits(5);var q=F.readBits(3);var m=F.readBytes(2);var j=F.readBits(4);var k=F.readBits(4);var y=F.readBits(4);var L=F.readBits(4);var B=F.readBits(4);var G=F.readBits(4);var K=F.readBits(4);F.skipBits(52);if(q===0&&!l){l=true;var p=d._jsonData.framesize.width;var n=d._jsonData.framesize.height;D.clearRect(0,0,p,n)}var o=F.bytePos();for(var E=0;E<m;E++){var A=F.readBits(j)*s;var z=F.readBits(j)*s;var w=1*s;var t=1*s;if(L>0){w=(F.readBits(L)+1)*s}if(B>0){t=(F.readBits(B)+1)*s}var x=F.readBits(k)*s;var v=F.readBits(y)*s;var u=w;var r=t;if(G>0){u=(F.readBits(G)+1)*s}if(K>0){r=(F.readBits(K)+1)*s}if(q==1&&I){D.clearRect(x,v,u,r)}D.drawImage(d._imgArray[H],A,z,w,t,x,v,u,r);if(J){D.lineWidth="1";D.strokeStyle="red";D.strokeRect(x+1,v+1,u-2,r-2)}}}}};var b=function(){var k=d._jsonData;var n=k.version;var i=d._canvas.getContext("2d");if(n>d.frameworkVersion){c(n);return}var j=k.hasAlpha;var m=0;var o=0;var l=function(p){var t=k.frames;if(d._animationId===-1){return}if(m>0&&(p-m<o)){requestAnimationFrame(l);return}if(d._debug){var r=t[d._currentFrameNumber-1];if(r){h(r.x,j)}}var q=t[d._currentFrameNumber];if(q){var s=q.d;h(q.x,j,d._debug)}if(d._currentFrameCallback){if(q&&q.hasOwnProperty("m")){d._currentFrameCallback(d._currentFrameNumber,q.m)}else{d._currentFrameCallback(d._currentFrameNumber,null)}}d._currentFrameNumber++;if(d._currentFrameNumber==t.length){if(d._playbackFinishedCallback){d._playbackFinishedCallback()}if(d._loop){d._currentFrameNumber=0}else{return}}o=s*1000/k.timescale;m=p;d._animationId=requestAnimationFrame(l)};d._animationId=requestAnimationFrame(l)};var f=function(){var n=d._jsonData;var l=n.version;var q=d._canvas.getContext("2d");if(l>d.frameworkVersion){c(l);return}var i=n.hasAlpha;var p=n.framesize.width;var j=n.framesize.height;var m=n.frames;if(i){q.clearRect(0,0,p,j)}var o=m[d._currentFrameNumber];var k=o.d;h(o.x,i,d._debug)};this.load_animation=function(i){d._atlasImagesLoaded=false;d.img_urls=i.imageArray;d.img_path=i.imagePath;d._onLoadHandler=i.onLoad;d._loop=i.loop;d._currentFrameCallback=i.currentFrameCallback;d._playbackFinishedCallback=i.playbackFinishedCallback;d.loadOneImage=function(){if(d.img_urls.length>0){var j=new Image();j.onload=function(){d._imgArray.push(j);d.loadOneImage()};if(d.img_path&&d.img_path.length>0){j.src=d.img_path+d.img_urls.shift()}else{j.src=d.img_urls.shift()}}else{d._atlasImagesLoaded=true;d._onLoadHandler();return}};d.loadOneImage();d._jsonData=i.animationData;d._frameCount=d._jsonData.frames.length};this.play=function(){if(d._animationId!==-1){return}if(d._canvas&&d._canvas.getContext&&d._jsonData&&d._atlasImagesLoaded){b()}else{setTimeout(function(){d.play()},100)}};this.stop=function(){if(d._animationId===-1){return}cancelAnimationFrame(d._animationId);d._animationId=-1};this.currentFrameNumber=function(){return d._currentFrameNumber};this.setCurrentFrameNumber=function(i){d._currentFrameNumber=i;f()};this.debug=function(i){d._debug=i};this.loop=function(i){d._loop=i};var g=function(k){var m=document.getElementById(k);var l=m.parentNode;d._canvas=document.createElement("canvas");var i=(d._canvas.getContext)?true:false;if(!i){return false}d._canvas.id=m.id;d._canvas.width=m.width;d._canvas.height=m.height;d._canvas.style.cssText="display:block;";if(m.complete){l.replaceChild(d._canvas,m);var j=d._canvas.getContext("2d");j.drawImage(m,0,0)}else{m.onload=function(){l.replaceChild(d._canvas,m);var n=d._canvas.getContext("2d");n.drawImage(m,0,0)}}};g(a)};