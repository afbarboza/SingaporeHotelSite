/**
	Este documento tem como propósito adicionar o menu e o footer
	nas páginas. Como esses dois elementos são os mesmos para todas
	as páginas, a fim de promover a manutenibilidade do código, inserimos
	tais elementos, dinamicamente, a partir da execução desse código.
*/

WebFontConfig = {
    google: { families: [ 'Poiret+One::latin,latin-ext' ] }
};

/**
 * Importa fonte do Google Fonts
 */
function import_font_style() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}

$(document).ready(function  () {

	/* Import da fonte provida pelo Google fonts */
	import_font_style();

	/* Criando o footer padrão:  */
	var body = $("body");
	var footer = $("<footer></footer>");
	var footer_content = $("<div class=\"copy_right\"> Copyright &copy; 2015 Singapore Hotel. All rights reserved. </div>");
	
	footer.append(footer_content);
	body.append(footer);
	/***********************************************/
});