import { getClientesLista } from "./ClienteController";
import { getFilmeLista } from './FilmeController';
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

export const listarLocacoes = async () => {
    const [clientes, filmes, locacoes] = await Promise.all([getClientesLista(), getFilmeLista(), Locacao.listarLocacoes()]);

    const lista = locacoes.map(locacao => ({
        dataEntrega: locacao.dataEntrega.toDate().toLocaleDateString(),
        dataAluguer: locacao.dataAluguer.toDate().toLocaleDateString(),
        nome: clientes.find(cliente => cliente.id == locacao.idC).nome,
        associado: clientes.find(cliente => cliente.id == locacao.idC).associado,
        titulo: filmes.find(filme => filme.id == locacao.idF).titulo,
        multa: locacao.dataEntrega.toDate().getTime() < Date.now(),
    }));

    console.log('lista ::::: ', lista);

    return lista;
};
