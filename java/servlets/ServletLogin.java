package servlets;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.Contract;

/**
 * Servlet implementation class LoginServlet
 */
public class ServletLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private final boolean DEBUG = true;
    
    private HashMap<String, ArrayList<Date> > tentativas;
    private HashMap<String, Date> contasBloqueadas;
    
    /**
     * @see HttpServlet#HttpServlet()
     */	
    public ServletLogin() {
        super();
    }

    public void doGet (HttpServletRequest request, HttpServletResponse response){
		processar(request, response);
	}

	public void doPost (HttpServletRequest request, HttpServletResponse response){
		processar(request, response);
	}
    
	@Override
    public void init() throws ServletException {
		if (DEBUG) System.out.println(">> Chamou init()");
		this.tentativas = new HashMap<String, ArrayList<Date>>();
		this.contasBloqueadas = new HashMap<String, Date>();
		@SuppressWarnings("unchecked")
		ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
		if(lista == null){
			System.out.println(">> INSERINDO DUMMY USERS");
			lista = new ArrayList<Usuario>();
			
			try {
				// Criacao de um usuario administrador:
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				String dateInString = "10/05/2015";
				Date date = sdf.parse(dateInString);
				Usuario usuario = new Usuario();
				usuario.setNome("admin");
				usuario.setEmail("a@a.com");
				usuario.setSenha("a@a.com");
				usuario.setDataCadastro(date);
				usuario.setIsValidUser(true);
				usuario.setIsAdmin(true);	// seta flag pra indicar que é admin
				
				// Adiciona o administrador no vetor de usuarios
				lista.add(usuario); 
				
				// Criacao de um usuario comum PARA TESTE
				dateInString = "10/06/2015";
				date = sdf.parse(dateInString);
				usuario = new Usuario();
				usuario.setNome("b");
				usuario.setEmail("b@b.com");
				usuario.setSenha("b@b.com");
				usuario.setDataCadastro(date);
				usuario.setIsValidUser(true);
				usuario.setIsAdmin(false);	// seta flag pra indicar que é admin
				
				// Adiciona o administrador no vetor de usuarios
				lista.add(usuario); 
				
				// Criacao de um usuario comum PARA TESTE
				dateInString = "12/06/2015";
				date = sdf.parse(dateInString);
				usuario = new Usuario();
				usuario.setNome("Bota Fogo");
				usuario.setEmail("bo@bo.com");
				usuario.setSenha("bo@bo.com");
				usuario.setDataCadastro(date);
				usuario.setIsValidUser(true);
				usuario.setIsAdmin(false);	// seta flag pra indicar que é admin
				
				// Adiciona o administrador no vetor de usuarios
				lista.add(usuario);
				
				getServletConfig().getServletContext().setAttribute(Contract.USUARIOS_CADASTRADOS, lista);	
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			
		} else {
			System.out.println(" >> Lista diferente de null!!");
		}
	}
	
    private Usuario getCadastrado(String email){
    	@SuppressWarnings("unchecked")
		ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
    	
    	for (Usuario usuario : lista) {
			if (usuario.getEmail().equals(email) && usuario.getIsValidUser()) {
				return usuario;
			}
		}
    	return null;
    }
    
    private boolean isCadastrado(String email){
    	@SuppressWarnings("unchecked")
		ArrayList<Usuario> lista = (ArrayList<Usuario>) getServletConfig().getServletContext().getAttribute(Contract.USUARIOS_CADASTRADOS);
    	
    	for (Usuario usuario : lista) {
    		// TODO: No T3-> talves tire esse isvaliduser, ver getCadastrado tbm!
			if (usuario.getEmail().equals(email)  && usuario.getIsValidUser()) {
				return true;
			}
		}
    	return false;
    }
    
    private int autenticar(HttpServletRequest request) {
    	String email = request.getParameter("email");
    	String senha = request.getParameter("password");
    	
    	// Verifica se o email é cadastrado
    	Usuario usuario = this.getCadastrado(email);
    	
    	if (usuario != null) {
    		// O email já esta cadastrado no sistema
    		
    		// A) Testa se a conta está bloqueada
    		if (isContaBloqueada(email)){
    			request.getSession().setAttribute(Contract.MSG_LOGIN, "Por questões de seguranca esta conta está bloqueada. Tente novamente mais tarde.");
    			return 2;
    		}
    		
    		// B) Testa a senha
    		if (senha.equals(usuario.getSenha())){
    			// Testa se é administrador
    			if(usuario.getIsAdmin()){
    				// Insere usuario em session p/ ser acessado na .jsp correspondente
    				request.getSession().setAttribute(Contract.USUARIO, usuario);
    				
    				return 1;
    			} else{  // é comum
    				request.getSession().setAttribute(Contract.USUARIO, usuario);
    				return 0;
    			}
    		} else { // Senha incorreta
    			// 1- Insere essa tentativa no conjunto de tentativas do usuario
    			inserirTentativa(email);
    			int numTentativas = getQtdeTentativas(email);
    			// 2- Testa se já atingiu o limite
    			if (numTentativas >= 3){ // Se sim, bloqueia a conta
    				if(DEBUG) System.out.println(">> Bloqueou a conta de "+email);
    				this.contasBloqueadas.put(email, new Date());
    				request.getSession().setAttribute(Contract.MSG_LOGIN, "Por questões de seguranca esta conta foi bloqueada por 1 hora.");
    			}else{ // Se não, so seta a msglogin
    				if(DEBUG) System.out.println(">> Setou msglogin ");
    				request.getSession().setAttribute(Contract.MSG_LOGIN, new String("Tentativa número "+numTentativas+"."));
    			}
    			return 2;
    		}
    	} else {
    		request.getSession().setAttribute(Contract.MSG_LOGIN, new String("Usuário não cadastrado."));
    	}
    	
    	return 2;
    }
    
    private void inserirTentativa(String email) {
    	Date curr = new Date();
		ArrayList<Date> dl = this.tentativas.get(email); 
		
		if (dl == null){ // Primeira tentativa
			ArrayList<Date> t = new ArrayList<Date>();
			t.add(curr);
			this.tentativas.put(email, t);			
		} else { // Nao é a primeira tentativa
			dl.add(curr);
			this.tentativas.put(email, dl);
		}
    }
    
    private int getQtdeTentativas(String email) {
		Date curr = new Date();
		int res = 0;
		ArrayList<Date> dl = this.tentativas.get(email);
		long diff;
		long diffMin;
		for (Date date : dl) {
			diff = curr.getTime() - date.getTime();
			diffMin = Math.abs(diff / (60*1000));
			if (diffMin <= 15){
				res++;
			} else {
				// corresponde a uma tentativa antiga qua pode ser removida
				if(dl.remove(date)){
					if(DEBUG) System.out.println(">> Removeu a data antiga.");
				}else{
					if(DEBUG) System.out.println(">> ERRO: Nao conseguiu remover a data antiga.");
				}
				tentativas.remove(email);
				tentativas.put(email, dl);
			}
			System.out.println(" >> [QTDE_TENTATIVAS] ");
		}
		
		return res;
	}
   
   // DATA SUBTRACTION:
    //long diff = Math.abs(d1.getTime() - d2.getTime());
    //long diffDays = diff / (24 * 60 * 60 * 1000);
    	
    private boolean isContaBloqueada(String email) {
    	Date d = this.contasBloqueadas.get(email);
    	Date curr = new Date();
    	if (d != null){
    		long diff = Math.abs(curr.getTime() - d.getTime());
    		System.out.println(" >> [CONTA BLOQUEADA] Email:"+email+", Segundos passados: "+diff/(1000));
    		long diffHours = diff / (60 * 60 * 1000);
    		if (diffHours < 1){
    			// 1- Se ainda está dentro do tempo de bloqueio de 1hora, return true
    			return true;
    		}else{
    			// 2- Caso o tempo de bloqueio passou, remove o email de contas bloqueadas e retorna false
    			this.contasBloqueadas.remove(email);
    			return false;
    		}
    	}
    	return false;
    }

    private boolean logout(HttpServletRequest request){
    	Usuario usuario = (Usuario) request.getSession().getAttribute(Contract.USUARIO);
    	if(usuario != null){
    		request.removeAttribute(Contract.USUARIO);
    		System.out.println("Usuario "+usuario.getNome()+" deslogado com sucesso!");
    		return true;
    	}else{
    		System.out.println("Não existe usuario logado no sistema!");
    	}
    	return false;
    }
    
	private void recuperarSenha(HttpServletRequest request) {
		String email = request.getParameter("email");
		if(email != null){
			if(isCadastrado(email)){
				request.getSession().setAttribute(Contract.MSG_INFO, "Email enviado com sucesso.");
			} else {
				request.getSession().setAttribute(Contract.MSG_INFO, "Email não cadastrado no sistema.");
			}
		}
	}
    
    
	/********************************************************************************/
	public void processar(HttpServletRequest request, HttpServletResponse response){

		try{

			/* recuperando acao */			
			String acao = request.getParameter("acao");
			String url = null;
			
			
			if (acao.equals("login")){
				if (DEBUG){ System.out.println("acao = login"); } 
				    int res = this.autenticar(request); 
				    if (res == 0){
				    	url = "home_comum.jsp";
				    }
				    if (res == 1){
				    	url = "home_admin.jsp";
				    }
					if (res == 2){
						url = "erro_login.jsp";						
					}
			} else if (acao.equals("logout")){
				logout(request);
				url = "home.jsp";
			} else if (acao.equals("recuperarsenha")){
				recuperarSenha(request);
				url = "info_page.jsp";
			} else {
				/* nenhuma acao foi definida */			
				url="erro.jsp";
			}

			RequestDispatcher dispatcher = request.getRequestDispatcher("../"+url);
			dispatcher.forward(request, response);

		}catch(Exception e){
			e.printStackTrace();
		}

	}




}
