import Locacao from "../Model/LocacaoModel";

<<<<<<< HEAD
export function AddLocacaoCA(filme, dataEntrega,empresa, nome){
    let loc = new Locacao(filme,dataAluguer,dataEntrega);
    loc.InserirLocacaoCA(empresa, nome) ;
    loc.InserirLocacao();
}

export function AddLocacaoCNA(filme, dataAluguer,dataEntrega,nome,distribuicao,rua,casaNum,sexo){
    let loc = new Locacao(filme,dataAluguer,dataEntrega);
    loc.InserirLocacaoCNA(nome,distribuicao,rua,casaNum,sexo);
    loc.InserirLocacao();
}

export const addLocacao = (idFilme, dataAluguer, idCliente) => {
    Locacao.inserirLocacaoCliente(idCliente, idFilme, new Date(dataAluguer).getTime() / 1000);
=======
export  function AddLocacaoCA(filme, dataAluguer,dataEntrega,empresa, nome){
    let loc = new Locacao(filme,dataAluguer,dataEntrega)
    loc.InserirLocacaoCA(empresa, nome) ;
    loc.InserirLocacao();
} 
export  function AddLocacaoCNA(filme, dataAluguer,dataEntrega,nome,distribuicao,rua,casaNum,sexo){
    let loc = new Locacao(filme,dataAluguer,dataEntrega)
    loc.InserirLocacaoCNA(nome,distribuicao,rua,casaNum,sexo);
    loc.InserirLocacao();
>>>>>>> e94aefd53f4274bb75da84f2b16832c5a0a520fb
}