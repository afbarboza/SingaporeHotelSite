package servlets;

import java.io.Serializable;
import java.util.ArrayList;


public class Contato implements Serializable{
	private String nome;
	private String email;
	private String celular;
	private ArrayList<String> comonosconheceu;
	private String msg;
	
	public Contato(){}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCelular() {
		return celular;
	}
	public void setCelular(String celular) {
		this.celular = celular;
	}
	public ArrayList<String> getComonosconheceu() {
		return comonosconheceu;
	}
	public void setComonosconheceu(ArrayList<String> comonosconheceu) {
		this.comonosconheceu = comonosconheceu;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}

