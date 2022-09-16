//const { response } = require("express");

console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', saveKoala);
//   $( '#addButton' ).on( 'click', function(){
//     console.log( 'in addButton on click' );
//     // get user input and put in an object
//     // NOT WORKING YET :(
//     // using a test object
//     let koalaToSend = {
//       name: 'testName',
//       age: 4,
//       gender: 'M',
//       ready_to_transfer: true,
//       notes: 'testName',
//     };
//     // call saveKoala with the new obejct
//     saveKoala( koalaToSend );
//   }); 
// }
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala() {
  // ajax call to server to get koalas
  let newKoala = getValues();
  console.log( 'in saveKoala', newKoala );
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function (response) {
    console.log(response);
    clearValues();
    getKoalas();
  }).catch(function (error) {
    console.log(error);
    alert('Error adding koala. Please try again later.');
  });
}

function deleteKoala() {

}

function updateKoala() {

}

function getValues() {
   const addKoalaObj = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };
  console.log('This is koala obj', addKoalaObj);
  return addKoalaObj;
}

function clearValues() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}