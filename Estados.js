class Estado {
  constructor(nombre, colorFondo) {
    this.nombre = nombre;
    this.colorFondo = colorFondo;
    
    let arraysDeColores = [coloresEspeciales, coloresEspeciales1, coloresEspeciales2, coloresEspeciales3];
    this.coloresSeleccionados = random(arraysDeColores);
  }

  iniciar() {
    console.log("Iniciando estado: " + this.nombre);
    trazosGenerados = 0;
    background(this.colorFondo);
  }

  generarTrazo1(cantidadTrazosPorMovimiento) {
    let escalaGlobal = 0.17;
    let escalaEspecial = 0.35;

    for (let i = 0; i < cantidadTrazosPorMovimiento; i++) {
      if (trazosGenerados >= trazosMaximos) {
        return;
      }
      let cual = int(random(trazos.length));

      let x = random(width);
      let y = random(height);

      let esColorEspecial = random() < 0.3;
      let angulo = random([0, HALF_PI, -HALF_PI]);
      let escala;

      push();
      translate(x, y);
      rotate(angulo);

      if (esColorEspecial) {
        escala = random(1, 2) * escalaGlobal * escalaEspecial;
        let colorEspecial = color(random(this.coloresSeleccionados));
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