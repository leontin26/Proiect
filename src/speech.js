
document.addEventListener("touchstart", on_touch);

// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
//recognition.maxAlternatives = 5;

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
	document.getElementById("text").innerHTML = "culoare = " + color;
	
	/*
	var comanda = e.results;
	document.getElementById("text").innerHTML = "comanda = " + comanda.transcript;
	for (var i = 0; i < SpeechRecognitionResultList.length; i++)
{		document.getElementById("text").innerHTML += alternatives[i].transcript + " - "+ alternatives[i].confidence + "<br>";
	}
	*/
}