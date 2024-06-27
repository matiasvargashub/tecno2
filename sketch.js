let trazos = [];
let cantidadTrazos = 12;
let trazosGenerados = 0;
let estados = [];
let tamañoTrazos = 0.3;
let trazosMaximos = 12000;
let estadoActual;
let coloresEspeciales = ['#3b573e', '#3f787f', '#986b41', '#a8aa7b', '#d94000', '#39588f', '#4c5d55'];
let margen = 100;

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

  estados.push(new Estado("Estado 1", '#B98F5B'));
  estados.push(new Estado("Estado 2", '#FFBD59'));
  estados.push(new Estado("Estado 3", '#8C7F86'));
  estados.push(new Estado("Estado 4", '#7C6C55'));

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
  gestorAmp.actualizar(mic.getLevel());
  amp = gestorAmp.filtrada;

  gestorAmp.dibujar(600, 0);

  fill(255);
  rect(0, 0, 150, 40);

  fill(0);
  textSize(16);
  text("Amplitud: " + amp.toFixed(3), 10, 30);

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
