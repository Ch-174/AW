class Cliente{
    constructor (nome){
        this.nome = nome;
    }
    getNome(){return this.nome;}
}
export class Associado extends Cliente{
    constructor(empresa,nome){
        super(nome);
        this.empresa = empresa;
        this.qntFilmes = 0;
    }
    getEmpresa() {return this.empresa;}
    getQntFilmes() {
        const db = firebase.firestore();
        var ref = db.collection("cliente");

        var query = ref.where("nome", "==", this.getNome()).where("empresa", "==", this.getEmpresa());
       query.get().then(snapshot => {
        this.qntFilmes = snapshot[0].data().qtdFilme;
        this.quantFilmes = this.qntFilmes + 1;
      }).catch((error) => {
            console.log("Error getting document:", error);
        });
        return docRef.update({
            qtdFilme: this.qntFilmes,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            
            console.error("Error updating document: ", error);
        });

        return this.quantFilmes;}
}
export class Nao_Associado extends Cliente{
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

// import firebase from './firebase';


//   const db = firebase.firestore();
//   const clientes = db.collection(nome).get().then(docs => docs.data()); 


