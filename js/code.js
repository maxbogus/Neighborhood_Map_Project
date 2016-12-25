function initMap() {
    ko.applyBindings(new ViewModel());
}

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
        '</div>'
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
        '</div>'
    },
    {
        "name": 3,
        "coordinates": {lat: 55.874736, lng: 37.588088},
        "content": '<div>' +
        '<h1 class="firstHeading">Banki.ru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Head of Quality Assurance:</b></p><ul><li>Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.</li>' +
        '<li>Created department from ‘scratch’ in two years and developed processes to support department goals.</li>' +
        '<li>Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes;</li>' +
        '<li>Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks).</li></ul>' +
        '</div>' +
        '</div>'
    },
    {
        "name": 4,
        "coordinates": {lat: 55.749884, lng: 37.654274},
        "content": '<div>' +
        '<h1 class="firstHeading">Banki.ru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Head of Quality Assurance:</b></p><ul><li>Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.</li>' +
        '<li>Created department from ‘scratch’ in two years and developed processes to support department goals.</li>' +
        '<li>Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes;</li>' +
        '<li>Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks).</li></ul>' +
        '</div>' +
        '</div>'
    },
    {
        "name": 5,
        "coordinates": {lat: 55.708177, lng: 37.654653},
        "content": '<div>' +
        '<h1 class="firstHeading">Banki.ru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Head of Quality Assurance:</b></p><ul><li>Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.</li>' +
        '<li>Created department from ‘scratch’ in two years and developed processes to support department goals.</li>' +
        '<li>Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes;</li>' +
        '<li>Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks).</li></ul>' +
        '</div>' +
        '</div>'
    },
    {
        "name": 6,
        "coordinates": {lat: 55.740228, lng: 37.625539},
        "content": '<div>' +
        '<h1 class="firstHeading">Banki.ru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Head of Quality Assurance:</b></p><ul><li>Responsible for hiring and managing of two groups of testers: local (5 people) and two remote teams.</li>' +
        '<li>Created department from ‘scratch’ in two years and developed processes to support department goals.</li>' +
        '<li>Realized and implemented a semi-automatic solution that enables the Smoke-testing of more than 900 pages of our website in 5 minutes;</li>' +
        '<li>Reduced software development time in the final stages by an average of 40-50% (1 month to 2 weeks).</li></ul>' +
        '</div>' +
        '</div>'
    }
];

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
            var latLng = new google.maps.LatLng(
                mapItem.coordinates().lat,
                mapItem.coordinates().lng);
            var marker = new google.maps.Marker({
                position: latLng,
                draggable: true,
                map: map,
                animation: google.maps.Animation.DROP
            });

            function toggleBounce() {
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
            var marker = new google.maps.Marker({
                position: latLng,
                draggable: true,
                map: map,
                animation: google.maps.Animation.DROP
            });

            function toggleBounce() {
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
                infowindow.open(map, marker);
            });
        });
    }
};

var MapObject = function (data) {
    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.content = ko.observable(data.content);
};

var ViewModel = function () {
    var self = this;

    this.mapObjectList = ko.observableArray([]);
    this.filteredMapObjectList = ko.observableArray([]);

    this.userInput = ko.observable('');

    this.hasError = ko.observable(false);
    this.error = ko.observable('error');

    initialMapObjects.forEach(function (mapItem) {
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
        var input = this.userInput();
        this.filteredMapObjectList([]);
        this.hasError(false);
        initialMapObjects.forEach(function (mapItem) {
            if (input == mapItem.name) {
                self.filteredMapObjectList.push(new MapObject(mapItem));
            }
        });
        if (self.filteredMapObjectList().length === 0) {
            self.hasError(true);
            self.error("User input doesn't match names in list");
        }
    };
};
