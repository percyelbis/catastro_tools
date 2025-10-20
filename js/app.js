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
function evaluarExpresion(expresion) {
    try {
        // Remover espacios y validar que solo contenga números, operadores y paréntesis
        expresion = expresion.replace(/\s/g, '');
        if (!/^[0-9+\-*/().]+$/.test(expresion)) {
            return NaN;
        }
        // Evaluar la expresión de forma segura
        return Function('"use strict"; return (' + expresion + ')')();
    } catch (e) {
        return NaN;
    }
}

function calculateD() {
    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var area = parseFloat(document.getElementById("area").value);
    var area_comun = parseFloat(document.getElementById("area_comun").value);
    
    var suma_area_ocupada = 0;
  
    // Iterar sobre todas las filas y sumar los valores de área ocupada
    for (var i = 0; i < rows.length; i++) {
      var inputValue = rows[i].getElementsByTagName("input")[0].value;
      var area_ocupada = evaluarExpresion(inputValue);
      if (!isNaN(area_ocupada)) {
        suma_area_ocupada += area_ocupada;
      }
    }
  
    // Actualizar total de área ocupada
    document.getElementById("total_ocupada").textContent = suma_area_ocupada.toFixed(2);
    
    var total_atc = 0;
    var total_acc = 0;
    
    // Iterar sobre todas las filas y calcular el porcentaje de área ocupada y el ATC
    for (var i = 0; i < rows.length; i++) {
      var inputValue = rows[i].getElementsByTagName("input")[0].value;
      var area_ocupada = evaluarExpresion(inputValue);
      
      if (isNaN(area_ocupada) || suma_area_ocupada === 0) {
        rows[i].getElementsByTagName("td")[2].textContent = "0.00%";
        rows[i].getElementsByTagName("td")[3].textContent = "0.00";
        rows[i].getElementsByTagName("td")[4].textContent = "0.00";
        continue;
      }
      
      var porcentaje = (area_ocupada / suma_area_ocupada) * 100;
      var atc = (porcentaje * area)/100;
      var acc = (porcentaje * area_comun)/100;
      
      total_atc += atc;
      total_acc += acc;
  
      // Actualizar el texto de las columnas %, ATC y ACC
      rows[i].getElementsByTagName("td")[2].textContent = porcentaje.toFixed(2) + "%";
      rows[i].getElementsByTagName("td")[3].textContent = atc.toFixed(2);
      rows[i].getElementsByTagName("td")[4].textContent = acc.toFixed(2);
    }
    
    // Actualizar totales
    document.getElementById("total_atc").textContent = total_atc.toFixed(2);
    document.getElementById("total_acc").textContent = total_acc.toFixed(2);
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
      bienesInput.setAttribute("type", "text");
      bienesInput.setAttribute("value", "0");
      bienesInput.setAttribute("placeholder", "Ej: 2.35 + 5.23");
      bienesInput.addEventListener("input", function() {
        calculateD();
      });
      bienesCell.appendChild(bienesInput);
      row.appendChild(bienesCell);
  
      // Agregar la columna %
      var porcentaje = document.createElement("td");
      porcentaje.appendChild(document.createTextNode("0.00%"));
      row.appendChild(porcentaje);
  
      // Agregar la columna ATC
      var atc = document.createElement("td");
      atc.appendChild(document.createTextNode("0.00"));
      row.appendChild(atc);
  
      // Agregar la columna ACC
      var acc = document.createElement("td");
      acc.appendChild(document.createTextNode("0.00"));
      row.appendChild(acc);

      tbody.appendChild(row);
    }
    calculateD();
}

// Función para exportar a Excel
function exportarExcel() {
    var table = document.getElementById("table");
    
    // Crear un nuevo workbook
    var wb = XLSX.utils.book_new();
    
    // Obtener datos de la tabla
    var data = [];
    
    // Agregar encabezados
    data.push(['Unidades/Edificas', 'Area Ocupada', '%', 'ATC', 'ACC']);
    
    // Agregar datos del tbody
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var inputValue = rows[i].getElementsByTagName("input")[0].value;
        var valorCalculado = evaluarExpresion(inputValue);
        
        data.push([
            cells[0].textContent,
            valorCalculado.toFixed(2),
            cells[2].textContent,
            cells[3].textContent,
            cells[4].textContent
        ]);
    }
    
    // Agregar fila de totales
    data.push([
        'TOTAL',
        document.getElementById("total_ocupada").textContent,
        '100%',
        document.getElementById("total_atc").textContent,
        document.getElementById("total_acc").textContent
    ]);
    
    // Agregar información adicional
    data.push([]);
    data.push(['Área Terreno/Edifica:', document.getElementById("area").value]);
    data.push(['Área Común Construida:', document.getElementById("area_comun").value]);
    
    // Convertir datos a worksheet
    var ws = XLSX.utils.aoa_to_sheet(data);
    
    // Agregar worksheet al workbook
    XLSX.utils.book_append_sheet(wb, ws, "Prorrateo");
    
    // Generar archivo y descargarlo
    var fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, 'Prorrateo_' + fecha + '.xlsx');
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


// tolerancias catastrales
function calcularTolerancia() {
  // Obtenemos los valores de entrada
  var area_urbana_m2 = Number(document.getElementById("area_urbana_m2").value);
  var area_catastro_m2 = Number(document.getElementById("area_catastro_m2").value);

  var area_rural_ha = Number(document.getElementById("area_rural_ha").value);
  var area_catastro_ha = Number(document.getElementById("area_catastro_ha").value);
  // Calculamos la tolerancia catastral para el área urbana
  if (area_urbana_m2<200) {
    var porcentaje_urbana = 0.025;
  } else if (200 <= area_urbana_m2 && area_urbana_m2 < 1000) {
    var porcentaje_urbana = 0.02;
  } else {
    var porcentaje_urbana = 0.01;
  };
  var tolerancia_urbana = area_urbana_m2 * porcentaje_urbana;
  var rango_urbana = [tolerancia_urbana, porcentaje_urbana*100];
  // Calculamos la tolerancia catastral para el área rural
  if (area_rural_ha < 1) {
    var porcentaje_rural = 0.075;
  } else if (1 <= area_rural_ha && area_rural_ha < 5) {
    var porcentaje_rural = 0.063;
  } else {
    var porcentaje_rural = 0.03;
  }
  var tolerancia_rural = area_rural_ha * porcentaje_rural;
  var rango_rural = [tolerancia_rural, porcentaje_rural*100 ];

  
  // Mostramos los resultados
  var resultado = "-------Tolerancia (%) - Urbana-------"+"<br>" + 
  "Norma: " + rango_urbana[1].toFixed(4) + "% --> " + rango_urbana[0].toFixed(4) + " m²" + "<br>" +
  "Calculada: " + ((Math.abs(area_urbana_m2 - area_catastro_m2 )*100)/area_urbana_m2).toFixed(4) + "% --> " + Math.abs(area_urbana_m2 - area_catastro_m2 ).toFixed(4) + " m²";
  var resultado1 = "-------Tolerancia (%) - Rural-------"+"<br>" +
  " Norma: " + rango_rural[1].toFixed(4) + "% --> " + rango_rural[0].toFixed(4) + " ha" + "<br>" +
  "Calculada: " + ((Math.abs(area_rural_ha - area_catastro_ha )*100)/area_rural_ha).toFixed(4) + "% --> " + Math.abs(area_rural_ha - area_catastro_ha ).toFixed(4) + " ha";

  document.getElementById("resultado").innerHTML = resultado;
  document.getElementById("resultado1").innerHTML = resultado1;
}
