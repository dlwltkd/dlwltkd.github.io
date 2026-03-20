const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2');

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

window.addEventListener('resize', () => {
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    if (newWidth / newHeight > CANVAS_WIDTH / CANVAS_HEIGHT) {
        newWidth = newHeight * (CANVAS_WIDTH / CANVAS_HEIGHT);
    } else {
        newHeight = newWidth * (CANVAS_HEIGHT / CANVAS_WIDTH);
    }
    canvas.width = newWidth;
    canvas.height = newHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});
const vertexShaderSource = readShaderFile("shader.vert");

const fragmentShaderSource = readShaderFile("shader.frag");

gl.viewport(0, 0, canvas.width, canvas.height);

gl.clearColor(0.1, 0.2, 0.3, 1.0);

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
}
render();