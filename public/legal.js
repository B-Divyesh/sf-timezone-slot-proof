const heading = document.querySelector('h1');
const announcement = document.querySelector('#route-announcement');

function focusRouteHeading() {
  if (!heading) return;
  heading.tabIndex = -1;
  requestAnimationFrame(() => {
    heading.focus();
    if (announcement) announcement.textContent = heading.textContent || 'Page loaded';
  });
}

focusRouteHeading();
window.addEventListener('pageshow', (event) => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (event.persisted || navigation?.type === 'back_forward') focusRouteHeading();
});
