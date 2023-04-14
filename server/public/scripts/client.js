console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click', '.deleteKoalaBtn', deleteKoala)

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // --NOW WORKING
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function(response) {
    //empty out the viewKoalas table
    $('#viewKoalas').empty();
    
    //loop through the koalas from response
    //  and render onto the DOM
    for(let koala of response) {
      $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>
            <button class="transferBtn">Ready for Transfer</button>
          </td>
          <td>
            <button class="deleteKoalaBtn">Delete</button>
          </td>
        </tr>
      `)
    }
  })
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas

}

function deleteKoala() {
  let idToDelete = $(this).parent().parent().data('id');

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then(function(response) {
    //Call on getKoalas to update the DOM
    getKoalas();
  }).catch(function(error) {
    alert('Error deleting this koala, error -->', error)
  })
}