package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.Contract;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ServletRemoverUsuario
 */
public class ServletRemoverUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletRemoverUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }

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
			//1. get received JSON data from request
			BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String json = "";
			if(br != null){
				json = br.readLine();
			}
			System.out.println(" > Remover usuarios ");
			
			System.out.println("lista recebida: "+json);
			
			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();
			
			if(json.isEmpty()){
				// 6. Send res as JSON to client
				mapper.writeValue(response.getOutputStream(), new String(""));
			} else {
		        json = json.replace("[", "");
				json = json.replace("]", "");
				json = json.replace("\"", "");
				
				String splited[] = json.split(",");
				
				System.out.println("json = "+json);
				System.out.println("splited size = "+splited.length);
	
				// Excluir de fato:
				excluirUsuarios(splited);
				
		        // 4. Set response type to JSON
		        response.setContentType("application/json");       	        
		        
		        String res = "Usuários exluídos com sucesso!";
		      
		        // 6. Send res as JSON to client
				mapper.writeValue(response.getOutputStream(), res);
			}
		}catch(Exception e){
			e.printStackTrace();
			
			
		}

	}

	private void excluirUsuarios(String[] splited) {
		ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
		for (int i=0; i<splited.length; i++) {
			lista.get(Integer.valueOf(splited[i])).setIsValidUser(false);;
		}
	}

}
