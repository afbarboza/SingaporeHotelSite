package servlets;

import util.Contract;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class ConsultarReservaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	/*
	 * Determina se uma data de checkin e checkout estao num intervalo de tempo
	 * predterminado pelo usuario.
	 * 
	 */
	private boolean compareBookingDate(Date floor, Date ceil, Date checkin, Date checkout) {
		boolean isInDateGap = false;
		
		if (floor == null || ceil == null) {
			if (checkin == null || checkout == null) {
				return false;
			}
		}
		
		if (checkin.equals(floor) || checkin.after(floor)) {
			if (checkout.equals(ceil) || checkout.before(ceil)) {
				isInDateGap = true;
			}
		}
		
		return isInDateGap;
	}
	
	public void doUserCallback(HttpServletRequest request, HttpServletResponse response, ArrayList<Reserva> registroReservasUsuario) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();		
		response.setContentType("application/json");
		mapper.writeValue(response.getOutputStream(), registroReservasUsuario);
	}
	
    public ConsultarReservaServlet() {
        super();
    }

	public void init(ServletConfig config) throws ServletException {
		
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			System.out.println("Requisição recebida pelo servidor\n");
			processar(request, response);
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("MENSAGEM DO SERVIDOR: ");
			System.out.println("ERRO: ConsultarReservaServlet. Descrição: parsing de string para data não realizado");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			System.out.println("Requisição recebida pelo servidor\n");
			processar(request, response);
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("MENSAGEM DO SERVIDOR: ");
			System.out.println("ERRO: ConsultarReservaServlet. Descrição: parsing de string para data não realizado");
		}
	}

	void processar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, ParseException {
		HttpSession session = request.getSession();
		String acao = request.getParameter("acao");
		Usuario usuario_logado = (Usuario) session.getAttribute(Contract.USUARIO);
		String url = "erro.jsp";		
		
		try {
			if (acao.equals("consultar_reservas")) {
				/* delimita o período em que o usuário faz buscas */
				String strDateFloor = (String) request.getParameter("dateFloor");
				String strDateCeil = (String) request.getParameter("dateCeil");
				
				DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");
				DateFormat format2 = new SimpleDateFormat("dd/MM/yyyy");
				
				Date dateFloor, dateCeil;
				dateFloor = format1.parse(strDateFloor);
				dateCeil = format2.parse(strDateCeil);
				
				/*Armazena todo o histórico de reservas feitos por todos os usuários logados durante a sessão*/
				@SuppressWarnings("unchecked")
				ArrayList<Reserva> registroGeralReservas = (ArrayList<Reserva>) session.getAttribute("recordOfBookings");
				
				/*Armazena o histórico de reservas feitos pelo usuário logado que faz a consulta*/
				ArrayList<Reserva> registroReservasUsuario = new ArrayList<Reserva>();
				
				int idUser = usuario_logado.getId().intValue();
				for (Reserva r : registroGeralReservas) {
					boolean isInSpecifiedPeriod = compareBookingDate(dateFloor, dateCeil, r.getDataEntrada(), r.getDataSaida());
					
					if ( (r.getIdUsuario().intValue()) == idUser) {
						if (isInSpecifiedPeriod)
							registroReservasUsuario.add(r);
					}
				}
				/* session.setAttribute("loggedUsrBookings", registroReservasUsuario); */
				doUserCallback(request, response, registroReservasUsuario);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			RequestDispatcher dispatcher = request.getRequestDispatcher("../"+url);
			dispatcher.forward(request, response);
		}
	}
}
