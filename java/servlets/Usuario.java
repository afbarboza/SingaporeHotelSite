package servlets;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class Usuario implements Serializable {

	private String nome;
	private String cpf;
	private String dataNasc;
	private String sexo;
	private String estadoCivil;
	private String cidade;
	private String estado;
	private String cep;
	private String email;
	private String senha;
	private Boolean isValidUser;
	private Boolean isAdmin;
	private ArrayList<Integer> bookingIdx;
	private Integer id;
	private static int count = 0;
	private Date dataCadastro;
	
	public Usuario() {
		id = new Integer(count);
		count += 1;
		dataCadastro = new Date();
		bookingIdx = new ArrayList<Integer>();
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}	
	
	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getCpf() {
		return cpf;
	}


	public void setCpf(String cpf) {
		this.cpf = cpf;
	}


	public String getDataNasc() {
		return dataNasc;
	}


	public void setDataNasc(String dataNasc) {
		this.dataNasc = dataNasc;
	}


	public String getSexo() {
		return sexo;
	}


	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}


	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getCidade() {
		return cidade;
	}


	public void setCidade(String cidade) {
		this.cidade = cidade;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getCep() {
		return cep;
	}


	public void setCep(String cep) {
		this.cep = cep;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
	public Boolean getIsValidUser() {
		return isValidUser;
	}


	public void setIsValidUser(Boolean isValidUser) {
		this.isValidUser = isValidUser;
	}


	public Boolean getIsAdmin() {
		return isAdmin;
	}


	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}


	public ArrayList<Integer> getBookingIdx() {
		return bookingIdx;
	}

	public void setBookingIdx(ArrayList<Integer> bookingIdx) {
		this.bookingIdx = bookingIdx;
	}
	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}
}
