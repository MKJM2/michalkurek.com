<script lang="ts">
    import { page } from '$app/stores';
</script>

<nav>
    {#if $page.url.pathname !== '/'}
        <a href="/">/home</a>
    {/if}
</nav>

<slot/>

<style>
    :global(html) {
        overflow-x: hidden;
        width: 100%;
    }
	:global(body) {
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
        height: 100%;
	}

    @media screen and (max-width: 1000px) {
        :global(body) {
            height: auto;
            font: 0.8rem;
        }
    }
    nav {
        width: 100%;
        margin-left: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding: 1rem;
        /* Make the nav bar have links colored black that underline on hover */
        color: black;
    }
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }
</style>