const heading = document.querySelector('h1');
if (heading) {
  heading.tabIndex = -1;
  requestAnimationFrame(() => heading.focus());
}
