<body style="background-color: rgb(27, 8, 27);">
    <aside class="InserirClienteNA">
        <fieldset>
            <legend>Cliente Não-Associado</legend>
            <form action="">
                <label for="nome">Nome</label>
                <input name="nome" id="nome">
                <br>
                <label for="sexo">Sexo</label>
                <select name="sexo" id="sexo">
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </select>
                <br>
                <br>
                <span >Endereço</span>
                <br>
                <label style="margin-top:0%;" for="distribuicao">Distribuição</label>
                <input name="distribuicao" id="distribuicao">
                <label style="margin-top:0%;" for="rua">Rua</label>
                <input name="rua" id="rua">
                <label style="margin-top:0%;" for="casaNum">Número da Casa</label>
                <input name="casaNum" id="CasaNum">

                <br>
                <label for="filme">Selecione o Filme</label>
                <input name="filme" id="filme" list="filmes">
                <datalist id="filmes" >
                    <option value="valor1">Valor1</option>
                </datalist>
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
    </style>