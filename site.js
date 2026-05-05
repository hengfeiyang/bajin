(function () {
  var PAGE_DARK = true;

  var APP_THEMES = {
    light: {
      screen: '#f0f0f5',
      card: '#ffffff',
      cardBorder: '#f5f5f5',
      text: '#111111',
      textSub: '#555555',
      textMuted: '#999999',
      textAlt: '#aaaaaa',
      iconBg: ['#fff3e0', '#e3f2fd', '#fce4ec', '#f3e5f5'],
      iconBgBal: '#fff9e6',
      barBg: '#f0f0f0',
      btnBg: '#e8e8ee',
      btnText: '#555555',
      inputBg: '#ffffff',
      inputText: '#bbbbbb',
      sendBtn: '#555555',
      siColor: '#111111'
    },
    dark: {
      screen: '#111118',
      card: '#1c1c28',
      cardBorder: '#2a2a3a',
      text: '#f0f0f8',
      textSub: '#9090b0',
      textMuted: '#606080',
      textAlt: '#606080',
      iconBg: ['#2a2010', '#0d1e2e', '#2a1020', '#1e0e2a'],
      iconBgBal: '#1e1800',
      barBg: '#2a2a3a',
      btnBg: '#2a2a3a',
      btnText: '#9090b0',
      inputBg: '#1c1c28',
      inputText: '#50506a',
      sendBtn: '#3a3a4a',
      siColor: '#f0f0f8'
    }
  };

  function setVar(style, name, value) {
    style.setProperty(name, value);
  }

  function applyMockupTheme(dark) {
    var screen = document.getElementById('app-screen');
    if (!screen) return;

    var theme = dark ? APP_THEMES.dark : APP_THEMES.light;
    screen.style.background = theme.screen;
    screen.querySelectorAll('[data-si]').forEach(function (el) {
      el.setAttribute('fill', theme.siColor);
    });

    var timeEl = screen.querySelector('[data-time]');
    if (timeEl) timeEl.style.color = theme.text;

    var header = screen.querySelector('[data-header]');
    if (header) {
      var menu = header.querySelector('[data-menu]');
      if (menu) menu.style.background = theme.btnBg;
      var title = header.querySelector('[data-title]');
      if (title) title.style.color = theme.text;
      var plus = header.querySelector('[data-plus]');
      if (plus) {
        plus.style.background = theme.btnBg;
        plus.style.color = theme.btnText;
      }
    }

    screen.querySelectorAll('[data-card]').forEach(function (el) { el.style.background = theme.card; });
    screen.querySelectorAll('[data-card-border]').forEach(function (el) { el.style.borderBottomColor = theme.cardBorder; });
    screen.querySelectorAll('[data-bar-bg]').forEach(function (el) { el.style.background = theme.barBg; });
    screen.querySelectorAll('[data-text]').forEach(function (el) { el.style.color = theme.text; });
    screen.querySelectorAll('[data-text-sub]').forEach(function (el) { el.style.color = theme.textSub; });
    screen.querySelectorAll('[data-text-muted]').forEach(function (el) { el.style.color = theme.textMuted; });
    screen.querySelectorAll('[data-text-alt]').forEach(function (el) { el.style.color = theme.textAlt; });
    screen.querySelectorAll('[data-icon-cat]').forEach(function (el, i) { el.style.background = theme.iconBg[i % 4]; });

    var balance = screen.querySelector('[data-icon-balance]');
    if (balance) balance.style.background = theme.iconBgBal;
    var input = screen.querySelector('[data-input]');
    if (input) input.style.background = theme.inputBg;
    var inputText = screen.querySelector('[data-input-text]');
    if (inputText) inputText.style.color = theme.inputText;
    var send = screen.querySelector('[data-send]');
    if (send) send.style.background = theme.sendBtn;
  }

  function applyPageTheme(dark) {
    PAGE_DARK = dark;
    var root = document.documentElement.style;

    if (dark) {
      setVar(root, '--bg', '#09090f');
      setVar(root, '--bg2', '#0e0e1a');
      setVar(root, '--surface', '#13131f');
      setVar(root, '--surface2', '#1a1a2e');
      setVar(root, '--border', 'rgba(255,255,255,0.07)');
      setVar(root, '--border2', 'rgba(255,255,255,0.12)');
      setVar(root, '--text', '#f0f0f8');
      setVar(root, '--text2', '#9090b0');
      setVar(root, '--text3', '#5a5a7a');
      setVar(root, '--nav-bg', 'rgba(9,9,15,0.80)');
    } else {
      setVar(root, '--bg', '#fafafa');
      setVar(root, '--bg2', '#f4f4f8');
      setVar(root, '--surface', '#ffffff');
      setVar(root, '--surface2', '#f0f0f5');
      setVar(root, '--border', 'rgba(0,0,0,0.07)');
      setVar(root, '--border2', 'rgba(0,0,0,0.12)');
      setVar(root, '--text', '#0d0d1a');
      setVar(root, '--text2', '#555580');
      setVar(root, '--text3', '#aaaacc');
      setVar(root, '--nav-bg', 'rgba(250,250,252,0.85)');
    }

    applyMockupTheme(dark);

    var button = document.getElementById('theme-toggle-btn');
    if (button) button.textContent = dark ? '☀' : '☾';
  }

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem('bajin-theme');
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (e) {
      return null;
    }
  }

  function applyPreferredTheme() {
    var saved = getSavedTheme();
    if (saved) {
      applyPageTheme(saved === 'dark');
      return;
    }

    applyPageTheme(systemTheme ? systemTheme.matches : true);
  }

  function togglePageTheme() {
    applyPageTheme(!PAGE_DARK);
    try {
      localStorage.setItem('bajin-theme', PAGE_DARK ? 'dark' : 'light');
    } catch (e) {}
  }

  var systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  window.togglePageTheme = togglePageTheme;
  applyPreferredTheme();

  document.addEventListener('DOMContentLoaded', function () {
    var themeButton = document.getElementById('theme-toggle-btn');
    if (themeButton) themeButton.addEventListener('click', togglePageTheme);

    applyPreferredTheme();
    if (systemTheme) {
      if (typeof systemTheme.addEventListener === 'function') {
        systemTheme.addEventListener('change', applyPreferredTheme);
      } else if (typeof systemTheme.addListener === 'function') {
        systemTheme.addListener(applyPreferredTheme);
      }
    }

    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { observer.observe(el); });

    document.querySelectorAll('.acc-trigger').forEach(function (button) {
      button.addEventListener('click', function () {
        var item = button.closest('.acc-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item').forEach(function (accItem) {
          accItem.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });
  });
})();
