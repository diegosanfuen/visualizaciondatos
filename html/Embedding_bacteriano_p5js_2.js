let points = [];
let labels_v = [];

function preload() {
  // Cargar el archivo TSV antes de que comience el programa
  table = loadTable('data/embeding_3d.tsv', 'tsv', 'header');
  table_label = loadTable('data/bacterias_labels.tsv', 'tsv', 'header');
}

function setup() {
  frameRate(10);
  createCanvas(400, 400, WEBGL);
  fill(100, 0, 0);

  // Leer los datos del archivo y almacenarlos en el array 'points'
  for (let i = 0; i < table.getRowCount(); i++) {
    let x = float(table.getString(i, 'X'));
    let y = float(table.getString(i, 'Y'));
    let z = float(table.getString(i, 'Z'));
    let labels = String(table_label.getString(i, 'L'));
    points.push(createVector(x, y, z));
    labels_v.push(createVector(labels));
  }
}

function draw() {
  background(255);

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  stroke(0);
  strokeWeight(8);
  fill(150, 200, 250);
  
  // Dibujar los puntos desde el archivo
  for (let i = 0; i < points.length; i++) {   
    
    let v = points[i];   
        
    // Calcular la distancia entre el ratón y el nodo
    let d = dist(mouseX - width / 2, mouseY - height / 2, v.x, v.y);

    // Si el ratón está lo suficientemente cerca, mostrar información sobre el nodo
    if (d < 30) {
      label = "Nodo " + i + ": (" + labels_v[i] + ")";
    }
    
    // Dibujar la esfera del nodo
    push();
    translate(v.x, v.y, v.z);
    fill(150, 200, 250);
    sphere(5);
    //pop();
  } 
  
  // Mostrar etiqueta
  fill(0);
  noStroke();
  text(label, 10, height - 20);
}

function mouseMoved() {
  // Limpiar la etiqueta cuando el ratón se mueve
  label = "";
}
