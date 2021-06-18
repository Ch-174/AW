<script>
	import { AddLocacaoCA } from '../../Controllers/LocacaoController';

	let nome = '';
	const setNome = (e) => nome = e.target.value;
	let empresa = '';
	const setEmpresa = (e) => {
		empresa = e.target.value;
	}
  let dataE = '';
	const setDataE = (e) => {
		dataE = e.target.value;
	}
  let filme = '';
	const setFilme = (e) => {
		filme= e.target.value;
	}
	const handleSubmit = () => AddLocacaoCA(filme,dataE,empresa, nome);
</script>
<body style="background-color: rgb(27, 8, 27);">
    <aside class="InserirClienteA">
        <fieldset>
            <legend>Cliente Associado</legend>
            <form name="clienteA" on:submit|preventDefault={handleSubmit}>
                <label for="nome">Nome</label>
                {nome}
                <input name="nome" id="nome" on:keyup={setNome} placeholder="nome">
                <br>
                <label for="empresa">Empresa</label>
                {empresa}
                <input name="empresa" id="empresa" on:keyup={setEmpresa} placeholder="empresa">
                <br>
                <label for="dataE">Data de entrega</label>
                <label for="dataE">Formato:December 10, 1815 </label> 
                {dataE}
                <input name="dataE" id="dataE" on:keyup={setDataE} placeholder="dataE">
                <br>
                <label for="filme">Selecione o Filme</label>
                {filme}
                <input name="filme" id="filme" list="filmes" on:keyup={setFilme} placeholder="filme">
                <datalist id="filmes" >
                    <option value="valor1">Valor1</option>
                </datalist>
                <input type="submit" id="botao" on:click="" value="Confirmar">
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
      }
    </style>