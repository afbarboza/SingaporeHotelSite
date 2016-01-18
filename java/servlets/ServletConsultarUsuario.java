package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.Contract;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ServletConsultarUsuario
 */
public class ServletConsultarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	 /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletConsultarUsuario() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processar(request, response);
	}

	
	private ArrayList<Usuario> buscarUsuarios(String nome) {
		try {

			ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
			ArrayList<Usuario> res = new ArrayList<Usuario>();
			for (Usuario usuario : lista) {
				if (usuario.getNome().toLowerCase().contains(nome.toLowerCase()) && usuario.getIsValidUser()){
					res.add(usuario);
					System.out.println(" + Inseriu "+usuario.getNome()+ " na lista.");
				}
			}
			return res;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private ArrayList<Usuario> buscarUsuarios(Date dataInicio, Date dataFim) {
		try {
			ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
			ArrayList<Usuario> res = new ArrayList<Usuario>();
			for (Usuario usuario : lista) {
				if ((usuario.getDataCadastro().after(dataInicio) && usuario.getDataCadastro().before(dataFim)) && usuario.getIsValidUser()){
					res.add(usuario);
					System.out.println(" + Inseriu "+usuario.getNome()+ " na lista.");
				}
			}
			return res;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	private void processar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Entrou em ServletConsultarUsuario");
		try {
			String acao = request.getParameter("acao");
	        
			System.out.println("acao : "+request.getParameter("acao"));
			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();
				        
	
	        // 4. Set response type to JSON
	        response.setContentType("application/json");       
	 
	        if(acao.equals("buscarnome")) {
				System.out.println("nome : "+request.getParameter("nome"));
				
				String nome = request.getParameter("nome");
				ArrayList<Usuario> lista = buscarUsuarios(nome);
				mapper.writeValue(response.getOutputStream(), lista);
				
			} else if (acao.equals("buscarperiodo")) {
				String strInicio = request.getParameter("inicio");
				String strFim = request.getParameter("fim");
				
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				Date dataInicio = sdf.parse(strInicio);
				Date dataFim = sdf.parse(strFim);
				
				System.out.println("Data inicio: "+dataInicio);
				System.out.println("Data fim "+dataFim);
				
				ArrayList<Usuario> lista = buscarUsuarios(dataInicio, dataFim);
				System.out.println("Enviando lista, size: "+lista.size());
				mapper.writeValue(response.getOutputStream(), lista);
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
