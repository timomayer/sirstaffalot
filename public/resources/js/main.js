/**
 * @project       default project
 * @package       html-css-js
 * @author        VI
**/


function ieTransitions(elem, widthInit, widthHover) {
	if(!Modernizr.csstransitions) {
		elem.hover(
			function(){
				$(this).animate({width: widthHover + 'px'}, 500, 'swing', function(){
					resetMap(0);
				});
			},
			function(){
				$(this).animate({width: widthInit + 'px'}, 500, 'swing', function() {
					resetMap(0);
				});
			}
		)
	}
}

function resetMap(timeout) {
	if($('#map').length > 0) {
		setTimeout(function() {
			map.invalidateSize();
		}, timeout);
	}
}

$(document).ready(function() {
	$('input, textarea').placeholder();
	ieTransitions($('#navigation .settings'), 68, 250);
	ieTransitions($('#navigation .logout'), 68, 164);

	$('#panel-left .toggle-filter').click(function() {
		var panelLeft = $(this).parents('#panel-left');
		if (panelLeft.hasClass('reduced')) {
			panelLeft.removeClass('reduced');
			$(this).removeClass('icon-open-filter').addClass('icon-close-filter');
				resetMap(500);
		} else {
			panelLeft.addClass('reduced');
			$(this).removeClass('icon-close-filter').addClass('icon-open-filter');
			if($('#map').length > 0) {
				resetMap(500);
			}
		}
	});

	$('#panel-left .search-button').click(function(e) {
		if ($('#panel-left').hasClass('reduced')) {
			e.preventDefault();
			$('#panel-left .toggle-filter').trigger('click');
			$(this).siblings('.search-field').focus();
		}
	});

	$('#panel-left .filter').click(function(e) {
		if ($('#panel-left').hasClass('reduced')) {
			$('#panel-left .toggle-filter').trigger('click');
		}
	});

	$('#panel-left .filter .filter-scoring').click(function(e) {
		e.stopPropagation();
	});
});