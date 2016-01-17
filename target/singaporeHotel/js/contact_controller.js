$(document).ready(function() {
	$("#contactform").on('submit_contact', function() {
		var new_contact = new Contact();
		new_contact.setUserName($("#tfnome").val());
		new_contact.setUserMail($("#tfemail").val());
		new_contact.setUserPhone($("#user_phone").val());
		var counter = 0;
		$("input:checkbox[name=comonosconheceu]").each(function() {
			if ($(this).is(':checked')) {
				new_contact.setAdvertisingVectorAt(counter, true);
			} else {
				new_contact.setAdvertisingVectorAt(counter, false);
			}
			counter++;
		});
		new_contact.setMessageFromUser($("#messageFromUser").val());
		new_contact.saveData();
		alert("Sua mensagem foi enviada! Em breve, estaremos lhe enviando a resposta.");
	});
});
