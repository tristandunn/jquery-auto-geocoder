# jQuery Automatic Geocoder

A jQuery plug-in to automatically geocode and display a location entered in a
text field by a user.

## Usage

1. Include [jQuery](http://jquery.com).
2. Include the Google Maps [JavaScript API Version 3](https://developers.google.com/maps/documentation/javascript/).
3. Include [the plug-in](https://github.com/tristandunn/jquery-auto-geocoder/raw/master/jquery.auto-geocoder.min.js).
4. Set a width and height for the map using the class name, which is `jquery-auto-geocoder-map` by default.
5. Call `autoGeocoder` on your location input(s).

## Example

~~~ js
$(function() {
  $('#location').autoGeocoder();
});
~~~

See [examples](https://github.com/tristandunn/jquery-auto-geocoder/tree/master/examples/) for more or [view an example online](http://tristandunn.com/projects/jquery-auto-geocoder/).

## Options

##### className

The class name of the map container. Defaults to `jquery-auto-geocoder-map`.

##### position

Where to insert the map container. Supported options are `after` and `before` for after and before the element, or a custom jQuery selector for where the element should be appended. Defaults to `after`.

##### delay

The time, in milliseconds, to wait after a keypress before geocoding the location. Defaults to `500`.

##### success.zoom

The zoom level to use after a successful geocoding. Supported options are any Google Maps zoom level, or `auto` to have it automatically determined. Defaults to `auto`.

##### initial

The initial options used to create the map. Accepts any options `google.maps.Map` accepts. The `zoom` and `center` options are also used to reset the map after an unsuccessful geocoding. See the bottom of [jquery.auto-geocoder.js](https://github.com/tristandunn/jquery-auto-geocoder/blob/master/jquery.auto-geocoder.js) for all the defaults.

## Credits

* [Jan-Gerd Tenberge](http://janten.com) for the `map.fitBounds(viewport)` tip.

## License

jquery-auto-geocoder uses the MIT license. See LICENSE for more details.
