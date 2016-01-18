package servlets;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContainerInitializer;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import util.Contract;

public class FazerReservaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	/**
	 * 
	 * do dummy bookings to debug, only.
	 * DO NOT call this function at the final version of T2.
	 * 
	 */
	void doDummyBookings(ArrayList<Reserva> recordOfBookings) {
		
		Reserva r = new Reserva();
		r.setDataEntrada(new Date());
		r.setDataSaida(new Date());
		r.setIdUsuario(1);
		r.setIsValidBooking(true);
		recordOfBookings.add(r);
		
		r = new Reserva();
		r.setDataEntrada(new Date());
		r.setDataSaida(new Date());
		r.setIdUsuario(1);
		r.setIsValidBooking(true);
		recordOfBookings.add(r);		
		
		
		System.out.println(">> INSERIU DUMMY DATA RESERVA.");
	}
	
	/**
     * @param request: o HTTP Request da requisição
     * @param session: escopo sessão da request enviada como parametro.
     * @param recordOfBookings: registro geral de reservas efetuadas no hotel
     * @param user: usuario logado na sessão
     * @return Esta função não tem retorno
     * @author Alex Barboza.
     */
	void doBooking(HttpServletRequest request, HttpSession session, ArrayList<Reserva> recordOfBookings, Usuario user) throws ParseException {
		
		/*Obtendo data de checkin e checkout*/
		String strDataCheckin = request.getParameter("dataentrada");
		String strDataCheckout = request.getParameter("datasaida");
		
		DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");
		DateFormat format2 = new SimpleDateFormat("dd/MM/yyyy");
		
		Date checkIn = format1.parse(strDataCheckin);
		Date checkOut = format2.parse(strDataCheckout);
		
		Reserva reserva = new Reserva();
		reserva.setDataEntrada(checkIn);
		reserva.setDataSaida(checkOut);
		reserva.setQtdAdultos(Integer.valueOf(request.getParameter("qtdeadultos")));
		reserva.setQtdCriancas(Integer.valueOf(request.getParameter("qtdecriancas")));
		reserva.setQtdBebes(Integer.valueOf(request.getParameter("qtdebebes")));
		reserva.setIdUsuario(user.getId());
		reserva.setIsValidBooking(new Boolean(true));
		reserva.setIdUsuario(user.getId());
		
		recordOfBookings.add(reserva);
		user.getBookingIdx().add(recordOfBookings.indexOf(reserva));
		session.setAttribute("recordOfBookings", recordOfBookings);		
	}
	
    public FazerReservaServlet() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}

	void processar(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException, ServletException {
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("application/json"); 
		String answerClient = null;
		String url = null;
		
		try {
			HttpSession session = request.getSession();
			String acao = request.getParameter("acao");
				
			
			if (acao.equals("reserva")) {
				Usuario usuario = (Usuario) session.getAttribute(Contract.USUARIO);
				
				@SuppressWarnings("unchecked")
				ArrayList<Reserva> recordOfBookings = (ArrayList<Reserva>) session.getAttribute(Contract.RESERVAS);
				
				/*SE não existe um registro de reservas geral na sessão, entao cria um */
				if (recordOfBookings == null) {
					recordOfBookings = new ArrayList<Reserva>();
				}
				
				doDummyBookings(recordOfBookings);
				doBooking(request, session, recordOfBookings, usuario);
				
				answerClient = "Sua reserva foi efetuada com sucesso!. :) ";
				
				url = "home_comum.jsp";
			} else if (acao.equals("cancelar")) {
				url = "home_comum.jsp";
			} else {
				url = "erro.jsp";
			}
		} catch (Exception e) {
			answerClient = "Desculpe-nos. Não foi possível efetuar sua reserva. :( ";
			e.printStackTrace();
		}
			
		mapper.writeValue(response.getOutputStream(), answerClient);
	}
}
