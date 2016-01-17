/**
	Documento JavaScript : validation.js
	
	Este documento contém o código de validação de todos os formulários 
	das páginas do site.

	Decisão de projeto: devido ao fato de que páginas diferentes podem 
	utilizar o mesmo código de valição, para evitar repetição desnecessária
	de código utilizou-se um único arquivo de validação, que é importado
	por todas as páginas que contêm formulários.

	- Considerando o modelo MVC, a parte de validação faz parte do "Model", 
	assim sendo, este documento é parte Model (validação) e View (atualização dos 
	dados da View).
*/


// Validation Document
function myInfo (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(153, 204, 0)" ){
		$(element).toggleClass("blueText");
	}
}

function myInfoAccepted (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(255, 51, 0)" ){
		$(element).toggleClass("blueText");
	}
}

 
/**
 *	Valida o nome completo, pág. registration.html
 */
function valida_nome_completo () {
	var nome, partes;
	
	nome = $("#tfnomecompleto").val().trim();

	partes = nome;

	// console.log("partes(antes) = "+partes);
	partes = partes.replace(/(\s|\t)+/g, " ");
	// console.log("partes(depois) = "+partes);

	if ( partes == "" ) {
		myInfo("#infonome", "O campo nome é de preenchimento obrigatório.");
		return false;
	}

	partes = partes.split(" ");
	if ( partes.length < 2 ) { 
		myInfo("#infonome", "Nome inválido. O nome deve conter pelo menos duas palavras, todas com no mínimo 3 caracteres.");
	} else { // Temos 2 ou mais palavras
		var k = 0;
		while ( k < partes.length ) { 
			if ( partes[k].length < 3 ){
				break;
			}
			k++; 
		}
		if ( k != partes.length ) {
			myInfo("#infonome", "Todas as palavras devem ter, no mínimo, 3 caracteres");
		} else { // Temos pelo menos 2 palavras, todas com >= 3 caracteres
			var success;
			patt = RegExp ("^[a-zA-Z]");
			for (var i = 0; i < partes.length; i++) {
				if ( !patt.test(partes[i]) ) {
					myInfo("#infonome", "Nome inválido. O primeiro caractere de cada palavra deve ser uma letra do alfabeto.");
					success = false;
					break;
				}
				partes[i] = partes[i].replace(/^[a-z]/, function myFunction(x){return x.toUpperCase();});

				success = true;
			}

			/// Debuging purpose:
			for (var i = 0; i < partes.length; i++) {
				console.log("partes["+i+"]: "+partes[i]);
			}
			///

			if ( success ) {
				myInfoAccepted("#infonome", "ok!");
				return true;
			}
			return false;
		}

	}
}

/**
 *	Valida o email 
 */
