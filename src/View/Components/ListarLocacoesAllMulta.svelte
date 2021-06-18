
import {getLocacoesLista} from '../../Controllers/LocacaoController';
<script>
import { getClientesLista } from "../../Controllers/ClienteController";
import { getLocacoesLista } from "../../Controllers/LocacaoController";
import {getFilmeLista} from '../../Controllers/FilmeController';
function filtrarLocacoes(){
  const loc = [];
  const auxL = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  auxL = getLocacoesLista();
  if(auxL.dataEntrega > today){
    loc = auxL;
  }
  return loc;
}
  const clientes ;
  function listarClientesById(id){
    
    const clientesAux ;
    clientesAux =getClientesLista();
    if(id == clientesAux.id){
      clientes = clientesAux;
    }
  }
  const filmes ;
  function listarFilmesByID(id){
    const aux ;
    clientesAux == getFilmeLista();
    if(id = clientesAux.id){
      clientes = clientesAux;
    }
  }
</script>

<body style="background-color: rgb(27, 8, 27);">
    <aside class = "listarL">
        <fieldset>
            <legend>Listar Locações Com Multa</legend>
            <table>
                <thead>
                    
                    <tr>
                        <th>Nome</th>
                        <th>Filme</th>
                        <th>Data do Aluguer</th>
                        <th>Data de Entrega</th>
                    </tr>
                </thead>
                <tbody>
                  {#await filtrarLocacoes()}
                 <!-- <td>Carregando...</td> -->
                {:then locacoes} 
                  {#each locacoes as locacao}
              
                    {listarFilmesByID(locacao.idF)}
                      {listarClientesById(locacao.idC)}
                    <tr>
                      <td>{clientes.nome}</td>
                      <td>{filmes.titulo}</td>
                      <td>{locacao.dataAluguer}</td>
                      <td>{locacao.dataEntrega}</td>
                    </tr>
                    {/each}
                {/await}
                </tbody>
            </table>
        </fieldset>
    </aside>
    </body>
    <style>
        .listarL{
      
       padding: 1rem 2rem;
       margin: 5rem 2rem;
       border-radius: 1.5rem;
       background-color: rgb(146, 1, 122);
       align-items: stretch;
       color: white;
       font-weight: 600;
     }
     table{
     background-color: rgb(146, 1, 122);
     border-radius: 0.2rem;
     margin-top: 1rem ;
     min-width: 20rem;
     color: white;
   }
   th{
      
      background-color: rgb(70, 22, 70);
   }
     
     fieldset{
       border-radius: 0.2rem;
       border: rgb(146, 1, 122);
     }
   </style>