# ploverlay

Local park maps often show trails and other features that don’t show up on mapping apps... but the local maps can’t show your current location.

**ploverlay** makes it (relatively) easy to bring these two together. Given the URL of a map, and the latitude and longitude of four control points, ploverlay will show you where you are on the map.

## Development

After you clone the repo and cd into it, you'll need to start Jekyll:
```
bundle exec jekyll serve
```

For a new map, copy one of the examples under `_maps/`.
For each control point we need a geographic latitude-longitude and an image x-y.
For geographic coordinates in North America, the latitude will be positive and the longitude negative.
For images, the origin is in the upper right, with x increasing to the right, and y increasing downward.

A `view_box` also needs to be specified: Typically, your control points will be the corners of the image,
and you will use the full height and width of the image, but that is not a requirement.

Note that because we use four control points, a projective transformation is possible:
This means that you could use an oblique aerial photograph, as long as the landscape below is relatively flat,
and four control points can be precisely located in the image.
