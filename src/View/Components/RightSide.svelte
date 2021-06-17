<script>
  import { Route } from "svelte-navigator";
  import { InserirLocacaoClienteA ,InserirLocacaoClienteNA,ListarLocacoesAll,ListarLocacoesAllMulta,RetirarLocacao} from '.';
 
</script>

<aside class="right-side">
  <Route path="/InserirLocacaoClienteA">
    <InserirLocacaoClienteA />
  </Route>
  <Route path="/InserirLocacaoClienteNA">
    <InserirLocacaoClienteNA />
  </Route>
  <Route path="/ListarLocacoesAll">
    <ListarLocacoesAll />
  </Route>
  <Route path="/ListarLocacoesAllMulta">
    <ListarLocacoesAllMulta />
  </Route>
  <Route path="/RetirarLocacao">
    <RetirarLocacao />
  </Route>
  <Route path="/">
    <h1>Sistema de Aluguel de filmes</h1>
    <section class='posters'>
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/clueless.jpg?alt=media&token=1633e192-20df-4cf5-ab17-04dc910596c9" alt="Clueless"> 
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/Avengers_Endgame.jpg?alt=media&token=b30ae30c-25ed-473c-91b2-96953e78dded" alt="Avengers Endgame">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/Frozen_2_poster.jpg?alt=media&token=bdcda316-81b7-4287-8e7a-e38f8a5e85ca" alt="Frozen 2">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/minions-cartaz.jpg?alt=media&token=dcb5de28-a0d7-4e2d-a612-44628844c2d4" alt="Minions" >
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/percy-jackson.jpg?alt=media&token=f189ccaa-9989-47fb-aace-11cac8c8d3c9" alt="Percy Jackson">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/gods-of-egypt.jpg?alt=media&token=815720ad-0acc-488c-bbe2-ffc5360adef2" alt="Gods of Egypt">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/mortal-kombat.jpg?alt=media&token=a957a027-4a26-4b11-bd66-fc7daa3df31c" alt="Mortal Kombat">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/fatal-five.jpg?alt=media&token=ccc47808-1e20-499a-b778-5b9ca07928f1" alt="Justice League: The Fatal Five"> 
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/shes-the-man.jpg?alt=media&token=f7a67aa6-866c-4317-8651-a560b98fb12b" alt="She's the Man">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/X-Men_Apocalypse.jpg?alt=media&token=13bcc202-1a4c-4b69-86be-f06b34ebe4f6" alt="X-Men Apocalypse">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/wildchild.jpg?alt=media&token=f3851f9e-692c-4ebe-bfd0-534b3dc67c5e" alt="Wildchild">
      <img src="https://firebasestorage.googleapis.com/v0/b/aluguerfilme.appspot.com/o/Olympus-Has-Fallen-Poster.jpg?alt=media&token=059bf250-8269-4a9a-8edf-4d6014e2c094" alt="Olympus Has Fallen">
    </section>
  </Route>
</aside>

<style>
  .right-side {
    width: 100%;
    padding: 1rem 2rem;
    margin: 1rem 2rem;
    border-radius: 1.5rem;
    background-color: rgb(10, 1, 10);
    align-items: stretch;
  }
  img {
    width: 10rem;
    height: 15rem;
    margin: 0.5rem;
  }
</style>