<script>
	import { Link } from "svelte-navigator";
	const userName = "Pérsida Chita";
	const src = "images/avatar-icon.jpeg";
	let clBool = false;
	let listarBool = false;
	function handleInserirClick(){
		clBool = !clBool;
	}
	function handleListarClick(){
		listarBool = !listarBool;
	}
</script>

<aside class="left-side">
	<img class="user-avatar" {src} alt="user">
	<p class="user-name">{userName}</p>
	<nav class="nav-bar">
		<Link to="/">
			<span>Home</span>
		</Link>
		<Link to="/">
			<span>Dashboard</span>
		</Link>
		<Link to="/InserirLocacaoCliente">
			<span on:click={handleInserirClick}>Inserir Locação</span>
		</Link>
		
		<Link to="/RetirarLocacao">
			<span>Retirar Locação</span>
		</Link>
		
		<span on:click={handleListarClick}>Listar Locações</span>
		{#if listarBool}
				<section class="selecionar">
					<Link to="/ListarLocacoesAll">
						<span>Listar todas locações</span>
					</Link>
					<Link to="/ListarLocacoesAllMulta">
						<span>Listar todas locações com multa</span>
					</Link>
				</section>	
		{/if}
		<Link to="/ListarNAMulta">
			<span>Listar Clientes Não-Associados com Multa</span>
		</Link>
	</nav>
</aside>

<style>
	.left-side {
		min-height: 100vh;
		display: flex;
		min-width: 25rem;
		align-items: stretch;
		flex-direction: column;
		border-radius: 0 1.5rem 1.5rem 0;
		background-image: linear-gradient(45deg, rgb(255, 119, 255), rgb(250, 46, 216));
	}
	.user-avatar {
		width: 10rem;
		border-radius: 50%;
		margin: 3rem auto 1rem;
	}
	.user-name {
		font-size: 1.7rem;
		text-align: center;
		
	}
	.nav-bar {
		display: block;
		margin: 1.5rem 1rem 0;

	}
	.nav-bar span {
		margin: 1rem;
		display: block;
		cursor: pointer;
		font-weight: 600;
		text-align: center;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		letter-spacing: 0.15rem;
		transition: all 300ms ease-in-out;
		background-color: rgb(146, 1, 122);
	}
	.nav-bar > span:hover {
		background-color: rgb(51, 0, 43);
	}
	.selecionar{
		
		margin: 1rem;
	}
	.selecionar > span{
		margin: 1rem;
		display: block;
		cursor: pointer;
		font-weight: 600;
		text-align: center;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		letter-spacing: 0.15rem;
		font-size: 0.9rem;
		transition: all 300ms ease-in-out;
		background-color: rgb(146, 1, 122);
	}
	.selecionar > span:hover {
		background-color: rgb(51, 0, 43);
	}
	
</style>