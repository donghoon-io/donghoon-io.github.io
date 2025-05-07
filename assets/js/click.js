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
  const scrollHeight = document.body.scrollHeight;
  console.log(scrollHeight)

  window.parent.postMessage( { type: "screenshot-event", html: html }, "*" );
  window.parent.postMessage({ type: "scroll-height", height: scrollHeight }, "*");
}, 1000);