/**
 * @project       default project
 * @package       html-css-js
 * @author        VI
**/

$(document).ready(function() {
	applyPolyfills('body');
});

function applyPolyfills(selector) {
		/* $('.no-generatedcontent '+ selector +' #header .button-header').prepend('<div class="ie-before" />').append('<div class="ie-after" />'); */

		/* lt-ie9 last-child functionality for sorting list  */
		$(selector).find('ul.sort li').last().addClass('last-child').css({'float':'none','overflow':'hidden'});
}