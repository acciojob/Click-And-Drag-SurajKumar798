const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let currentCube = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

cubes.forEach(cube => {
  cube.style.position = 'absolute';
  cube.style.cursor = 'grab';

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentCube = cube;
    currentCube.style.cursor = 'grabbing';
    currentCube.style.zIndex = 1000;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = currentCube.offsetWidth;
  const cubeHeight = currentCube.offsetHeight;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Clamp within container
  x = Math.max(0, Math.min(x, container.offsetWidth - cubeWidth));
  y = Math.max(0, Math.min(y, container.offsetHeight - cubeHeight));

  currentCube.style.left = `${x}px`;
  currentCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (isDragging && currentCube) {
    isDragging = false;
    currentCube.style.cursor = 'grab';
    currentCube.style.zIndex = 1;
    currentCube = null;
  }
});
