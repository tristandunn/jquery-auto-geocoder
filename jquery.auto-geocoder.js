(function($) {
  var geocoder = new google.maps.Geocoder();

  $.fn.autoGeocoder = function(options) {
    var autoGeocoder = $.fn.autoGeocoder,
        options      = $.extend(true, {}, autoGeocoder.defaults, options || {}),
        setup        = options.setup || autoGeocoder.base;

    for (property in setup) {
      var methods = setup[property];

      for (var i = 0, length = methods.length; i < length; i++) {
        methods[i].call(this, options);
      }
    }

    return this.trigger('auto-geocoder.initialize');
  };

  $.fn.autoGeocoder.base = {
    initialize: [function(options) {
      options.initial.center = google.maps.LatLng.call(this, options.initial.center);

      this.bind('auto-geocoder.initialize', function() {
        $(this)
          .trigger('auto-geocoder.createMap')
          .trigger('auto-geocoder.onKeyUp');
      });
    }],

    createMap: [function(options) {
      this.bind('auto-geocoder.createMap', function() {
        var element  = $('<div>', { 'class' : options.className }),
            position = options.position;

        if (position == 'before' || position == 'after') {
          $(this)[position](element);
        } else {
          $(position).append(element);
        }

        $(this).bind('keyup.auto-geocoder', function() {
          $(this).trigger('auto-geocoder.onKeyUp');
        });

        this.map = new google.maps.Map(element[0], options.initial);
      });
    }],

    onKeyUp: [function(options) {
      this.bind('auto-geocoder.onKeyUp', function() {
        var self     = this,
            element  = $(self),
            address  = $.trim(element.val()).replace(/\s+/g, ' ').toLowerCase(),
            timeout  = this.timeout,
            previous = this.previousAddress;

        if (timeout) {
          clearTimeout(timeout);
        }

        if (previous && previous == address) {
          return;
        }

        if (address == '') {
          element.trigger('auto-geocoder.onGeocodeResult', [[], '']);

          return;
        }

        this.timeout = setTimeout(function() {
          self.previousAddress = address;

          geocoder.geocode({ address: address }, function(results, status) {
            element.trigger('auto-geocoder.onGeocodeResult', [results, status]);
          });
        }, options.delay);
      });
    }],

    onGeocodeResult: [function(options) {
      this.get(0).marker = new google.maps.Marker();
      this.bind('auto-geocoder.onGeocodeResult', function(e, results, status) {
        var map    = this.map,
            marker = this.marker;

        if (status == google.maps.GeocoderStatus.OK) {
          var geometry = results[0].geometry,
              position = geometry.location;

          if (options.success.zoom == 'auto') {
            map.fitBounds(geometry.viewport);
          } else {
            map.setZoom(options.success.zoom);
            map.setCenter(position);
          }

          marker.setPosition(position);
          marker.setMap(map);

          $(this).trigger('auto-geocoder.onGeocodeSuccess', [results, status]);
        } else {
          var initial = options.initial;

          if (marker) {
            marker.setMap(null);
          }

          map.setZoom(initial.zoom);
          map.setCenter(initial.center);

          $(this).trigger('auto-geocoder.onGeocodeFailure', [results, status]);
        }
      });
    }],

    onGeocodeSuccess: [],
    onGeocodeFailure: []
  };

  $.fn.autoGeocoder.defaults = {
    className : 'jquery-auto-geocoder-map',
    position  : 'after',
    delay     : 500,
    success   : {
      zoom : 'auto'
    },
    initial  : {
      zoom           : 1,
      center         : [34, 0],
      draggable      : false,
      mapTypeId      : google.maps.MapTypeId.ROADMAP,
      mapTypeControl : false
    }
  };
})(jQuery);
