/*! JSMaps v3.1.3, 2018-04-19 */

!function(t){function o(){var t=(new Date).getTime();return"undefined"!=typeof performance&&"function"==typeof performance.now&&(t+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){var e=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===o?e:3&e|8).toString(16)})}window.JSMaps=window.JSMaps||{maps:{}},Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),e=o.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var i=arguments[1],a=0;a<e;){var s=o[a];if(t.call(i,s,a,o))return s;a++}}}),window.mobileAndTabletcheck=function(){var t=!1;return function(o){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t};var e=window.mobileAndTabletcheck(),i="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;Raphael.el.trigger=function(t){for(var o=0,e=this.events.length;o<e;o++)this.events[o].name==t&&this.events[o].f.call(this)},t.fn.JSMaps=function(a){function s(o,e,i){t.each(e,function(t,e){o[e].animate({fill:i},500)})}function n(o){for(var e,i=0,a=o.length;i<a;i++)e=o[i],t.each(D.groups,function(o,i){t.each(i.members,function(t,o){e.name===o&&(e.group=i.name,e.color=i.color,e.hoverColor=i.hoverColor,e.selectedColor=i.selectedColor)})});return o}function r(){if("text"===D.stateClickAction){var t=M[0];t.scrollLeft=0,t.scrollTop=0}}function l(){function o(){P=d.parent().width(),w=x.width(),"text"===D.stateClickAction?"bottom"===(h=w>=767?D.textPosition:"bottom")?(Z=(Y=P)/F,d.css({width:Y+"px",height:Z+M.height()+"px"}),M.css({width:Y+"px",marginTop:Z+"px",height:"auto"})):(Y=P-D.textAreaWidth,Z=Y/F,d.css({width:w>=767?Y+D.textAreaWidth+"px":Y+"px",height:Z+"px"}),M.css({width:w>=767?D.textAreaWidth+"px":Y+"px",height:w>=767?Z+"px":D.textAreaHeight,display:"inline",float:w>=767?D.textPosition:"none",marginTop:w>=767?0:Z+"px"})):(Z=(Y=P)/F,d.css({width:Y+"px",height:Z+"px"})),u.setSize(Y,Z)}function a(o){i&&e||D.disableTooltip||(p(),T.after(t("<div />").addClass("jsmaps-tooltip")),t(".jsmaps-tooltip").html(o),l(),t(".jsmaps-tooltip").fadeIn())}function l(){j=-40,k=v-t(".jsmaps-tooltip").height()+j<0,j=k?40:j-t(".jsmaps-tooltip").height(),t(".jsmaps-tooltip").css({left:f-t(".jsmaps-tooltip").width()/2,top:v+j})}function p(){T.next(".jsmaps-tooltip").remove()}function O(o){e=t(window).scrollTop();if(o&&o.pageX?(f=o.pageX,v=o.pageY-e):(f=event.clientX+document.body.scrollLeft,v=event.clientY+document.body.scrollTop),f<0&&(f=0),v<0&&(v=0),l(),D.displayMousePosition){var e=x.scrollTop(),i=d.offset(),a=Math.round(f-i.left),s=Math.round(v-i.top+e),n=Math.round(a-D.mapWidth/2),r=Math.round(s-D.mapHeight/2);t(".jsmaps-mouse-position .xPos").text("X: "+a),t(".jsmaps-mouse-position .yPos").text("Y: "+s),t(".jsmaps-mouse-position .mapXPos").text("Map X: "+n),t(".jsmaps-mouse-position .mapYPos").text("Map Y: "+r)}}var Y=D.mapWidth,Z=D.mapHeight,F=Y/Z;if(D.enablePanZoom)var H=t('<div class=jsmaps-console><ul><li class=jsmaps-zoom-in><button type=button><div class="jsmaps-icon jsmaps-icon-plus"></div></button><li class=jsmaps-zoom-out><button type=button><div class="jsmaps-icon jsmaps-icon-minus"></div></button><li class=jsmaps-move-up><button type=button><div class="jsmaps-icon jsmaps-icon-chevron jsmaps-icon-chevron-up"></div></button><li class=jsmaps-move-down><button type=button><div class="jsmaps-icon jsmaps-icon-chevron jsmaps-icon-chevron-down"></div></button><li class=jsmaps-move-left><button type=button><div class="jsmaps-icon jsmaps-icon-chevron jsmaps-icon-chevron-left"></div></button><li class=jsmaps-move-right><button type=button><div class="jsmaps-icon jsmaps-icon-chevron jsmaps-icon-chevron-right"></div></button><li class=jsmaps-zoom-reset><button type=button><div class="jsmaps-icon jsmaps-icon-reset"></div></button></ul></div>').appendTo(d);D.displayMousePosition&&(t('<div class="jsmaps-mouse-position"><div class="xPos">X: 0</div><div class="yPos">Y: 0</div></div>').appendTo(d),t("body").css("cursor","crosshair")),D.displayViewBox&&t('<div class="jsmaps-viewbox-data"><div class="xPos">X: {0}</div><div class="yPos">Y: {0}</div><div class="zoom">Zoom: {0}</div></div>').appendTo(d),"text"===D.stateClickAction&&((M=t('<div class="jsmaps-text"></div>').appendTo(d)).html(D.defaultText),"left"===D.textPosition&&(T.css({left:"auto",right:"0"}),H&&H.css({left:"auto",right:"10px"}))),d.mousemove(function(t){O(t)}),function(){function e(o){var e=this.data("id"),i=!!this.data("group"),n=i?this.data("group"):I[e],r=n.enable,l="mouseover"===o.type,d=l?n.hoverColor:n.color,m=l?c.onStateOver:c.onStateOut;if(r){if(n!=g){var u=i?this.data("group").groupIds:[e];s(A,u,d)}l?a(n.name):p(),t.isFunction(m)&&m.call(this,n)}}u=Raphael(z,D.mapWidth,D.mapHeight);var i,l,d,m,h={"stroke-width":D.strokeWidth||1},f={"font-family":"Arial, sans-serif","font-weight":"bold","font-size":D.abbreviationFontSize,fill:D.abbreviationColor,"z-index":1e3},v={fill:"#f00","stroke-width":0,opacity:0};D.groups&&D.groups.length&&(t.each(D.groups,function(t,o){o.set=u.set(),o.groupIds=[]}),I=n(I));for(var x=0,w=I.length;x<w;x++){I[x].id=x,h=I[x].enable?t.extend(h,{fill:I[x].color,stroke:D.strokeColor,id:x}):t.extend(h,{fill:D.offColor,stroke:D.offStrokeColor}),v=t.extend(v,{cursor:I[x].enable?D.displayMousePosition?"crosshair":"pointer":"default"}),i=u.path(I[x].path).attr(h),A.push(i),(I[x].enable&&D.displayAbbreviations||!I[x].enable&&D.displayAbbreviationOnDisabledStates)&&(D.autoPositionAbbreviations?(d=(l=i.getBBox()).x+l.width/2+I[x].textX,m=l.y+l.height/2+I[x].textY):(d=I[x].textX,m=I[x].textY),C.push(u.text(d,m,I[x].abbreviation).attr(f)));var j,k,P;I[x].group?((k=(j=D.groups.find(function(t,o){if(I[x].group===t.name)return P=o,t.groupIds.push(x),t})).set.push(u.path(I[x].path)).attr(v)).data("group",j),k.data("id",P),k.name=j.name,k.enable=j.enable):((k=u.path(I[x].path).attr(v)).data("id",x),k.name=I[x].name,k.enable=I[x].enable),y.push(k),k.mouseover(e),k.mouseout(e),k.click(function(o){if(!S||!S.isDragging()){var e,i=this.data("id"),a=!!this.data("group"),n=a?this.data("group"):I[i];n.enable&&(r(),g&&g!=n&&(e=g.groupIds||[g.id],g.color,s(b?W:A,e,g.color)),b=!1,n!=g&&(e=a?this.data("group").groupIds:[i],s(A,e,n.selectedColor),E&&E.val(n.name)),g=n,"text"===D.stateClickAction?M.html(n.text):"url"===D.stateClickAction&&window.open(n.url,D.hrefTarget)),t.isFunction(c.onStateClick)&&c.onStateClick.call(this,n)}})}D.displayMousePosition||(o(),u.setViewBox(0,0,D.mapWidth,D.mapHeight),D.responsive&&t(window).on("resize",function(){o()}))}(),function(){C.forEach(function(t){t.toFront()}),y.forEach(function(t){t.toFront()})}(),X&&X.length&&function(){function o(o){var e=this.data("id"),i=X[e],n="mouseover"===o.type,r=n?i.hoverColor:i.color,l=n?c.onStateOver:c.onStateOut;i!=g&&s(W,[e],r),n?a(i.name):p(),t.isFunction(l)&&l.call(this,i)}for(var e=0;e<X.length;e++){X[e].id=e;var i,n={cursor:"pointer",fill:X[e].color,stroke:D.strokeColor,id:e};if(X[e].src&&""!==X[e].src){var l=X[e].pinWidth/X[e].srcWidth;i=u.image(X[e].src,0,0,X[e].srcWidth,X[e].srcHeight).attr(n);var d=-X[e].srcWidth/2+X[e].xPos,m=-X[e].srcHeight/2+X[e].yPos;i.animate({transform:"T"+d+","+m+" S"+l},0)}else i=u.circle(X[e].xPos,X[e].yPos,X[e].pinWidth||D.pinSize).attr(n);i.data("id",e),i.name=X[e].name,i.enable=X[e].enable,W.push(i),y.push(i),i.mouseover(o),i.mouseout(o),i.click(function(o){if(!S||!S.isDragging()){var e=this.data("id"),i=X[e];r(),g&&(pathIds=g.groupIds||[g.id],s(b?W:A,pathIds,g.color)),b=!0,s(W,[e],i.selectedColor),g=i,"text"===D.stateClickAction?M.html(i.text):"url"===D.stateClickAction&&window.open(i.url,D.hrefTarget),t.isFunction(c.onStateClick)&&c.onStateClick.call(this,i)}})}}(),D.enablePanZoom&&!D.displayMousePosition&&function(){t("body").on("mousewheel DOMMouseScroll",function(o){t(o.target).parents(".jsmaps").length&&(o.preventDefault(),o.stopPropagation())}),(S=u.panzoom({displayViewBox:D.displayViewBox,initialZoom:D.initialZoom,initialPosition:{x:D.initialMapX,y:D.initialMapY},originSize:{width:D.mapWidth,height:D.mapHeight}})).enable(),H.on("click",function(o){switch(t(o.target).parents("li").prop("class")){case"jsmaps-zoom-in":S.zoomIn(1);break;case"jsmaps-zoom-out":S.zoomOut(1);break;case"jsmaps-zoom-reset":S.zoomReset();break;case"jsmaps-move-up":S.pan(0,20);break;case"jsmaps-move-down":S.pan(0,-20);break;case"jsmaps-move-left":S.pan(20,0);break;case"jsmaps-move-right":S.pan(-20,0)}}),H.fadeIn()}(),D.selectElement&&function(){var o=t('<div class="jsmaps-select"><select><option value="default"></option></select><div class="jsmaps-select-icon"><div class="jsmaps-icon jsmaps-icon-chevron jsmaps-icon-chevron-down jsmaps-theme-light"></div></div></div>').insertBefore(d);D.selectElementDevices&&D.selectElementDevices.length?o.addClass(D.selectElementDevices.join(" ")):o.addClass("all-devices"),(E=o.find("select")).find('option[value="default"]').text(D.selectElementDefaultText);var e=y.sort(function(t,o){return t.name<o.name?-1:t.name>o.name?1:0});(e=e.filter(function(t){return t.enable})).forEach(function(o){t("<option>").val(o.name).text(o.name).appendTo(E)}),E.on("change",function(){"default"!==this.value?d.trigger("stateClick",this.value):d.trigger("stateUnClick")})}(),m&&m.length&&m.fadeOut(),d.fadeIn()}function p(){u.remove(),d.find(".jsmaps-console").length&&d.find(".jsmaps-console").remove(),d.find(".jsmaps-mouse-position").length&&d.find(".jsmaps-mouse-position").remove(),d.find(".jsmaps-text").length&&d.find(".jsmaps-text").remove(),d.siblings(".jsmaps-select").length&&d.siblings(".jsmaps-select").remove(),S&&(S=null),A=[],y=[],C=[],l()}var c=t.extend({responsive:!0,offColor:"#ccc",strokeColor:"#24221f",offStrokeColor:"#444",strokeWidth:1,abbreviationColor:"#f2f2f2",abbreviationFontSize:12,displayAbbreviations:!0,displayAbbreviationOnDisabledStates:!1,autoPositionAbbreviations:!1,stateClickAction:"text",textPosition:"right",hrefTarget:"_blank",textAreaWidth:300,textAreaHeight:300,pinSize:10,displayMousePosition:!1,displayViewBox:!1,enablePanZoom:!1,mapFolder:"maps/",initialZoom:0,initialMapX:0,initialMapY:0,retainPanZoomOnRedraw:!1,displayPreloader:!0,preloaderText:"Loading map...",disableTooltip:!1,selectElement:!0,selectElementDevices:["mobile"],selectElementDefaultText:"Please select",onReady:function(){},onStateClick:function(){},onStateOver:function(){},onStateOut:function(){}},a);if(!c.map)throw new Error("JSMaps plugin was called without a map property");if(!window.JSMaps.maps[c.map])throw new Error("The data for "+c.map+" is missing");var d=t(this);if(c.displayPreloader)var m=t('<div class="jsmaps-preloader">'+c.preloaderText+"</div>").appendTo(d);var u,h,f=0,v=0,g=null,b=!1,x=t(window),w=x.width(),j=0,k=!1,y=[],C=[],P=d.parent().width(),T=t('<div class="jsmaps"></div>').appendTo(d),z="jsmaps-"+o();T.attr("id",z);var M,S,A=[],W=[],E=null,O=window.JSMaps.maps[c.map],D=t.extend(c,O.config),I=O.paths,X=O.pins;l(),d.on("stateClick",function(o,e){t.each(y,function(t,o){pathName=o.name,e===pathName&&("set"===y[t].type?y[t][0]:y[t]).trigger("click")})}),d.on("stateUnClick",function(){if(g){var t=g.groupIds||[g.id];s(b?W:A,t,g.color),"text"===D.stateClickAction&&M.html(D.defaultText),g=null}}),d.on("reDraw",function(o,e){e&&(e.config&&(D=t.extend(D,e.config)),S&&D.retainPanZoomOnRedraw&&(D.initialZoom=S.getCurrentZoom(),D.initialMapX=S.getCurrentPosition().x,D.initialMapY=S.getCurrentPosition().y),e.pins&&(X=e.pins),e.paths&&(I=e.paths),m&&m.length?m.fadeIn("fast",p):p())}),c.onReady.call(this)}}(jQuery);