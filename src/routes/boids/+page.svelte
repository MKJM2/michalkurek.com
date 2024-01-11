<script lang="ts">
    import { onMount } from 'svelte'

    let iframe : HTMLIFrameElement | null = null

    onMount(() => {
        iframe = document.getElementById('gameIFrame') as HTMLIFrameElement

        if (iframe == null) {
            console.log('iframe is null')
            return
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement && iframe) {
                iframe.requestFullscreen().catch(err => {
                    console.log(
                        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                    )
                })
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
            }
        }

        function reloadIframe() {
            setTimeout(function () {
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.location.reload()
                }
            }, 200)
        }

        function enterAndReload() {
            toggleFullScreen()
            // reloadIframe()
        }

        // Listen for the fullscreen change event
        document.onfullscreenchange = function (event) {

            if (!document.fullscreenElement) {
                // reloadIframe(iframeId)
            }
            setTimeout(function () {
                if (iframe != null)  {
                    console.log('focusing')
                    iframe.focus()
                }
            }, 200)
        }

        // Listen for keydown events on the entire document
        document.addEventListener('keydown', function (e) {
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault()
            enterAndReload()
            // toggleFullScreen()
        }
        })

        window.addEventListener('message',
            function (e) {
                if (e.data === 'toggleFullscreen') {
                    enterAndReload()
                }
            },
            false
        )

        function checkFocus() {
            if (iframe && document.activeElement == iframe) {
                iframe.classList.remove('brightness-75')
            } else if (iframe) {
                iframe.classList.add('brightness-75')
            }
        }

        window.setInterval(checkFocus, 100)
    })
</script>
<div class="wrapper">
    <div class="game">
        <iframe id="gameIFrame" title="A boids simulation" src="boids_wasm.html" width="960" height="540"
        scrolling="no"
        tabindex="-1"
        ></iframe>
        <div class="controls">
            Press <b>F</b> to toggle fullscreen. 
            Press <b>SPACE</b> to spawn a new boid at mouse cursor.
            Use <b>mouse</b> to zoom and pan.
        </div>
    </div>
    <article>
        <h1>Boids</h1>
        <p>
        Autonomous agents called <i>boids</i> (short for birdoids) follow three
        simple rules - separation, alignment, and cohesion. As they interact,
        complex flocking patterns emerge, mimicking birds or schools of fish.
        </p>
        
        The project is built in GoLang using the Ebitengine game library for
        fluid 2D graphics. Command line arguments control boid behavior by
        adjusting rule weights. Users can pan and zoom the view with mouse
        controls.     

        For a more performant native executable version, see the project
        repository on GitHub <a
        href="https://www.github.com/MKJM2/boids">here</a>.
        
    </article>
</div>



<style> 
    .controls {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #888888;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row; 
        height: 100%;
        min-height: 90vh;
    }

    @media screen and (max-width: 1000px) {
      .wrapper {
		  flex-direction: column;
      }
	  .game {
		  width: 90%;
		  font-size: 1rem;
	  }
      article {
        width: 90%; 
      }
    }

    @media screen and (min-width: 1000px) {
		article {
			margin: 2rem;
			width: 30%;
		}
		.game {
			font-size: 1.0rem;
		}
    }
	
	.game {
        display: flex;
        flex-direction: column;
		position: relative;
		padding: 0.7rem 1rem;
		margin: 5rem;
		border-radius: 0.5rem;
		min-width: 40%;
		overflow: hidden;
        font-size: 0.8rem;
        align-items: center;
        justify-content: center;
		/* min-height: 25rem; */
        height: auto;
	}

    #gameIFrame {
        /* position: absolute; */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 400px;
    }

	p {
		margin: 0.2rem 0;
	}

</style>

