init();

function init(){
	var key;
	const keyInput = document.querySelector('.keyID');
	keyInput.addEventListener("keyup", function(event) {
	    if (event.key === "Enter") {
	        key = document.querySelector('.keyID').value;
	        enterSession(key);
	    }
	});
}

function enterSession(key){
	// promptKey disappears, buttonArea appears and the text gets updated with the session ID;
	document.querySelector('.promptKey').style.display = 'none';
	document.getElementById('bigOne').innerText ="Loading...";
	
	// SERVER: Saber si existe sesión o no
	var exists = 0;
	var dbexists = firebase.database().ref().child(key).child('exists');
	dbexists.on('value', snap => exists = snap.val());
	
	setTimeout(function(){ // Esperamos a que actualize el server
		if (exists != 1){ // NO EXISTE LA SESIÓN: La creamos
			firebase.database().ref().child(key).set({
				'float L2': "white",
				'float L1': "white",
				'float L3': "white",
				'float L4': "white",
				'float L5': "white",
				'float R1': "white",
				'float R2': "white",
				'float R3': "white",
				'float R4': "white",
				'float R5': "white",
				'buttonsPressed': 0,
				'exists': 1,
				'uConnected': 0,
				'timestamp': Date.now()
			});
			document.getElementById('bigOne').innerText ="Session ID: " + key + " (A new session has been created)";
		}
		else{
			document.getElementById('bigOne').innerText ="Session ID: " + key;
		}
		document.querySelector('.buttonArea').style.display = 'block';
		document.querySelector('.buttons').style.display = 'grid';
		
		
		var uConnected = 0;
		var classConnected = document.querySelector(".uConnected");
		var dbConnected = firebase.database().ref().child(key).child('uConnected');
		dbConnected.on('value', snap => classConnected.innerText = snap.val());
		dbConnected.on('value', snap => uConnected = snap.val());
		
		// CONEXIÓN
		// Siempre añade 1 cuando entra
		uConnected++;
		var o_temp = {};
		var k_temp = 'uConnected';
		o_temp[k_temp] = uConnected;
		firebase.database().ref().child(key).update(o_temp);
		
		window.onbeforeunload = function (e) {
		uConnected--;
		o_temp = {'uConnected': uConnected};
		firebase.database().ref().child(key).update(o_temp);
		
	
	};
		
	}, 2000);
	createWatchers(key);
}	



