<script lang="ts">
    import { page } from '$app/stores';
</script>

<nav>
    {#if $page.url.pathname !== '/'}
        <a href="/">/home</a>
    {/if}
</nav>

<slot></slot>

<style>
	:global(body) {
		background: white;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
        height: 100%
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