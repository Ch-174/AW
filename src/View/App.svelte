<script>
	import { Router, Link, Route } from "svelte-navigator";
	import { LeftSide, RightSide} from './Components'
</script>
<body>
	<main>
	<Router>
			<LeftSide />
			<RightSide />
		</Router>
	</main>
</body>


<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');
	:global(*, html, body) {
		margin: 0;
		padding: 0;
		color: #FFFFFF;
		box-sizing: border-box;
		font-family: 'Raleway', sans-serif;	
	}
	:global(body) {
		overflow-x: hidden;
	}
	:global(input) {
		color: black;
	}
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		overflow: scroll;
		align-items: flex-start;
		background-color: rgb(27, 8, 27);
	}
</style>