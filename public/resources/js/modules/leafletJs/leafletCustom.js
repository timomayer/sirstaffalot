/**
 *
 * @param data
 */
var layerGroup = L.markerClusterGroup();
function adjustMapToFilterChange(data) {
    layerGroup.clearLayers();

    $.each(data, function (index, lead) {
        var marker = new MyCustomMarker(new L.LatLng(lead.latitude, lead.longitude), { title: '' });
        layerGroup.addLayer(marker);
    });
    map.addLayer(layerGroup);

}


var MyCustomMarker = L.Marker.extend({

    bindPopup: function (htmlContent, options) {

        if (options && options.showOnMouseOver) {

            // call the super method
            L.Marker.prototype.bindPopup.apply(this, [htmlContent, options]);

            // unbind the click event
            this.off("click", this.openPopup, this);

            // bind to mouse over
            this.on("mouseover", function (e) {

                // get the element that the mouse hovered onto
                var target = e.originalEvent.fromElement || e.originalEvent.relatedTarget;
                var parent = this._getParent(target, "leaflet-popup");

                // check to see if the element is a popup, and if it is this marker's popup
                if (parent == this._popup._container)
                    return true;

                // show the popup
                this.offset = new L.Point(0, -30);
                this.openPopup();

            }, this);

            // and mouse out
            this.on("mouseout", function (e) {

                // get the element that the mouse hovered onto
                var target = e.originalEvent.toElement || e.originalEvent.relatedTarget;

                // check to see if the element is a popup
                if (this._getParent(target, "leaflet-popup")) {

                    L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this);
                    return true;

                }

                // hide the popup
                this.closePopup();

            }, this);

        }

    },

    _popupMouseOut: function (e) {

        // detach the event
        L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);

        // get the element that the mouse hovered onto
        var target = e.toElement || e.relatedTarget;

        // check to see if the element is a popup
        if (this._getParent(target, "leaflet-popup"))
            return true;

        // check to see if the marker was hovered back onto
        if (target == this._icon)
            return true;

        // hide the popup
        this.closePopup();

    },

    _getParent: function (element, className) {

        var parent = element.parentNode;

        while (parent != null) {

            if (parent.className && L.DomUtil.hasClass(parent, className))
                return parent;

            parent = parent.parentNode;

        }

        return false;

    }

});

var map = L.map('map', {
    zoomControl: false,
    dragging: false, //bugfix hack, switch dragging off till end of code, otherwise worldCopyJump dosn't work
    worldCopyJump: true //copy all markers to maps "before" and "after" the current map
});

L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


/* Function for calculating coordinates after click on map
 */
/*var popup = L.popup();
 function onMapClick(e) {
 popup
 .setLatLng(e.latlng)
 .setContent("You clicked the map at " + e.latlng.toString())
 .openOn(map);
 }
 map.on('click', onMapClick);*/

/*Extend leaflet popup Template*/
var popupTemplate = '<div class="popup clearfix">' +
    '<img src="http://localhost:3000/resources/img/AnonymerUser100x100.png" alt="Prev" class="thumbnailExpert" />' +
    '<div class="expertProfile"><span class="name">Max Mustermann</span><br />Handwerker<br /> Malerbetrieb xy<br />' +
    'T.01234/56789 <br /><a href="mailto: test@test.de">test@test.de</a></div>' +
    '<div class="clearfix"></div>' +
    '<div class="status">' +
    '<span class="up">Status : High</span>'
'</div>' +
'</div>';

//@todo Markers needs to be set for map to be loaded. Change this!
/*Render all markers, add cluster which depend on zoom-value, group markers and set zoom to fit on screen*/
var markers = L.markerClusterGroup();
var startCoords = [55.00000, 9.00000];
var marker = new MyCustomMarker(new L.LatLng(startCoords[0], startCoords[1]), { title: '' });
markers.addLayer(marker);

map.addLayer(markers);
map.fitBounds([startCoords]);
map.dragging.enable();
map.removeLayer(markers);

L.Icon.Default.imagePath = './resources/img/leaflet';

$('#addMarkersToMap').click(function () {
    addMarkers([48.53116, 32.21191]);
});


