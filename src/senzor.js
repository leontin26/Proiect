
window.addEventListener("deviceorientation", on_device_orientation);

var alpha = 0;
var beta = 0;
var gamma = 0;

var color = "#FFF000";

var vechi = [];
var pasi = 100; // minim 3
var pondere_curenta = pasi;

var run_function = false;

for (var i = 0 ; i < pasi ; i++)
{
	p = pasi - i;
	vechi.push({importanta:p, v_alpha:0, v_beta:0, v_gamma:0});
}



function on_device_orientation(evt)
{
	if (run_function)
		return 0;
	run_function = true;
	
	var t_alpha = Math.round(evt.alpha);
	var t_beta = Math.round(evt.beta);
	var t_gamma = Math.round(evt.gamma);
	
	var vechime_alpha = 0;
	var vechime_beta = 0;
	var vechime_gamma = 0;
	
	var vechime_importanta = 0;
	
	for (i = pasi - 1; i >= 0; i--)
	{
			// adunare ponderat valori vechi
		vechime_alpha = vechime_alpha + (vechi[i].importanta * vechi[i].v_alpha);
		vechime_beta = vechime_beta + (vechi[i].importanta * vechi[i].v_beta);
		vechime_gamma = vechime_gamma + (vechi[i].importanta * vechi[i].v_gamma);
		
			// adunare importanta
		vechime_importanta = vechime_importanta + vechi[i].importanta;
		
		if (i>0)
		{
				// mutare valori cu un pas ("invechire date")
			vechi[i].v_alpha = vechi[i-1].v_alpha;
			vechi[i].v_beta = vechi[i-1].v_beta;
			vechi[i].v_gamma = vechi[i-1].v_gamma;
		}
		else
		{
				// valorile actuale devin vechi
			vechi[0].v_alpha = t_alpha;
			vechi[0].v_beta = t_beta;
			vechi[0].v_gamma = t_gamma;
		}
	}
		
		// calculare valori poderate
	alpha = Math.round((t_alpha*pondere_curenta + vechime_alpha) / (vechime_importanta + pondere_curenta));
	beta  = Math.round((t_beta*pondere_curenta + vechime_beta) / (vechime_importanta + pondere_curenta));
	gamma = Math.round((t_gamma*pondere_curenta + vechime_gamma) / (vechime_importanta + pondere_curenta));
	
	
				// afisare valori
	document.getElementById("a").innerHTML = "alpha = " + alpha.toString();
	document.getElementById("b").innerHTML = "beta = " + beta.toString();
	document.getElementById("g").innerHTML = "gamma = " + gamma.toString();
	
		// creare canvas si context
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
		// stergere zona ecran (canvas)
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	
		// raza si calcul centru cerc
	var raza = 40;
	var centru = {x:canvas.width/2, y:canvas.height/2};
	
	ctx.beginPath();
	
		// desenare cerc
	ctx.arc(centru.x + gamma * (canvas.width/2 - raza)/90, centru.y + beta * (canvas.height/2 - raza)/90, raza, 0, 2 * Math.PI);
	
		// calcul culoare
	var a = Math.round(alpha * 255 / 360);
	var b = 255 - a;
	
	ctx.fillStyle = "#" + a.toString(16) + "0F" + b.toString(16);
	ctx.strokeStyle = color;
	ctx.fill();
	ctx.stroke();
	
	if ((Math.abs(beta) > 70) || (Math.abs(gamma) > 70))
	{
		navigator.vibrate(1000);
	}
	
	run_function = false;
	
}