import Filme from "./FilmeModel";
import { Associado, Nao_Associado } from "./ClienteModel";
import firebase from "./Firebase";
import { get } from "svelte/store";
export default class Locacao {
  idCliente;

  constructor(filme, dataAluguer, dataEntrega) {
    this.filme = new Filme(filme);
    this.dataAluguer = dataAluguer;
    this.dataEntrega = dataEntrega;
  }

  getFilme() {
    return this.filme;
  }

  getDataAluguer() {
    return this.dataAluguer;
  }

  getDataEntrega() {
    return this.dataEntrega;
  }

  static inserirCliente() {}

  static inserirLocacao() {
    idc = this.idCliente;
  }

  getIdC() {
    let bol = false;
    const db = firebase.firestore();
    var docRef = db.collection("id").doc("cliente");
    let id = 0;

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          id = doc.data();
          id = id++;
          bol = true;
        } else {
          id = 1;
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    if (bol) {
      docRef
        .update({
          id: id,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }

    return id;
  }

  getIdF(nome) {
    let bol = false;
    let id = 0;
    const db = firebase.firestore();
    var docRef = db.collection("filme");
    var query = docRef.where("nome", "==", nome);
    query.get().then((snapshot) => {
      if (snapshot.doc.exists) {
        id = snapshot[0].data().id;
        bol = true;
      } else {
        id = 1;
        console.log("No such document!");
      }
    });

    return id;
  }
  InserirLocacao() {
    const db = firebase.firestore();
    db.collection("cliente")
      .add({
        dataAluguer: firebase.firestore.Timestamp.now(),
        dataEntrega: firebase.firestore.Timestamp.fromDate(
          new Date(this.getDataEntrega())
        ),
        idC: this.idCliente,
        idF: this.getIdF(this.getFilme()),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  InserirLocacaoCA(empresa, nome) {
    this.clienteA = Associado(empresa, nome);
    if (this.ExistLocacaoCA(empresa, nome)) {
      this.clienteA.getQntFilmes();
    } else {
      this.idCliente = this.getIdC();
      const db = firebase.firestore();
      db.collection("cliente")
        .add({
          associado: true,
          empresa: this.clienteA.getEmpresa(),
          id: this.idCliente,
          nome: this.clienteA.getNome(),
          qtdFilme: 1,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }

  ExistLocacaoCA(empresa, nome) {
    let bol = false;
    const db = firebase.firestore();
    var ref = db.collection("cliente");
    var query = ref.where("nome", "==", nome).where("empresa", "==", empresa);
    query.get().then((snapshot) => {
      bol = snapshot.doc.exists;
      return bol;
    });
  }

  InserirLocacaoCNA(nome, distribuicao, rua, casaNum, sexo) {
    this.clienteNA = new Nao_Associado(sexo, nome, distribuicao, rua, casaNum);

    const db = firebase.firestore();
    db.collection("cliente")
      .add({
        casaNum: this.clienteNA.getCasaNum(),
        distribuicao: this.clienteNA.getDistribuicao(),
        nome: this.clienteNA.getNome(),
        rua: this.clienteNA.getRua(),
        id: this.getIdC(),
        nome: this.clienteA.getNome(),
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  static inserirLocacaoCliente(idCliente, idFilme, dataEntrega) {
    firebase
      .firestore()
      .collection("aluguer")
      .add({
        idC: idCliente,
        idF: idFilme,
        dataAluguer: firebase.firestore.Timestamp.now(),
        dataEntrega: new firebase.firestore.Timestamp(dataEntrega, 0),
      });
  }
}
