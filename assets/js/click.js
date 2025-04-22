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

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const html = document.documentElement.outerHTML;
    console.log(html);
  }, 1000);
  
  // Send the HTML back to the parent
  window.parent.postMessage(
    {
      type: "website-code-response",
      html
    },
    event.origin
  );
});