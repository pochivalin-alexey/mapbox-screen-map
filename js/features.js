const featurePoint = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [37.518423, 55.651244],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [37.418423, 55.351244],
      },
    },
  ],
};

const featureMultiPoint = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPoint",
        coordinates: [
          [37.6157283782959, 55.74629407710468],
          [37.6186466217041, 55.746994573402674],
        ],
      },
    },
  ],
};

const featureLine = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [37.61645793914794, 55.757633324296144],
          [37.61800289154053, 55.75857509432394],
          [37.620052099227905, 55.75890712320616],
          [37.621521949768066, 55.75918481791864],
          [37.62373208999634, 55.75946251065373],
          [37.62488007545471, 55.75955909896764],
        ],
      },
    },
  ],
};

const featurePolygon = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [37.621028423309326, 55.75855698357634],
            [37.62121081352234, 55.75826721047085],
            [37.62136101722717, 55.7579170650957],
            [37.622079849243164, 55.75802573123822],
            [37.622230052948, 55.75858716815102],
            [37.62195110321045, 55.758834680782044],
            [37.621028423309326, 55.75855698357634],
          ],
        ],
      },
    },
  ],
};
