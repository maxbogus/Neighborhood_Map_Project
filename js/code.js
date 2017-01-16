//objects we are showing in list and on map
// name - name of object
// coord - latitude and longitude of object
// content - info shown in info balloon in marker
// icon - icon for custom icor
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
        "icon": 'img/banki-ru-logo-small.png',
        "visible": true,
        "data": {
            "title": "Banki.ru",
            "subtitle": "Head of Quality Assurance:",
            "items": ["Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.",
                "Created department from ‘scratch’ in two years and developed processes to support department goals.",
                "Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes.",
                "Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks)."]
        }
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
        "icon": 'img/luxoft-small.png',
        "visible": true
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
        "icon": 'img/Acronis_logo-small.png',
        "visible": true
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
        "icon": 'img/4game-small.png',
        "visible": true
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
        "icon": 'img/superscape-small.png',
        "visible": true
    }
];

function checkGoogleMaps() {
    alert("Couldn't connect to Google Maps!");
}

function initMap() {
    ko.applyBindings(new ViewModel());
}

// custom binding
ko.bindingHandlers.googleMap = {
    // init map, markers and default functionality
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapOptions = {
            center: new google.maps.LatLng(
                55.752198, 37.617499),
            zoom: 9
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow();

        initialMapObjects.forEach(function (mapItem) {
            var image = {
                url: mapItem.icon,
                // This marker is 32 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            var latLng = new google.maps.LatLng(
                mapItem.coordinates.lat,
                mapItem.coordinates.lng);

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image,
                title: mapItem.name
            });

            marker.toggleBounce = function () {
                marker.setAnimation(null);

                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        marker.setAnimation(null);
                    }, 700);
                }
            };

            marker.buildAdditionalInfo = function () {
                viewModel.request(marker.title);
            };

            marker.openInfoWindow = function () {
                marker.buildAdditionalInfo();
                marker.toggleBounce();
                infowindow.setContent(mapItem.content);
                infowindow.open(map, this);
            };

            marker.addListener('click', function () {
                marker.openInfoWindow();
            });

            viewModel.markerList().push(marker);
            mapItem.marker = marker;
        });
    }
};

var MapObject = function (data) {
    this.name = ko.observable(data.name);
    this.visible = ko.observable(data.visible);
};

var ViewModel = function () {
    var self = this;

    this.mapObjectList = ko.observableArray([]);

    this.userInput = ko.observable('');

    this.hasError = ko.observable(false);
    this.error = ko.observable('error');

    this.markerList = ko.observableArray([]);

    this.showMessage = ko.observable(false);
    this.message = ko.observable('Please select item to view additional info');

    this.additionalInfo = ko.observableArray([]);

    // request to mediawiki send when info balloon is clicked
    // url - is url where we sending request
    // dataType is for Cross-domain requests
    // success if for dealing with received data (we are creating a list of links)
    // error is for error message.
    this.request = function (name) {
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
            encodeURI(name) + '&format=json&callback=?',
            dataType: 'jsonp',
            async: true,
            type: 'GET',
            success: function (data) {
                var temp = [];
                var articleList = data[1];
                var urlList = data[3];
                var len = articleList.length;
                for (var i = 0; i < len; i++) {
                    var wikiEntry = articleList[i];
                    var url = urlList[i];
                    temp.push({"url": url, "wikientry": wikiEntry});
                }
                self.additionalInfo(temp);
            }, error: function (data) {
                self.showMessage(true);
                self.message("Data couldn't be loaded.");
            }
        });
    };

    initialMapObjects.forEach(function (mapItem) {
        self.mapObjectList().push(new MapObject(mapItem));
    });

    // clear filter, reset input and error.
    this.clearFilter = function () {
        this.userInput('');
        this.hasError(false);
        this.filterMarkers('');
    };

    // bounce matching marker and open infowindow
    this.toggleBounce = function () {
        var name = this.name().toLowerCase();
        self.markerList().forEach(function (marker) {
            if (marker.title.toLowerCase().includes(name)) {
                marker.openInfoWindow();
            }
        });
    };

    // filter markers in list
    // on init we are set to default values errors and current filter
    // we are creating a list of matched markers
    // if no objects are matching we are showing error message
    this.filterMarkers = function () {
        var input = this.userInput().toLowerCase();
        this.hasError(false);
        var counter = 0;

        this.markerList().forEach(function (marker) {
            var result = marker.title.toLowerCase().includes(input);
            marker.setVisible(result);
            counter += 1;
        });

        this.mapObjectList().forEach(function (mapObject) {
            var result = mapObject.name().toLowerCase().includes(input);
            mapObject.visible(result);
        });

        if (counter === 0) {
            self.hasError(true);
            self.error("User input doesn't match names in list");
        }
    };
};
