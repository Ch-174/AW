export default listarFilme(){
    let lista = document.getElementById('filmes');
    let dados = " ";
    const db = firebase.firestore();
    
    var docRef = db.collection('filme').get().then(snapshot => {
        // add codigo para cada filme retirar o nome
        dados = "<option>" + valor+"</option>" + dados;
        
        lista.innerHTML = dados;
      });

}