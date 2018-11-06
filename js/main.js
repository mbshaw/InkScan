/*
if('serviceWorker' in navigator){
    //register the service worker
    navigator.serviceWorker.register('sw.js').then(function(result){
        console.log('Service Worker Registered');
        console.log('Scope: ' + result.scope);
    }, function(error){
        console.log('Service worker registration failed');
        console.log(error);
    });
}else{
    console.log('Services workers not supported');
}
*/

function clearTableBody(tableBody){
    document.getElementById(tableBody).innerHTML = "";
    //var dvCSV = document.getElementById(tableBody);
    //dvCSV.innerHTML = "";
}

function addRow(tBodyID, rDate, rJobNo, rBatchCode ) {
    //console.log(tBodyID);
    var body = document.getElementById(tBodyID);
    //console.log(body);
    var row = body.insertRow(0);
    row.insertCell(0).innerHTML = rDate;
    row.insertCell(1).innerHTML = rJobNo;
    row.insertCell(2).innerHTML = rBatchCode;
}

$("#btn-clear").click( function() {
    document.getElementById("scansBody").innerHTML = "";
    document.getElementById("barcodes").select();
});

$("#btn-save").click( function() {
    var jobNo = $("#JobNo").val();
    var text = $('#ScansTable').table2CSV({
        filename: jobNo+'.csv'
    });
    //document.getElementById("scansBody").innerHTML = "";
});

function dateAsDDMMYYY(d){
    //var today = new Date();
    var dd = d.getDate();
    
    var mm = d.getMonth()+1; 
    var yyyy = d.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return dd+'/'+mm+'/'+yyyy;
};

    /*
    $("#btn-save").click( function() {
    var barcodes = $("#barcodes").val().replace(/(\r\n|\n|\r)/gm,",\r");
    var text = "Date:\r";
    text += Date();
    text += "\rJob Number:\r";
    text += $("#JobNo").val();
    text += "\rBatch Codes:\r";
    text += barcodes;
    var filename = $("#JobNo").val();
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".txt");
    });
    */

    function sendMail() {
        alert("email Clicked");
    };

    //$("#barcodes").addEventListener("keypress", myScript);

    function Upload() {
        var fileUpload = document.getElementById("fileUpload");
        console.log(fileUpload.value.toLowerCase());
        var regex = /^([a-zA-Z0-9\s_\\.\(\)\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            console.log(typeof (FileReader));
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var table = document.getElementById("scansBody");
                    console.log(table);
                    var rows = e.target.result.split("\r");
                    for (var i = 1; i < rows.length; i++) {         //array starts at 1 to remove header
                        var cells = rows[i].split(",");
                        console.log(cells);
                        if (cells.length > 1) {
                            var row = table.insertRow(-1);
                            for (var j = 0; j < cells.length; j++) {
                                var cell = row.insertCell(-1);
                                cell.innerHTML = cells[j];
                            }
                        }
                    }
                    console.log(table.toLowerCase());
                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    function getReadFile(reader, i) {
        return function () {
            var table = document.getElementById("scansBody");
            var rows = reader.result.split("\r");
            for (var i = 1; i < rows.length; i++) {         //array starts at 1 to remove header
                var cells = rows[i].split(",");
                if (cells.length > 1) {
                    var row = table.insertRow(-1);
                    for (var j = 0; j < cells.length; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = cells[j];
                    }
                }
            }
        }
      }

    function handleFiles(files) {
        console.log(files.target.files);
        var table = document.getElementById("scansBody");
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            console.log(file);
            var reader = new FileReader();
            reader.addEventListener('load', getReadFile(reader, i));
            reader.readAsText(file);
            console.log(reader);
            var rows = reader.result.split("\r");
            for (var i = 1; i < rows.length; i++) {         //array starts at 1 to remove header
                var cells = rows[i].split(",");
                if (cells.length > 1) {
                    var row = table.insertRow(-1);
                    for (var j = 0; j < cells.length; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = cells[j];
                    }
                }
            }
        };
    }

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
    
        // use the 1st file from the list
        f = files[0];
    
        var reader = new FileReader();
    
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
    
              jQuery( '#ms_word_filtered_html' ).val( e.target.result );
            };
          })(f);
    
          // Read in the image file as a data URL.
          reader.readAsText(f);
      }

    $( "#barcodes" ).change(function() {
        console.log( "Handler for .change() called." );
        addRow("scansBody",$("#date").val(), $("#JobNo").val() , $("#barcodes").val());
        $("#barcodes").val("");
      });
    
    if($("#date").val = ""){
         $("#date").value = new Date();
         console.log("Date: "+Date());
    };
    $("#barcodes").select();