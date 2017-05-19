var patron;
var sound;
var step = 0;
var steps = 2;
var tracker;
var loop = true;
var bpm = 80;
var minBpm = 10;
var maxBpm = 300;
var maxSteps = 8;
var images = new Array();

function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = "img/pacha-boca-" + preload.arguments[i] + ".png";
	}
}
preload("B-","Pf","ts","c1","c2","c3","^K","^m","BB");

$(document).ready(function() {
	
$("#playBtn").on('click', playTracker);
$("#stopBtn").on('click', stopTracker);
$("#loopBtn").on('click', toggleLoop);
$("#tempoUp").on('click', function(){changeTempo(+1)});
$("#tempoDown").on('click', function(){changeTempo(-1)});
$("#tempoUpUp").on('click', function(){changeTempo(+10)});
$("#tempoDownDown").on('click', function(){changeTempo(-10)});
$("#moreSteps").on('click', function(){changeSteps(+1)});
$("#lessSteps").on('click', function(){changeSteps(-1)});
$("#shareBtn").on('click', showShare);
$("#shortlink").on( "click", function(){$("#shortlink").select();} );
	
 sound = new Howl({
  src: ['audio/sounds.mp3'],
  rate: 1,
  sprite: {
    'B-': [060, 300],
    Pf: [430, 300],
    'ts': [1084, 300],
    'c1': [2429, 210],
    'c2': [2666, 300],
    'c3': [3373, 300],
    '^K': [2135, 250],
    '^m': [3869, 250],
    'BB': [5201, 350]
  }
});
	
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var sharedBeat = getParameterByName('beat');
	
if(sharedBeat.length > 0)
	$("#tracker").html(LZString.decompressFromBase64(sharedBeat));
	
$.fn.toggleDisabled = function() {
	return this.each(function() {
		var $this = $(this);
		if ($this.attr('disabled')) $this.removeAttr('disabled');
		else $this.attr('disabled', 'disabled');
	});
};
	
function showShare(){
	
	var compressTrack = LZString.compressToBase64($("#tracker").val());
	var trackUrl = "https://eypacha.github.io/bbx-tracker?beat=" + compressTrack;
	
    if ($("#shortlink").val() == ""){
		
		get_short_url(trackUrl, function(short_url) {

		if (typeof short_url === 'undefined') {short_url = trackUrl;}
			$("#fbShare").attr("href","https://www.facebook.com/sharer/sharer.php?u="+short_url);
			$("#twShare").attr("href","https://twitter.com/share?url="+short_url+"&text=Escucha%20el%20beat%20que%acabo%20de20hacer!&hashtags=bbxtracker,beatbox,bbx");
			$("#btEmail").attr("href","mailto:?subject=Escucha%20el%20beat%20que%acabo%20de20hacer!&body=Beat%%20hecho%20con%20BBX%20Tracker! > "+short_url);
			$("#shortlink").val(short_url);
			$("#shareBtn").addClass("collapse");
			$("#shareIt").removeClass("collapse");
		});

    }
}
	
function get_short_url(long_url, func){
    $.getJSON(
        "https://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": "R_da6cb00ea3395240c2a5ee7b5b6b1384",
            "login": "eypacha",
            "longUrl": long_url
        },
        function(response)
        {
            func(response.data.url);
            
        }
    );
}
function playTracker(){
	
	tracker = $("#tracker").val();	
	
	// Remplaza saltos de línea por espacios
	tracker = tracker.replace(/(\r\n|\n|\r)/gm, " ");
	
	// Genera un array desde el string
	tracker = tracker.split(" ");
	
	// Limpia el array de items vacíos
	// producidos por dobles espacios
	var index = tracker.indexOf("");
	while (index > -1) {
		tracker.splice(index, 1);
		index = tracker.indexOf("");
	}
	
	$("#playBtn").addClass("collapse");
	$("#stopBtn").removeClass("collapse");
	patron = setInterval(function(){sonar()},3600/bpm*8/steps);
	
	$(".tempo button").toggleDisabled();
	$("#tracker").toggleDisabled();
	
	$("#shortlink").val("");
	$("#shareBtn").removeClass("collapse");
	$("#shareIt").addClass("collapse");
	
	
}
	
function sonar(){
	sound.play(tracker[step]);
	$("#pacha div").css("background-image","url('img/pacha-boca-"+tracker[step]+".png')");
	step++;
	if(step >= tracker.length){
		if(!loop){
			stopTracker();
		} else {
			step = 0;
		}
	};
}

function stopTracker(){
	clearInterval(patron);
	step = 0;
	$("#pacha div").css("background-image","url('img/pacha-boca---.png')");
	$("#playBtn").removeClass("collapse");
	$("#stopBtn").addClass("collapse");
	$(".tempo button").toggleDisabled();
	$("#tracker").toggleDisabled();
}
	
function toggleLoop(){
	if(loop){
		$("#loopBtn").addClass("noloop");
	} else {
		$("#loopBtn").removeClass("noloop");
	}
	loop = !loop;
}
	
function changeTempo(howMuch){
	
	if((howMuch<0 && bpm > minBpm) || (howMuch>0 && bpm < maxBpm))
		bpm += howMuch;

	if(bpm < minBpm)
		bpm = minBpm;
	
	if(bpm > maxBpm)
		bpm = maxBpm;
	
	$("#bpm").html(bpm+ " BPM");
}
	
function changeSteps(howMuch){
	
	if((howMuch<0 && steps > 1) || (howMuch>0 && steps < maxSteps))
		steps += howMuch;

	if(steps < 1)
		steps = 1;
	
	if(steps > maxSteps)
		steps = maxSteps;
	
	$("#steps").html("/ " + steps);
}
	
});