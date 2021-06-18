
<body style="background-color: rgb(27, 8, 27);">
    <aside class="retirar">
        <fieldset>
            <legend>Retirar Locacao</legend>
            <form name="retirar" method="POST">
                <label for="nome">Nome</label>
                <input name="nome" id="nome">
                <br>
                <label for="filme">Selecione o Filme</label>
                <input name="filme" id="filme" list="filmes">
                <datalist id="filmes" >
                    <option value="valor1">Valor1</option>
                </datalist>
                <input type="button" id ="botao" value="Eliminar">
            </form>
        </fieldset>
    </aside>
    </body>
    <style>
      .retirar {
       
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
        color: white;
      }
    </style>