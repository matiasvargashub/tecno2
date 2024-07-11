let trazos = [];
let cantidadTrazos = 12;
let trazosGenerados = 0;
let estados = [];
let tamañoTrazos = 0.3;
let trazosMaximos = 12000;
let estadoActual;
let coloresEspeciales = ['#3B573E','#3F787F','#986B41','#4A0C0C'];
let coloresEspeciales1 = ['#D94000','#39588F','#986B41'];
let coloresEspeciales2 = ['#86080C','#4A0C0C','#D94000'];
let coloresEspeciales3 = ['#EBDFEB','#B6AEB5','#986B41'];
let otrosColores = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
let coloresFondo = ['#B98F5B','#FFBD59','#8C7F86','#7C6C55'];


let mic;
let amp;
let AMP_MIN = 0.010;
let AMP_MAX = 0.108;

let gestorAmp;

let fft;
let prevLevel = 0;
let clapThreshold = 0.400; 

let ultimoCambio = 0;
const INTERVALO_CAMBIO = 7000; 

function preload() {
  for (let i = 0; i < cantidadTrazos; i++) {
    let nombre = "data/trazo" + nf(i, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(1000, 900);
  imageMode(CENTER);
  userStartAudio();

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);

  estados.push(new Estado("Estado 1", random(coloresFondo)));
  estados.push(new Estado("Estado 2", random(coloresFondo)));
  estados.push(new Estado("Estado 3", random(coloresFondo)));
  estados.push(new Estado("Estado 4", random(coloresFondo)));

  estadoActual = estados[0];
  estadoActual.iniciar();

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  setTimeout(() => {
    if (mic.getLevel() > 0) {
      console.log("Micrófono activo");
    } else {
      console.log("No se detecta el micrófono");
    }
  });
}

function cambiarEstado() {
  if (millis() - ultimoCambio > INTERVALO_CAMBIO) {
    let indiceActual = estados.indexOf(estadoActual);
    let siguienteEstado = estados[(indiceActual + 1) % estados.length];
    estadoActual.limpiarLienzo();
    estadoActual = siguienteEstado;
    estadoActual.iniciar();
    ultimoCambio = millis();
  }
}

function detectarAplauso() {
  gestorAmp.actualizar(mic.getLevel());
  amp = gestorAmp.filtrada;

  if (amp > clapThreshold && prevLevel <= clapThreshold) {
    cambiarEstado();
  }

  prevLevel = amp;
}

function draw() {

  if (trazosGenerados < trazosMaximos) {
    let cantidadTrazosPorMovimiento = map(amp, AMP_MIN, AMP_MAX, 1, 20);
    if (estadoActual === estados[0]) {
      estadoActual.generarTrazo1(cantidadTrazosPorMovimiento);
    } else if (estadoActual === estados[1]) {
      estadoActual.generarTrazo1(cantidadTrazosPorMovimiento);
    } else if (estadoActual === estados[2]) {
      estadoActual.generarTrazo1(cantidadTrazosPorMovimiento);
    } else if (estadoActual === estados[3]) {
      estadoActual.generarTrazo1(cantidadTrazosPorMovimiento);
    }
  }
  detectarAplauso();
}
