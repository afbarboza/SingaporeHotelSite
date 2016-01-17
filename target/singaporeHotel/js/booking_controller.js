$(document).ready(function() {
	$("#bookingform").on('submit_booking', function() {
		var new_booking = new Booking();
		new_booking.setDateCheckIn($("#tfdataentrada").val());
		new_booking.setDateCheckOut($("#tfdatasaida").val());
		new_booking.setNumberOfAdults(parseInt($("#numberOfAdults").val()));
		new_booking.setNumberOfBabies(parseInt($("#numberOfBabies").val()));
		new_booking.setNumberOfChildren(parseInt($("#numberOfChildren").val()));
		new_booking.saveData();
	});
});
