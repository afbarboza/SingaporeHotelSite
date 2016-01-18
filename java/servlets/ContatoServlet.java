package servlets;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ContatoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ContatoServlet() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}
	
	void processar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String acao = request.getParameter("acao");
		
		if (acao.equals("contato")) {			
			ArrayList<Contato> setOfMessages = (ArrayList<Contato>) session.getAttribute("setOfMessages");
			if (setOfMessages == null) {
				setOfMessages = new ArrayList<Contato>();
			}
			/* instancia uma nova mensagem ao hotel */
			Contato novo_contato = new Contato();
			novo_contato.setNome((String)session.getAttribute("name"));
			novo_contato.setEmail((String) session.getAttribute("email"));
			novo_contato.setCelular((String) session.getAttribute("celular"));
			ArrayList<String> como_nos_conheceu = new ArrayList<String>();
			String[] checkBox = request.getParameterValues("comonosconheceu");
			for (int i = 0; i < checkBox.length; i++) {
				if (checkBox[i] != null)
					como_nos_conheceu.add(checkBox[i]);
			}
			novo_contato.setComonosconheceu(como_nos_conheceu);
			novo_contato.setMsg((String) session.getAttribute("msg"));
			
			/* adiciona a nova mensagem ao array list de mensagens */
			setOfMessages.add(novo_contato);
			session.setAttribute("setOfMessages", setOfMessages);
		}
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("../home.jsp");
		dispatcher.forward(request, response);
	}

}
