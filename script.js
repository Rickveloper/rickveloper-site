(function () {
  "use strict";

  var themeToggle = document.getElementById("themeToggle");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var root = document.documentElement;
  var THEME_KEY = "rickveloper-theme";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function initTheme() {
    setTheme(getStoredTheme() || getSystemTheme());
  }

  function handleThemeToggle() {
    var current = root.getAttribute("data-theme") || getSystemTheme();
    var next = current === "dark" ? "light" : "dark";
    setTheme(next);
    saveTheme(next);
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", handleThemeToggle);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!getStoredTheme()) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

  if (!navToggle || !navLinks) {
    return;
  }

  function openNav() {
    navLinks.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    navLinks.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function handleNavToggle() {
    if (navLinks.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  }

  navToggle.addEventListener("click", handleNavToggle);

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", function (e) {
    var clickedNav = navLinks.contains(e.target);
    var clickedToggle = navToggle.contains(e.target);
    if (!clickedNav && !clickedToggle && navLinks.classList.contains("active")) {
      closeNav();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeNav();
      navToggle.focus();
    }
  });

  // Chatbot functionality
  var chatbotTrigger = document.getElementById("chatbotTrigger");
  var chatbotPanel = document.getElementById("chatbotPanel");
  var chatbotClose = document.getElementById("chatbotClose");
  var chatbotOptions = document.querySelectorAll(".chatbot__option");

  if (!chatbotTrigger || !chatbotPanel) {
    return;
  }

  function openChatbot() {
    chatbotPanel.hidden = false;
    chatbotTrigger.setAttribute("aria-expanded", "true");
    chatbotClose.focus();
  }

  function closeChatbot() {
    chatbotPanel.hidden = true;
    chatbotTrigger.setAttribute("aria-expanded", "false");
    chatbotTrigger.focus();
  }

  function toggleChatbot() {
    if (chatbotPanel.hidden) {
      openChatbot();
    } else {
      closeChatbot();
    }
  }

  chatbotTrigger.addEventListener("click", toggleChatbot);

  if (chatbotClose) {
    chatbotClose.addEventListener("click", closeChatbot);
  }

  chatbotOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      var action = option.getAttribute("data-action");
      var target = option.getAttribute("data-target");

      if (action === "scroll" && target) {
        var section = document.getElementById(target);
        if (section) {
          closeChatbot();
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else if (action === "email") {
        window.location.href = "mailto:rickveloper@proton.me?subject=Website%20Inquiry";
      }
    });
  });

  document.addEventListener("click", function (e) {
    var chatbot = document.getElementById("chatbot");
    if (chatbot && !chatbot.contains(e.target) && !chatbotPanel.hidden) {
      closeChatbot();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !chatbotPanel.hidden) {
      closeChatbot();
    }
  });
})();
