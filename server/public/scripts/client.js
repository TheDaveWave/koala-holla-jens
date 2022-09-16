console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
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
      <td><button data-koalaid="${koala.id}" class="transfer">Ready for Transfer</button></td>
      <td><button data-koalaid="${koala.id}" class="delete">Delete</button></td>
    </tr>
    `);
  }
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

function deleteKoala() {

}

function updateKoala(event) {
  // const shoeid=$(event.target).parent().parent().data('shoeid');
  const koalaid=$(event.target).closest('tr').data('koalaid');
  const transferReady = $(event.target).parent().find('.ready_to_transfer').val();
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaid}`, // we have dynamically build /shoes/3
    data: {
    ready_to_trasnfer: transferReady
    }
  }).then(() => {
    console.log(`Successfully deleted shoe with id ${koalaid}`);
    getShoes();
  }).catch(function(err){
    console.log(err);
    alert('Something went wrong in POST');
  })
}
