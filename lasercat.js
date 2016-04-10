var videoList = [
	"Death Metal Rooster ft. Drumming Washing Machine.mp4",
	"The original Technoviking video.mp4"

];

var videoTransitions = 
[
	"static.mp4"

];

// //

var video = document.getElementById('corevideo');
var source = document.createElement('source');
var baseurl = "videos/";
var transitionsurl = "videos/transitions/"
var i = 0;
var j = 0;

source.setAttribute('src', baseurl + "first.mp4");

video.appendChild(source);
video.currentTime = 0.5;

// wait 10 seconds for full screen
// since full screen listener isn't working
window.setTimeout(function() {

	video.controls = false;
	transitionVideo();

}, 2000);


video.addEventListener('ended', function() {
	transitionVideo();
}, false);

function transitionVideo()
{
	// play a transition video video
	video.loop = true;
	changeVideo(videoTransitions[j], true);

	window.setTimeout(function() {

		video.loop = false;

		// play next video
		changeVideo(videoList[i]);

		i++;
		j++;

		if(i >= videoList.length) i=0;
		if(j >= videoTransitions.length) j=0;

	}, 500); // reset this

}


// change video that is currently playing
function changeVideo(videosrc, istransition = false)
{
	console.log(videosrc);
   video.pause();

   if(istransition)
   		source.setAttribute('src', transitionsurl + videosrc); 

	else
   		source.setAttribute('src', baseurl + videosrc); 

   video.load();
   video.play();
}