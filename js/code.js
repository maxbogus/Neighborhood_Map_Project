var base = 'img/';
var prev_infowindow = false;

var initialMapObjects = [
    {
        "name": "Banki.ru",
        "coordinates": {lat: 55.706770, lng: 37.625883},
        "content": '<div>' +
        '<h1 class="firstHeading">Banki.ru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Head of Quality Assurance:</b></p><ul><li>Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.</li>' +
        '<li>Created department from ‘scratch’ in two years and developed processes to support department goals.</li>' +
        '<li>Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes;</li>' +
        '<li>Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks).</li></ul>' +
        '</div>' +
        '</div>',
        "icon": 'bankiru.png'
    },
    {
        "name": "Luxoft",
        "coordinates": {lat: 55.815230, lng: 37.573992},
        "content": '<div>' +
        '<h1 class="firstHeading">Luxoft</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Test Designer:</b></p><ul><li>Was responsible for test design and manual testing of WIRS system;</li>' +
        '<li>Developed 6 test suites for 6 modules of WIRS system.</li></ul>' +
        '</div>' +
        '</div>',
        "icon": 'luxoft.png'
    },
    {
        "name": "Acronis",
        "coordinates": {lat: 55.874736, lng: 37.588088},
        "content": '<div>' +
        '<h1 class="firstHeading">Acronis</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Quality Assurance Engineer:</b></p><ul><li>Was responsible for test design, requirements analysis and manual testing (regression, stress, volume, script-based and exploratory);</li>' +
        '<li>Created 1500 TCs for manual and auto testing;</li>' +
        '<li>Found and submitted ~6700 defects.</li></ul>' +
        '</div>' +
        '</div>',
        "icon": 'acronis.png'
    },
    {
        "name": "Innova",
        "coordinates": {lat: 55.747078, lng: 37.653688},
        "content": '<div>' +
        '<h1 class="firstHeading">Innova</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Test manager:</b></p><ul><li>Was responsible for hiring and managing of one local team (4 people).</li>' +
        '<li>Performed functional and exploratory testing.</li>' +
        '<li>Successful release with low defects (20 bugs) of a new version of 4game platform in Europe and Russia.</li></ul>' +
        '</div>' +
        '</div>',
        "icon": 'innova.png'
    },
    {
        "name": "Superscape",
        "coordinates": {lat: 55.724779, lng: 37.642375},
        "content": '<div>' +
        '<h1 class="firstHeading">Superscape</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Tester:</b></p><ul><li>* Was responsible for manual testing;</li>' +
        '<li>Found ~1200 defects were found and submitted personally (35% of defects could cause hardware defects in the cell phone or major data loss).</li></ul>' +
        '</div>' +
        '</div>',
        "icon": 'superscape.png'
    }
];

function initMap() {
    ko.applyBindings(new ViewModel());
}

ko.bindingHandlers.googleMap = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.unwrap(valueAccessor());
        var mapOptions = {
            center: new google.maps.LatLng(
                55.752198, 37.617499),
            zoom: 9
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        value.forEach(function (mapItem) {
            var image = {
                url: base + mapItem.icon(),
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            var latLng = new google.maps.LatLng(
                mapItem.coordinates().lat,
                mapItem.coordinates().lng);
            var marker = new google.maps.Marker({
                position: latLng,
                draggable: true,
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP
            });

            function toggleBounce() {
                viewModel.request(mapItem.name());
                marker.setAnimation(null);

                if (marker.getAnimation() != null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        marker.setAnimation(null);
                    }, 900);
                }
            }

            marker.addListener('click', toggleBounce);

            var infowindow = new google.maps.InfoWindow({
                content: mapItem.content(),
                maxWidth: 500
            });

            marker.addListener('click', function () {
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }

                prev_infowindow = infowindow;
                infowindow.open(map, marker);
            });
        });
    }, update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.unwrap(valueAccessor());
        var mapOptions = {
            center: new google.maps.LatLng(
                55.752198, 37.617499),
            zoom: 9
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        value.forEach(function (mapItem) {
            var latLng = new google.maps.LatLng(
                mapItem.coordinates().lat,
                mapItem.coordinates().lng);
            var image = {
                url: base + mapItem.icon(),
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            var marker = new google.maps.Marker({
                position: latLng,
                draggable: true,
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP
            });

            function toggleBounce() {
                viewModel.request(mapItem.name());
                marker.setAnimation(null);

                if (marker.getAnimation() != null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        marker.setAnimation(null);
                    }, 900);
                }
            }

            marker.addListener('click', toggleBounce);

            var infowindow = new google.maps.InfoWindow({
                content: mapItem.content(),
                maxWidth: 500
            });

            marker.addListener('click', function () {
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }

                prev_infowindow = infowindow;
                infowindow.open(map, marker);
            });
        });
    }
};

var MapObject = function (data) {
    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.content = ko.observable(data.content);
    this.icon = ko.observable(data.icon);
};

var ViewModel = function () {
    var self = this;

    this.mapObjectList = ko.observableArray([]);
    this.filteredMapObjectList = ko.observableArray([]);

    this.userInput = ko.observable('');

    this.hasError = ko.observable(false);
    this.error = ko.observable('error');

    this.additionalInfo = ko.observable('');

    this.request = function (name) {
        $.ajax({
            url: '//en.wikipedia.org/w/api.php?action=opensearch&search='
            + encodeURI(name) + '&format=json&callback=?',
            dataType: 'jsonp',
            'async': false,
            type: 'GET',
            cache: false,
            success: function (data) {
                self.additionalInfo(data);
            }
        });
    };

    initialMapObjects.forEach(function (mapItem) {
        $.ajax({
            'success': function (dataWeGotViaJsonp) {
                var temp = '123';
                var articleList = dataWeGotViaJsonp[1];
                var len = articleList.length;
                for (var i = 0; i < len; i++) {
                    var wikiEntry = articleList[i];
                    var url = '//en.wikipedia.org/wiki/' + articleList;
                    temp = temp.concat('<li><a href="' + url + '">' + wikiEntry + '</a></li>');
                }
                mapItem.content += temp;
            }
        });
        self.mapObjectList.push(new MapObject(mapItem))
    });

    this.clearFilter = function () {
        this.filteredMapObjectList([]);
        this.userInput('');
        this.hasError(false);
    };

    this.currentList = ko.computed(function () {
        return self.filteredMapObjectList().length == 0 ? self.mapObjectList() : self.filteredMapObjectList();
    });

    this.filterMarkers = function () {
        var input = this.userInput().toLowerCase();
        this.filteredMapObjectList([]);
        this.hasError(false);
        initialMapObjects.forEach(function (mapItem) {
            if (mapItem.name.toLowerCase().includes(input)) {
                self.filteredMapObjectList.push(new MapObject(mapItem));
            }
        });
        if (self.filteredMapObjectList().length === 0) {
            self.hasError(true);
            self.error("User input doesn't match names in list");
        }
    };
};
//
// $.ajax({
//     type: "GET",
//     dataType: 'jsonp',
//     url: "https://maps.googleapis.com/",
//     success: function (data, status, xhr) {
//     },
//     error: function (xhr, status, error) {
//         alert('Sorry man. No map for you!');
//     }
// });
