<script>
  import { Route } from "svelte-navigator";
  import { InserirClienteNA } from '.'
  import { InserirClienteA } from '.'
</script>

<aside class="right-side">
  <Route path="/InserirClienteNa">
    <InserirClienteNA />
  </Route>
  <Route path="/InserirCliente">
    <InserirClienteA />
  </Route>
  <Route path="/">
    <h1>Sistema de Aluguel de filmes</h1>
    <section class='posters'>
      <img src="images/clueless.jpg" alt="Clueless"> 
      <img src="images/Avengers_Endgame.jpg" alt="Avengers Endgame">
      <img src="images\Frozen_2_poster.jpg" alt="Frozen 2">
      <img src="images/minions-cartaz.jpg" alt="Minions" >
      <img src="images/percy-jackson.jpg" alt="Percy Jackson">
      <img src="images/gods-of-egypt.jpg" alt="Gods of Egypt">
      <img src="images/mortal-kombat.jpg" alt="Mortal Kombat">
      <img src="images\fatal-five.jpg" alt="Justice League: The Fatal Five"> 
      <img src="images\shes-the-man.jpg" alt="She's the Man">
      <img src="images\X-Men_Apocalypse.jpg" alt="X-Men Apocalypse">
      <img src="images\wildchild.jpg" alt="Wildchild">
      <img src="images/Olympus-Has-Fallen-Poster.jpg" alt="Olympus Has Fallen">
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