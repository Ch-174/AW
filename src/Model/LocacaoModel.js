import Filme from './FilmeModel.js';
import Associado from './ClienteModel.js';
import Nao_Associado from './ClienteModel.js';
import firebase from './Firebase.js';
class Locacao{

     constructor(filme, dataAluguer,dataEntrega){
        this.filme = new Filme(filme);
        this.dataAluguer = dataAluguer;
        this.dataEntrega = dataEntrega;
     }
    
    getFilme() {return this.filme;}
    getDataAluguer() {return this.dataAluguer;}
    getDataEntrega() {return this.dataEntrega;}
    getId(){
        const db = firebase.firestore();
        var docRef = db.collection("id").doc("cliente");
        let id;
        docRef.get().then((doc) => {
            if (doc.exists) {
              id =  doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        id = id++;
        return docRef.update({
            id: id
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        return id;
    }
     InserirLocacaoA(empresa, nome, qntFilmes ) {
        this.clienteA = Associado(empresa,nome,qntFilmes);
        const db = firebase.firestore();
        db.collection("cliente").doc("fhsfwLdFNv9OaCeXLpBh").add({
            name: "Tokyo",
            country: "Japan",
            associado: true(booleano),
            empresa: "qualquer",
            id:this.getId() ,
            nome: "João",
            qtdFilme: 3,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}
