
//$('#snap').hide();
//$('#snap').prop('disabled', true);
//$('#vista_canvas_img').hide();
$('#vista_canvas_img').hide();
$('#conten_canvas').hide();
var acepta_tomar_foto = 1;
const video = document.getElementById('video');
var b=0;
var fotos_tomadas_completas = 0;
var progress_bar = $('.progress-bar');


$( "#camera" ).click(function() {
  var matricula_txt = $("#matricula_alumno_txt").val();
  var nombre_alumno_txt = $("#nombre_alumno_txt").val();
  var apellidop_alumno_txt = $("#apellidop_alumno_txt").val();
  var apellidom_alumno_txt = $("#apellidom_alumno_txt").val();
  var grupo_alumno_txt = $("#grupo_alumno_txt").val();
  var usuarioTxt = $("#usuarioTxt").val();
  var passwordTxt = $("#passwordTxt").val();
  var seccion_alumno_txt = $("#seccion_alumno_txt").val();
  var carrera_alumno_txt = $("#carrera_alumno_txt").val();
  var cuatrimestre_alumno_txt = $("#cuatrimestre_alumno_txt").val();
  var passwordTxt_confirmar = $("#passwordTxt_confirmar").val();

      Swal.mixin({
        //input: 'text',
        icon: 'info',
        confirmButtonText: 'Siguiente',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Dar permiso a cámara',
          text: 'Da click en el bóton "permitir", para poder acceder a la cámara'
        },
        {
          title: 'Postura para reconocimiento de rostro',
          text: 'Colócate frente a la cámara web de tu computadora/laptop, asegúrate de que tu rostro se vea'
        },
        {
          title: 'Postura para reconocimiento de rostro',
          text: 'Es importante estar sentado para no salir de cuerpo completo'
        },
      ]).then((result) => {
        if (result.value) {
          //const answers = JSON.stringify(result.value)
            Swal.fire({
              title: 'Fin de las instrucciones',
              text: 'Da click en el bóton "Aceptar" para continuar',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
            if (result.isConfirmed) {
                  'use strict';


                  //const canvas = document.getElementById('canvas');
                  //const snap = document.getElementById("snap");
                  //const errorMsgElement = document.querySelector('span#errorMsg');

                  var constraints = {
                    audio: false,
                    video: {
                      width: 350, height: 300
                    }

                  };

                  // Access webcam
                  async function init() {
                    try {

                        //navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          //navigator.mozGetUserMedia || navigator.msGetUserMedia);
                        //const stream = await navigator.mediaDevices.getUserMedia(constraints);
                        const stream = await navigator.mediaDevices.getUserMedia(constraints);
                        abrir_popup_cargar_imagenes("tomar");


                        handleSuccess(stream);
                        arreglo = [];
                        /*
                        for(var j = 0; j < 200; j++){
                            var canvas_nuevo = $('<canvas id="canvas_'+j+'" width="640" height="480"></canvas>');
                            $('#conten_canvas').append(canvas_nuevo);
                            $('#snap').prop('disabled', false);
                        }*/
                        //document.getElementById("snap").style.backgroundColor= "black";

                    } catch (e) {
                        //errorMsgElement.innerHTML = 'navigator.getUserMedia error:${e.toString()}';
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡La cámera se encuentra apagada o no sirve!'
                        });
                    }
                  }

                  // Success
                  function handleSuccess(stream) {
                    window.stream = stream;
                    video.srcObject = stream;
                  }

                  // Load init
                  init();
                  /*
                  Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('weights/'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('weights/'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('weights/'),
                    //faceapi.nets.faceExpressionNet.loadFromUri('../static/core/js/weights/')
                  ]).then(init);
                  */
            }
          });
        }
      });








      //var n = 0;
      //var num_foto = 0;



      /*
      snap.addEventListener("click", function() {
                 var idd = setInterval(function(){

                    if(n < 20){
                      for(var i = 0; i < 5; i++){
                        const canvas1 = document.getElementById('canvas_'+num_foto);
                        var context = canvas1.getContext('2d');
                        context.drawImage(video, 0, 0, 640, 480);
                        num_foto++;
                      }
                    }else{
                      if(n == 20){
                          clearInterval(idd);
                          video.pause();
                          video.src = "";

                          video.srcObject.getTracks()[0].stop();

                          console.log("f");
                      }
                      console.log("fddd");
                    }
                    n++;
                  },2000);
      });
      */
});



