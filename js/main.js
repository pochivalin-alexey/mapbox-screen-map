const map = new mapboxgl.Map({
  container: "map",
  style: style, //"mapbox://styles/mapbox/streets-v9",
  center: [37.618423, 55.751244],
  zoom: 8.2,
});

buildMbxMarkers(points, true, map);

const scale = new mapboxgl.ScaleControl({
  maxWidth: 100,
  unit: "metric",
});
map.addControl(scale);

var draw = new MapboxDraw({
  displayControlsDefault: true,
  userProperties: true,
});

/********************************************** */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
/********************************************** */

map.on("style.load", async (e) => {
  map.addControl(draw);

  map.getSource("point").setData(featurePoint);
  map.getSource("line").setData(featureLine);
  map.getSource("fill").setData(featurePolygon);
  map.getSource("multi_point").setData(featureMultiPoint);
});

const screen = document.querySelector("#screen-btn");
screen.addEventListener("click", () => {
  toggleScreenWin();
});

function toggleScreenWin() {
  const elem = document.getElementById("screenshot-win");
  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
    takeScreenshot(map);
  }
}

// get screen map without preserveDrawingBuffer: true in style
function takeScreenshot(map, format = "image/jpeg") {
  return new Promise((resolve, reject) => {
    map.once("render", async () => {
      //resolve(map.getCanvas().toDataURL(format));
      await buildCanvas();
      resolve();
    });
    /* trigger render */
    map.setBearing(map.getBearing());
  });
}

function drawLogo(canvas) {
  const ctx = canvas.getContext("2d");
  const img_logo = getLogo();
  ctx.drawImage(
    img_logo.image,
    canvas.width - img_logo.width - 5,
    canvas.height - img_logo.height - 5,
    img_logo.width,
    img_logo.height
  );
}

function drawScale(mapCanvas, mergeCanvas) {
  const ctx = mergeCanvas.getContext("2d");
  var scale_img = getMbxScale();

  ctx.drawImage(scale_img.image, 0, 0);
  ctx.beginPath();
  ctx.moveTo(10, mapCanvas.getAttribute("height") - scale_img.height - 10);
  ctx.lineTo(10, mapCanvas.getAttribute("height") - 10);
  ctx.lineTo(10 + scale_img.width, mapCanvas.getAttribute("height") - 10);
  ctx.lineTo(
    10 + scale_img.width,
    mapCanvas.getAttribute("height") - scale_img.height - 10
  );
  ctx.stroke();
  ctx.font = `${scale_img.text_size} ${scale_img.text_font}` /*"10px serif"*/;
  ctx.fillText(
    scale_img.text,
    10 + 5,
    mapCanvas.getAttribute("height") - 10 - 8
  );
}

function drawMarkers(canvas) {
  const ctx = canvas.getContext("2d");
  const imgs = getMarkers();
  const defer = {};
  defer.promise = new Promise((done) => (defer.done = done));
  for (const [i, img] of imgs.entries()) {
    img.onload = () => {
      let center = [markers[i]._lngLat.lng, markers[i]._lngLat.lat];
      let px_coord = map.project(center);
      ctx.drawImage(img, px_coord.x - 20, px_coord.y - 20);
      if (imgs.length - 1 === i) defer.done();
    };
  }
  return defer.promise;
}

function getImage(canvas, isUrl = true, format = "image/jpeg", quality = 0.5) {
  const defer = {};
  defer.promise = new Promise((done) => (defer.done = done));
  if (isUrl) {
    defer.done(canvas.toDataURL(format, quality));
  } else {
    canvas.toBlob(
      (blob) => {
        defer.done(blob);
      },
      format,
      quality
    );
  }
  return defer.promise;
}

function pasteImage(image, selector, isResize = "true") {
  const MAX_WIDTH = 640;
  const MAX_HEIGHT = 480;
  const img = document.querySelector(selector);
  img.src = image;
  if (isResize) {
    img.onload = () => {
      // origin size
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      img.width = width;
      img.height = height;
    };
  } else {
    img.width = MAX_WIDTH;
    img.height = MAX_HEIGHT;
  }
}

async function buildCanvas() {
  const mergeCanvas = document.createElement("canvas");
  const mapCanvas = map.getCanvas();
  const mergeCtx = mergeCanvas.getContext("2d");

  mergeCanvas.height = mapCanvas.height;
  mergeCanvas.width = mapCanvas.width;
  mergeCtx.drawImage(mapCanvas, 0, 0);
  drawLogo(mergeCanvas);
  drawScale(mapCanvas, mergeCanvas);
  await drawMarkers(mergeCanvas);
  const image = await getImage(mergeCanvas);
  pasteImage(image, ".screenshot", true);
  mergeCanvas.remove();
}

function getMarkers() {
  var div_markers = document.querySelectorAll(
    "div.mapboxgl-marker.mapboxgl-marker-anchor-center"
  );
  const svgs = document.querySelectorAll("svg");
  all_img64 = [];

  for (const svg of svgs) {
    var xml = new XMLSerializer().serializeToString(svg);
    // make it base64
    var svg64 = btoa(xml);
    var b64Start = "data:image/svg+xml;base64,";
    // prepend a "header"
    var image64 = b64Start + svg64;
    // set it as the source of the img element
    let img = new Image();
    img.src = image64;
    all_img64.push(img);
  }
  return all_img64;
}

function getMbxScale() {
  var ctr_scale = document.querySelector(
    "div.mapboxgl-ctrl.mapboxgl-ctrl-scale"
  );
  var style = window.getComputedStyle(ctr_scale, false);
  return {
    image: new Image(),
    width: parseFloat(style.width.replace("px", "")),
    height: parseFloat(style.height.replace("px", "")),
    margin_left: parseFloat(style.marginLeft.replace("px", "")),
    margin_bottom: parseFloat(style.marginBottom.replace("px", "")),
    //margin: parseFloat(style.margin.replace("px", "")),
    text_padding: parseFloat(style.paddingLeft.replace("px", "")),
    text_font: style.fontFamily,
    text_size: style.fontSize,
    text: ctr_scale.innerText,
  };
}

function getLogo() {
  // OpenStreetMap and Mapbox attribution are required by
  // the Mapbox terms of service: https://www.mapbox.com/tos/#[YmdMYmdM]
  // define instance of Image
  var img = new Image();

  var a = document.querySelector("a.mapboxgl-ctrl-logo");
  var style = window.getComputedStyle(a, false);

  // use mapbox logo as source
  var logo = mapboxLogo();
  //console.log("logo.image ", logo.image);
  img.src = logo.image;
  return {
    image: img,
    height: style.height.replace("px", ""),
    width: style.width.replace("px", ""),
  };
}

function mapboxLogo() {
  var a = document.querySelector("a.mapboxgl-ctrl-logo");
  var style = window.getComputedStyle(a, false);
  var dataURL = style.backgroundImage.slice(5, -2);

  var height = style.height.replace("px", "");
  var width = style.width.replace("px", "");
  //var safeDataURL = firefoxBugFix(dataURL, height, width);

  //return { image: safeDataURL, height: height, width: width };
  return { image: dataURL, height: height, width: width };
}
