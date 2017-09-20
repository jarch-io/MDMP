function skeletorLoyout() {
  var windowHeight = $(window).height();
  var headerHeight = $("header").height();
  var footerHeight = $("footer").height();
  var bodyHeight = $("#main").height();

  //asignar el nuevo tamaño al body
  $("#main").height(windowHeight - (headerHeight + footerHeight));

  //buscamos todos los elementos que esten fixeados y les damos un tamaño fijo segun el contenedor y al elementos siguiente le cambiamos la posicion
  $(".jio-fixed").each(function (indx,fixed) {
    var _this = $(this);
    _this.width(_this.parent().width());
    _this.next().css("top",_this.height());
  });
}

$(document).ready(function () {
  //adaptando el layout
  skeletorLoyout();

  $(".button-collapse").sideNav();

  $(".modal").modal();
});

$(window).resize(skeletorLoyout);
