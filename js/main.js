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
var trackUrl;

function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = "img/pacha-" + preload.arguments[i] + ".png";
	}
}
preload("boca-b","boca-pf","boca-ts","boca-c","boca-k","boca-m","boca-b","boca-o","boca-u","boca---","ojos-1","ojos-2");

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
	
 sound = new Howl({
  src: ['audio/sounds.mp3'],
  rate: 1,
  sprite: {
    'B-': [060, 300],
    'Pf': [430, 300],
    'ts': [1084, 300],
    'c1': [2429, 210],
    'c2': [2666, 300],
    'c3': [3373, 300],
    '^K': [2135, 250],
    '^m': [3869, 250],
    'BB': [5201, 350],
    'ió': [6055, 350],
    'soy': [6513, 350],
    'Pa': [6880, 330],
    'Cha': [7287, 360],
    'vi': [7697, 350],
    'buen': [8052, 220],
    'pfar': [8316, 288],
    'ke': [8651, 101],
    'cha': [8805, 140],
    'ca': [9024, 180],
    'bu': [9221, 318],
    'co': [9591, 277]
  }
});
	
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1]);
}

var sharedBeat = getParameterByName('beat');
	
if(sharedBeat.length > 0){
	
	$("#tracker").html(LZString.decompressFromBase64(sharedBeat));
}

var sharedBpm = getParameterByName('bpm');

if(sharedBpm.length > 0 && sharedBpm >= minBpm && sharedBpm <= maxBpm) {
	
	bpm = parseInt(sharedBpm);
	$("#bpm").html(bpm+ " BPM");
	
}
	
var sharedSteps = getParameterByName('steps');

if(sharedSteps.length > 0 && sharedSteps >= 1 && sharedSteps <= maxSteps) {
	
	steps = parseInt(sharedSteps);
	$("#steps").html("/ " + steps);;
	
}
	
$.fn.toggleDisabled = function() {
	return this.each(function() {
		var $this = $(this);
		if ($this.attr('disabled')) $this.removeAttr('disabled');
		else $this.attr('disabled', 'disabled');
	});
};
	
function showShare(){
	
	$("#shareBtn").addClass("collapse");
	$("#waitingBox").removeClass("collapse");
	var compressTrack = LZString.compressToBase64($("#tracker").val());
	trackUrl = "https://eypacha.github.io/bbx-tracker/?beat=" + compressTrack + "&bpm=" + bpm + "&steps=" + steps;
	
    if ($("#shortlink").val() == ""){
		
		get_short_url(trackUrl, function(short_url) {

		if (typeof short_url === 'undefined') {short_url = trackUrl;}
			$("#fbShare").attr("href","https://www.facebook.com/sharer/sharer.php?u="+short_url);
			$("#twShare").attr("href","https://twitter.com/share?url="+short_url+"&text=Escucha%20el%20beat%20que%20acabo%20de%20hacer!&hashtags=bbxtracker,beatbox,bbx&via=eypacha");
			$("#btEmail").attr("href","mailto:?subject=Escucha el beat que acabo de hacer!&body=Beat hecho con BBX Tracker! > "+short_url);
			$("#shortlink").val(short_url);
			$("#shareIt").removeClass("collapse");
			$("#waitingBox").addClass("collapse");
		});

    }
}
	
function get_short_url(long_url, func){
    $.getJSON(
        "https://api-ssl.bitly.com/v3/shorten?", 
        { 
			"access_token": "4da3dd9ee59dfe487358e3d656aa6e2bcc1000eb",
            "longUrl": long_url,
			"format": "json"
        },
        function(response)
        {
			console.log(response);
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
	patron = setInterval(function(){sonar()},3600/bpm*16/steps);
	
	$(".tempo button").toggleDisabled();
	$("#tracker").toggleDisabled();
	
	$("#shortlink").val("");
	$("#shareBtn").removeClass("collapse");
	$("#shareIt").addClass("collapse");
	$("#waitingBox").addClass("collapse");
	
	
}
	
function sonar(){
	
	var ojos = 0;
	switch(step % 4) {
    case 1:
        ojos = 1;
		break;
	case 3:
        ojos = 2;
		break;
	case 2:
	case 0:
	default:
        ojos = 0;
	break;
	}
	
	$("#pacha").css("background-image","url('img/pacha-ojos-"+ojos+".png')");
	
	var sonido = '',
		boca = '';
	
	switch(tracker[step].toLowerCase()){
	case 'b':		
	case 'b-':		
	case 'p':		
	case 'p-':
			sonido = 'B-';
			boca = 'b';
			break;
	case 'ts':
	case 't':
	case 't-':
			sonido = 'ts';
			boca = 'ts';
			break;
	case 'pf':
			sonido = 'Pf';
			boca = 'pf';
			break;
	case 'c1':
			sonido = 'c1';
			boca = 'c';
			break;
	case 'c2':
	case 'c':
	case 'c-':
			sonido = 'c2';
			boca = 'c';
			break;
	case 'c3':
			sonido = 'c3';
			boca = 'c';
			break;
	case '^k':
	case 'k':
	case 'k-':
			sonido = '^K';
			boca = 'k';
			break;
	case 'm':
	case 'm-':
	case '^m':
	case 'mm':
			sonido = '^m';
			boca = 'm';
			break;
	case 'bb':
			sonido = 'BB';
			boca = 'bb';
			break;
	case 'ió':
	case 'io':
	case 'yo':
			sonido = 'ió';
			boca = 'o';
			break;
	case 'soy':
	case 'soi':
			sonido = 'soy';
			boca = 'o';
			break;
	case 'pa':
			sonido = 'Pa';
			boca = 'b';
			break;
	case 'cha!':
			sonido = 'Cha';
			boca = 'k';
			break;
	case 'vi':
	case 'bi':
	case 'pi':
			sonido = 'vi';
			boca = 'k';
			break;
	case 'buen':
			sonido = 'buen';
			boca = 'b';
			break;
	case 'pfar':
			sonido = 'pfar';
			boca = 'f';
			break;
	case 'ke':
	case 'que':
			sonido = 'ke';
			boca = 'k';
			break;
	case 'cha':
			sonido = 'cha';
			boca = 'b';
			break;
	case 'que':
			sonido = 'cha';
			boca = 'b';
			break;
	case 'ca':
	case 'ka':
			sonido = 'ca';
			boca = 'b';
			break;
	case 'bu':
	case 'pu':
			sonido = 'bu';
			boca = 'u';
			break;
	case 'co':
	case 'ko':
			sonido = 'co';
			boca = 'o';
			break;
	default:
			sonido = '--';
			boca = '--';
			break;
	
    }
	
	sound.play(sonido);
	$("#pacha div").css("background-image","url('img/pacha-boca-"+boca+".png')");
	
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
	ojos = 0;
	$("#pacha div").css("background-image","url('img/pacha-boca---.png')");
	$("#pacha").css("background-image","url('img/pacha-ojos-"+ojos+".png')");
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