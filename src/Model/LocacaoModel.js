import Filme from './FilmeModel';
import { Associado, Nao_Associado } from './ClienteModel';
import firebase from './Firebase';
export default class Locacao {
     constructor(filme, dataAluguer,dataEntrega){
        this.filme = new Filme(filme);
        this.dataAluguer = dataAluguer;
        this.dataEntrega = dataEntrega;
     }
    
    getFilme() {return this.filme;}
    getDataAluguer() {return this.dataAluguer;}
    getDataEntrega() {return this.dataEntrega;}
    getIdC(){
        let bol = false;
        const db = firebase.firestore();
        var docRef = db.collection("id").doc("cliente");
        let id = 0;
        docRef.get().then((doc) => {
            if (doc.exists) {
              id =  doc.data();
              id = id++;
              bol = true;
            } else {
                id = 1
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        if(bol){
          docRef.update({
            id: id
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
   
    getIdF(nome){
        let bol = false; 
         let id = 0;
        const db = firebase.firestore();
        var docRef = db.collection("filme");
        var query = docRef.where("nome", "==", nome);;
        query.get().then(snapshot => {
            
               if (snapshot.doc.exists){
                id =   snapshot[0].data().id;
                bol = true;
               } else{
                   id = 1
                console.log("No such document!");
               }
               
        });
         
        return id;
    }
    InserirLocacao(){
        const db = firebase.firestore();
            db.collection("cliente").add({
                dataAluguer: firebase.firestore.Timestamp.now(),
                dataEntrega: firebase.firestore.Timestamp.fromDate(new Date(this.getDataEntrega())),
                idC: this.getIdC() ,
                idF: this.getIdF(this.getFilme())
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            }); 
    }
     InserirLocacaoCA(empresa, nome) {

        this.clienteA = Associado(empresa,nome);
        if(this.ExistLocacaoCA(empresa,nome)){
            this.clienteA.getQntFilmes();
        }else{
           const db = firebase.firestore();
            db.collection("cliente").add({
                associado: true,
                empresa: this.clienteA.getEmpresa(),
                id:this.getIdC() ,
                nome: this.clienteA.getNome(),
                qtdFilme: 1
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            }); 
        }
        
    }
    ExistLocacaoCA(empresa,nome){
        let bol = false;
        const db = firebase.firestore();
        var ref = db.collection("cliente");
        var query = ref.where("nome", "==", nome).where("empresa", "==", empresa);
        query.get().then(snapshot => {
            
              bol = snapshot.doc.exists;
              return bol;
        }); 
    }
}
