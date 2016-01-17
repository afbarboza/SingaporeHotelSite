<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="pt-BR">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>.: Singapore Hotel</title>
    <link rel="stylesheet" href="/singaporeHotel/css/main.css" />
    <link rel="stylesheet" href="/singaporeHotel/css/home.css" />
    <script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
    <script src="/singaporeHotel/js/general_events_handler.js"></script>  
    <script src="/singaporeHotel/js/validation.js"></script>
    <script src="/singaporeHotel/js/layout_adjusts.js"></script>  
    <script src="/singaporeHotel/js/user_class.js"></script>
    <!-- <script src="/singaporeHotel/js/login_controller.js"></script> TODO: remanejar-->
    
    <script>
      /* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de prejudicar a manutenibilidade. */
      $(document).ready( function(){
        document.getElementById("bookings_body").style.backgroundImage = "url(/singaporeHotel/img/hotel.jpg)";
      });	
	</script>
	
	<script>
		function insertTable(data) {
				alert('Reservas foram encontradas no nome dessa pessoa!');
				var tableresult = $("#tableresult");
				$("tr:has(td)").remove();	// Remove todas as linhas da tabela
				$.each(data, function (index, reserva) {
					var td_dataentrada = $("<td/>");
					td_entrada.append(reserva.dataEntrada).css( "width", "45%");
				
					var td_datasaida = $("<td/>");
					td_datasaida.append(reserva.dataSaida).css( "width", "45%");
				
					var td_check = $("<td/>");
					td_check.append("<input type=\"checkbox\">").css( "width", "10%");
				
					// Inserindo o id num campo hidden que será utilizado na remocao/consulta
					var id_hidden = $("<input type=\"hidden\" name=\"id\" value=\""+usuario.id+"\">");
			
				
					tableresult.append($("<tr/>").append(td_dataentrada).append(td_datasaida).append(td_check).append(id_hidden));
				}); 
		}
	
		$(document).ready(function() {
			$("listbtn").click(function() {
				var vdateFloor = $("dateFloor").val();
				var vdateCeil = $("dateCeil").val();
				
				$.ajax({
					type: 'post',
					url: 'servlets/FazerReservaServlet',
					dataType: 'json',
					mimeType: 'application/json',
					data: {
						acao: 'consultar_reservas',
						dateFloor: vdateFloor,
						dateCeil: vdateCeil
					},
					sucess: function(data) {
						insertTable(data);
					},
					error: function (data, status, er) {
						alert('Desculpe-nos. Um erro ocorreu durante a comunicação com o servidor!');
					}
				});
			});
		});
	</script>
	
  </head>

  <body id="bookings_body">
   <%@ include file="menu_comum.jsp" %>        
    <div class="formclass color_font_pattern">      
      <fieldset>
      		<legend>Menu de Opções</legend>
      		<form id="listbookingsform">
      		
      			<div id="dataMinima">
					<label> Do dia: </label> 
					<input type="date" name="dateFloor" id="dateFloor" value="">
					<div id="infodata1" class="error_msg"></div>
				</div>

				<div id="dataMaxima">
					<label> Até o dia: </label> 
					<input type="date" name="dateCeil" id="dateCeil" value="">
					<div id="infodata2" class="error_msg"></div>
				</div>
				
      		 	<input type="button" id="listbtn" name="listbtn" value="Listar reservas" class="btnpattern" onclick="sendAjax()">
      		 	<table id="tableresult" style="width: 100%">
              <thead> 
                <tr class="titletr">
                  <th  style="text-align: left"> ID </th>
                  <th style="text-align: left"> Data de entrada </th>
                  <th style="text-align: left"> Data de saida </th>
                  <th style="text-align: left"> Selecionar </th>
                </tr>
              </thead>
            </table>		
      		</form>
      </fieldset>
    </div>
  
  </body>
</html>