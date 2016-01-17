$(document).ready(function(){
	$("#registerform").on('submit_register', function() {
		var new_user = new User();
		new_user.setName($("#tfnomecompleto").val());
		new_user.setCPF($("#tfcpf").val());
		new_user.setBirthDate($("#dataNasc").val());
		if ($("#masculino").is(':checked')) {
			new_user.setGender("m");
		} else if ($("#feminino").is(':checked')) {
			new_user.setGender("f");
		}
		new_user.setMaritalStatus($("#marital_status").val());
		new_user.setCity($("#user_city").val());
		new_user.setState($("#user_state").val());
		new_user.setZipCode($("#user_zipcode").val());
		new_user.setEmail($("#tfemail").val());
		new_user.setPassword($("#user_password").val());
		new_user.saveData();
	});
});
