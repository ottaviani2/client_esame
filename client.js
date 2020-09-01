var http = require('follow-redirects').http;
//const http = require('http');
var request = require('request');

var menuHandler;

const HOST = 'https://morning-temple-86022.herokuapp.com';
const user = "fra.otto@hotmail.com";
const passw = "password";
const cookies = new Map();

var my_cookie = '';
var cookie = '';

// Main
function Initialize() {
  login();
  Menu();
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', checkMenu);

  function checkMenu() {
    var input = process.stdin.read();
    if(input !== null) {
      menuHandler(input.trim());
    }
  }
}

function Menu(){
  console.log(
      '1. lista utenti' + '\n' +
      '2. richiesta parametri ambientali a servizio esterno' + '\n' +
      '3. inserire una nuova pianta' + '\n' +
      '4. localizzare le piante di un tipo' + '\n' +
      '5. aggiornare il nome di una pianta' + '\n' +
      '6. eliminare una pianta' + '\n\n' + 
      'Scegli un opzione e premi ENTER: '
  );

  menuHandler = function(input){
    if(input !== null) {
      switch(input) {
        case '1': users(); break;
        case '2': openweather(); break;
        case '3': new_plant(); break;
        case '4': cerca_pianta(); break;
        case '5': update_pianta(); break;
        case '6': delete_pianta(); break;
        default: Menu();
      }
    }
  };
}

//LOGIN
function login(){
  var options = {
    'method': 'POST',
    'url': 'https://morning-temple-86022.herokuapp.com/users/login',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"name":"fra.otto@hotmail.com","password":"password"})
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    cookie = response.headers['set-cookie'];
    cookie=cookie+' ';
    var inizio = cookie.indexOf("=")+1;
    var fine = cookie.indexOf(";");
    my_cookie = cookie.substring(inizio, fine);
    cookies.set(my_cookie,{ mail: user});
    console.log(response.body);
  });
}

//USERS
function users(){
  console.log('\n'+'Users');

  var options = {
    'method': 'GET',
    'url': 'https://morning-temple-86022.herokuapp.com/users',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"city":"Lunano","clima":"105","name":"fra.otto@hotmail.com","password":"password"})
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
}

//OPENWEATHER
function openweather(){
  console.log('\n'+'Openweather');
  var options = {
    'method': 'GET',
    'url': 'https://morning-temple-86022.herokuapp.com/weather',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"city":"Lunano"})
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

//NEW_PLANT
function new_plant(){
  console.log('\n'+'Nuova Pianta');
  var options = {
    'method': 'POST',
    'url': 'https://morning-temple-86022.herokuapp.com/pianta',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth=%242a%2410%24SD89QfuqhQkVOKqD0ZYA1esvsG.CwC8ehuEwQAOIPOt10begFXtIK'
    },
    body: JSON.stringify({"id":"CAC","clima":"106","nome":"Cactus","latin":"Cactacee"})
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
}

//CERCA_PIANTA
function cerca_pianta(){
  console.log('\n'+'Cerca Pianta');
  
  var options = {
    'method': 'POST',
    'url': 'https://morning-temple-86022.herokuapp.com/pianta',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"id":"CAC","clima":"106","nome":"Cactus","latin":"Cactacee"})
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

//AGGIORNA PIANTA
function update_pianta(){
  console.log('\n'+'Update pianta');

  var options = {
    'method': 'PUT',
    'url': 'https://morning-temple-86022.herokuapp.com/pianta/c_name',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"name":"Cactus","newname":"Cactus_nuovo"})
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
}

//ELIMINA PIANTA
function delete_pianta(){
  console.log('\n'+'Elimina Pianta');
  
  var options = {
    'method': 'DELETE',
    'url': 'https://morning-temple-86022.herokuapp.com/pianta',
    'headers': {
      'Content-Type': 'application/json',
      'Cookie': 'auth='+my_cookie
    },
    body: JSON.stringify({"name":"Cactus_nuovo"})
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}


Initialize();