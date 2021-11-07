// canvas and scene setup
const scene = document.querySelector("#scene");
const scale = window.devicePixelRatio;

scene.width = (document.getElementsByTagName("body")[0].clientWidth * scale);
scene.height = (document.getElementsByTagName("body")[0].clientHeight * scale);

const ctx = scene.getContext('2d');

ctx.fillStyle = "#0a580577";
ctx.strokeStyle = "#8DFF6E33";

const width = scene.clientWidth;
const height = scene.clientHeight;

var streams = [];
var nbStreams = 100;
var x = 0;

// init of the streams containing symbol that will rain down on the screen
for(let i = 0; i < nbStreams; i++) {
    streams.push(new Stream());
    streams[i].populate(x, getRandom(-500, -2000));
    // x give the position of the next stream on the x axis of the canvas
    x += 14 ;
}

function drawChar() {
    clear();
    for(s of streams) {
        // this part checks the speed of each stream and give the symbols of the stream
        // a font size, a fill color and stroke color in function of this speed
        if(s.speedUnder(10)) {
            ctx.fillStyle = "#02150155";
            ctx.strokeStyle = "#2e5424";
            ctx.lineWidth = 1;
            ctx.font = "10px sans-serif";
        } else {
            if(s.speedUnder(14) ) {
                ctx.fillStyle = "#0f8407";
                ctx.strokeStyle = "#8DFF6E33";
                ctx.lineWidth = 3;
                ctx.font = "14px sans-serif";
            } else {
                if(s.speedUnder(18) ) {
                    ctx.fillStyle = "#0f8407";
                    ctx.strokeStyle = "#8DFF6E33";
                    ctx.lineWidth = 3;
                    ctx.font = "18px sans-serif";
                } else {
                    if(s.speedUnder(23)) {
                        ctx.fillStyle = "#19d60b";
                        ctx.strokeStyle = "#c3ff9433";
                        ctx.lineWidth = 4;
                        ctx.font = "24px sans-serif";
                    } else {
                        ctx.fillStyle = "#85d65a";
                        ctx.font = "34px sans-serif";

                    }
                }
            }
        }
        // calling function of the stream object
        s.rain();
        s.draw();
    }
    // requesting loop animation with drawChar callback
    window.requestAnimationFrame(drawChar);
}

// utils
function clear() {
    // for the purpose of this project, clear() doesn't really clear the scene but repaints it
    // with a slightly transparent black color to give the symbols a blury effect when they move
    ctx.save();
    ctx.fillStyle = "#00000086";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = max | 0; // OR operator is faster than Math.floor() function
    return (Math.random() * (max - min +1)) | 0 + min;
}

// requesting loop animation with drawChar callback
window.requestAnimationFrame(drawChar);
