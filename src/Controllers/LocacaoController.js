import Locacao from "../Model/LocacaoModel";

export  function AddLocacaoCA(filme, dataAluguer,dataEntrega,empresa, nome){
    let loc = new Locacao(filme,dataAluguer,dataEntrega)
    loc.InserirLocacaoCA(empresa, nome) ;
    loc.InserirLocacao();
} 
export  function AddLocacaoCNA(filme, dataAluguer,dataEntrega,nome,distribuicao,rua,casaNum,sexo){
    let loc = new Locacao(filme,dataAluguer,dataEntrega)
    loc.InserirLocacaoCNA(nome,distribuicao,rua,casaNum,sexo);
    loc.InserirLocacao();
}