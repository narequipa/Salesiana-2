
NotasArray = [];
promedioArray = [];
semesters = [];
var TitleArray = [];
var lineGraph;
var barGraph;
var text = "";
objectData = [];
var acumNotas = 0;
var acumNota = 0;

$(document).ready(function() {
    
    $('input').keypress(function(e) {
    var a = [];
    var k = e.which;
    
    for (i = 48; i < 58; i++)
        a.push(i);
    
    if (!(a.indexOf(k)>=0))
        e.preventDefault();
    

});
    
    
    $.getJSON('Record/record.json', function(data) {
        var cedula = "1725219669";

        //objecto global
        objectData = data;


        $('.hello').css('display', 'none');
        $('.hello').fadeIn(1000);

        if ($('body').is('.index')) {

           
            for (h = 0; h < objectData.length; h++) {
                if (objectData[h].cedula === cedula) {
                    var name;
                    var DatosPersonales = "<table class=table>";
                    DatosPersonales += "<caption><span class='glyphicon glyphicon-edit' aria-hidden='true'></span>&nbsp; INGENIERÍA DE SISTEMAS</caption>";
                    DatosPersonales += "<tbody>";

                    $.each(objectData[h].datos, function(index, data) {
                        DatosPersonales += "<tr>";
                        DatosPersonales += "<td class='col-md-1'>" + data.id + ":</td>";
                        DatosPersonales += "<td>" + data.campo + "</td>";
                        DatosPersonales += "</tr >";
                        if (data.id === "Nombres") {
                            name = data.campo;
                        }
                    });
                    DatosPersonales += "</tbody>";
                    DatosPersonales += "</table>";
                    DatosPersonales += " <center><a class='ghost-button-full-color' href='recordAcademico.php'>Record Academico&nbsp;&nbsp; <span class='glyphicon glyphicon-search' aria-hidden='true'></span></a></center><br><br>";


                    var objectivos = objectData[h].MiObjetivos;
                    var sobreMi = objectData[h].SobreMi;
                    var image = "<img class='img-responsive img-thumbnail' src='" + objectData[h].img + "' >";

                    $("#ImgLocation").html(image);
                    $("#namesLOGO").html(name);
                    $("#datosPersonales").html(DatosPersonales);
                    $("#objectivos").html(objectivos);
                    $("#sobreMi").html(sobreMi);
                }
            }



        }

        if ($('body').is('.recordAcademico')) {

            //alert(objectData[0].Semestres[0].facultad);

            for (h = 0; h < objectData.length; h++) {
                if (objectData[h].cedula === cedula) {

                    $.each(objectData[h].datos, function(index, data) {
                        if (data.id === "Nombres") {
                            name = data.campo;
                        }
                    });
                    $("#namesLOGO").html(name);

                    var semesterActaul = (objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[0].Semestre);

                    var optionSemestre = "<select class='semestre '>";

                    for (k = 0; k < objectData[h].Semestres.length; k++) {
                        optionSemestre += "<option >" + objectData[h].Semestres[k].Semestre[0].Semestre + "</option>";
                    }
                    optionSemestre += "</select>";
                    $("#optionSemestre").html(optionSemestre);
                    $("#titleBargraph").html(semesterActaul);
                    $("select.semestre").val(semesterActaul);

//bargraph

                    var texto = "<table class='table table-hover table-striped table-condensed'> ";
                    texto += "<thead><tr>" +
                            "<th class='col-sm-2'>Materia</th>" +
                            "<th class='col-sm-1'>Estado</th>" +
                            "<th class='col-sm-1'>Nota</th>" +
                            "</tr></thead></tbody>";
                    promedioSemesterSelecionando=0;
                    divisor=0;
                    for (j = 0; j < objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre.length; j++) {
                        texto += "<tr>" +
                                "<td> " + objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].materia + " </td>" +
                                "<td> " + objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].Estado + " </td>" +
                                "<td> " + objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].nota + " </td>" +
                                "</tr>";
                        NotasArray.push({
                            name: objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].materia,
                            y: parseFloat(objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].nota)
                        });
                        
                         promedioSemesterSelecionando+=parseFloat(objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre[j].nota );
                         divisor=objectData[h].Semestres[objectData[h].Semestres.length - 1].Semestre.length;
                        
                        
                    }
                    
                    
                    
                    promedioSemesterSelecionando=promedioSemesterSelecionando/divisor;
                    promedioSemesterSelecionando=Math.round(100*promedioSemesterSelecionando)/100;
                    texto += "</tbody></table>";
                    $("#materiasTable").html(texto);
                    $("#materiasTable").append("Promedio de "+semesterActaul+":"+" "+promedioSemesterSelecionando);
                    initializeBarGraph();
                    barGraph.series[0].data = NotasArray;
                    var chart2 = new Highcharts.Chart(barGraph);


//linegraph
                    for (k = 0; k < objectData[h].Semestres.length; k++) {
                        for (j = 0; j < objectData[h].Semestres[k].Semestre.length; j++) {
                            //alert(objectData[h].Semestres[k].Semestre[j].materia);
                            acumNotas += parseFloat(objectData[h].Semestres[k].Semestre[j].nota);

                        }
                        acumNotas = acumNotas / parseFloat(objectData[h].Semestres[k].Semestre.length);
                        acumNotas=Math.round(100*acumNotas)/100; 
                        promedioArray.push(acumNotas);
                        semesters.push(objectData[h].Semestres[k].Semestre[0].Semestre);
                        acumNotas = 0;
                    }

                    initializeLineGraph();
                    lineGraph.xAxis.categories = semesters;
                    lineGraph.series[0].data = promedioArray;
                    var chart = new Highcharts.Chart(lineGraph);
                }
            }




            $("select.semestre").change(function() {
                var selectedSemester = $(".semestre option:selected").val();
                $("#titleBargraph").html(selectedSemester);

                NotasArray=[];
                promedioSemesterSelecionando=0;
                divisor=0;
                
                var texto = "<table class='table table-hover table-striped table-condensed'> ";
                texto += "<thead><tr>" +
                        "<th class='col-sm-2'>Materia</th>" +
                        "<th class='col-sm-1'>Estado</th>" +
                        "<th class='col-sm-1'>Nota</th>" +
                        "</tr></thead></tbody>";

                for (h = 0; h < objectData.length; h++) {
                    if (objectData[h].cedula === cedula) {

                        for (k = 0; k < objectData[h].Semestres.length; k++) {
                            for (j = 0; j < objectData[h].Semestres[k].Semestre.length; j++) {
                                //alert(objectData[h].Semestres[k].Semestre[j].materia);
                                if (objectData[h].Semestres[k].Semestre[j].Semestre === selectedSemester) {
                                    texto += "<tr>" +
                                            "<td> " + objectData[h].Semestres[k].Semestre[j].materia + " </td>" +
                                            "<td> " + objectData[h].Semestres[k].Semestre[j].Estado+ " </td>" +
                                            "<td> " + objectData[h].Semestres[k].Semestre[j].nota + " </td>" +
                                            "</tr>";
                                    NotasArray.push({
                                        name: objectData[h].Semestres[k].Semestre[j].materia ,
                                        y: parseFloat(objectData[h].Semestres[k].Semestre[j].nota )
                                    });

                                    promedioSemesterSelecionando+=parseFloat(objectData[h].Semestres[k].Semestre[j].nota );
                                    divisor=objectData[h].Semestres[k].Semestre.length;
                                }
                            }
                        }
                    }
                }
                
                texto += "</tbody></table>";
                promedioSemesterSelecionando=promedioSemesterSelecionando/divisor;
                promedioSemesterSelecionando=Math.round(100*promedioSemesterSelecionando)/100;
      
                $("#materiasTable").html(texto);
                 $("#materiasTable").append("Promedio de "+selectedSemester+":"+" "+promedioSemesterSelecionando);
                initializeBarGraph();
                barGraph.series[0].data = NotasArray;
                var chart2 = new Highcharts.Chart(barGraph);
            });




        }

//------------------------------------------------------------------------------------------------
        //chart inicializer for current semester


    });
});

function initializeLineGraph() {
    lineGraph = {
        chart: {
            renderTo: 'container',
            type: 'spline'
        },
        title: {
            text: 'PROMEDIO DE  CADA PERIODO LECTIVO',
            x: -20 //center
        },
        subtitle: {
            text: 'Universidad Politécnica Salesiana - UPS',
            x: -20
        },
        xAxis: {
            categories: [{}]
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
                name: 'Promedio',
                marker: {
                    symbol: 'square'
                },
                data: [{}]

            }]
    };
}
function initializeBarGraph() {
    barGraph = {
        chart: {
            renderTo: 'container2',
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
        },
        series: [{
                name: "</b> Calificación:<br/>",
                colorByPoint: true,
                data: [{}]
            }]

    };
}
function getstudentsName() {
    var name;
    $.each(objectData[0].datos, function(index, data) {
        if (data.id === "Nombres") {
            name = data.campo;
        }
    });
    $("#namesLOGO").html(name);
}

