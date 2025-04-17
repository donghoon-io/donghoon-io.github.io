document.addEventListener("click", function (event) {
  const id = event.target.id;
  if (id) {
    const rect = event.target.getBoundingClientRect();
    const boundingBox = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    window.parent.postMessage({ type: "click-event", clickedId: id, boundingBox: boundingBox }, "*");
  }
});