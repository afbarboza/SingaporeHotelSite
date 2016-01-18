package servlets;

import java.io.IOException;
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

public class RemoverReservaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RemoverReservaServlet() {
        super();
    }

	public void init(ServletConfig config) throws ServletException {
		
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}

	void processar(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		String acao = request.getParameter("acao");
		String url = "erro.jsp";
		Usuario usuario_logado = (Usuario) session.getAttribute("logged_user");
		
		if (usuario_logado == null) {
			return;
		}
		
		
	}
}
