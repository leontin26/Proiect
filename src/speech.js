
document.addEventListener("touchstart", on_touch);

// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';


var recognition_started = false;

function on_touch(e)
{
	if (!recognition_started)
	{
	recognition.start();
	recognition_started = true;
	}
}

function on_end()
{
	recognition.stop();
	recognition_started = false;
}

recognition.onend = on_end;
recognition.onsoundend = on_end;
recognition.onspeechend = on_end;

recognition.onresult = on_results;
	
function on_results(e)
{
	color = e.results[0][0].transcript;
	document.getElementById("text").innerHTML = "&nbsp &nbsp &nbsp culoare contur = " + color;
	
}