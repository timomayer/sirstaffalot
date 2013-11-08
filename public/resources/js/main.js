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
			angular.element(this).controller('ngModel').$setViewValue($(this).val());
		});
	});
});