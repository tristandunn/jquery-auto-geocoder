# jQuery Auto-geocoder

A jQuery plug-in to automatically geocode and display a location entered in a
text field by a user.

## Usage

1. Include [jQuery](http://jquery.com).
2. Include the Google Maps [JavaScript API Version 3](http://code.google.com/apis/maps/documentation/v3/).
3. Include [the plug-in](http://github.com/tristandunn/jquery-auto-geocoder/raw/master/jquery.auto-geocoder.js).
4. Set a width and height for the map using the class name, which is `jquery-auto-geocoder-map` by default.
5. Call `autoGeocoder` on your location input(s).

## Example

~~~ js
$(function() {
  $('#location').autoGeocoder();
});
~~~

See [examples](http://github.com/tristandunn/jquery-auto-geocoder/tree/master/examples/) for more or [view an example online](http://tristandunn.com/projects/jquery-auto-geocoder/).

## Credits

* [Jan-Gerd Tenberge](http://janten.com/) for the `map.fitBounds(viewport)` tip.

## License

The MIT License

Copyright (c) 2011 Tristan Dunn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
