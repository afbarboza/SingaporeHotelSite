<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="pt-BR">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>.: Singapore Hotel</title>
    <link rel="stylesheet" href="/singaporeHotel/css/main.css" />
    <link rel="stylesheet" href="/singaporeHotel/css/home.css" />
    <link rel="stylesheet" href="/singaporeHotel/css/gerenciar.css" />
    <script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
    <script src="/singaporeHotel/js/general_events_handler.js"></script>  
    <script src="/singaporeHotel/js/validation.js"></script>
    <script src="/singaporeHotel/js/gerenciar.js"></script>
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
    <%@ include  file="menu_admin.jsp" %> <!-- Inclui o menu em tempo de compilacao -->
    
    <div class="formclass color_font_pattern">
      <h3> Gerenciar usuários </h3> 
      
      <fieldset>
        <legend> Buscar usuários </legend>
        <p>
        <div id="criterio">
          <label> Critério de busca </label>
          <select id="cbcriterio" name="criterio">
            <option value="empty" selected> - </option>
            <option value="nome"> Nome de usuário(s) </option>
            <option value="periodo"> Período de cadastro </option>
          </select>
        </div>
        <p/>
          <div id="fields"> </div>
          <div id="infomsg" class="error_msg"></div>
          <input type="button" id="btnbuscaruser" class="btnpattern" value="Buscar">
          <input type="hidden" name="next" value="0">
        
      </fieldset>
      
      <form id="buscausuarioform">
        <fieldset>
          <legend> Resultado </legend>
          <div id="content">
            
            <table id="tableresult" style="width: 100%">
              <thead> 
                <tr class="titletr">
                  <th style="text-align: left"> ID </th>
                  <th  style="text-align: left"> Nome </th>
                  <th style="text-align: left"> Email </th>
                  <th style="text-align: left"> Tipo </th>
                  <th style="text-align: left"> Data Cadastro </th>
                  <th style="text-align: left"> Selecionar </th>
                </tr>
              </thead>
            </table>
            <input type="button" id="btnremoveruser" class="btnpattern" title="Click aqui para excluir os usuários selecionados." value="Excluir selecionados">
            
            <p id="res"></p>
          </div>
        </fieldset>
      </form>
      
      
    </div>
    
  </body>
</html>