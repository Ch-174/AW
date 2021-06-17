"useStrict"

class Cliente{
    constructor (nome){
        this.nome = nome;
    }
    getNome(){return this.nome;}
}
export default class Associado extends Cliente{
    constructor(empresa,nome, qntFilmes){
        super(nome);
        this.empresa = empresa;
        this.qntFilmes = qntFilmes;
    }
    getEmpresa() {return this.empresa;}
    getQntFilmes() {return this.quantFilmes;}
}
export default class Nao_Associado extends Cliente{
    constructor(sexo,nome,distribuicao,rua,casaNum){
        super(nome);
        this.sexo = sexo;
        this.distribuicao = distribuicao;
        this.rua = rua;
        this.casaNum = casaNum;
    }
    getSexo() {return this.sexo;}
    getEndereco() {return this.endereco;}
    getDistribuicao() {return this.distribuicao;}
    getRua() {return this.rua;}
    getCasaNum() {return this.casaNum;}
}

import firebase from './firebase';

// dentro da função classe ou obj

  const db = firebase.firestore();
  const clientes = db.collection(nome).get().then(docs => docs.data()); // clientes será um array


