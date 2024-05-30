let trazos = [];
let cantidadTrazos = 13;
let imagenPaleta;
let miPaleta;
let trazosGenerados = 0;
let maxTrazos = 700;
let coloresEspeciales2 = ['#0040FF', '#0040FF', '#FF6B00', '#FF6B00'];
let coloresEspeciales = ['#3c6f72', '#4d6146', '#956036', '#96623b'];
let coloresEspeciales1 = ['#7F070E', '#400A1A', '#4D0F1A', '#4A111E'];
let coloresEspeciales3 = ['#E8E5EF', '#EBE1E8', '#E6DBE3', '#E6DBE3'];

let estados = []; 
let estadoActual; 

class Estado {
  constructor(nombre, colorFondo) {
    this.nombre = nombre;
    this.colorFondo = colorFondo;
  }

  iniciar() {
    console.log("Iniciando estado: " + this.nombre);
    trazosGenerados = 0;
    background(this.colorFondo); 
  }

  generarTrazos1() {
    let cantidadTrazosPorMovimiento = 2;  
  
    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      let cual = int(random(trazos.length));
      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let esColorEspecial = random() < 0.3;  
  
      let angulo = random([0, HALF_PI, -HALF_PI]);
  
      push();
      translate(x, y);
      rotate(angulo);
      let escala = esColorEspecial ? random(0.2, 0.5) : random(0.5, 1.5);  
      scale(escala);
  
      if (esColorEspecial) {
        let colorEspecial = color(random(coloresEspeciales1));
        tint(colorEspecial);
      } else {
        noTint();  
      }
  
      image(trazos[cual], 0, 0);
      pop();
    }
  }


  generarTrazo2() {
    let cantidadTrazosPorMovimiento = 2;  
  
    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      let cual = int(random(trazos.length));
      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let esColorEspecial = random() < 0.3;  
  
      let angulo = random([0, HALF_PI, -HALF_PI]);
  
      push();
      translate(x, y);
      rotate(angulo);
      let escala = esColorEspecial ? random(0.2, 0.5) : random(0.5, 1.5);  
      scale(escala);
  
      if (esColorEspecial) {
        let colorEspecial = color(random(coloresEspeciales2));
        tint(colorEspecial);
      } else {
        noTint();  
      }
  
      image(trazos[cual], 0, 0);
      pop();
    }
  }
  generarTrazo() {
    let cantidadTrazosPorMovimiento = 2;  
    let margen = 100;
  
    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      let cual = int(random(trazos.length));
      let x = random(margen, width - margen);
      let y = random(margen, height - margen);
      let esColorEspecial = random() < 0.3;  
  
      let angulo = random([0, HALF_PI, -HALF_PI]);
  
      push();
      translate(x, y);
      rotate(angulo);
      let escala = esColorEspecial ? random(0.2, 0.5) : random(0.5, 1.5);  
      scale(escala);
  
      if (esColorEspecial) {
        let colorEspecial = color(random(coloresEspeciales));
        tint(colorEspecial);
      } else {
        noTint();  
      }
  
      image(trazos[cual], 0, 0);
      pop();
    }
  }

  generarTrazo3() {
    let cantidadTrazosPorMovimiento = 2;  
  
    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      let cual = int(random(trazos.length));
      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let esColorEspecial = random() < 0.3;  
  
      let angulo = random([0, HALF_PI, -HALF_PI]);
  
      push();
      translate(x, y);
      rotate(angulo);
      let escala = esColorEspecial ? random(0.2, 0.5) : random(0.5, 1.5);  
      scale(escala);
  
      if (esColorEspecial) {
        let colorEspecial = color(random(coloresEspeciales3));
        tint(colorEspecial);
      } else {
        noTint();  
      }
  
      image(trazos[cual], 0, 0);
      pop();
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
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);


  estados.push(new Estado("Estado 1", '#B98F5B'));
  estados.push(new Estado("Estado 2", '#FFBD59'));
  estados.push(new Estado("Estado 3", '#B98F5B'));
  estados.push(new Estado("Estado 4", '#988A86'));
  
  estadoActual = estados[0];
  estadoActual.iniciar();
}

function mouseMoved() {

  if (estadoActual === estados[0]) {
    estadoActual.generarTrazo();
  }
if (estadoActual === estados[1]){
  estadoActual.generarTrazo2();
}
if (estadoActual === estados[2]){
  estadoActual.generarTrazos1();
}
if (estadoActual === estados [3]){
  estadoActual.generarTrazo3();
}
}

function mousePressed() {
  let indiceActual = estados.indexOf(estadoActual);
  let siguienteEstado = estados[(indiceActual + 1) % estados.length];
  estadoActual.limpiarLienzo(); 
  estadoActual = siguienteEstado;
  console.log("Cambiando a estado: " + estadoActual.nombre);
  estadoActual.iniciar();
}


