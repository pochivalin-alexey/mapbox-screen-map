const layers = [
  {
    id: "osm_topo",
    type: "raster",
    source: "osm_topo",
    minzoom: 0,
  },
  {
    id: "point",
    source: "point",
    type: "circle",
    paint: {
      "circle-radius": 20,
      "circle-color": "#ff0000",
      //"circle-opacity": 0.5,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "multi_point",
    source: "multi_point",
    type: "circle",
    paint: {
      "circle-radius": 12,
      "circle-color": "#00ff00",
      //"circle-opacity": 0.5,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "line",
    source: "line",
    type: "line",
    paint: {
      "line-color": "#ff0000",
    },
  },
  {
    id: "fill",
    source: "fill",
    type: "fill",
    paint: {
      "fill-color": "#ff0000",
    },
  },
];
