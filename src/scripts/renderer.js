document.addEventListener("DOMContentLoaded", () => {
  const clipboardList = document.getElementById("clipboardList");
  const clearButton = document.getElementById("clearHistory");

  window.clipboardAPI.onClipboardUpdate((history) => {
    clipboardList.innerHTML = "";
    history.forEach((text) => {
      const item = document.createElement("div");
      item.className = "clipboard-item";
      item.textContent = text;
      item.onclick = () => navigator.clipboard.writeText(text);
      clipboardList.appendChild(item);
    });
  });

  clearButton.onclick = () => {
    window.clipboardAPI.clearHistory();
  };

  // Window controls
  document.querySelector(".minimize").onclick = () => {
    window.electron.minimize();
  };

  document.querySelector(".maximize").onclick = () => {
    window.electron.maximize();
  };

  document.querySelector(".close").onclick = () => {
    window.electron.close();
  };
});
