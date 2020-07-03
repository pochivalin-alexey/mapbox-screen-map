const markers = [];

const points = [
  [37.53651738166809, 55.61021429771476],
  [37.53545522689819, 55.60866294284557],
];

function buildMbxMarkers(points, draggable, map) {
  for (let [i, point] of points.entries()) {
    let el_marker = document.createElement("div");

    const marker_svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    marker_svg.setAttributeNS(null, "display", "block");
    marker_svg.setAttributeNS(null, "height", "40px");
    marker_svg.setAttributeNS(null, "width", "40px");
    marker_svg.setAttributeNS(null, "viewBox", "0 0 40 40");

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttributeNS(null, "fill", "white");
    circle.setAttributeNS(null, "stroke", "black");
    circle.setAttributeNS(null, "stroke-width", "3");
    circle.setAttributeNS(null, "cx", "20");
    circle.setAttributeNS(null, "cy", "20");
    circle.setAttributeNS(null, "r", "18");

    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.setAttributeNS(null, "x", "35%");
    label.setAttributeNS(null, "y", "47%");
    //label.setAttributeNS(null, "text-anchor", "middle");
    label.setAttributeNS(null, "stroke", "black");
    label.setAttributeNS(null, "font-size", "20");
    label.setAttributeNS(null, "stroke-width", "1px");
    label.setAttributeNS(null, "dy", ".3em");
    label.setAttributeNS(null, "r", "18");
    label.innerHTML = ++i;

    marker_svg.appendChild(circle);
    marker_svg.appendChild(label);
    el_marker.appendChild(marker_svg);

    let marker = new mapboxgl.Marker({
      element: el_marker,
      draggable: draggable,
    })
      .setLngLat(point)
      .addTo(map);

    markers.push(marker);
  }
}
