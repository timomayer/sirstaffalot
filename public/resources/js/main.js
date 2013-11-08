/**
 * @project       default project
 * @package       html-css-js
 * @author        VI
 **/

$(document).ready(function() {
	$('.input-daterange').datepicker({
		format: "dd.mm.yyyy",
		language: "de",
		daysOfWeekDisabled: "0,6",
		calendarWeeks: true,
		todayHighlight: true
	}).on('changeDate', function() {
		$('input[ng-model], select[ng-model]').each(function() {
			$(this).trigger('input');
			angular.element(this).controller('ngModel').$setViewValue($(this).val());
		});

		changeToKw();
	});

	$(document).on('click', '.topTable > tbody > tr', function() {
		if ($(this).hasClass('expanded')) {
			$(this).removeClass('expanded').next('.subTableRow').hide();
		} else {
			$(this).addClass('expanded').next('.subTableRow').show();
		}
	});
	$(document).on('click', '.subTable > tbody > tr', function(e) {
		e.stopPropagation();
	});

	function changeToKw() {
		var cwPickD1 = $('.cwPick1').val();
		var cwPickD2 = $('.cwPick2').val();
		var cwPickW1 = moment(cwPickD1, 'DD.MM.YYYY').week();
		var cwPickW2 = moment(cwPickD2, 'DD.MM.YYYY').week();
		$('.cwPick1Phantom').val(cwPickW1);
		$('.cwPick2Phantom').val(cwPickW2);

	}
	$('.cwPick1Phantom').click(function() {
		var offset = $(this).offset();
		var height = $(this).height();
		console.log(offset);
		$('.cwPick1').datepicker('show');
		$('.datepicker-orient-top').offset({ top: offset.top+height+25, left: offset.left})
	});

	$('.cwPick2Phantom').click(function() {
		var offset = $(this).offset();
		var height = $(this).height();
		console.log(offset);
		$('.cwPick2').datepicker('show');
		$('.datepicker-orient-top').offset({ top: offset.top+height+25, left: offset.left})
	});
});