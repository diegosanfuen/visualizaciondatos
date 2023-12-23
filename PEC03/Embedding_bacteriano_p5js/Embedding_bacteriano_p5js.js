let numSamples = 0 ; let targetPositions ; let currentPositions ; let easing = 0.05; let tabla ; let tabla_labels ; let datos ; let labels [ ] ; function setup ( ) { createCanvas( 800 , 600 , WEBGL) ; // Carga el archivo TSV (reemplaza "tu_archivo.tsv" con la ruta de tu archivo)
// Imprime el número de filas y columnas en la consola
numSamples= tabla . getRowCount( ) ; //println("Número de filas: " + tabla.getRowCount());
//println("Número de columnas: " + tabla.getColumnCount());
// Inicializa el array con el tamaño de la tabla
datos= Array.from(new Array(tabla . getRowCount( )), ()=>new Array(tabla . getColumnCount( ))); currentPositions= Array.from(new Array(tabla . getRowCount( )), ()=>new Array(tabla . getColumnCount( ))); targetPositions= Array.from(new Array(tabla . getRowCount( )), ()=>new Array(tabla . getColumnCount( ))); labels= new Array(tabla_labels . getRowCount( )); // Convierte la tabla a un array triidimensional
convertirTablaAArray( ) ; // Lee etiquetas de us tabla
convertirTablaLabsAArray( ) ; } function preload() {tabla= loadTable( "embeding_3d.tsv" , "tsv" ) ; tabla_labels= loadTable( "bacterias_labels.tsv" , "tsv" ) ; }function convertirTablaAArray ( ) { // Llena el array con los datos de la tabla
for ( let i = 0 ; i< tabla . getRowCount( ) ; i++ ) { for ( let j = 0 ; j< tabla . getColumnCount( ) ; j++ ) { datos[ i] [ j] = tabla . getFloat( i, j) ; currentPositions[ i] [ j] = tabla . getFloat( i, j) ; targetPositions[ i] [ j] = tabla . getFloat( i, j) ; } } } function convertirTablaLabsAArray ( ) { // Llena el array con los datos de la tabla
for ( let i = 0 ; i< tabla . getRowCount( ) ; i++ ) { labels[ i] = tabla_labels . getString( i, 0 ) ; // println(labels[i]);
} } function draw ( ) { translate(-width/2, -height/2); background( 255 ) ; // Aplica animación a las posiciones actuales
for ( let i = 0 ; i< numSamples; i++ ) { for ( let j = 0 ; j< 3 ; j++ ) { currentPositions[ i] [ j] += ( targetPositions[ i] [ j] - currentPositions[ i] [ j] ) * easing; } } // Dibuja los puntos
for ( let i = 0 ; i< numSamples; i++ ) { push( ) ; translate( currentPositions[ i] [ 0 ] , currentPositions[ i] [ 1 ] , currentPositions[ i] [ 2 ] ) ; fill( 100 , 0 , 255 ) ; noStroke( ) ; sphere( 8 ) ; pop( ) ; let x = currentPositions[ i] [ 0 ] ; let y = currentPositions[ i] [ 1 ] ; let z = currentPositions[ i] [ 2 ] ; // Transforma las coordenadas 3D a 2D
let screenCoord = screenXYZ( x, y, z) ; let screenX = screenCoord[ 0 ] ; let screenY = screenCoord[ 1 ] ; if ( dist( mouseX, mouseY, screenX, screenY) < 10 ) { fill( 0 ) ; text( labels[ i] , screenX+ 15 , screenY) ; } } } function mousePressed ( ) { // Establece nuevos objetivos cuando se hace clic
for ( let i = 0 ; i< numSamples; i++ ) { targetPositions[ i] [ 0 ] = random( width) ; targetPositions[ i] [ 1 ] = random( height) ; targetPositions[ i] [ 2 ] = random( - 300 , 300 ) ; } } // Función para transformar coordenadas 3D a 2D
function screenXYZ ( x , y , z ) { let screenCoord = new Array(2); // Transforma las coordenadas 3D a 2D
let screenX = screenX( x, y, z) ; let screenY = screenY( x, y, z) ; screenCoord[ 0 ] = screenX; screenCoord[ 1 ] = screenY; return screenCoord; } 
