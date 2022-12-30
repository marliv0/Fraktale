/**
 * Ein Renderer, welches die Mandelbrot-Menge berechnet
 * und diese mithilfe von WebGL und Shadern visuell darstellt.
 * 
 * 2023 Marko Livajusic (marko_livajusic0 <at> protonmail.com) 
 */

main();

/**
 * Vertex-Shader für die Darstellung.
 * @returns Vertex-Shader in Form eines Strings. Zuständig für die Positionisierung der Eckpunkte.
 */
function getVertexShaderSrc() {
    const src = String.raw `
    attribute vec3 aVertexPosition;
    void main() {
        gl_Position = vec4(aVertexPosition, 1.0);
    }`;

    return src;
}

/**
 * Fragment-Shader für die Darstellung. Zuständig für die Berechnung der Mandelbrot-Menge 
 * und für die Färbung.
 * @returns Fragment-Shader in Form eines Strings.
 */
function getFragmentShaderSrc() {
    const real = String.raw `
precision mediump float;
uniform float zoom;
vec2 offset = vec2(0.0, 0.0);

float n = 0.0;
float threshold = 100.0;

float mandelbrot(vec2 c) {
 const int itr = 400;
 vec2 z = vec2(0.0, 0.0);

 for(int i = 0; i < itr; i++){
  vec2 znew;
  znew.x = (z.x * z.x) - (z.y * z.y) + c.x;
  znew.y = (2.0 * z.x * z.y) +c.y;
  z = znew;
  if((z.x * z.x) + (z.y * z.y) > threshold)break;
  n++;
}

return n / float(itr);
}

vec4 map_to_color(float t) {
 float r = 9.0 * (1.0 - t) * t * t * t;
 float g = 15.0 * (1.0 - t) * (1.0 - t) * t * t;
 float b = 8.5 * (1.0 - t) * (1.0 - t) * (1.0 - t) * t;
 return vec4(r, g, b, 1.0);
}

void main(){
 vec2 coord = vec2(gl_FragCoord.xy);

 vec2 screenSize = vec2(1920, 1080);
 float t = mandelbrot(((coord - screenSize/2.0)/zoom)-offset);

 if(gl_FragCoord.x < 40.0){
  gl_FragColor = vec4(1.0);
 }
 gl_FragColor = map_to_color(float(t));
}
`;
    return real;
}

var gl;
var program;

/**
 * Stellt den Schattierer (Shader), ein "Programm", welches auf der Grafikkarte läuft, her.
 * 
 * @param {*} gl WebGL-Kontext
 * @param {*} type Typ des Schattierers. Entweder Vertex oder Fragment-Shader.
 * @param {*} source Der Source-Code des Schattierers in der Stringform.
 * @returns ID des erstellten Schattierers
 */
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Ein Fehler ist bei der Kompilierung des Shaders aufgetreten: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

/**
 * Stellt das Program auf der Grafikkarte her, welches die beiden Schattierer beinhaltet.
 * @param {*} gl WebGL-Kontext
 * @param {*} vertexShader ID des erstellten Vertex-Shaders
 * @param {*} fragmentShader ID des erstellten Fragment-Shaders
 * @returns ID des erstellten Programms
 */
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Beim Linken des Programms sind Fehler aufgetreten: " + gl.getProgramInfoLog(program));
        return null;
    }

    gl.useProgram(program);
    return program;
}

/**
 * Stellt den Puffer her, welcher die Eckpunkte beinhaltet, die gerendert werden.
 * @param {*} gl WebGL-Kontext
 * @param {*} data Eckpunkte für das Rendern. Wir rendern in diesem Fall nur ein Rechteck.
 * @returns ID des erstellten Puffers
 */
function createBuffer(gl, data) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return vbo;
}

function changeZoom(gl, program) {
    const value = document.querySelector(".zoom_input").value;
    console.log(value);
    // const location = gl.getUniformLocation(program, "zoom");
    // gl.uniform1f(location, value);
}

function main() {
    console.log("JS loaded.");
    const canvas = document.querySelector(".glcanvas");
    gl = canvas.getContext("webgl");

    if (gl === null) console.log("WebGL wird vom Browser nicht unterstützt.");

    var vertexShaderSrc = getVertexShaderSrc();
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);

    var fragmentShaderSrc = getFragmentShaderSrc();
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vbo = createBuffer(gl, new Float32Array([
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        -1.0, -1.0, 0.0
    ]));
    const coord = gl.getAttribLocation(program, "aVertexPosition");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.uniform1f(gl.getUniformLocation(program, "zoom"), 250.0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}