$("#snap").click(function(){
  for (var i = 0; i < 200; i++) {
    progress_bar.attr('aria-valuenow', b).css('width', b + '%').text(b +' completado '+ '%');
    c=1
    if (b == 0){
      var canvas_nuevo = $('<canvas id="canvas_'+c+'" width="640" height="480"></canvas>');
      $('#conten_canvas').append(canvas_nuevo);
      $('#snap').prop('disabled', false);
    }


    const canvas1 = document.getElementById('canvas_1');
    var context = canvas1.getContext('2d');
    context.drawImage(video, 0, 0, 640, 480);

    var Pic = document.getElementById("canvas_1").toDataURL("image/png");
    Pic = Pic.replace(/^data:image\/(png|jpg);base64,/,"");
    arreglo.push(Pic)
    b++;
    progress_bar.attr('aria-valuenow', b).css('width', b + '%').text(b +' completado '+ '%');
  }
  fotos_tomadas_completas=1;
  if(fotos_tomadas_completas == 1){
    fotos_tomadas_completas = 0
    progress_bar.attr('aria-valuenow', 0).css('width', 0 + '%').text(0 +' completado '+ '%');
    video.pause();
    video.src = "";
    console.log(b);
    //clearInterval(tiempo_tomar_foto);
    video.srcObject.getTracks()[0].stop();
    cerrar_popup_cargar_imagenes("tomar");
    abrir_popup_cargar_imagenes("carga");
  }
  /*
  var tomar_imagenes_carga_bar = 0;
  var tiempo_tomar_foto = setInterval(function(){
  tomar_imagenes_carga_bar++;
  progress_bar.attr('aria-valuenow', tomar_imagenes_carga_bar).css('width', tomar_imagenes_carga_bar + '%').text(tomar_imagenes_carga_bar +' completado '+ '%');
  if(fotos_tomadas_completas == 1){
    fotos_tomadas_completas = 0
    tomar_imagenes_carga_bar = 0;
    progress_bar.attr('aria-valuenow', tomar_imagenes_carga_bar).css('width', tomar_imagenes_carga_bar + '%').text(tomar_imagenes_carga_bar +' completado '+ '%');
    video.pause();
    video.src = "";
    console.log(b);
    clearInterval(tiempo_tomar_foto);
    video.srcObject.getTracks()[0].stop();
    cerrar_popup_cargar_imagenes("tomar");
    abrir_popup_cargar_imagenes("carga");
  }
}, 1000);
*/
});


function mensaje(mensaje){
  Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: mensaje
    });
}



//---------------------- enviar imagenes  ----------------------------------

/*
function create_inputs_canvas(){
  for(var w = 0; w < 200; w++){
        var input_nuevo = $('<input type="hidden" id="imagen_'+w+'" name="imagen_'+w+'">');
        $('#conten_inputs_canvas').append(input_nuevo);

        var Pic = document.getElementById("canvas_"+w).toDataURL("image/png");
        Pic = Pic.replace(/^data:image\/(png|jpg);base64,/,"");

        $('#imagen_'+w).val(Pic);
  }
  $('#vista_canvas_img').remove();
}
*/


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  //RETORNANDO EL TOKEN
  return cookieValue;
}//end function getCookie


function enviar_imagenes(){
  var csrftoken = getCookie('csrftoken');
  var matricula_alumno_txt = $("#matricula_alumno_txt").val();

  var a = 0;
  var tiempo_abrir = setInterval(function(){

      //create_inputs_canvas();
      //console.log("d");
    if(a == 3){
        /*
        for(var v = 0; v < 200; v++){
            //console.log("dd");
            //progress_bar.attr('aria-valuenow', (v+1)).css('width', (v+1) + '%').text((v+1) +' completado '+ '%');
            imagen_inp = $("#imagen_"+v).val();
            $.ajax({
            //url: '{% url "core:ajaxx" %}',
            url: '/ajaxx/',
            type: 'POST',
            data:{
              input: imagen_inp,
              cont: v,
              id_mat: matricula_alumno_txt,
              csrfmiddlewaretoken : csrftoken
            },
            success: function(response){
              $("#seconds").text("")
            },
            error: function (response) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: '¡Vuelve a intentarlo!'
                });
            }
          });
       }
      */
      //progress_bar.attr('aria-valuenow', 0).css('width', 0 + '%').text(0 +' completado '+ '%');
      $('#conten_inputs_canvas').remove();
      cerrar_popup_cargar_imagenes("carga");
      clearInterval(tiempo_abrir);
      Swal.fire({
        icon: 'success',
        title: 'Procesamiento de imagenes terminado',
        text: 'Ahora solo queda que termines de registrarte',
        showConfirmButton: true
      })
    }
    a++;
  }, 1000);

}



