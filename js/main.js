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
	
 sound = new Howl({
  src: ['audio/sounds.mp3'],
  rate: 1,
  sprite: {
    'B-': [060, 300],
    Pf: [430, 300],
    'ts': [1084, 300],
    'c1': [2429, 300],
    'c2': [2666, 300],
    'c3': [3373, 300],
    '^K': [2135, 250],
    'mm': [3869, 250],
    'BB': [5201, 350]
  }
});
	
$.fn.toggleDisabled = function() {
	return this.each(function() {
		var $this = $(this);
		if ($this.attr('disabled')) $this.removeAttr('disabled');
		else $this.attr('disabled', 'disabled');
	});
};
	
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
	
}
	
function sonar(){
	sound.play(tracker[step]);
	step++;
	console.log(step);
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
	$("#playBtn").removeClass("collapse");
	$("#stopBtn").addClass("collapse");
	$(".tempo button").toggleDisabled();
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
		bpm = minBpm
	
	if(bpm > maxBpm)
		bpm = maxBpm;
	
	$("#bpm").html(bpm+ " BPM");
}
	
function changeSteps(howMuch){
	
	if((howMuch<0 && steps > 1) || (howMuch>0 && steps < maxSteps))
		steps += howMuch;

	if(steps < 1)
		steps = 1
	
	if(steps > maxSteps)
		steps = maxSteps;
	
	$("#steps").html("/ " + steps);
}
	
});