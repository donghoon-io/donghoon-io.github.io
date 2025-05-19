document.addEventListener("click", function (event) {
  const validTags = ["P", "SPAN", "SUB", "SUP", "ABBR", "CITE", "CODE", "BLOCKQUOTE", "DIV", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "A", "H1", "H2", "H3", "H4", "H5", "H6"];
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

document.addEventListener("mousedown", function (event) {

  const target = event.target;

  window.parent.postMessage(
    {
      type: "mouse-down"
    },
    "*"
  );
});

setInterval(() => {
  const html = document.documentElement.outerHTML;
  window.parent.postMessage( { type: "screenshot-event", html: html }, "*" );
}, 1000);

function reportScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = window.innerHeight;
  const maxScroll = scrollHeight - clientHeight;
  const scrollProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  
  window.parent.postMessage({
    type: "preview-scroll-progress",
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollProgress: scrollProgress.toFixed(1)
  }, "*");
}

// 🎯 Realtime Scroll Listener
window.addEventListener("scroll", reportScrollProgress, { passive: true });