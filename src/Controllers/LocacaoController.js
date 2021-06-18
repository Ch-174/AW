import Locacao from "../Model/LocacaoModel";

export function AddLocacaoCA(filme, dataEntrega,empresa, nome){
    let loc = new Locacao(filme,dataAluguer,dataEntrega);
    loc.InserirLocacaoCA(empresa, nome) ;
    loc.InserirLocacao();
}

export function AddLocacaoCNA(filme, dataAluguer,dataEntrega,nome,distribuicao,rua,casaNum,sexo){
    let loc = new Locacao(filme,dataAlusguer,dataEntrega);
    loc.InserirLocacaoCNA(nome,distribuicao,rua,casaNum,sexo);
    loc.InserirLocacao();
}

export const addLocacao = (idFilme, dataAluguer, idCliente) => {
    Locacao.inserirLocacaoCliente(idCliente, idFilme, new Date(dataAluguer).getTime() / 1000);
}
export const getLocacoesLista = async () => {
    return Locacao.listarLocacoes();
  }