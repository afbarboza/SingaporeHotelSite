/**
 * Documento JavaScript : gerenciar.js
 * Esse artefato tem como objetivo armazenar código JS associado com as páginas 
 * de gerenciamento do sistema, ou seja, pertencente à visão privada administrador
 */

// Validation Document
function myInfo (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(153, 204, 0)" ){
		$(element).toggleClass("blueText");
	}
}

function myInfoAccepted (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(255, 51, 0)" ){
		$(element).toggleClass("blueText");
	}
}

function valida_criterio() {
	var option, input1, input2;
	option = $("#cbcriterio option:selected").val();
	
	// If it's empty get out
	if(option == 'empty'){
		return false;
	}
	
	if( option == 'periodo' ){
		input1 = $("#periodoinicio").val();
		input2 = $("#periodofim").val();
		
		// Testa se ta vazio
		if( input1 == '' || input2 == '') {
			myInfo("#infomsg", "Insira ambos os períodos.");
			return false;
		}
		
		console.log("ANTES: input1: "+input1);
		console.log("ANTES: input2: "+input2);
		
		// Testa se ta no formato
		var patt = new RegExp("^([0-9])?[0-9]\/([0-9])?[0-9]\/[0-9][0-9][0-9][0-9]$");
		if( !patt.test(input1) || !patt.test(input2)){
			myInfo("#infomsg", "Insira ambos os períodos no formato correto (DD/MM/AAAA).");
			return false;
		}
	}if( option == 'nome' ){
		input1 = $("#nome").val();
		if(input1 == '') {
			myInfo("#infomsg", "Insira o nome do usuário.");
			return false;
		}
	}
	myInfo("#infomsg", "");
	return true;
}

//REMOCAO DE USUARIO(S)
function sendRequetRemoveUsers() {
	
	if( $('#buscausuarioform input[type=checkbox]:checked').length > 0 ){	
		// Carregar usuarios a serem excluidos:
		var $myTable = $('#tableresult'), myTable = $myTable[0];
		var rowCount = $("#tableresult tr").length;
		var lista = new Array();
		
		console.log("rowCount: "+rowCount);
		var listIdx = 0;
		// Percorre a tabela e ve qual está selecionado:
		for (var int = 1; int < rowCount; int++) {
			console.log(" Remover ID: "+myTable.rows[int].cells[0].innerHTML);
			
			// Captura o id do usuário
			var id = myTable.rows[int].cells[0].innerHTML;
			
			// Se está selecionado, insere na lista de ids selecionados
			var teste = $("#checkid"+int).is(":checked");
			console.log(" > Teste: "+teste);
			if (teste){
				lista[listIdx++] = id;
				console.log("Inseriu id : "+id);
			}
		}
		console.log("list: "+JSON.stringify(lista));
		
		console.log("Enviando pedido de remocao... ");
		
		/*********************************************************/
		
		$.ajax({
			type: 'post',
			url: 'servlets/ServletRemoverUsuario',
			dataType: 'json',
			contentType: 'application/json',
			mimeType: 'application/json',
			data: JSON.stringify(lista),
			success: function (data) {
				alert('Recebeu dado do server! \n Data: '+JSON.stringify(data));
				$("tr:has(td)").remove();	
//				document.getElementById('res').innerHTML = data;
			},
			error: function (data, status, er) {
//				document.getElementById('res').innerHTML = "<br><p>Não foi possível receber os dados do servidor.<br/> data: "+data+"<br/> status: "+status+"<br/>er: "+er+"</p>";	
				alert("<br><p>Não foi possível receber os dados do servidor.<br/> data: "+data+"<br/> status: "+status+"<br/>er: "+er+"</p>");
			}
		});
	}
}

