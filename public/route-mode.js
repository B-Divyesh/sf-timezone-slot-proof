const route = window.location.pathname;
if (new URLSearchParams(window.location.search).get('demo') === '1' || route === '/demo' || route === '/demo/') {
  document.documentElement.classList.add('demo-mode');
}
