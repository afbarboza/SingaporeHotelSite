<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="pt-BR">
	<head>
		<title>.: Singapore Hotel</title>
		<link rel="stylesheet" type="text/css" href="/singaporeHotel/css/main.css">
        <link rel="stylesheet" type="text/css" href="/singaporeHotel/css/home.css">
		<script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
        <script src="/singaporeHotel/js/layout_adjusts.js"></script>
		<script src="/singaporeHotel/js/validation.js"></script>
		<script src="/singaporeHotel/js/contact_class.js"></script>
		<script src="/singaporeHotel/js/contact_controller.js"></script>
        <script src="/singaporeHotel/js/general_events_handler.js"></script>  
		<script>
			/* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de dificultar a manutenibilidade. */

			$(document).ready( function(){
				document.getElementById("contact_body").style.backgroundImage = "url(/singaporeHotel/img/hotel2.jpg)";
			});

		</script>

	</head>


	<body id="contact_body">
	
		<%@ include file="menu_publico.jsp" %>

		<div class="formclass color_font_pattern">
			<h3> Contato </h3> 

			<form id="contactform" method="get">
				<fieldset>
					<legend>Informações Pessoais </legend>
					<div id="nome">
						<label> Nome </label> 
						<input type="text" name="name" id="tfnome">
						<div id="infonome" class="error_msg"></div>
					</div>
	
					<div id="email">
						<label> Email </label> 
						<input type="email" name="email" id="tfemail">
						<div id="infoemail" class="error_msg"></div>
					</div>

					<div id="celular">
						<label> Telefone para contato </label> 
						<input type="text" name="celular" id="user_phone" title="Formato: (XX)XXXXX-XX-XX" placeholder="(XX)XXXXX-XX-XX">
						<div id="infotelefone" class="error_msg blueText">Formato: (XX)XXXXX-XX-XX</div>
					</div>
				</fieldset>

				<fieldset id="como">
					<legend> Como você nos conheceu? </legend>
					<label for="jornais">Jornais</label>
					<input type="checkbox" id="jornais" name="comonosconheceu" value="Jornais"> 
					<label for="indicacao">Indicação</label>
					<input type="checkbox" id="indicacao" name="comonosconheceu" value="Indicação"> 
					<label for="redes">Redes Socias</label>
					<input type="checkbox" id="redes" name="comonosconheceu" value="Redes Socias"> 
					<label for="google">Google</label>
					<input type="checkbox" id="google" name="comonosconheceu" value="Google"> 
					<label for="revistas">Revistas</label>
					<input type="checkbox" id="revistas" name="comonosconheceu" value="Revistas"> 
					<label for="outros">Outros</label>
					<input type="checkbox" id="outros" name="comonosconheceu" value="Outros"> 
					<div id="infocomonosconheceu" class="error_msg"></div>
				</fieldset>

				<fieldset>
					<legend> Mensagem </legend>
					<textarea name="msg" rows="10" id="messageFromUser"></textarea>
					<div id="infomsg" class="error_msg"></div>
				</fieldset>
				
				<input type="hidden" id="acao" name="acao" value="contato">
				
				<input type="submit" class="btnpattern" id="enviarbtn" value="Enviar">
				<input type="reset" class="btnpattern" id="cancelarbtn" value="Cancelar">
			</form>
		</div>

	</body>
</html>
