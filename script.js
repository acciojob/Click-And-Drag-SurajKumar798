// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');
cubes.forEach(cube => {
	cube.style.position = 'absolute';
	cube.style.cursor = 'grab';

	let offsetX, offsetY;
	let isDragging = false;

	cube.addEventListener('mousedown', (e) => {
		isDragging = true;
		cube.style.cursor = 'grabbing';

		const rect = cube.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;

		cube.style.zIndex = 1000;
	});
	document.addEventListener('mousemove', (e) => {
		if(!isDragging) return;
		const containerRect = container.getBoundingClientRect();
		const cubeWidth = cube.offsetWidth;
		const cubeHeight = cube.offsetHeight;

		 let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    x = Math.max(0, Math.min(x, container.offsetWidth - cubeWidth));
    y = Math.max(0, Math.min(y, container.offsetHeight - cubeHeight));

    cube.style.left = `${x}px`;
    cube.style.top = `${y}px`;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      cube.style.cursor = 'grab';
      cube.style.zIndex = 1;
    }
  });
});