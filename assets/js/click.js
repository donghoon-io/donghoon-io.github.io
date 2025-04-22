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

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutationsList, observer) => {
    const bodyText = document.body.innerText;

    // If "Loading.." was visible but now gone or changed
    if (!bodyText.includes("Loading..")) {
      const html = document.documentElement.outerHTML;
      console.log(html);

      observer.disconnect();
    }
  });

  // Start observing the entire body for text/content changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
});