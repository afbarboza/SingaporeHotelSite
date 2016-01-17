<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="pt-BR">
	<head>
		<title>.: Cadastro</title>
		<link rel="stylesheet" type="text/css" href="/singaporeHotel/css/main.css"></link>
		<link rel="stylesheet" href="/singaporeHotel/css/home.css" />
        <script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
		<script src="/singaporeHotel/js/validation.js"></script> 
		<script src="/singaporeHotel/js/layout_adjusts.js"></script>	
		<!-- Observacao: para a correta realizacao do cadastro, eh necessario a inclusao dos seguintes sources. -->
		<script src="/singaporeHotel/js/cadastro_controller.js"></script>
		<script src="/singaporeHotel/js/user_class.js"></script>
        <script src="/singaporeHotel/js/general_events_handler.js"></script>
        
          
		<script>
			// Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande.

			$(document).ready( function(){
				document.getElementById("register_body").style.backgroundImage = "url(/singaporeHotel/img/hotel2.jpg)";
			});

		</script>

	</head>

	<body id="register_body">
		<%@ include file="menu_publico.jsp" %>

		<div class="formclass color_font_pattern">
			<h3>Cadastro</h3> 

			<form id="registerform" method="POST" action="/singaporeHotel/servlets/ServletHotel">
				<fieldset>
					<legend>Informações Pessoais </legend>
					<div id="nome">
						<label> Nome completo </label> 
						<input type="text" name="nome" id="tfnomecompleto" autofocus>
						<div id="infonome" class="error_msg"></div>
					</div>
	
					<div id="cpf">
						<label> CPF </label> 
						<input type="text" name="cpf" id="tfcpf">
						<div id="infocpf" class="error_msg"></div>
					</div>
	
					<div id="datanasc">
						<label> Data de nascimento </label> 
						<input type="date" name="datanasc" id="dataNasc">
						<div id="infodatanasc" class="error_msg"></div>
					</div>
	
					<div id="sexo">
						<label> Sexo </label> 
						<input type="radio" id="masculino" name="sexo" value="m">
						<label for="masculino">Masculino</label>
						<input type="radio" id="feminino" name="sexo" value="f">
						<label for="feminino">Feminino</label>	
						<div id="infosexo" class="error_msg"></div>
					</div>
	
					<div id="estado_civil">
						<label> Estado civil </label>
						<select name="estadocivil" title="Selecione seu estado civil" id="marital_status">
							<option value="unknown" selected=""> - </option>
							<option value="solteiro"> Solteiro(a) </option>
							<option value="casado"> Casado(a) </option>
							<option value="divorciado"> Divorciado(a) </option>
							</select>
						<div id="infoestadocivil" class="error_msg"></div>
					</div>
				</fieldset>
				<fieldset>
					<legend>Endereço </legend>
					<div id="cidade">
						<label> Cidade </label> 
						<input type="text" name="cidade" id="user_city">
						<div id="infocidade" class="error_msg"></div>
					</div>

					<div id="estado">
						<label> Estado </label> 
						<select name="estado" title="Selecione o estado no qual você reside" id="user_state">
				            <option value="unknown" selected=""> - </option>
				            <option value="ac"> AC </option>
				            <option value="al"> AL </option>
				            <option value="ap"> AP </option>
				            <option value="am"> AM </option>
				            <option value="ba"> BA </option>
				            <option value="ce"> CE </option>
				            <option value="df"> DF </option>
				            <option value="es"> ES </option>
				            <option value="go"> GO </option>
				            <option value="ma"> MA </option>
				            <option value="mt"> MT </option>
				            <option value="ms"> MS </option>
				            <option value="mg"> MG </option>
				            <option value="pa"> PA </option>
				            <option value="pb"> PB </option>
				            <option value="pr"> PR </option>
				            <option value="pe"> PE </option>
				            <option value="pi"> PI </option>
				            <option value="rj"> RJ </option>
				            <option value="rn"> RN </option>
				            <option value="rs"> RS </option>
				            <option value="ro"> RO </option>
				            <option value="rr"> RR </option>
				            <option value="sc"> SC </option>
				            <option value="sp"> SP </option>
				            <option value="se"> SE </option>
				            <option value="to"> TO </option>
				          </select>
						<div id="infoestado" class="error_msg"></div>
					</div>

					<div id="cep">
						<label> CEP </label> 
						<input type="text" name="cep" id="user_zipcode">
						<div id="infocep" class="error_msg"></div>
					</div>
				</fieldset>
				<fieldset>
					<legend>Credenciais </legend>
					<div id="email">
						<label> Email </label> 
						<input type="email" name="email" id="tfemail">
						<div id="infoemail" class="error_msg"></div>
					</div>

					<div id="senha">
						<label> Senha </label> 
						<input type="password" name="senha" id="user_password">
						<div id="forcasenha">
							<div class="container_progress_bar">
								<div id="progress_bar"></div>
							</div>
							<div id="infoprogbar"> Força da senha </div>
						</div>
						<div id="infosenha" class="error_msg"></div>
					</div>

					<div id="confsenha">
						<label> Confirme a senha </label> 
						<input type="password" name="confsenha" id="conf_pass">
						<div id="infoconfsenha" class="error_msg"></div>
					</div>
				</fieldset>
				
				<input type="hidden" id="acao" name="acao" value="cadastrar">
				
				<input type="submit" class="btnpattern" id="cadastrarbtn" value="Cadastrar">
				<input type="reset" class="btnpattern" id="cancelarbtn" value="Cancelar">
				
			</form>
		</div>
	
		
	
	</body>


</html>
