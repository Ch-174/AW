import Locacao from "../Model/LocacaoModel";

export function AddLocacaoCA(filme, dataAluguer,dataEntrega,empresa, nome){
    let loc = new Locacao(filme,dataAluguer,dataEntrega)
    loc.InserirLocacaoCA(empresa, nome) ;
    loc.InserirLocacao();
} ;