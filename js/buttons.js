// const screenControl = {
//   onAdd: (map) => {
//     this.map = map;
//     this.container = document.createElement("div");
//     this.container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";

//     const btn = document.createElement("button");
//     btn.className = "mapboxgl-ctrl-icon fa fa-image";
//     btn.title = title = "Screenshot";
//     btn.addEventListener(
//       "click",
//       (e) => {
//         toggleScreenWin();
//       },
//       false
//     );
//     this.container.appendChild(btn);
//     return this.container;
//   },
//   onRemove: () => {
//     this.container.parentNode.removeChild(this.container);
//     this.map = undefined;
//   },
//   getDefaultPosition: () => {
//     return "top-right";
//   },
// };
