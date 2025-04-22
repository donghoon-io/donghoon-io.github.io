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

document.addEventListener("get-website-code", function (event) {
  try {
    const html = document.documentElement.outerHTML;
    window.parent.postMessage(
      {
        type: "website-code",
        html: html
      },
      "*"
    );
  } catch (e) {
    window.parent.postMessage(
      {
        type: "website-code",
        error: e.toString()
      },
      "*"
    );
  }
});