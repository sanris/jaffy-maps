var jaffy = jaffy || {};

jaffy.maps = function(component,locations){
  var $component = $(component);
  $component.foreach(function(){
    map_instance($(this), locations);
  });


  function map_instance($component, locations){
      var map,
          marker,
          markers = Array();
          bounds = new google.maps.LatLngBounds(),
          markerCluster;
      
      map = new google.maps.Map(document.getElementById('map'), {
          center: locations[0],
          zoom: 7
      });

      function _html(tag, content) {
          return '<' + tag + '>' + content + '</' + tag + '>';
      }

      // Finding the boundary within all available list of addresses
      locations.map(function(location) {
          bounds.extend(new google.maps.LatLng(location.lat, location.lng));
          marker = new google.maps.Marker({
              position: location,
              label: location.title,
              map: map,
              address: {
                  address: location.address,
                  city: location.city,
                  state: location.state,
                  country: location.country,
                  phone: location.phone,
                  email: location.email,
                  url: location.url
              },
              buttons: location.buttons
          });
          marker.addListener('click', function(event) {
              infowindow.setContent(
                  _html('h4', this.label) +
                  _html('p', this.address.address) +
                  _html('p',
                      _html('span', this.address.city) +
                      _html('span', this.address.state) +
                      _html('span', this.address.country)
                  ) +
                  _html('p', this.address.phone) +
                  _html('p', this.address.email) +
                  _html('p', this.address.url)
              );
              infowindow.open(map, this);
          });
          markers.push(marker);
      });

      var infowindow = new google.maps.InfoWindow();

      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
  }
}
