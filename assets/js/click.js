document.addEventListener("click", function (event) {
  const validTags = ["P", "SPAN", "SUB", "SUP", "ABBR", "CITE", "CODE", "BLOCKQUOTE", "DIV", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"];
  const target = event.target;

  if (target.id && validTags.includes(target.tagName)) {
    const rect = target.getBoundingClientRect();
    const boundingBox = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    window.parent.postMessage({ type: "click-event", id: target.id, boundingBox: boundingBox }, "*");
  }
});

setInterval(() => {
  const html = document.documentElement.outerHTML;
  window.parent.postMessage( { type: "screenshot-event", html: html }, "*" );

  const currentScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const currentScrollLeft = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
  const currentClientHeight = window.innerHeight;
  const currentClientWidth = window.innerWidth;

  console.log(currentScrollTop)

  window.parent.postMessage( {
      type: "preview-scroll",
      scrollTop: currentScrollTop,
      scrollLeft: currentScrollLeft,
      clientHeight: currentClientHeight,
      clientWidth: currentClientWidth
  }, "*" );
}, 1000);