'use strict';


var popupTel = popup.querySelector('input[type="tel"]');
var indexForm = document.querySelector('.feedback__form');
var formTel = indexForm.querySelector('input[type="tel"]');
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

var formMask = IMask(formTel, maskOptions);
var popupMask = IMask(popupTel, maskOptions);
