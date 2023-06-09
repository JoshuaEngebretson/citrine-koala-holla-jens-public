console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click', '.deleteKoalaBtn', deleteKoala)

  $('#viewKoalas').on('click', '.transferBtn', readyForTransfer)
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
  }).then(function (response) {
    //empty out the viewKoalas table
    $('#viewKoalas').empty();

    //loop through the koalas from response
    //  and render onto the DOM
    for(let koala of response) {
      if (koala.ready_to_transfer === false) {
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
      else {
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td><!-- This space left empty due to koala already ready for transfer --></td>
          <td>
            <button class="deleteKoalaBtn">Delete</button>
          </td>
        </tr>
      `)
      }

    }
  })
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: "/koalas",
    data: newKoala
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log('The "/koalas" ajax post request failed with error: ', error);
  })
}

function deleteKoala() {
  //Grab the data-id from the row this button is in
  let idToDelete = $(this).parent().parent().data('id');

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then(function (response) {
    //Call on getKoalas to update the DOM
    getKoalas();
  }).catch(function(error) {
    //Alert the user of the issue
    alert('There was an error deleting this koala')
    //Log the error in the console log
    console.log(`Error Deleting ${idToDelete} error --> ${error}`);
  })
}

function readyForTransfer() {
  //Grab the data-id from the row this button is in
  let idToUpdate = $(this).parent().parent().data('id');

  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: true
    }
  }).then(function (response) {
    //When readyForTransfer works update the DOM
    getKoalas();
  }).catch(function(error) {
    //Alert the user of the issue
    alert('There was an error updating ready to transfer');
    //Log the error in the console log
    console.log(`Error readyForTransfer on ${idToUpdate}, error --> ${error}`);
  })
}