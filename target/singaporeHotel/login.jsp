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
    <script src="/singaporeHotel/js/login_controller.js"></script>
    <script>
      /* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de prejudicar a manutenibilidade. */

      $(document).ready( function(){
        document.getElementById("home_body").style.backgroundImage = "url(/singaporeHotel/img/hotel.jpg)";
      });

    </script>

  </head>

  <body id="home_body">
    <%@ include file="menu_publico.jsp" %>
    <!-- <nav class="nav_container barfont"></nav> -->
      
      <div class="formclass color_font_pattern">
        <h3> Login </h3> 
        
        <fieldset>
          <legend> Credenciais </legend>
          <form id="loginform" method="post" action="/singaporeHotel/servlets/ServletLogin"> 
            <div id="email"> 
              <label>Email</label> <input type="email" name="email" class="tfpattern" id="tfemail" required autofocus></input>
              <div id="infoemail" class="error_msg"></div>
            </div>          
            <div id="password">
              <label>Senha</label> <input type="password" name="password" class="tfpattern" id="tfpassword" required></input>
            </div>
            <input type="hidden" id="acao" name="acao" value="login"> 
            <input type="submit" id="loginbtn2" class="btnpattern" value="Entrar"></input>
            <!-- <input type="button" id="registerbtn" class="btnpattern" value="Cadastre-se"></input> -->
          </form>
        </fieldset>
      </div>
    
  </body>
</html>