//CONSULTA DE USUARIO(S)
function sendRequetNextUsers() {
	var nomeu, option;
	
	option = $("#cbcriterio option:selected").val();
	
	if( option == 'nome' ){
		nomeu = $('#nome').val().trim();
		
		console.log("Nome enviado: "+nomeu);
		
		/*********************************************************/
		$.ajax({
			type: 'post',
			url: 'servlets/ServletConsultarUsuario',
			dataType: 'json',
			mimeType: 'application/json',
			data: {
				acao: 'buscarnome',
				nome: nomeu
			},
			success: function (data) {
				console.log('Recebeu dado do server! \n Data: '+JSON.stringify(data));
				if (data.length == 0) {
					alert("Não há resultados para a pesquisa realizada.");
				} else {
					
					var tableresult = $("#tableresult");
					$("tr:has(td)").remove();	// Remove todas as linhas da tabela
					var count = 1;
					$.each(data, function (index, usuario) {
						var td_nome = $("<td/>");
						td_nome.append(usuario.nome).css( "width", "25%");
						var td_email = $("<td/>");
						td_email.append(usuario.email).css( "width", "25%");
						
						// Inserindo o id num campo hidden que será utilizado na remocao/consulta
						var td_id = $("<td/>");
						td_id.append(usuario.id).css( "width", "10%");
						
						var td_tipo = $("<td/>");
						if(usuario.isAdmin){
							td_tipo.append("Admin").css( "width", "20%");
						} else {
							td_tipo.append("Comum").css( "width", "20%");
						}

						var td_data = $("<td/>");
						td_data.append(new Date(usuario.dataCadastro).toUTCString()).css( "width", "20%");

						var td_check = $("<td/>");
						console.log("Atribuiu ao checkbox o id "+count);
						td_check.append("<input id=\"checkid"+(count++)+"\"type=\"checkbox\">").css( "width", "10%");
						
						tableresult.append($("<tr/>").append(td_id).append(td_nome).append(td_email).append(td_tipo).append(td_data).append(td_check));
					});
				}
			},
			error: function (data, status, er) {
//				document.getElementById('res').innerHTML = "Não foi possível receber os dados do servidor.<br/> data: "+data+"<br/> status: "+status+"<br/>er: "+er;	
				alert("Não foi possível receber os dados do servidor.\ndata: "+data+"\nstatus: "+status+"\ner: "+er);
			}
		});
	} 
	if (option == 'periodo'){
		console.log("Busca por periodo...");
		var startDate = $("#periodoinicio").val();
		var endDate = $("#periodofim").val();
		
		$.ajax({
			type: 'post',
			url: 'servlets/ServletConsultarUsuario',
			dataType: 'json',
			mimeType: 'application/json',
			data: {
				acao: 'buscarperiodo',
				inicio: startDate,
				fim: endDate
			},
			success: function (data) {
				console.log('Recebeu dado do server! \n Data: '+JSON.stringify(data));
				if (data.length == 0) {
					alert("Não há resultados para a pesquisa realizada.");
				} else {
					var tableresult = $("#tableresult");
					$("tr:has(td)").remove();	// Remove todas as linhas da tabela
					var count = 1;
					$.each(data, function (index, usuario) {
						var td_nome = $("<td/>");
						td_nome.append(usuario.nome).css( "width", "25%");
						var td_email = $("<td/>");
						td_email.append(usuario.email).css( "width", "25%");
						
						// Inserindo o id num campo hidden que será utilizado na remocao/consulta
						var td_id = $("<td/>");
						td_id.append(usuario.id).css( "width", "10%");
						
						var td_tipo = $("<td/>");
						if(usuario.isAdmin){
							td_tipo.append("Admin").css( "width", "20%");
						} else {
							td_tipo.append("Comum").css( "width", "20%");
						}

						var td_data = $("<td/>");
						td_data.append(new Date(usuario.dataCadastro).toUTCString()).css( "width", "20%");

						var td_check = $("<td/>");
						console.log("Atribuiu ao checkbox o id "+count);
						td_check.append("<input id=\"checkid"+(count++)+"\"type=\"checkbox\">").css( "width", "10%");
						
						tableresult.append($("<tr/>").append(td_id).append(td_nome).append(td_email).append(td_tipo).append(td_data).append(td_check));
					});
				}
			},
			error: function (data, status, er) {
//				document.getElementById('res').innerHTML = "Não foi possível receber os dados do servidor.<br/> data: "+data+"<br/> status: "+status+"<br/>er: "+er;	
				alert("Não foi possível receber os dados do servidor.\n data: "+data+"\n status: "+status+"\ner: "+er);
			}
		});
		
	}
}


$(document).ready(function(){
	console.log("gerenciar.js loaded successfully.");
	
	/*******************************************
	 * Pagina: ger_usuarios.jsp
	 */
	
	$("#cbcriterio").change(function(){
		var label, fields, input, option, action, msgdiv;
		
		$("tr:has(td)").remove();	// Remove todas as linhas da tabela
		
		option = $("#cbcriterio option:selected").val();
		
		// If it's empty get out
		if(option == 'empty'){
			return;
		}
		
		fields = $("#fields");
		fields.empty();
		
		console.log("TEXT: "+$("#cbcriterio option:selected").text());
		console.log("VAL: "+$("#cbcriterio option:selected").val());
		
		if( option == 'periodo' ){
			label = $("<h4> Período de cadastro: </h4>");
			input = $("<label> De: </label> <input type=\"text\" id=\"periodoinicio\" name=\"periodoinicio\" placeholder=\"DD/MM/AAAA\"> <label> Até: </label> <input type=\"text\" id=\"periodofim\" name=\"periodofim\" placeholder=\"DD/MM/AAAA\">");
			action = $("<input type=\"hidden\" name=\"acao\" value=\"buscarusuario\">");
		}else{
			label = $("<label> Nome: </label>"); 
            input = $("<input type=\"text\" id=\"nome\" name=\"nome\">");
            action = $("<input type=\"hidden\" name=\"acao\" value=\"buscarperiodo\">");
		}
		myInfo("#infomsg", "");
		fields.append(label);
		fields.append(input);
		fields.append(action);	
	});
	
	$("#btnbuscaruser").click( function(event) {
		var option;
		
		option = $("#cbcriterio option:selected").val();
		// If it's empty get out
		if(option == 'empty'){
			console.log("preventDefault - NENHUM CRITERIO SELECIONADO");
			myInfo("#infomsg", "Selecione um critério.");
			event.preventDefault();
			return;
		}
		
		if ( valida_criterio() ) {
			console.log("Chamando Ajax!");
			sendRequetNextUsers();
		}
	});
	
	$("#btnremoveruser").click( function() {
		var qtdeSelecionados = $('#buscausuarioform input[type=checkbox]:checked').length;
		console.log("> Num de checheboxes marcados: "+qtdeSelecionados);
		if (qtdeSelecionados > 0) { 
			sendRequetRemoveUsers();
		}
	});
	
	
});












