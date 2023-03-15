// DC

$(document).ready(function() {
  $(".sumar").on("input", function() {
    sumarCeldas();
  });
});

function sumarCeldas() {
  var total = 0;
  $(".sumar").each(function() {
    var valor = parseFloat($(this).text());
    if (!isNaN(valor)) {
      total += valor;
    }
  });
  $("#dc").text(total%9);
};


// prorrateo
function calculateD() {
    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var area = parseFloat(document.getElementById("area").value);
    var area_comun = parseFloat(document.getElementById("area_comun").value);
    



    var suma_area_ocupada = 0;
  
    // Iterar sobre todas las filas y sumar los valores de área ocupada
    for (var i = 0; i < rows.length; i++) {
      var area_ocupada = parseFloat(rows[i].getElementsByTagName("input")[0].value);
      suma_area_ocupada += area_ocupada;
    }
  
    // Iterar sobre todas las filas y calcular el porcentaje de área ocupada y el ATC
    for (var i = 0; i < rows.length; i++) {
      var area_ocupada = parseFloat(rows[i].getElementsByTagName("input")[0].value);
      var porcentaje = (area_ocupada / suma_area_ocupada) * 100;
      var atc = (porcentaje * area)/100;
      var acc = (porcentaje * area_comun)/100;
  
      // Actualizar el texto de las columnas % y ATC
      rows[i].getElementsByTagName("td")[2].textContent = porcentaje.toFixed(2) + "%";
      rows[i].getElementsByTagName("td")[3].textContent = atc.toFixed(2);
      rows[i].getElementsByTagName("td")[4].textContent = acc.toFixed(2);
    }
  }
  
document.addEventListener("DOMContentLoaded", function() {
    var areaInput = document.getElementById("area");
    areaInput.addEventListener("input", function() {
        calculateD();
    });

    var areaComunInput = document.getElementById("area_comun");
    areaComunInput.addEventListener("input", function() {
        calculateD();
    });
});

  
  


  
  // Función para crear la tabla
function createTable() {
    // Obtener el número de unidades, área_terreno, area_comun
    var rows = parseInt(document.getElementById("rows").value);
    var area = parseFloat(document.getElementById("area").value);
    var area_comun = parseFloat(document.getElementById("area_comun").value);
  
    // Obtener la tabla y el cuerpo de la tabla
    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
  
    // Limpiar la tabla existente
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  
    // Crear las filas de la tabla
    for (var i = 1; i <= rows; i++) {
      var row = document.createElement("tr");
  
      // Agregar la columna unidades
      var aCell = document.createElement("td");
      aCell.appendChild(document.createTextNode(i));
      row.appendChild(aCell);
  
      // Agregar la columna area ocupada
      var bienesCell = document.createElement("td");
      var bienesInput = document.createElement("input");
      bienesInput.setAttribute("type", "number");
      bienesInput.setAttribute("value", "0");
      bienesInput.addEventListener("input", function() {
        calculateD();
      });
      bienesCell.appendChild(bienesInput);
      row.appendChild(bienesCell);
  
      // Agregar la columna %
      var porcentaje = document.createElement("td");
      porcentaje.appendChild(document.createTextNode(""));
      row.appendChild(porcentaje);
  
      // Agregar la columna ATC
      var atc = document.createElement("td");
      atc.appendChild(document.createTextNode(""));
      row.appendChild(atc);
  
      tbody.appendChild(row);
      // ACC

      var acc = document.createElement("td");
      acc.appendChild(document.createTextNode(""));
      row.appendChild(acc);

      tbody.appendChild(row);
    }
}


// instalaciones

function calcularp() {
  let areaInput = document.getElementById("areap");
  let areap = parseFloat(areaInput.value);
  let largo = parseFloat(document.getElementById("largop").value);
  let ancho = parseFloat(document.getElementById("anchop").value);

  let table = document.getElementById("tablap");
  table.innerHTML = "";

  let headerRow = table.insertRow(0);
  headerRow.insertCell(0).innerHTML = "A";
  headerRow.insertCell(1).innerHTML = "B";
  headerRow.insertCell(2).innerHTML = "A * B";

  for (let n = ancho; n < largo; n++) {
    let A = Math.random() * (largo - ancho) + ancho;
    let B = areap / A;
    let AB = A * B;
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = A.toFixed(2);
    row.insertCell(1).innerHTML = B.toFixed(2);
    row.insertCell(2).innerHTML = (row.cells[0].innerHTML * row.cells[1].innerHTML).toFixed(2);

    if ( (row.cells[0].innerHTML * row.cells[1].innerHTML).toFixed(2) == areap) {


      row.style.backgroundColor = "yellow";

    

    }
  }
  for (let i = table.rows.length - 1; i > 0; i--) { // Comenzar desde el final para no afectar el índice
    let row = table.rows[i];
    if (row.style.backgroundColor !== "yellow") {
      table.deleteRow(i);
    }
  }
}















