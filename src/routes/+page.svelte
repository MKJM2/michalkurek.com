<script lang='ts'>
    const projects = [
        { title: 'Tap', description: 'A strongly-typed interpretted programming language written in C++'},
        { title: 'Boids', description: 'A boids simulation written in GoLang'},
        { title: 'Lishex', description: 'A UCI chess engine built in C++'},
        { title: 'Raycasting', description: 'A simple raycasting simulation written in C++'}
    ];
</script>
    
<main>
    <h1>Michal Kurek</h1>
    <p>I'm a software engineer actively looking for job opportunities.</p>
    
    <div>
        <h2>Contact</h2>
        <p>Email: mkurek@college.harvard.edu</p>
        <a href="resume.txt">CV/Resume</a>
    </div>

    <h2>Projects</h2>
    {#each projects as { title, description }}
        <a href="/{title.toLowerCase()}">{title}</a> :: {description}
        <br/>
    {/each}
</main>

<style>
    main {
        height: 100%;
    }
</style>

