$(document).ready(function(){

	var respuesta, output ="";
	var fecha_actual = new Date();
	var caducados = 0, pendientes = 0, conformes = 0;

	function crearOutput(data){
		output += "<div class='cuadro'>";
		output += "<div class='cuadro_izda'>";
		switch(data[i].estado){
				case "PR":
					output += '<div class="img_estado"><img class="icon PR" width="24" height="24" src="images/PR.png"></div>';
					pendientes++;
					break;
				case "CA":
					output += '<div class="img_estado"><img class="icon CA" width="24" height="24" src="images/CA.png"></div>';
					caducados++;
					break;
				case "AR":
					output += '<div class="img_estado"><img class="icon AR" width="24" height="24" src="images/AR.png"></div>';
					conformes++;
					break;
		}

		output += '<div class="modificado">' + data[i].modificado + "</div></div>";

		output += "<div class='cuadro_centro'><div class='tipo'><h3>" + data[i].tipo.toUpperCase() + "</h3></div>";

		if(data[i].nivel === "Empleado") output += "<div class='nivel'>Empleado " + data[i].empleado + "</div>";
		else if(data[i].nivel === "Centro") output += "<div class='nivel'>Centro " + data[i].detalle + "</div>";
		else if(data[i].nivel === "Empresa") output += "<div class='nivel'>Empresa " + data[i].detalle + "</div>";

		if(data[i].estado === "PR") {
			output += "<div class='estado'>Estado: <span>Pendiente de revisar</span></div>";
			output += "<span class='ver_documento'><a href='#'>Ver documento</a></span>";
			output += "<span class='cambiar_estado'><a href='#'>Conforme</a></span>";
		}
		else if(data[i].estado === "CA") {
			output += "<div class='estado'>Estado: <span>Caducado</span></div>";
			output += "<span class='ver_documento'><a href='#'>Ver documento</a></span>";
		}
		else if(data[i].estado === "AR") {
			output += "<div class='estado'>Estado: <span>Conforme</span></div>";
			output += "<span class='ver_documento'><a href='#'>Ver documento</a></span>";
		}

		output += '<div class="img_plus"><a href="#"><img class="icon PLUS" width="24" height="24" src="images/plus.png"><dfn>Mostrar notas</dfn></a></div>';
		
		output += "</div>";
		output += "<div class='cuadro_dcha'><div class='validez'>Válido hasta: <span class='fecha_cad'>" + data[i].caduca + "</span></div></div>";
		
		output += "</div>";

		$(".zona_timeline").append(output);
		output = "";
	}

	function recuento(conformes, pendientes, caducados){
		$('.doc_status_AR .doc_status_value').html(conformes);
		$('.doc_status_PR .doc_status_value').html(pendientes);
		$('.doc_status_CA .doc_status_value').html(caducados);
	}


		$.ajax({
			type: "GET",
			dataType: "json",
			url: "datos.json",
			success: function(data){

				//Guardar los datos parseados en un array, para saber el número de estos usamos un contador para saber cuantos tendremos que pintar en pantalla
				for(i=0;i<data.length;i++){
					crearOutput(data);
				}

				//Recuento total: 
				recuento(conformes, pendientes, caducados);
			}
		});
	
});
