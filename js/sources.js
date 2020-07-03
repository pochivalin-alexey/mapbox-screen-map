const geojson = () => ({
  type: "FeatureCollection",
  features: [],
});

const sources = {
  osm_topo: {
    type: "raster",
    tiles: [
      "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
  },
  point: {
    type: "geojson",
    data: geojson(),
  },
  multi_point: {
    type: "geojson",
    data: geojson(),
  },
  line: {
    type: "geojson",
    data: geojson(),
  },
  fill: {
    type: "geojson",
    data: geojson(),
  },
};
