<script>
	import { AddLocacaoCNA} from '../../Controllers/LocacaoController';

	let nome = '';
	const setNome = (e) => nome = e.target.value;
	let rua = '';
	const setRua = (e) => {
		rua = e.target.value;
	}
  let casaNum = '';
	const setCasaNum = (e) => {
		casaNum = e.target.value;
	}
  let distribuicao = '';
	const setDistribuicao = (e) => {
		distribuicao = e.target.value;
	}
  let sexo = '';
	const setSexo = (e) => {
		sexo = e.target.value;
	}
  let dataE = '';
	const setDataE = (e) => {
		dataE = e.target.value;
	}
  let filme = '';
	const setFilme = (e) => {
		filme= e.target.value;
	}
	const handleSubmit = () => AddLocacaoCNA(filme,dataE,empresa, nome);
</script>
<body style="background-color: rgb(27, 8, 27);">
    <aside class="InserirClienteNA">
        <fieldset>
            <legend>Cliente Não-Associado</legend>
            <form name="clienteNA" on:submit|preventDefault={handleSubmit}>
                <label for="nome">Nome</label>
                <input name="nome" id="nome" on:keyup={setNome} placeholder="Nome">
                <br>
                <label for="sexo">Sexo</label>
                <select name="sexo" id="sexo" on:keyup={setSexo} placeholder="Selecione o sexo">
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </select>
                <br>
                <br>
                <span >Endereço</span>
                <br>
                <label style="margin-top:0%;" for="distribuicao">Distribuição/Distrito</label>
                <input name="distribuicao" id="distribuicao" on:keyup={setDistribuicao} placeholder="Distribuicao/Distrito"> 
                <label style="margin-top:0%;" for="rua">Rua</label>
                <input name="rua" id="rua" on:keyup={setRua} placeholder="Rua">
                <label style="margin-top:0%;" for="casaNum">Número da Casa</label>
                <input name="casaNum" id="CasaNum" on:keyup={setCasaNum} placeholder="Numero da casa">

                <br>
                <label for="filme">Selecione o Filme</label>
                <input name="filme" id="filme" list="filmes" on:keyup={setFilme} placeholder="Selecione o filme">
                <datalist id="filmes" >
                </datalist>
                <input type="button" id="botao" on:click="" value="Confirmar">

            </form>
        </fieldset>
    </aside>
    </body>
    <style>
         .InserirClienteNA {
       
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
      #filme{
          min-width: 20rem;
      }
      #botao{
		background-color: rgb(51, 0, 43);;
        border-radius: 0.2rem;
        color: white;
      }
    </style>