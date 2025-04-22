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

window.addEventListener("message", (event) => {
  const { type } = event.data;

  if (type === "get-website-code") {
    const html = document.documentElement.outerHTML;
    
    // Send the HTML back to the parent
    event.source.postMessage(
      {
        type: "website-code-response",
        html
      },
      event.origin
    );
  }
});