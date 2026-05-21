window.addEventListener('load', function () {
  var ready = document.fonts ? document.fonts.ready : Promise.resolve();
  ready.then(function () { window.focus(); window.print(); });
});
