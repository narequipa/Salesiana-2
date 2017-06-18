<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="royecto de Hiper">
        <title>UPS | Estudiante</title>
        <link href="CSS/bootstrap.min.css" rel="stylesheet">
        <link href="CSS/stylo.css" rel="stylesheet">
    </head>
    <body class = "recordAcademico">

        <div class="container hello">
            <div id="custom-bootstrap-menu" class="navbar navbar-default " role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header"><a class="navbar-brand" href="#">
                            <div id = "namesLOGO"  class="navbarStyle">....loading  </div>
                        </a>
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-menubuilder"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse navbar-menubuilder">
                        <ul class="nav navbar-nav">
                            <li ><a href="index.php"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;  INDEX</a></li>
                            <li class="active" ><a href="recordAcademico.php"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>&nbsp;&nbsp;RECORD</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="container"> 

            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Universidad Politécnica Salesiana
                        <small>Consulta de Notas</small>
                    </h1>
                </div>
            </div>
            <div class="alert alert-success" role="alert">Calificaciones Académicas </div>
            <div class="row">
                <div class="col-md-6"> 
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>Selecionar Semestre:&nbsp;&nbsp;<span id= "optionSemestre" aria-hidden="true"></span></h4></div>
                        <div class="panel-body panel-size-record">
                            <div id = "materiasTable"></div>   
                        </div>
                    </div>





                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <center><span>Semestre Seleccionado:<div id = "titleBargraph"></div></span></center></div>
                        <div class="panel-body  panel-size-record">
                            <div id="container2" style="height: 300px"></div> 
                        </div>
                    </div>

                </div>
            </div>
            <hr>
            <div class="alert alert-warning" role="alert">Promedio Académico</div>
            <div class="row">
                <div class="col-md-12">
                    <div id="container" </div>
                </div>
            </div>
            <div class="col-lg-12"><center>
                <ul class="pagination">

                    <li >
                        <a href="index.php">Index</a>
                    </li>
                    <li class="active">
                        <a href="recordAcademico.php"><span class="glyphicon glyphicon-object-align-bottom" aria-hidden="true"></span>&nbsp;Record</a>
                    </li>

                </ul>
            </center></div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    Copyright &copy; Ibadango And Arequipa 2014

                    <span class="pull-right"><img src="images/logo.gif" width="80" height="30"  aria-hidden="true"></img></span>

                </div>
            </div>
            <!-- /.row -->
        </footer>
        <br>

    </div>

</body>
<script src="js/jquery-1.11.1.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-table.js"></script>
<!--first graph-->
<script src="js/highcharts.js"></script>
<!--both graphs-->
<script src="js/Controlador.js" type="text/javascript"></script>

</html>
