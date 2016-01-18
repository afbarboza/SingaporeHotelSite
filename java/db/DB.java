package db;

// OBS.: Para o trab 3!

import servlets.Usuario;


public class DB {
	
	public DB(){}
	
	/**
	 * Dado um email, retorna o usuario correspondente 
	 * @param email email do usuario
	 * @return objeto do tipo usuario associado ou null em caso de não existir usuário com 
	 * o email informado
	 * */
    private Usuario getCadastrado(String email) {
    	Usuario u = new Usuario();
    	return u;
    }
    
    private boolean isCadastrado(String email) {
    	return true;
    }
	
}
