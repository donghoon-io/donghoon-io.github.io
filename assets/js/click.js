document.addEventListener("click", function (event) {
  const id = event.target.id;
  console.log(id)
  alert(id)
  if (id) {
    const rect = event.target.getBoundingClientRect();
    console.log(rect)
    const boundingBox = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    console.log(boundingBox)
    window.parent.postMessage({ type: "click-event", clickedId: id, boundingBox }, "*");
  }
});