function createWatchers(key){
	var a_float = document.querySelectorAll(".float");
	var resetButton = document.querySelector(".resetButton");

	// SERVER: Inicializar el estado de buttonsPresed
	var buttonsPressed = 0;
	var dbPressed = firebase.database().ref().child(key).child('buttonsPressed');
	dbPressed.on('value', snap => buttonsPressed = snap.val());
	
	// SERVER: Inicializar el estado de los colores
	var dbGlobal = firebase.database().ref().child(key);
	var dbBtn = new Array(10);
	
	dbBtn[0] = dbGlobal.child('float L1');
	dbBtn[1] = dbGlobal.child('float L2');
	dbBtn[2] = dbGlobal.child('float L3');
	dbBtn[3] = dbGlobal.child('float L4');
	dbBtn[4] = dbGlobal.child('float L5');
	dbBtn[5] = dbGlobal.child('float R1');
	dbBtn[6] = dbGlobal.child('float R2');
	dbBtn[7] = dbGlobal.child('float R3');
	dbBtn[8] = dbGlobal.child('float R4');
	dbBtn[9] = dbGlobal.child('float R5');
	
	dbBtn[0].on('value', snap => a_float[0].style.backgroundColor = snap.val());
	dbBtn[1].on('value', snap => a_float[1].style.backgroundColor = snap.val());
	dbBtn[2].on('value', snap => a_float[2].style.backgroundColor = snap.val());
	dbBtn[3].on('value', snap => a_float[3].style.backgroundColor = snap.val());
	dbBtn[4].on('value', snap => a_float[4].style.backgroundColor = snap.val());
	dbBtn[5].on('value', snap => a_float[5].style.backgroundColor = snap.val());
	dbBtn[6].on('value', snap => a_float[6].style.backgroundColor = snap.val());
	dbBtn[7].on('value', snap => a_float[7].style.backgroundColor = snap.val());
	dbBtn[8].on('value', snap => a_float[8].style.backgroundColor = snap.val());
	dbBtn[9].on('value', snap => a_float[9].style.backgroundColor = snap.val());
	
	var ddl = document.querySelector(".calloutSelect");
	ddl.addEventListener("change", function(){
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		if (selectedValue == "left"){
			a_float[0].innerHTML="L1";
			a_float[1].innerHTML="L2";
			a_float[2].innerHTML="L3";
			a_float[3].innerHTML="L4";
			a_float[4].innerHTML="L5";
			a_float[5].innerHTML="R1";
			a_float[6].innerHTML="R2";
			a_float[7].innerHTML="R3";
			a_float[8].innerHTML="R4";
			a_float[9].innerHTML="R5";
		}
		else if (selectedValue == "datto"){
			a_float[0].innerHTML="L1";
			a_float[1].innerHTML="L4";
			a_float[2].innerHTML="L3";
			a_float[3].innerHTML="L2";
			a_float[4].innerHTML="L5";
			a_float[5].innerHTML="R1";
			a_float[6].innerHTML="R2";
			a_float[7].innerHTML="R3";
			a_float[8].innerHTML="R4";
			a_float[9].innerHTML="R5";
		}
		else if (selectedValue == "ten"){
			a_float[0].innerHTML="3";
			a_float[1].innerHTML="7";
			a_float[2].innerHTML="4";
			a_float[3].innerHTML="1";
			a_float[4].innerHTML="8";
			a_float[5].innerHTML="9";
			a_float[6].innerHTML="5";
			a_float[7].innerHTML="2";
			a_float[8].innerHTML="6";
			a_float[9].innerHTML="10";
		}
		else if (selectedValue == "three"){
			a_float[0].innerHTML="B1";
			a_float[1].innerHTML="C1";
			a_float[2].innerHTML="B2";
			a_float[3].innerHTML="A1";
			a_float[4].innerHTML="C2";
			a_float[5].innerHTML="C3";
			a_float[6].innerHTML="B3";
			a_float[7].innerHTML="A2";
			a_float[8].innerHTML="B4";
			a_float[9].innerHTML="C4";
		}
		else if (selectedValue == "columns"){
			a_float[0].innerHTML="1";
			a_float[1].innerHTML="2";
			a_float[2].innerHTML="3";
			a_float[3].innerHTML="4";
			a_float[4].innerHTML="5";
			a_float[5].innerHTML="6";
			a_float[6].innerHTML="7";
			a_float[7].innerHTML="8";
			a_float[8].innerHTML="9";
			a_float[9].innerHTML="10";
		}
		
	});
	
	resetButton.addEventListener("click", function(){
		o_temp = {buttonsPressed: 0};
		firebase.database().ref().child(key).update(o_temp);
		buttonsPressed = 0;
		var nani = dbGlobal.set({
			'float L2': "white",
			'float L1': "white",
			'float L3': "white",
			'float L4': "white",
			'float L5': "white",
			'float R1': "white",
			'float R2': "white",
			'float R3': "white",
			'float R4': "white",
			'float R5': "white",
			'buttonsPressed': 0,
			'exists': 1,
			'timestamp': Date.now()
		});
	});
	
	for (var i=0; i< a_float.length; i++){
		a_float[i].addEventListener("click", function(){
			var o_temp = {};
			var k_temp = this.className;
			
			if(getColor(this) == "white"){
				// Comprobar aquí en que modo estamos, en 2 ojos o en 3 ojos (SOONtm)
				if (buttonsPressed < 2 ){
					o_temp[k_temp] = "blue";
				} else if (buttonsPressed < 4){
					o_temp[k_temp] = "red";
				} else if (buttonsPressed < 6){
					o_temp[k_temp] = "yellow";
				}
				buttonsPressed++; // Actualizamos la lógica de los botones
			}
			k_temp = buttonsPressed;
			o_temp["buttonsPressed"] = buttonsPressed;
			dbGlobal.update(o_temp); // update
		});
	}
	
	var ref = firebase.database().ref();
	var now = Date.now();
	var cutoff = now - 2 * 60 * 60 * 1000; //2h
	var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
	old.on('child_added', function(snapshot) {
    	snapshot.ref.remove();
	});
	
}

function getColor(button){
		return button.style.backgroundColor;
	}
	
