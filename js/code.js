function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: initialCats[0].coordinates
    });
    var marker = new google.maps.Marker({
        position: initialCats[0].coordinates,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });
    var marker1 = new google.maps.Marker({
        position: initialCats[1],
        map: map
    });
    var marker2 = new google.maps.Marker({
        position: initialCats[2],
        map: map
    });
    var marker3 = new google.maps.Marker({
        position: initialCats[3],
        map: map
    });
    var marker4 = new google.maps.Marker({
        position: initialCats[4],
        map: map
    });
    var marker5 = new google.maps.Marker({
        position: initialCats[5],
        draggable: true,
        map: map,
        animation: google.maps.Animation.DROP
    });
    marker5.addListener('click', toggleBounce);

    function toggleBounce() {
        if (marker5.getAnimation() !== null) {
            marker5.setAnimation(null);
        } else {
            marker5.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    var infowindow = new google.maps.InfoWindow({
        content: initialCats[0].content,
        maxWidth: 500
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

var initialCats = [
    {
        "coordinates": {lat: 55.706770, lng: 37.625883},
        "content": '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>'
    },
    {lat: 55.815230, lng: 37.573992},
    {lat: 55.874736, lng: 37.588088},
    {lat: 55.749884, lng: 37.654274},
    {lat: 55.708177, lng: 37.654653},
    {lat: 55.740228, lng: 37.625539}
];

var Cat = function (data) {
    this.clickCount = ko.protectedObservable(data.clickCount);
    this.name = ko.protectedObservable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nickNames = ko.observableArray(data.nicknames);

    this.commitAll = function () {
        this.name.commit();
        this.clickCount.commit();
    };
    this.resetAll = function () {
        this.name.reset();
        this.clickCount.reset();
    };

    this.title = ko.pureComputed(function () {
        var title;
        var clicks;

        clicks = this.clickCount();

        if (clicks < 10) {
            title = "Newborn";
        } else if (clicks < 50) {
            title = "Infant";
        } else if (clicks < 100) {
            title = "Child";
        } else if (clicks < 200) {
            title = "Teen";
        } else if (clicks < 500) {
            title = "Adult";
        } else {
            title = "Ninja";
        }

        return title;
    }, this);
};

ko.protectedObservable = function (initialValue) {
    //private variables
    var _temp = initialValue;
    var _actual = ko.observable(initialValue);

    var result = ko.dependentObservable({
        read: _actual,
        write: function (newValue) {
            _temp = newValue;
        }
    }).extend({notify: "always"}); //needed in KO 3.0+ for reset, as computeds no longer notify when value is the same

    //commit the temporary value to our observable, if it is different
    result.commit = function () {
        if (_temp !== _actual()) {
            _actual(_temp);
        }
    };

    //notify subscribers to update their value with the original
    result.reset = function () {
        _actual.valueHasMutated();
        _temp = _actual();
    };

    return result;
};

var ViewModel = function () {
    var self = this;
    this.catList = ko.observableArray([]);

    this.isAdminFormEnabled = ko.observable(false);

    this.showAdminForm = function () {
        var currentState = this.isAdminFormEnabled();
        if (currentState === true) {
            this.isAdminFormEnabled(false);
        } else {
            this.isAdminFormEnabled(true);
        }
    };

    this.selectCurrentCat = function () {
        self.currentCat(this);
    };

    initialCats.forEach(function (catItem) {
        self.catList.push(new Cat(catItem))
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
        self.currentCat().clickCount.commit();
    };
};

ko.applyBindings(new ViewModel());