function valida_email () {
	var email, patt, counter=0;

	email  = $("#tfemail").val().trim();
	console.log("email: "+email);
	
	if ( email == "" ) {
		myInfo("#infoemail", "O campo email é de preenchimento obrigatório.");
		// $("#tfemail").focus();
		return false;
	}

	/// Checagem 1: primeiro caracter deve ser uma letra
	patt = /^[^a-z]/i; // i: flag case sensitive ativada
	if ( patt.test(email) ) {
		myInfo("#infoemail", "A primeira letra do email deve ser uma letra do alfabeto.");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 2: ausência de caracteres maiúsculos
	patt = /[A-Z]/g;
	if ( patt.test(email) ){
		// console.log("Email deve conter apenas caracteres minúsculos.");
		myInfo("#infoemail", "Email não pode conter caracteres maiúsculos.");
		$("#tfemail").focus();
		return false;
	} 

	/// Checagem 3: deve haver apenas um caracter @
	patt = /@/g; 
	counter = 0;
	while ( patt.exec(email) !== null ) {
		counter++;	
	}
	if ( counter !== 1 ) {
		myInfo("#infoemail", "Email deve conter um, e apenas um, caractere \"@\".");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 4: deve haver no mínimo um caracter "."
	patt = /\./g; 
	counter = 0;
	while ( patt.exec(email) !== null ) {
		counter++;	
	}
	if ( counter < 1 ) {
		myInfo("#infoemail", "Email deve conter, no mínimo, um caractere \".\" após o \"@\"");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 6: ".@" ou "@." não são permitidos
	patt = /((\.@)|(@\.))/g; 
	if ( patt.test(email) ) {
		myInfo("#infoemail", "Email pode não pode conter caractere \".\" adjacente ao caractere \"@\".");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 5: checa se tem "." após o caracter @
	patt = /@([^\.]+)?(\.)+/g; 
	if ( !patt.test(email) ) {
		myInfo("#infoemail", "Email deve conter pelo menos um caractere \".\" após o \"@\".");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 7: Email não pode ser finalizado com "." ou "@"
	patt = new RegExp("[\.@]");
	if ( patt.test(email[email.length-1]) ) {
		myInfo("#infoemail", "Email não pode ser finalizado com \""+email[email.length-1]+"\"");
		$("#tfemail").focus();
		return false;
	}

	/// Checagem 8: Email não pode conter espaços e afins
	patt = new RegExp("\\s");
	if ( patt.test(email) ) {
		myInfo("#infoemail", "Email não pode conter espaços.");
		$("#tfemail").focus();
		return false;
	}
	myInfoAccepted("#infoemail", "ok!");
	return true;
}


/*
 calc_digitos_posicoes
 
 Multiplica dígitos vezes posições
 
 @param string digitos Os digitos desejados
 @param string posicoes A posição que vai iniciar a regressão
 @param string soma_digitos A soma das multiplicações entre posições e dígitos
 @return string Os dígitos enviados concatenados com o último dígito
*/
function calc_digitos_posicoes( digitos, posicoes, soma_digitos) {
 
    // Garante que o valor é uma string
    digitos = digitos.toString();
 
    // Faz a soma dos dígitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    for ( var i = 0; i < digitos.length; i++  ) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + ( digitos[i] * posicoes );
 
        // Subtrai 1 da posição
        posicoes--;
 
        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if ( posicoes < 2 ) {
            // Retorno a posição para 9
            posicoes = 9;
        }
    }
 
    // Captura o resto da divisão entre soma_digitos dividido por 11
    // Ex.: 196 % 11 = 9
    soma_digitos = soma_digitos % 11;
 
    // Verifica se soma_digitos é menor que 2
    if ( soma_digitos < 2 ) {
        // soma_digitos agora será zero
        soma_digitos = 0;
    } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
    }
 
    // Concatena mais um dígito aos primeiro nove dígitos
    // Ex.: 025462884 + 2 = 0254628842
    var cpf = digitos + soma_digitos;
 
    // Retorna
    return cpf;
    
} 
/*
 Valida CPF
 
 @param  string cpf O CPF com ou sem pontos e traço
 @return bool True para CPF correto - False para CPF incorreto
*/
function mvalida_cpf ( valor ) {
 
    // Garante que o valor é uma string
    valor = valor.toString();
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');
 
 
    // Captura os 9 primeiros dígitos do CPF
    // Ex.: 02546288423 = 025462884
    var digitos = valor.substr(0, 9);
 
    // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
    var novo_cpf = calc_digitos_posicoes( digitos, 10, 0 );
 
    // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
    var novo_cpf = calc_digitos_posicoes( novo_cpf, 11, 0 );
 
    // Verifica se o novo CPF gerado é idêntico ao CPF enviado
    if ( novo_cpf === valor ) {
        // CPF válido
        return true;
    } else {
        // CPF inválido
        return false;
    }
    
}

/**
 *	Valida o cpf
 */
function valida_cpf () {
	var cpf, patt;

	cpf = $("#tfcpf").val().trim();
	cpf = cpf.replace(/(-|\.)/g, "");

	console.log("Validation CPF: "+cpf);

	if ( cpf == "" ) {
		myInfo("#infocpf", "O campo CPF é de preenchimento obrigatório.");
		return false;
	}

	patt = /[^0-9\/-]/g;
	if ( patt.test (cpf) ) {
		myInfo("#infocpf", "CPF pode conter apenas números ou números e \".\" e/ou \"-\".");
		return false;
	}

	if ( cpf.length > 11 ) {
		myInfo("#infocpf", "CPF deve conter apenas 11 dígitos.");
		return false;
	}

	if ( cpf.length == 11 && mvalida_cpf( cpf ) ) {
		console.log("CPF válido");
		myInfoAccepted("#infocpf", "CPF válido.");
		return true;
	} else {
		console.log("CPF inválido");
		myInfo("#infocpf", "CPF inválido.");
		return false;
	}
}

/**
 *	Formata o cpf
 */
function formata_cpf () {
	var cpf, patt;
	cpf = $("#tfcpf").val().trim();
	cpf = cpf.replace(/(-|\.)/g, "");

	if ( cpf.length == 3 || cpf.length == 6 ) {
		$("#tfcpf").val( $("#tfcpf").val() + "\.");
		return;
	}
	if ( cpf.length == 9 ) {
		$("#tfcpf").val( $("#tfcpf").val() + "-");
		return;	
	}
	valida_cpf();
}

/**
 *	Valida data de nascimento
 */
function valida_data_nasc () {
	var dataNasc, base, limit, vDataNasc, dataStr;
	var patt;

	console.log("dataNasc.val() = "+$("#dataNasc").val());
	// Data de Nascimento:
	if ( $("#dataNasc").val() == "" ){
		myInfo("#infodatanasc", "Data inválida. A data mínima aceita é 01/01/1990.");
		return false;
	} else {
		dataStr = $("#dataNasc").val();
		dataStr = dataStr.replace(/(\/\.)/g, "-"); // para o firefox
		vDataNasc = dataStr.split("-");

		dataNasc = new Date(vDataNasc[1]+" "+vDataNasc[2]+", "+vDataNasc[0]);

		console.log("Year: "+dataNasc.getFullYear());
		console.log("Month: "+dataNasc.getMonth());
		console.log("Day: "+dataNasc.getDate());
		// console.log("dataNasc: "+vDataNasc[0]+", "+vDataNasc[1]+", " +vDataNasc[2] );

		base = new Date("1 1, 1990");	// "M D, YYYY"
		limit = new Date();				// get current date
		console.log("base.getFullYear() = "+base.getFullYear());
		if ( dataNasc.getFullYear() < base.getFullYear() ) { // > 1990
			myInfo("#infodatanasc", "Data inválida. A data mínima aceita é 01/01/1990.");
			return false;
		} else {
			if ( dataNasc.getTime() > limit.getTime() ){ // > current date
				myInfo("#infodatanasc", "Data inválida. A data máxima aceita é "+limit.getUTCDate()+"/"+(limit.getUTCMonth()+1)+"/"+limit.getFullYear());
				return false;
			} else {
				myInfoAccepted("#infodatanasc", "ok!");	
				return true;
			}
		}
	}
}

/**
 *	Valida sexo
 */
function valida_sexo () {
	// sexo
	console.log(" masculino = "+$("#masculino").is(':checked')+", feminino = "+$("#feminino").is(':checked'));
	if ( !$("#masculino").is(':checked') && !$("#feminino").is(':checked') ) {
		myInfo("#infosexo", "Selecione o sexo.");
		return false;
	}
	myInfoAccepted("#infosexo", "ok!");
	return true;
}

/**
 *	Valida estado civil
 */
function valida_estado_civil () {
	// estado civil
	if ( $("#marital_status").val() == "unknown" ) {
		myInfo("#infoestadocivil", "Selecione o estado civil.");
		return false;
	} else {
		myInfoAccepted("#infoestadocivil", "ok!");
		return true;
	}
}

/**
 *	Valida estado
 */
function valida_estado () {
	// estado
	if ( $("#user_state").val() == "unknown" ) {
		myInfo("#infoestado", "Selecione o estado.");
		return false;
	} else {
		myInfoAccepted("#infoestado", "ok!");
		return true;
	}
}

/**
 *	Valida cidade
 */
function valida_cidade () {	
	// cidade
	var cidade = $("#user_city").val();
	cidade = cidade.replace(/(\s|\t)+/g, "");
	if ( cidade.length == 0 ) {
		myInfo("#infocidade", "Digite o nome da cidade onde você reside.");
		return false;
	} else {
		myInfoAccepted("#infocidade", "ok!");
		return true;
	}
}

/**
 *	Valida cep
 *	Obs.: A validação foi realizada considerando a fonte:
 *	http://www.geradordecep.com.br/ , provida pelo PAE
 */
function valida_cep () {
	// TODO : de acordo com  o estado selecionado
	var estado, cep, patt;
	var mHash = {};

	mHash['sp'] = [0, 1];
	mHash['rj'] = [2];
	mHash['es'] = [2];
	mHash['mg'] = [3];
	mHash['ba'] = [4];
	mHash['se'] = [4];
	mHash['pe'] = [5];
	mHash['al'] = [5];
	mHash['pb'] = [5];
	mHash['rn'] = [5];
	mHash['ce'] = [6];
	mHash['pi'] = [6];
	mHash['ma'] = [6];
	mHash['pa'] = [6];
	mHash['am'] = [6];
	mHash['ac'] = [6];
	mHash['ap'] = [6];
	mHash['rr'] = [6];
	mHash['go'] = [7];
	mHash['to'] = [7];
	mHash['mt'] = [7];
	mHash['ms'] = [7];
	mHash['ro'] = [7];
	mHash['df'] = [7];
	mHash['pr'] = [8];
	mHash['sc'] = [8];
	mHash['rs'] = [9];

	cep = $("#user_zipcode").val().trim();
	cep = cep.replace(/-/g, "");
	estado = $("#user_state");
	console.log("estado: "+estado.val());

	/// Checagem 1: testa se o usuário selecionou o estado
	if ( estado.val() == "unknown" ) {
		myInfo("#infocep", "Informe primeiramente o estado.");
		estado.focus();
		return false;
	}

	/// Checagem 2: testa se o CEP está vazio	
	if ( cep == "" ) {
		myInfo("#infocep", "O campo CEP é de preenchimento obrigatório.");
		return false;
	}	

	/// Checagem 3: testa se o CEP contém apenas dígitos
	patt = /[^0-9]/g;
	if ( patt.test(cep) ) {
		myInfo("#infocep", "O CEP é composto de números apenas.");
		return false;
	}

	console.log("mHash[estado].length = "+mHash[estado.val()].length );
	for(var i = 0; i < mHash[estado.val()].length; i++) {
		if ( cep[0] == mHash[estado.val()][i]) {
			myInfoAccepted("#infocep", "ok!");
			return true;
		}
	}
	myInfo("#infocep", "CEP inválido.");
	return false;
}

function formata_cep () {
	var cep, patt;

	cep = $("#user_zipcode").val().trim();
	cep = cep.replace(/-/g, "");
	console.log("cep : "+cep);

	/// Checagem 1: testa se tem algum caracter diferente de números
	patt = /[^0-9]/g;
	if ( patt.test(cep) ) {
		myInfo("#infocep", "O CEP é composto de números apenas.");
		return;
	}

	/// Checagem 2: insere "-"
	if ( cep.length == 5 ) {
		console.log("Inserindo -")
		$("#user_zipcode").val( $("#user_zipcode").val()+"-" );
	}
	
	/// Checagem 3: quantidade de números <= 8
	if ( cep.length == 8) {
		valida_cep();
		return;
	} else {
		myInfo("#infocep", "O CEP é composto de 8 dígitos.");
		return;
	}
}

/**
 *	Verifica se a senha informada corresponde a confirmada
 */
function verifica_senha () {
	// TODO : checar se a senha corresponde com a confirmada
	var senha, conf_senha, info;

	senha = $("#user_password");
	conf_senha = $("#conf_pass");
	info = $("#infoconfsenha");

	/// Checagem 1: limites de tamanho da senha de confirmação
	if ( conf_senha.val().length < 6 || conf_senha.val().length > 12) {
		myInfo("#infoconfsenha", "A senha deve conter de 6 a 12 caracteres!");		
		return false;
	}

	if ( senha.val() !== conf_senha.val() ) {
		myInfo("#infoconfsenha", "A senha confirmada não corresponde com a senha informada.");		
		return false;
	} else {
		myInfoAccepted("#infoconfsenha", "Senha confirmada corretamente.");
		return true;
	}
}


function valida_senha () {
	var MIN_SIZE_PASS = 6;
	var MAX_SIZE_PASS = 12;
	var senha, patt, progress_bar, arrayRes, special_char, info;
	var has2SpecialCar=false, has1SpecialCar=false, hasNumber=false, hasUpperCase=false, hasLowerCase=false;

	senha = $("#user_password").val();
	progress_bar = $("#progress_bar");
	info = $("#infoprogbar");

	// remove todas as classes de progress_bar:
	progress_bar.removeClass();		

	if ( senha.length < MIN_SIZE_PASS || senha.length > MAX_SIZE_PASS ) {
		myInfo("#infosenha", "A senha deve conter de 6 a 12 caracteres!");
		info.text("Força da senha");
		return false;
	} else {
		myInfoAccepted("#infosenha", ""); // Só apaga o texto

		/// Checagem 1: Presença de caracteres especiais:
		patt = /[^a-zA-Z0-9]/g; // flag g ativada!
		if ( (arrayRes = patt.exec(senha)) !== null ) {
			special_char = arrayRes[0];
			has1SpecialCar = true;
			while ( (arrayRes = patt.exec(senha)) !== null ) {
				if ( special_char !== arrayRes[0] ) {
					// Há pelo menos 2 caract. especiais
					has2SpecialCar = true;
					console.log("TEM 2 caract especiais!!");
				}
				console.log("Capturou: "+arrayRes[0]);
			}
		}

		/// Checagem 2: Presença de numeros:
		patt = /[0-9]/;
		if ( arrayRes = patt.test(senha) ) {
			hasNumber = true;
			console.log("hasNumber!");
		}

		/// Checagem 3: Presença de letras maiúsculas:
		patt = /[A-Z]/;
		if ( patt.test(senha) ) {
			hasUpperCase = true;
			console.log("hasUpperCase!");		
		}

		/// Checagem 4: Presença de letras minúsculas:
		patt = /[a-z]/;
		if ( patt.test(senha) ) {
			hasLowerCase = true;
			console.log("hasLowerCase!");	
		}

		if ( hasNumber && hasLowerCase && hasUpperCase && has2SpecialCar ) {
			// Strong
			progress_bar.addClass("strong");
			info.text("Senha forte");
		} else if ( hasNumber && (hasLowerCase || hasUpperCase) && has1SpecialCar ) {
			// Medium
			progress_bar.addClass("medium");
			info.text("Senha média");
		} else {
			// Weak
			progress_bar.addClass("weak");
			info.text("Senha fraca");
		}
		return true;
	}
}

function clear_progress_bar () {
	var progress_bar, info;
	progress_bar = $("#progress_bar");
	info = $("#infoprogbar");

	// remove todas as classes de progress_bar:
	progress_bar.removeClass();
	info.text("Força da senha");
}

function valida_nome () {
	var nome, partes, patt;
	
	nome = $("#tfnome").val().trim();
	if ( nome == "" ) {
		myInfo("#infonome", "O campo nome é de preenchimento obrigatório.");
		return false;
	}

	console.log("nome(antes) = "+nome);
	nome = nome.replace(/(\s|\t)+/g, " ");
	console.log("nome(depois) = "+nome);

	/// Checagem 1: inicia com letra
	patt = /^[^a-zA-Z]/g;
	if ( patt.test(nome) ) {
		myInfo("#infonome", "O nome deve iniciar com uma letra do alfabeto.");
		return false;
	}

	/// Checagem 2: pelo menos 3 caracteres
	patt = /.{3,}/g;
	if ( !patt.test(nome) ) {
		myInfo("#infonome", "O nome deve conter ao menos três caracteres.");
		return false;
	}
	myInfoAccepted("#infonome", "ok!");
	return true;

}

function formata_telefone () {
	var telefone;

	telefone = $("#user_phone").val();

	telefone = telefone.replace(/[\(\)-]/g, "");
	console.log("telefone: "+telefone);

	if ( telefone.length == 0 ) {
		$("#user_phone").val("(");
		return;		
	}

	if( telefone.length == 2 ) {
		$("#user_phone").val( $("#user_phone").val() + ")");
		return;		
	}

	if( telefone.length == 7 ) {
		$("#user_phone").val( $("#user_phone").val() + "-");
		return;		
	}

	if( telefone.length == 9 ) {
		$("#user_phone").val( $("#user_phone").val() + "-");
		return;		
	}
}

function valida_telefone () {
	var telefone, patt;

	telefone = $("#user_phone").val();

	telefone = telefone.replace(/[\(\)-]/g, "");
	console.log("telefone: "+telefone);

	patt = /[^0-9]/g;
	if ( patt.test(telefone) ) {
		myInfo("#infotelefone", "Telefone inválido. Digite apenas dígitos.");
		return;
	}

	if ( telefone.length !== 11 ) {
		myInfo("#infotelefone", "Telefone inválido. O telefone deve conter 11 dígitos.");
		return;	
	}

	myInfoAccepted("#infotelefone", "ok!");
}

function valida_msg () {
	var msg;

	msg = $("#messageFromUser").val().trim();
	console.log("msg : "+msg);


	if ( msg == "" ) {
		myInfo("#infomsg", "A mensagem deve ter conteúdo.");
		return false;
	}
	return true;
	// msg = msg.replace(/(\s|\t)+/g, " ");
}

function valida_como_conheceu () {
	var atLeastOneIsChecked;

	atLeastOneIsChecked = $("#como :checkbox:checked").length > 0;
	if ( !atLeastOneIsChecked ) {
		myInfo("#infocomonosconheceu", "Selecione pelo menos uma das opções acima.");
		return false;
	}
	myInfoAccepted("#infocomonosconheceu", "ok!");
	return true;
}

/**
 * Faz a validação comum a todas as datas
 * @param element: string contendo o seletor, ex.: "#idelement"
 * @param infoelement: string contendo o id da div na qual serão exibidas as
 * mensagens de erro.
 */
function valida_data_geral (element, infoelement) {
	var data, patt;

	data = $(element).val().trim();
	data = data.replace(/(\/|\-)/g, "");
	
	/// Checagem 1: vazio
	if ( data == "" ){
		myInfo(infoelement, "Este campo é de preenchimento obrigatório."); // TODO: ver data de entrada a
		return false;
	}

	/// Checagem 2: caracter inválido
	patt = /[^0-9]/g; // TODO
	if ( patt.test(data) ){
		myInfo(infoelement, "A data informada contém caracteres inválidos.");
		return false;
	}

	/// Checagem 3: TAMANHO	
	if ( data.length  !== 8 ){
		myInfo(infoelement, "A data deve estar no formato DD/MM/AAAA.");
		return false;
	}
	/// Nesse caso, a data contém 8 caracteres.
	myInfo(infoelement, "");
	return true;
}

function valida_data_entrada () {
	var entrada, vdataentrada, dataentrada, dataminima;

	entrada = $("#tfdataentrada").val().trim();

	console.log("data entrada = "+entrada);

	vdataentrada = entrada.split("-");
	dataentrada = new Date(vdataentrada[1]+" "+vdataentrada[2]+", "+vdataentrada[0]); // "M D, YYYY"
	console.log("vdataentrada[1]: "+vdataentrada[1]);

	dataminima = new Date();						// get current date
	dataminima.setDate( dataminima.getDate() + 2 ); // Adding 2 days to the current date

	console.log("-- MIN DATE : ");		
	console.log("Year: "+dataminima.getFullYear());
	console.log("Month: "+dataminima.getMonth());
	console.log("Day: "+dataminima.getDate());
	
	if ( dataentrada < dataminima ) {
		myInfo("#infodataentrada", "Data de entrada deve possuir, no mínimo dois dias a mais do que a data atual.");
		return false;
	} else {
		myInfoAccepted("#infodataentrada", "ok!");
		return true;
	}
	
}

function valida_data_saida () {
	var entrada, saida, vdataentrada, vdatasaida, dataentrada, datasaida, dataminima, aux;

	entrada = $("#tfdataentrada").val().trim();
	saida = $("#tfdatasaida").val().trim();

	console.log("data entrada = "+entrada);
	console.log("data saida = "+saida);


	aux = entrada.replace(/(\/|\-)/g, "");
	// alert(aux);
	/// Checagem 1: vazio
	if ( aux == "" ){
		myInfo(infoelement, "Data de entrada é de preenchimento obrigatório."); // TODO: ver data de entrada a
		return false;
	} 

	vdataentrada = entrada.split("-");
	vdatasaida = saida.split("-");
	dataminima = new Date(vdataentrada[1]+" "+vdataentrada[2]+", "+vdataentrada[0]); // "M D, YYYY"
	datasaida = new Date(vdatasaida[1]+" "+vdatasaida[2]+", "+vdatasaida[0]); // "M D, YYYY"

	// dataminima = new Date();
	dataminima.setDate( dataminima.getDate() + 2 ); // add 2 dias a data de entrada
	
	if ( datasaida < dataminima ) {
		myInfo("#infodatasaida", "Data de saída deve possuir, no mínimo, dois dias a mais do que a data de entrada.");
		return false;
	} else {
		myInfoAccepted("#infodatasaida", "ok!");
		return true;
	}
}


$(document).ready(function () {
	console.log("Validation.js loaded successfully.");

	/************************************************
	 * Todas as páginas que precisarem validar email em 
	 * campo de texto, utilizará as chamadas a seguir
	 */
	$("#tfemail").keyup( function() {
		valida_email();
	});
	$("#tfemail").blur( function() {
		valida_email();
	});

	/************************************************
	 * Pagina: registration.html 
	 */
	// Validacao do campo nome
	$("#tfnomecompleto").keyup( function(){
		valida_nome_completo();
	});
	$("#tfnomecompleto").blur( function(){
		valida_nome_completo();
	});

	//  Validacao do campo CPF
	$("#tfcpf").keyup( function() {
		formata_cpf();
	});
	$("#tfcpf").blur( function() {
		valida_cpf();
	});
	
	// Validacao do campo data de nascimento
	$("#dataNasc").blur( function() {
		valida_data_nasc();
	});
	
	// Validacao do campo sexo
	$("#masculino").click( function() {
		valida_sexo();
	});
	$("#feminino").click( function() {
		valida_sexo();
	});

	// Validacao do campo estado civil
	$("#marital_status").blur( function () {
		valida_estado_civil();
	});

	// Validacao do campo cidade
	$("#user_city").keyup( function() {
		valida_cidade();
	});

	// Validacao do campo CEP
	$("#user_zipcode").keyup( function() {
		formata_cep();
	});
	$("#user_zipcode").blur( function() {
		valida_cep();
	});

	// Validacao do campo senha
	$("#user_password").keyup( function() {
		valida_senha();
	});

	// Verificacao do campo senha
	$("#conf_pass").blur( function() {
		verifica_senha();
	});

	/// Formulário de 
	$("#registerform").submit( function(event) {
		if ( valida_nome_completo() && valida_cpf() && valida_data_nasc() 
			 && valida_sexo() && valida_estado_civil() && valida_cidade() 
			 && valida_estado() && valida_cep() && valida_email() 
			 && valida_senha() && verifica_senha() ) {
//			// ok
			$("#registerform").triggerHandler("submit_register"); 
		} else {
			console.log("preventDefault");
			event.preventDefault();
		}
	});
	

	$("#cancelarbtn").click( function () {
		// Apaga todos os infos
		myInfoAccepted("#infonome", "");
		myInfoAccepted("#infoemail", "");
		myInfoAccepted("#infocpf", "");
		myInfoAccepted("#infodatanasc", "");
		myInfoAccepted("#infosexo", "");
		myInfoAccepted("#infoestadocivil", "");
		myInfoAccepted("#infoestado", "");
		myInfoAccepted("#infocidade", "");
		myInfoAccepted("#infocep", "");
		clear_progress_bar();
		myInfoAccepted("#infosenha", "");
		myInfoAccepted("#infoconfsenha", "");
	});


	/************************************************
	 * Pagina: contact.html 
	 */

	// Validacao do campo nome
	$("#tfnome").keyup( function() {
		valida_nome();
	});
	$("#tfnome").blur( function() {
		valida_nome();
	});

	// Validacao do campo telefone
	$("#user_phone").focus( function() {
		formata_telefone();
	});
	$("#user_phone").keyup( function() {
		formata_telefone();
		valida_telefone();
	});

	$("#contactform").submit( function(event) {
		if ( valida_nome() && valida_email() &&
		 	 valida_como_conheceu() && valida_msg() ) {
			// OK!
			$("#contactform").triggerHandler("submit_contact");
		} else { 
			console.log("preventDefault");
			event.preventDefault(); // Cancela a submissão
		}
	});

	/************************************************
	 * Pagina: bookings.html 
	 */
	$("#tfdataentrada").click( function() {
		if ( valida_data_geral("#tfdataentrada", "#infodataentrada") ){
			valida_data_entrada();
		}
	});
	$("#tfdataentrada").blur( function() {
		if ( valida_data_geral("#tfdataentrada", "#infodataentrada") ){
			valida_data_entrada();
		}
	});


	$("#tfdatasaida").click( function() {
	 	if ( valida_data_geral("#tfdatasaida", "#infodatasaida") ){
			valida_data_saida();
	 	}
	});
	$("#tfdatasaida").blur( function() {
		if ( valida_data_geral("#tfdatasaida", "#infodatasaida") ){
			valida_data_saida();
		}
	});

	$("#bookingform").submit( function(event) {
		if ( valida_data_geral("#tfdataentrada", "#infodataentrada") 
			 && valida_data_geral("#tfdatasaida", "#infodatasaida") ) {
			if ( valida_data_entrada() && valida_data_saida() ){
				// OK
				console.log("submit_booking");
				$("#bookingform").triggerHandler("submit_booking");
			} else {
				console.log("preventDefault");
				event.preventDefault();
			}		
		} else {
			console.log("preventDefault");
			event.preventDefault();
		}
	});
	
	
	/************************************************
	 * Pagina: erro_login.html 
	 */
	

});
