export function makeResizer(element, dir = 'h') {
  const width = 5;
  const min = 200;
  element.style.setProperty('cursor', dir === 'h' ? 'ew-resize' : 'ns-resize');
  element.style.setProperty(dir === 'h' ? 'height' : 'width', '100%');
  element.style.setProperty(dir === 'h' ? 'width' : 'height', `${width}px`);
  element.style.setProperty('flex', `0 0 ${width}px;`);
  element.style.setProperty('background', ` linear-gradient(${dir === 'h' ? '' : '90deg, '}#00000000 0%, #00000000 48%, #0000007f 50%, #00000000 52%, #00000000 100%);`);
  element.previousElementSibling.style.setProperty('overflow', `hidden`);
  element.nextElementSibling.style.setProperty('overflow', `hidden`);
  // element.style.setProperty('position', 'absolute');
  // element.style.setProperty(dir === 'h' ? 'right' : 'top', `-${width}px`);
  // element.style.setProperty(dir === 'h' ? 'top' : 'right', '0');

  const name = element.getAttribute('resize-name');

  let d;
  const mousedown = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    d = 0;
  };
  const mousemove = (e) => {
    e.preventDefault();
    d = element.previousElementSibling.offsetWidth + e.movementX;
    const d2 = element.nextElementSibling.offsetWidth - e.movementX;
    if (d < min || d2 < min) return;
    element.previousElementSibling.style.setProperty(dir === 'h' ? 'width' : 'height', `${d}px`);
    element.nextElementSibling.style.setProperty(dir === 'h' ? 'width' : 'height', `${d2}px`);
  };
  const mouseup = (e) => {
    e.preventDefault();
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
    if (name) {
      sizes[name] = d;
    }
  };

  element.addEventListener('mousedown', mousedown);
  if (name) {
    const d = Math.max(parseInt(sizes[name]) || 0, (window.innerWidth - 100) / 3);
    element.previousElementSibling.style.setProperty(dir === 'h' ? 'width' : 'height', `${d}px`);
  }
}