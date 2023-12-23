int numSamples = 0;
float[][] targetPositions;
float[][] currentPositions;
float easing = 0.05;
Table tabla;
Table tabla_labels;
float[][] datos;
String labels[];



void setup() {
  size(800, 600, P3D);
    
  // Carga el archivo TSV (reemplaza "tu_archivo.tsv" con la ruta de tu archivo)
  tabla = loadTable("embeding_3d.tsv", "tsv");
  tabla_labels = loadTable("bacterias_labels.tsv", "tsv");

  // Imprime el número de filas y columnas en la consola
  numSamples = tabla.getRowCount();
  //println("Número de filas: " + tabla.getRowCount());
  //println("Número de columnas: " + tabla.getColumnCount());
  
  // Inicializa el array con el tamaño de la tabla
  datos = new float[tabla.getRowCount()][tabla.getColumnCount()];
  currentPositions = new float[tabla.getRowCount()][tabla.getColumnCount()];
  targetPositions = new float[tabla.getRowCount()][tabla.getColumnCount()];
  labels = new String[tabla_labels.getRowCount()];
  
  
  // Convierte la tabla a un array triidimensional
  convertirTablaAArray();
  
  // Lee etiquetas de us tabla
  convertirTablaLabsAArray();
  
}

void convertirTablaAArray() {
  // Llena el array con los datos de la tabla
  for (int i = 0; i < tabla.getRowCount(); i++) {
    for (int j = 0; j < tabla.getColumnCount(); j++) {      
      datos[i][j] = tabla.getFloat(i, j);
      currentPositions[i][j] = tabla.getFloat(i, j);
      targetPositions[i][j] = tabla.getFloat(i, j);      
    }
  }  
}

void convertirTablaLabsAArray() {
  // Llena el array con los datos de la tabla
  for (int i = 0; i < tabla.getRowCount(); i++) {     
      labels[i] = tabla_labels.getString(i, 0);
      // println(labels[i]);
    }    
}

void draw() {
  background(255);
  
  // Aplica animación a las posiciones actuales
  for (int i = 0; i < numSamples; i++) {
    for (int j = 0; j < 3; j++) {
      currentPositions[i][j] += (targetPositions[i][j] - currentPositions[i][j]) * easing;
    }
  }
  
  // Dibuja los puntos
  for (int i = 0; i < numSamples; i++) {
     
    pushMatrix();
    translate(currentPositions[i][0], currentPositions[i][1], currentPositions[i][2]);    
    fill(100, 0, 255);
    
    noStroke();
    sphere(8);
    popMatrix();
    
    float x = currentPositions[i][0];
    float y = currentPositions[i][1];
    float z = currentPositions[i][2];
    
    // Transforma las coordenadas 3D a 2D
    float[] screenCoord = screenXYZ(x, y, z);
    float screenX = screenCoord[0];
    float screenY = screenCoord[1];
    
    
    
    if (dist(mouseX, mouseY, screenX, screenY) < 10) {
      fill(0);
      text(labels[i], screenX + 15, screenY);
  }
  }  
  
}


void mousePressed() {
  // Establece nuevos objetivos cuando se hace clic
  for (int i = 0; i < numSamples; i++) {
    targetPositions[i][0] = random(width);
    targetPositions[i][1] = random(height);
    targetPositions[i][2] = random(-300, 300);
  }
}

// Función para transformar coordenadas 3D a 2D
float[] screenXYZ(float x, float y, float z) {
  float[] screenCoord = new float[2];
  
  // Transforma las coordenadas 3D a 2D
  float screenX = screenX(x, y, z);
  float screenY = screenY(x, y, z);
    
  screenCoord[0] = screenX;
  screenCoord[1] = screenY;
  return screenCoord;
}
