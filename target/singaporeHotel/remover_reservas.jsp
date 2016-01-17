<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="pt-BR">
	<head>
		<title>.: Singapore Hotel</title>
		<link rel="stylesheet" type="text/css" href="/singaporeHotel/css/main.css">
		<script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
		<script src="/singaporeHotel/js/validation.js"></script>
		<script src="/singaporeHotel/js/layout_adjusts.js"></script>
		<script src="/singaporeHotel/js/booking_class.js"></script>
		<script src="/singaporeHotel/js/booking_controller.js"></script>

		<script>
			/* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de dificultar a manutenibilidade. */

			$(document).ready( function(){
				document.getElementById("bookings_body").style.backgroundImage = "url(/singaporeHotel/img/campainha.jpg)";
			});

		</script>

	</head>


	<body id="bookings_body">
		<%@ include file="menu_comum.jsp" %>
		<div class="formclass color_font_pattern">
      <h3> Reservas efetuadas: </h3>
        
        <!-- Alex aqui vc pode inserir a tabela pra botar as info de reserva -->
        
        
      </div>

	</body>
</html>