/*
 * Definition of class Contact. ("Model"- MVC)
 */
function Contact()
{
	var user_name = "";
	var user_mail = "";
	var user_phone = "";
	this.advertising = new Array(6);
	var messageFromUser = "";
}

/*object-oriented programming: setters and getters to each property*/
Contact.prototype.getUserName = function()
{
	return this.user_name;
}

Contact.prototype.setUserName = function(newUserName)
{
	this.user_name = newUserName;	
}

Contact.prototype.getUserMail = function()
{
	return this.user_mail;
}

Contact.prototype.setUserMail = function(newUserMail)
{
	this.user_mail = newUserMail;
}

Contact.prototype.getUserPhone = function()
{
	return this.user_phone;
}

Contact.prototype.setUserPhone = function(newUserPhone)
{
	this.user_phone = newUserPhone;
}

Contact.prototype.getAdvertisingVector = function()
{
	return this.advertising;
}

Contact.prototype.setAdvertisingVector = function(newAdvertisingVector)
{
	if (newAdvertisingVector == null || newAdvertisingVector == undefined)
		return;

	if (!Array.isArray(newAdvertisingVector))
		return;

	/*
 	* instead of this.advertising = newAdvertisingVector
 	* doing this way, we can guarantee that we are copying 
 	* values, not the reference, avoiding errors/bugs
 	*/
	for (var counter = 0; counter < newAdvertisingVector.length; counter++) {
		this.advertising[counter] = newAdvertisingVector[counter];
	}
}

/*
 * getAdvertisingVectorAt: returns the value of this.advertising[index]
 *
 * description: once advertising is an array of boolean values, this method
 * 		try to access the element in the position equals the index.
 *
 * parameters: index, indicating the position of the required element
 *
 * returns: null, if the position does not exist or is invalid.
 * 	    the element accessed, otherwise.
 */
Contact.prototype.getAdvertisingVectorAt = function(index)
{
	if (index < 0 || index >= this.advertising.length)
		return null;
	else
		return this.advertising[index];
}

/*
 * setAdvertisingVectorAt: set a new value for this.advertising[index]
 *
 * description: once advertising is an array of boolean values, this method
 * 		try to acces the array in the index-th position and change
 * 		its value.
 *
 * parameters: index, indicating the position of the array that will receive 
 * 	       the new value.
 * 	       newValue, indicating the new value that the element at
 * 	       index-th position will store.
 *
 * returns: void.
 */
Contact.prototype.setAdvertisingVectorAt = function(index, newValue)
{
	if (typeof newValue !== 'boolean')
		return;
	if (index < 0 || index > this.advertising.length)
		return;
	this.advertising[index] = newValue;
}

Contact.prototype.getMessageFromUser = function()
{
	return this.messageFromUser;
}

Contact.prototype.setMessageFromUser = function(newMessage)
{
	if (newMessage == null || newMessage == undefined)
		return;
	this.messageFromUser = newMessage;
}

/*
 * saveData: saves all the contact informations.
 *
 * description: using the Web Storage API, all the data inserted by
 *		user at view of contact page, are saved locally
 *		and permanently. This function is a method of Contact class
 *		and cannot be called directly by the view, once implemented
 *		the MVC design pattern.
 *
 * return: void.
 */
Contact.prototype.saveData = function()
{
	if (typeof(Storage) == undefined) {
		return;
	}
	
	localStorage.setItem("user_name", this.getUserName());
	localStorage.setItem("user_mail", this.getUserMail());
	localStorage.setItem("user_phone", this.getUserPhone());
	var advertising_vector = this.getAdvertisingVector();
	for (var counter = 0; counter < advertising_vector.length; counter++) {
		localStorage.setItem("advertising[" + counter.toString() + "]", advertising_vector[counter].toString());
	}
	localStorage.setItem("user_msg", this.getMessageFromUser());
}


/*
 * retriveData: recovers all the data previously saved.
 *
 * description: this function recovers all the data - about a instance of a contact -
 * 		saved in the localStorage. All the data recovered is about the last
 * 		contact made through the contact form (View Contact, in MVC terms).
 * 		Note that, once implemented the MVC design pattern, this method
 * 		shall not be called from the view.
 *
 * return: void.
 */
Contact.prototype.retrieveData = function()
{
	if (typeof(Storage) == undefined) {
		return;
	}

	this.setUserName(localStorage.getItem("user_name"));
	this.setUserMail(localStorage.getItem("user_mail"));
	this.setUserPhone(localStorage.getItem("user_phone"));
	for (var counter = 0; counter < 6; counter++) {
		var strBoolean = localStorage.getItem("advertising[" + counter.toString() + "]");
		strBoolean = strBoolean.toLowerCase();
		if (!strBoolean.localeCompare("true"))
			this.setAdvertisingVectorAt(counter, true);
		else
			this.setAdvertisingVectorAt(counter, false);
		
	}
	this.setMessageFromUser(localStorage.getItem("user_msg"));
}
