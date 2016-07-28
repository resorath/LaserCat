// //

videoList = new Array();
videoTransitions = new Array();
var video = document.getElementById('corevideo');
var source = document.createElement('source');
var baseurl = "videos/";
var transitionsurl = "videos/transitions/"
var i = 0;
var j = 0;

video.addEventListener('ended', function() {
	transitionVideo();
}, false);

$.ajax({
  url: baseurl,
  success: function(data){
     $(data).find("a").each(function(){
        // will loop through 
        var avideo = $(this).attr("href")
        if(avideo.indexOf('.') > -1)
        {
	        videoList.push(avideo)
	        console.log("Found video: " + avideo);
        }
     });

     shuffle(videoList);

	source.setAttribute('src', 'first.mp4');
	video.appendChild(source);
	video.play();

	// wait 10 seconds for full screen
	// since full screen listener isn't working
	window.setTimeout(function() {

		video.controls = false;
		transitionVideo();

	}, 15000);
  }
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function transitionVideo()
{
	// play a transition video video
	video.loop = true;
	//changeVideo(videoTransitions[j], true);

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