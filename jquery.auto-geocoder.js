(function($) {
  var geocoder = new google.maps.Geocoder();

  var autoGeocoder = $.fn.autoGeocoder = function(options) {
    var options = $.extend(true, {}, autoGeocoder.defaults, options || {}),
        setup   = options.setup || autoGeocoder.base;

    for (property in setup) {
      var methods = setup[property];

      for (var i = 0, length = methods.length; i < length; i++) {
        methods[i].call(this, options);
      }
    }

    return this.trigger("auto-geocoder.initialize");
  };

  autoGeocoder.base = {
    initialize: [function(options) {
      options.initial.center = new google.maps.LatLng(
        options.initial.center[0],
        options.initial.center[1]
      );

      this.on("auto-geocoder.initialize", function() {
        $(this)
          .trigger("auto-geocoder.createMap")
          .trigger("auto-geocoder.onKeyUp");
      });
    }],

    createMap: [function(options) {
      this.on("auto-geocoder.createMap", function() {
        var element  = $(this),
            wrapper  = $("<div>", { "class" : options.className }),
            position = options.position;

        if (position == "before" || position == "after") {
          element[position](wrapper);
        } else {
          $(position).append(wrapper);
        }

        element.on("keyup.auto-geocoder", function() {
          element.trigger("auto-geocoder.onKeyUp");
        });

        this.map = new google.maps.Map(wrapper[0], options.initial);
      });
    }],

    onKeyUp: [function(options) {
      this.on("auto-geocoder.onKeyUp", function() {
        var element  = $(this),
            address  = $.trim(element.val()).replace(/\s+/g, " ").toLowerCase(),
            timeout  = this.timeout,
            previous = this.previousAddress;

        clearTimeout(timeout);

        if (previous && previous == address) {
          return;
        }

        if (address == "") {
          element.trigger("auto-geocoder.onGeocodeResult", [[], ""]);

          return;
        }

        this.timeout = setTimeout($.proxy(function() {
          this.previousAddress = address;

          geocoder.geocode({ address: address }, function(results, status) {
            element.trigger("auto-geocoder.onGeocodeResult", [results, status]);
          });
        }, this), options.delay);
      });
    }],

    onGeocodeResult: [function(options) {
      this.on("auto-geocoder.onGeocodeResult", function(event, results, status) {
        var map    = this.map,
            marker = this.marker = this.marker || new google.maps.Marker();

        if (status == google.maps.GeocoderStatus.OK) {
          var geometry = results[0].geometry,
              position = geometry.location;

          if (options.success.zoom == "auto") {
            map.fitBounds(geometry.viewport);
          } else {
            map.setZoom(options.success.zoom);
            map.setCenter(position);
          }

          marker.setPosition(position);
          marker.setMap(map);

          $(this).trigger("auto-geocoder.onGeocodeSuccess", [results, status]);
        } else {
          var initial = options.initial;

          if (marker) {
            marker.setMap(null);
          }

          map.setZoom(initial.zoom);
          map.setCenter(initial.center);

          $(this).trigger("auto-geocoder.onGeocodeFailure", [results, status]);
        }
      });
    }],

    onGeocodeSuccess: [],
    onGeocodeFailure: []
  };

  autoGeocoder.defaults = {
    className : "jquery-auto-geocoder-map",
    position  : "after",
    delay     : 500,
    success   : {
      zoom : "auto"
    },
    initial  : {
      zoom                   : 1,
      center                 : [34, 0],
      draggable              : false,
      mapTypeId              : google.maps.MapTypeId.ROADMAP,
      scrollwheel            : false,
      disableDefaultUI       : true,
      disableDoubleClickZoom : true
    }
  };
})(jQuery);
