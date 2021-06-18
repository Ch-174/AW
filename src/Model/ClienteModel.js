import firebase from "../Model/Firebase";

export default class Cliente {
  constructor(nome) {
    listarClientes();
    this.nome = nome;
  }

  getNome() {
    return this.nome;
  }

  static async listarClientes() {
    const clientes = [];
    return firebase
      .firestore()
      .collection("cliente")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          clientes.push(doc.data());
        });
        return clientes;
      });
  }
  
}
export class Associado extends Cliente {
  constructor(empresa, nome) {
    super(nome);
    this.empresa = empresa;
    this.qntFilmes = 0;
  }

  getUserIdPorNomeEmpresa(nome, empresa) {
    const db = firebase
      .firestore()
      .collection("cliente")
      .where("nome", "==", nome)
      .where("empresa", "==", empresa)
      .get()
      .then();
  }

  getEmpresa() {
    return this.empresa;
  }

  getQntFilmes() {
    const db = firebase.firestore();
    var ref = db.collection("cliente");

    var query = ref
      .where("nome", "==", this.getNome())
      .where("empresa", "==", this.getEmpresa());
    query
      .get()
      .then((snapshot) => {
        this.qntFilmes = snapshot[0].data().qtdFilme;
        this.quantFilmes = this.qntFilmes + 1;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return docRef
      .update({
        qtdFilme: this.qntFilmes,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    return this.quantFilmes;
  }
}
export class Nao_Associado extends Cliente {
  constructor(sexo, nome, distribuicao, rua, casaNum) {
    super(nome);
    this.sexo = sexo;
    this.distribuicao = distribuicao;
    this.rua = rua;
    this.casaNum = casaNum;
  }
  getSexo() {
    return this.sexo;
  }
  getEndereco() {
    return this.endereco;
  }
  getDistribuicao() {
    return this.distribuicao;
  }
  getRua() {
    return this.rua;
  }
  getCasaNum() {
    return this.casaNum;
  }
}
