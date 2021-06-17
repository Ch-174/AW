
export default class Filme {
    
  constructor (nome,ano,genero,duracao){
      this.nome = nome;
      this.ano = ano;
      this.genero = genero;
      this.duracao = duracao;

  }
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
}
module.exports = { Filme,};