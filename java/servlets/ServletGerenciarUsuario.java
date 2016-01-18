package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.channels.SeekableByteChannel;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.CORBA.TCKind;

import util.Contract;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ServletGerenciar
 */
public class ServletGerenciarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletGerenciarUsuario() {
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

	
	private void processar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Entrou em ServletGerenciarUsuario");
		try {
			String url="";
			String acao = request.getParameter("acao");
	        
			System.out.println("acao : "+request.getParameter("acao"));
			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();
				        
	
	        // 4. Set response type to JSON
	        response.setContentType("application/json");       
	 
	        if(acao == null){
				 //1. get received JSON data from request
		        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		        String json = "";
		        if(br != null){
		            json = br.readLine();
		        }
				System.out.println(" > Remover usuarios ");
				
				System.out.println("lista: "+json);
				
		        // 3. Convert received JSON to Article
		        ArrayList<Usuario> lista = (ArrayList<Usuario>) mapper.readValue(json, ArrayList.class);
		        
		        System.out.println("Recebeu "+lista.size()+" para serem excluidos.");
		        
		        // Excluir de fato:
		        
		        
		        String res = "Usuários exluídos com sucesso!";
		        ArrayList<String> a = new ArrayList<String>();
		        a.add(res);
		        // 6. Send List<Article> as JSON to client
		        mapper.writeValue(response.getOutputStream(), a);
		        
			}else if(acao.equals("buscarnome")){
				System.out.println("nome : "+request.getParameter("nome"));
				
				String nome = request.getParameter("nome");
				ArrayList<Usuario> lista = buscarUsuarios(nome);
				mapper.writeValue(response.getOutputStream(), lista);
				
			}else{
				url = "erro.jsp";
			}
			
//			RequestDispatcher dispatcher = request.getRequestDispatcher("../"+url);
//			dispatcher.forward(request, response);
			
		}catch(Exception e){
			e.printStackTrace();
			
			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();
			//1. get received JSON data from request
	        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
	        String json = "";
	        if(br != null){
	            json = br.readLine();
	        }
			System.out.println(" > Remover usuarios ");
			
			System.out.println("lista: "+json);
			
	        // 3. Convert received JSON to Article
	        ArrayList<Usuario> lista = (ArrayList<Usuario>) mapper.readValue(json, ArrayList.class);
	        
	        System.out.println("Recebeu "+lista.size()+" para serem excluidos.");
	        
	        // Excluir de fato:
	        
	        
	        String res = "Usuários exluídos com sucesso!";
	        ArrayList<String> a = new ArrayList<String>();
	        a.add(res);
	        // 6. Send List<Article> as JSON to client
	        mapper.writeValue(response.getOutputStream(), a);
		}
		
		
		
		
	}

}
