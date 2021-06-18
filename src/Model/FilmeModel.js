import firebase from "./Firebase";

export default class Filme {
  constructor(filme){
    this.nome = filme.getNome();
    this.ano = filme.getAno();
    this.genero = filme.getGenero();
    this.duracao = filme.getDuracao();
  }

  getNome() {return this.nome;}
  getAno() {return this.ano;}
  getGenero() {return this.genero;}
  getDuracao() { return this.duracao;}

  static async listarFilmes() {
    let filmes = [];
    const db = firebase.firestore();
    db.collection('filme').get().then(snapshot => {
      snapshot.forEach(doc => {
        filmes.push(doc.data());
      });
      alert(JSON.stringify(filmes));
    });
    
    
    return filmes;
  }
}
