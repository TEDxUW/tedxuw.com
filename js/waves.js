class ShapeOverlays{constructor(t){this.elm=t,this.path=t.querySelectorAll("path"),this.numPoints=3,this.duration=800,this.delayPointsArray=[],this.delayPointsMax=100,this.delayPerPath=80,this.timeStart=Date.now(),this.isOpened=!1,this.isAnimating=!1}toggle(){this.isAnimating=!0;const t=Math.random()*Math.PI*2;for(var e=0;e<this.numPoints;e++){const i=e/(this.numPoints-1)*Math.PI*2;this.delayPointsArray[e]=(Math.sin(i+t)+1)/2*this.delayPointsMax}!1===this.isOpened?this.open():this.close()}open(){this.isOpened=!0,this.elm.classList.add("is-opened"),this.timeStart=Date.now(),this.renderLoop()}close(){this.isOpened=!1,this.elm.classList.remove("is-opened"),this.timeStart=Date.now(),this.renderLoop()}updatePath(t){const e=[];for(var i=0;i<this.numPoints;i++)e[i]=100*ease.cubicInOut(Math.min(Math.max(t-this.delayPointsArray[i],0)/this.duration,1));let s="";s+=this.isOpened?`M 0 0 V ${e[0]} `:`M 0 ${e[0]} `;for(i=0;i<this.numPoints-1;i++){const t=(i+1)/(this.numPoints-1)*100,a=t-1/(this.numPoints-1)*100/2;s+=`C ${a} ${e[i]} ${a} ${e[i+1]} ${t} ${e[i+1]} `}return s+=this.isOpened?"V 0 H 0":"V 100 H 0"}render(){if(this.isOpened)for(var t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*t)));else for(t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*(this.path.length-t-1))))}renderLoop(){this.render(),Date.now()-this.timeStart<this.duration+this.delayPerPath*(this.path.length-1)+this.delayPointsMax?requestAnimationFrame(()=>{this.renderLoop()}):this.isAnimating=!1}}const footer_trigger=scrollMonitor.create(document.querySelector("#footer-trigger")),hero=document.querySelector("header"),elmOverlay=document.querySelector(".shape-overlays");var overlay=new ShapeOverlays(elmOverlay);var toggleWave=function(){if(overlay.isAnimating)return!1;overlay.toggle(),!0===overlay.isOpened?hero.classList.add("is-opened"):hero.classList.remove("is-opened")};$(document).ready(function(){$("#menu").slicknav(),toggleWave(),footer_trigger.enterViewport(function(){$("footer").fadeIn()})});