//---------------- POPUP ------------------------------


function abrir_popup_cargar_imagenes(popupp){
  //baciarFormulario();
  overlay = document.getElementById("overlay_"+popupp+"_imagenes"),
  popup = document.getElementById("popup_"+popupp+"_imagenes"),
  overlay.classList.add('active');
  popup.classList.add('active');
  if(popupp == "tomar"){
    console.log("d");
  }else{
    var a = 0;
    var tiempo_abrir = setInterval(function(){
      if(a == 10){
        clearInterval(tiempo_abrir);
        enviar_imagenes();
      }
      a++;
    }, 1000);

  }
}


function cerrar_popup_cargar_imagenes(popuppp){
  overlay = document.getElementById("overlay_"+popuppp+"_imagenes"),
  popup = document.getElementById("popup_"+popuppp+"_imagenes"),
  overlay.classList.remove('active');
  popup.classList.remove('active');
}



//------------------ Detect Faces

/*

video.addEventListener('play', () => {
  //const canvas = faceapi.createCanvasFromMedia(video);
  //document.body.append(canvas);
  //$('.video-wrap').append(canvas);
  const canvas = document.getElementById("canvas");
  const displaySize = { width: 350, height: 300}
  faceapi.matchDimensions(canvas, displaySize)
  var tiempo_recon = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()//.withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //console.log(resizedDetections);

    if(resizedDetections.length == 1){
      if(b < 200){
        // Draw image

        /*
        for(var j = 0; j < 200; j++){
            var canvas_nuevo = $('<canvas id="canvas_'+j+'" width="640" height="480"></canvas>');
            $('#conten_canvas').append(canvas_nuevo);
            $('#snap').prop('disabled', false);
        }
        --
        c=1
        if (b == 0){
          var canvas_nuevo = $('<canvas id="canvas_'+c+'" width="640" height="480"></canvas>');
          $('#conten_canvas').append(canvas_nuevo);
          $('#snap').prop('disabled', false);
        }


        const canvas1 = document.getElementById('canvas_1');
        var context = canvas1.getContext('2d');
        context.drawImage(video, 0, 0, 640, 480);

        var Pic = document.getElementById("canvas_1").toDataURL("image/png");
        Pic = Pic.replace(/^data:image\/(png|jpg);base64,/,"");
        arreglo.push(Pic)
        b++;
      }else{
        fotos_tomadas_completas=1;
        clearInterval(tiempo_recon);
      }
    }
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100);
});
*/

function validar_matricula(cadena){
  var expresion = /^([0-9]{8,20})$/;
  return expresion.test(cadena)
}



function validarnombre(cadena){
  var expresion = /^([A-Z-a-z]{3,})((\s)([A-Z-a-z]{3,}))*$/;
  return expresion.test(cadena)
}

function validar_apelldios(cadena){
  var expresion = /^([A-Z-a-z]{2,})((\s)([A-Z-a-z]{2,}))*$/;
  return expresion.test(cadena)
}

function validar_grupos_secciones(cadena){
  var expresion = /^(([A-Z]{1,1})([0-9]{1,2}))+$/;
  return expresion.test(cadena)
}

function validar_usuario(cadena){
  var expresion = /^(([A-Za-z0-9]{1,30})([.]{0,1}))+([@])(upam|upamozoc)([.])(edu.mx)$/;
  return expresion.test(cadena)
}

function validar_password(cadena){
  var expresion = /^(([A-Z]{1,1})|([a-z]{1,1})|([0-9]{1,1})|([_#-]{1,1}))+$/;
  return expresion.test(cadena)
}

//abrir_popup_cargar_imagenes("carga");


/*

Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    );

*/
