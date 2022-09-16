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
  $('#viewKoalas').on('click', '.transferBtn',updateKoala);
  $('#viewKoalas').on('click', '.delete', deleteKoala);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then((response) => {
    displayKoalas(response);
  }).catch((error) => {
    console.log(error);
  })
  
} // end getKoalas

// display the koalas on the DOM.
function displayKoalas(response) {
  // empty out table body
  $('#viewKoalas').empty();
  for(let koala of response) {
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer ? 'Y' : 'N'}</td>
      <td>${koala.notes}</td>
      <td><button data-transfer="${koala.ready_to_transfer}" data-koalaid="${koala.id}" class="transferBtn">Ready for Transfer</button></td>
      <td><button data-koalaid="${koala.id}" class="delete">Delete</button></td>
    </tr>
    `);
  }
}

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

function deleteKoala(event) {
  let koalaid = $(event.target).data('koalaid');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaid}`
  }).then((response) => {
    getKoalas();
  }).catch((error)=>{
    console.log(error);
  });
}

function updateKoala(event) {
  // const shoeid=$(event.target).parent().parent().data('shoeid');
  const koalaid=$(event.target).data('koalaid');
  const transferReady = $(event.target).data('transfer');

  if(transferReady === false) {
    console.log(koalaid, transferReady)
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaid}`, // we have dynamically build /shoes/3
    data: {
    ready_to_transfer: !transferReady
    }
  }).then(() => {
    console.log(`Successfully deleted shoe with id ${koalaid}`);
    getKoalas();
  }).catch(function(err){
    console.log(err);
    alert('Something went wrong in POST');
  })
  }
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