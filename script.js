//your JS code here. If required.
// Utility to get cookie value by name
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Utility to set cookies
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days*24*60*60*1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Apply CSS variables from cookies if they exist
function applyPreferences() {
  const savedSize = getCookie("fontsize");
  const savedColor = getCookie("fontcolor");

  if (savedSize) {
    document.documentElement.style.setProperty("--fontsize", savedSize + "px");
    document.getElementById("fontsize").value = savedSize;
  }

  if (savedColor) {
    document.documentElement.style.setProperty("--fontcolor", savedColor);
    document.getElementById("fontcolor").value = savedColor;
  }
}

// On form submit → save cookies & apply immediately
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const size = document.getElementById("fontsize").value;
  const color = document.getElementById("fontcolor").value;

  // Save to cookies
  setCookie("fontsize", size);
  setCookie("fontcolor", color);

  // Apply instantly
  document.documentElement.style.setProperty("--fontsize", size + "px");
  document.documentElement.style.setProperty("--fontcolor", color);
});

// Apply preferences during initial page load
applyPreferences();
