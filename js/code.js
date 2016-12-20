function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var uluru1 = {lat: -24.6583138, lng: 128.7494965};
    var uluru2 = {lat: -25.363, lng: 131.044};
    var uluru3 = {lat: -25.363, lng: 131.044};
    var uluru4 = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    var marker1 = new google.maps.Marker({
        position: uluru1,
        map: map
    });
}
