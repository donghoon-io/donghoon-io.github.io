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
}, 1000);

function reportScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = window.innerHeight;
  const maxScroll = scrollHeight - clientHeight;
  const scrollProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  // 💬 Optional Debug Log
  console.clear();
  console.log('%c📊 Scroll Tracking', 'font-weight: bold; font-size: 16px; color: #00aaff');
  console.log(`🔼 ScrollTop: ${scrollTop.toFixed(0)}px`);
  console.log(`📏 ScrollHeight: ${scrollHeight}px`);
  console.log(`🖼️ Viewport Height: ${clientHeight}px`);
  console.log(`📈 Scroll Progress: ${scrollProgress.toFixed(1)}%`);

  // 📬 Send to parent
  window.parent.postMessage({
    type: "preview-scroll-progress",
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollProgress: scrollProgress.toFixed(1)
  }, "*");
}

// 🕒 Repeated every second
setInterval(reportScrollProgress, 1000);

// 🎯 Realtime Scroll Listener
window.addEventListener("scroll", reportScrollProgress, { passive: true });