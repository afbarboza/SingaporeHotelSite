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
        document.getElementById("home_body").style.backgroundImage = "url(/singaporeHotel/img/hotel.jpg)";
      });

    </script>

  </head>

  <body id="home_body">
   <%@ include file="menu_publico.jsp" %>
        
    <div class="formclass color_font_pattern">
      <h3> Erro ao autenticar-se </h3> 
      <%-- Current time: <%= new java.util.Date() %>
      Session ID: <%= session.getId() %> --%>
      <p> ${msglogin} </p>
      
      <c:remove var="msglogin" scope="session" />
      
      <fieldset>
        <legend> Esqueceu sua senha? </legend>
        
        
        <form id="errloginform" method="post" action="/singaporeHotel/servlets/ServletLogin">     
          <p> <h6>Informe seu email para receber uma nova senha, via email. </h6></p>
          <input type="text" id="tfemail" class="tfpattern" name="email">
          <div id="infoemail" class="error_msg"></div>
          <input type="hidden" id="acao" name="acao" value="recuperarsenha"> 
          <input type="submit" id="recoverbtn" class="btnpattern" value="Receber nova senha" />
          <input type="button" id="loginpagebtn" class="btnpattern" value="Página de login" />
        
        </form>
      </fieldset>
    </div>
  
  </body>
</html>