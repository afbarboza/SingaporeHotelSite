$(document).ready(function() {
	$("#loginbtn").click(function() {
		var login_try_email = $("#tfemail").val();
		var login_try_password = $("#tfpassword").val();
	
		var login_try = new User();
		login_try.setEmail(login_try_email);
		login_try.setPassword(login_try_password);
		login_try.validateUser();
		if (!login_try.isValidUser()) {
			alert("Usuário inexistente!\n");
		} else {
			/*Controller -> Model: state change
 			* once the user exists, then a method invocation 			
 			* is needed to do the state change.
 			*/
			alert("Login efetuado com sucesso.");
			login_try.retrieveData();
		}
	});
});
