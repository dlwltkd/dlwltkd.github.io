import { resizeAspectRatio, setupText } from "../../util/util.js";
import { readShaderFile, createProgram } from "../../util/shader.js";

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

//주어진 util.js에 있는 resizeAspectRatio 함수 (창 크기 변경 시 비율 유지)
resizeAspectRatio(gl, canvas);

//사각형 이동 오프셋
let offsetX = 0.0;
let offsetY = 0.0;
//셰이더 변수 
let shaderProgram;


async function main() {
    //셰이더 파일을 비동기로 읽어오기 
    const vSource = await readShaderFile("shader.vert");
    const fSource = await readShaderFile("shader.frag");

    //셰이더 프로그램 생성 (컴파일, 링크)
    shaderProgram = createProgram(gl, vSource, fSource);
    if (!shaderProgram) return;

    //사각형 좌표 (한변의 길이 0.2, 중앙 위치)
    const vertices = new Float32Array([
        -0.1, 0.1, 0.0, //top-left
        -0.1, -0.1, 0.0, //bottom-left
        0.1, -0.1, 0.0, //bottom-right
        0.1, 0.1, 0.0, //top-right
    ]);

    // VAO + VBO
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 꼭짓점 속성 (location=0, 3개씩, float type)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    //셰이더 프로그렘 사용 시작 
    gl.useProgram(shaderProgram);

    //택스트 표시
    setupText(canvas, "Use arrow keys to move the rectangle")

    render();
}



const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

//키를 누르면 해당 방향 true로 
window.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

//키를 때면 해당 방향 false로
window.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

function render() {
    //눌려 있는키에 따라 오프셋 이동
    if (keys.ArrowUp) offsetY += 0.01;
    if (keys.ArrowDown) offsetY -= 0.01;
    if (keys.ArrowLeft) offsetX -= 0.01;
    if (keys.ArrowRight) offsetX += 0.01;

    //범위
    offsetX = Math.max(-0.9, Math.min(0.9, offsetX));
    offsetY = Math.max(-0.9, Math.min(0.9, offsetY));
    //화면 지우기
    gl.clear(gl.COLOR_BUFFER_BIT);

    //셰이더에 오프셋 값 전달 (uniform 변수)
    const offsetLoc = gl.getUniformLocation(shaderProgram, 'u_offset')
    gl.uniform2f(offsetLoc, offsetX, offsetY);

    //정사각형 그리기
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    requestAnimationFrame(render);
}
//실행
main();
