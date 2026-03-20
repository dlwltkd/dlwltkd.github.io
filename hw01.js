// Global constants
const canvas = document.getElementById('glCanvas'); // Get the canvas element 
const gl = canvas.getContext('webgl2'); // Get the WebGL2 context
const vertices = new Float32Array([
    -0.5, -0.5, 0.0,
    0.5, -0.5, , 0.0,
    0.0, 0.5, 0.0

])
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const vertextBuffer = gl.createBuffer();

gl.bindBuffer = gl.createBuffer

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size: 현재 window 전체를 canvas로 사용
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

canvas.width = 500;
canvas.height = 500;

window.addEventListener('resize', () => {

    // Calculate new canvas dimensions while maintaining aspect ratio
    const aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
    } else {
        newHeight = newWidth / aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});

// Initialize WebGL settings
gl.enable(gl.SCISSOR_TEST);

// Start rendering
render();

function render() {
    const h = canvas.height / 2;
    const w = canvas.width / 2;


    // Top-left: green
    gl.viewport(0, h, w, h);
    gl.scissor(0, h, w, h);
    gl.clearColor(0.0, 1.0, 0.0, 1.0); //green
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Top-right: red
    gl.viewport(w, h, w, h);
    gl.scissor(w, h, w, h);
    gl.clearColor(1.0, 0.0, 0.0, 1.0); //red
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bottom-left: blue
    gl.viewport(0, 0, w, h);
    gl.scissor(0, 0, w, h);
    gl.clearColor(0.0, 0.0, 1.0, 1.0); //blue
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bottom-right: yellow
    gl.viewport(w, 0, w, h);
    gl.scissor(w, 0, w, h);
    gl.clearColor(1.0, 1.0, 0.0, 1.0); //yellow
    gl.clear(gl.COLOR_BUFFER_BIT);
}


