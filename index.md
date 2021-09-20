---
title: ploverlay
layout: default
---

# ploverlay

Local park maps often show trails and other features that don't show up on mapping apps...
but the local maps can't show your current location.

**ploverlay** makes it (relatively) easy to bring these two together.
Given the URL of a map, and the latitude and longitude of four control points,
ploverlay will show you where you are on the map.
[Configure a new map on github.](https://github.com/mccalluc/ploverlay)

Current maps:

{% for map in site.maps %}
{% capture url %}{{ site.baseurl }}{{ map.url }}{% endcapture %}
- [{{ map.title }}]({{ url }}) ([faster]({{url}}?refresh=10)/[cheaper]({{url}}?refresh=600)) (from [{{ map.source.text }}]({{ map.source.href }}))
{% endfor %}

The GPS on mobile devices uses a lot of battery. The "faster" and "cheaper" links set the refresh interval shorter or longer than the 1-minute default.
