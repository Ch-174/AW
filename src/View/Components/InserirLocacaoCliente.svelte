<script>
import { getClientesLista } from '../../Controllers/ClienteController';
	import { addLocacao } from '../../Controllers/LocacaoController';

	let idCliente = '';
	const setIdCliente = (e) => idCliente = e.target.value;
  let dataE = '';
	const setDataE = (e) => {
		dataE = e.target.value;
	}
  let filme = '';
	const setFilme = (e) => {
		filme= e.target.value;
	}

	const handleSubmit = () => 
    addLocacao(filme, dataE, idCliente);
</script>

<body style="background-color: rgb(27, 8, 27);">
    <aside class="InserirClienteA">
          <fieldset>
              <legend>Cliente Associado</legend>
              <form name="clienteA" on:submit|preventDefault={handleSubmit}>
                <label for="nome">Nome</label>
                <!-- svelte-ignore a11y-no-onchange -->
                <select id="nome" on:change={setIdCliente}>
                  <option selected disabled>Selecione o usário</option>
                  {#await getClientesLista()}
                    <option>Carregando...</option>
                  {:then clientes} 
                    {#each clientes as cliente}
                      <option value={cliente.id}>{cliente.nome} - {cliente.associado ? 'A' : 'NA'}</option>
                    {/each}
                  {/await}
                </select>
              
                <label for="dataE">Data de entrega</label>
                <input type="date" name="dataE" id="dataE" on:change={setDataE} placeholder="December 10, 1815">
                <br>
                <label for="filmes">Selecione o Filme</label>
                <!-- svelte-ignore a11y-no-onchange -->
                <select id="filmes" on:change={setFilme}>
                  <option selected disabled>Selecione filme</option>
                  <option value="1">The witch</option>
                </select>
                <input type="submit" id="botao" value="Confirmar">
            </form>
        </fieldset>
    </aside>
</body>

<style>
    .InserirClienteA {
       
        padding: 1rem 2rem;
        margin: 5rem 2rem;
        border-radius: 1.5rem;
        background-color: rgb(146, 1, 122);
        align-items: stretch;
        color: white;
        font-weight: 600;
      }
      select{
        color: black;
      }
      label{
        background-color: rgb(146, 1, 122);
        border-radius: 0.2rem;
        margin-top: 1rem ;
        max-width: 12rem;
      }
      
      fieldset{
        border-radius: 0.2rem;
        border: rgb(146, 1, 122);
      }
      #botao{
		background-color: rgb(51, 0, 43);;
        border-radius: 0.2rem;
        color: white;
      }
      option{
        color: black;
      }
    </style>