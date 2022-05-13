let ville;


if("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon='
        + position.coords.longitude + '&appid=7daca3e005e39fb6cd1db22a4665f981&units=metric';
    
    let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
    requete.open('GET', url); // Nous récupérons juste des données
    requete.responseType = 'json'; // Nous attendons du JSON
    requete.send(); // Nous envoyons notre requête

    // Dès qu'on reçoit une réponse, cette fonction est executée
    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          // console.log(reponse);
          let temperature = reponse.main.temp;
          let ville       = reponse.name;
          // console.log(temperature);
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#ville').textContent = ville;
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
  }, erreur);
  
}
else {
  ville = "Paris";
  Temperature(ville);
}



function erreur() {
  ville = "Paris";
  Temperature(ville);
}



function Temperature(ville){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=7daca3e005e39fb6cd1db22a4665f981&units=metric';
  let requete= new XMLHttpRequest();
  requete.open('GET', url);
  requete.responseType = 'json';
  requete.send();


  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;    
        let temperature= reponse.main.temp;
        document.querySelector('#ville').textContent=ville;
        document.querySelector('#temperature_label').textContent=temperature;

      }
      else {
        ville = "Paris";
        Temperature(ville);
      }
    }
  }


}
Temperature();


let button = document.querySelector('#changer');

button.addEventListener('click',()=> {
  var villechoisi = prompt("quel est la ville");
 Temperature(villechoisi);

});


