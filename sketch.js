let trazos = [];
let cantidadTrazos = 12;
let trazosGenerados = 0;
let estados = [];
let tamañoTrazos = 0.3;
let trazosMaximos = 5000;
let estadoActual;
let coloresEspeciales = ['#3b573e', '#3f787f', '#986b41', '#a8aa7b', '#d94000', '#39588f', '#4c5d55'];
let margen = 100;

let mic;
let amp;
let AMP_MIN = 0.025;
let AMP_MAX = 0.300;

let fft;
let prevLevel = 0;
let clapThreshold = 0.3; 

class Estado {
  constructor(nombre, colorFondo) {
    this.nombre = nombre;
    this.colorFondo = colorFondo;
  }

  iniciar() {
    console.log("Iniciando estado: " + this.nombre);
    trazosGenerados = 0;
    background(this.colorFondo);
    this.coloresEspeciales = []; 
    let coloresSeleccionados = [...coloresEspeciales];
    for (let i = 0; i < 3; i++) {
      let indice = int(random(coloresSeleccionados.length));
      this.coloresEspeciales.push(coloresSeleccionados[indice]);
      coloresSeleccionados.splice(indice, 1);
    }
  }

  generarTrazo1(cantidadTrazosPorMovimiento) {
    let trazosMaximos = 5500;
    let escalaGlobal = 0.3;
    let escalaEspecial = 0.3;

    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      if (trazosGenerados >= trazosMaximos) {
        return;
      }
      let cual = int(random(trazos.length));

      let x, y;
      if (random() < 0.5) {
        x = random(margen, width - margen);
        y = random(margen, height - 50);
      } else {
        x = random(width);
        y = random(height);
      }

      let esColorEspecial = random() < 0.3;
      let angulo = random([0, HALF_PI, -HALF_PI]);
      let escala;

      push();
      translate(x, y);
      rotate(angulo);

      if (esColorEspecial) {
        escala = random(1, 2) * escalaGlobal * escalaEspecial;
        let colorEspecial = color(random(coloresEspeciales));
        tint(colorEspecial);
      } else {
        escala = random(0.5, 1.5) * escalaGlobal;
        noTint();
      }
      scale(escala);

      image(trazos[cual], 0, 0);
      pop();

      trazosGenerados++;
    }
  }

  generarTrazo2(cantidadTrazosPorMovimiento) {
    let trazosMaximos = 5500;
    let escalaGlobal = 0.3;
    let escalaEspecial = 0.3;

    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      if (trazosGenerados >= trazosMaximos) {
        return;
      }
      let cual = int(random(trazos.length));

      let x, y;
      if (random() < 0.25) {
        x = random(margen, width - margen);
        y = random(margen, height - 50);
      } else {
        x = random(width);
        y = random(height);
      }

      let esColorEspecial = random() < 0.3;
      let angulo = random([0, HALF_PI, -HALF_PI]);

      push();
      translate(x, y);
      rotate(angulo);

      let escala;
      if (esColorEspecial) {
        escala = random(1, 2) * escalaGlobal * escalaEspecial;
        let colorEspecial = color(random(coloresEspeciales));
        tint(colorEspecial);
      } else {
        escala = random(0.5, 1.5) * escalaGlobal;
        noTint();
      }
      scale(escala);

      image(trazos[cual], 0, 0);
      pop();

      trazosGenerados++;
    }
  }

  limpiarLienzo() {
    clear();
  }
}

function preload() {
  for (let i = 0; i < cantidadTrazos; i++) {
    let nombre = "data/trazo" + nf(i, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(1000, 900);
  imageMode(CENTER);

  estados.push(new Estado("Estado 1", '#B98F5B'));
  estados.push(new Estado("Estado 2", '#FFBD59'));

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
  let indiceActual = estados.indexOf(estadoActual);
  let siguienteEstado = estados[(indiceActual + 1) % estados.length];
  estadoActual.limpiarLienzo();
  estadoActual = siguienteEstado;
  estadoActual.iniciar();
}

function detectarAplauso() {
  let spectrum = fft.analyze();
  let level = fft.getEnergy("highMid");

  if (level > clapThreshold && prevLevel <= clapThreshold) {
    cambiarEstado();
  }

  prevLevel = level;
}

function draw() {
  amp = mic.getLevel();

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
      estadoActual.generarTrazo2(cantidadTrazosPorMovimiento);
    }
  }

  detectarAplauso(); 
}




