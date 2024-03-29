<script lang="ts">
	import { onMount } from 'svelte'
	import steps from './steps.js'
		
	let index:number = 0;
	let current: any;
	let currentEditorIndex:number = 0;
	let currentEditorCommand:number;
	let lines: string[] = []
	let selections: string[] = []
	let transcription: any;
	
	let nextTimer, typeTimer, transitionTimer, editorCommandTimer
	
	onMount(() => {
		nextTimer = next()
	})
	
	function next() {
		current = {...steps[index]}
		  
		if (current.action == 'command' || current.action == 'editor') {
			current.typed = ''
			current.index = 0
			typeTimer = setTimeout(type, 0) 
		} else if (current.action == 'wait') {
			index += 1
			nextTimer = setTimeout(next, current.delay || 500)
		}
	}
	
	function type() {
		const char = current.command[current.index]
		current = {...current, typed: current.typed + char}
		transcription = current.transcription || ''
		
		current.index += 1
		
		if (current.index < current.command.length) {
			typeTimer = setTimeout(type, 50)	
		} else {
			if (current.action == 'editor') {
				transitionTimer = setTimeout(openEditor, 1000)	
			} else {
				scheduleTransition()
			}
		}
	}
	
	function scheduleTransition() {
		const delay = transcription ? 1500 : 300
		transitionTimer = setTimeout(transition, delay)	
	}
	
	function openEditor() {
		current.lines = current.content.split("\n")
		
		transcription = ''
		current.showEditor = true
		current.selections = []
		
		editorCommandTimer = setTimeout(nextEditorCommand, 1000)
	}
	
	function transition() {
		index += 1
		lines = [...lines, current]
		current = null
		transcription = ''
		
		nextTimer = setTimeout(next, 300)
	}
	
	function nextEditorCommand() {
		currentEditorCommand = current.steps[currentEditorIndex]
		currentEditorIndex += 1
		transcription = currentEditorCommand.transcription 
		
		if (currentEditorCommand.action == 'close') {
			// editorCommandTimer = setTimeout(closeEditor, currentEditorCommand.delay)
		} else if (currentEditorCommand.action == 'select') {
			const { from, to, style } = currentEditorCommand
			const selection = { from, to, style }

			selections.push(selection)
			selections = selections
			current = current
			
			console.log(selections)
			editorCommandTimer = setTimeout(nextEditorCommand, currentEditorCommand.delay)
		}
	}
		
	function isSelected(line, char) {
		if (!selections) return false
		
		console.log({line, char}, selections)
		
		selections.forEach(({from, to}) => {
			debugger
			if (from.line >= line && char >= from.char && to.line >= line && to.char >= char)
				return true
		})
		
		return false
	}
	
	function closeEditor() {
		current.showEditor = false
		selections = []
		scheduleTransition()
	}
	
	function reset() {
		clearTimeout(nextTimer)
		clearTimeout(typeTimer)
		clearTimeout(transitionTimer)
		clearTimeout(editorCommandTimer)
		
		current = null
		index = 0
		lines = []
		transcription = null
		selections = []
		
		currentEditorIndex = 0
	  currentEditorCommand = null
			
		nextTimer = setTimeout(next, 1000)
	}
	
</script>

<!--
<pre>
  lines = {JSON.stringify(lines, null, 2)}
</pre>
<pre>
	current = {JSON.stringify(current, null, 2)}
</pre>
-->

<!-- <svelte:window/> -->

<div class="wrapper">
<section class="terminal">
	<div class="bar">
		<svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
			<g fill="none" fill-rule="evenodd" transform="translate(1 1)">
				<circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"/>
				<circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"/>
				<circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"/>
			</g>
		</svg>
		
	</div>
	
	{#each lines as line}
	  <p>
		  <span class="prompt">&gt&gt;</span> {line.command}
		</p>
	
		{#if line.output}
			<p class="output">
				{#each line.output.split("\n") as outputLine}
					{@html outputLine}<br/>
				{/each}
			</p>  
	  {/if}
	{/each}
	
	{#if current && (current.action == 'command' || current.action == 'editor')}
		<p>
			<span class="prompt">&gt&gt;</span> {current.typed}
	  </p>
	{/if}
	
	{#if current && current.action == 'editor' && current.showEditor}
		<div class="editor">
			{#each current.lines as line, lineIndex}
			  {#if current.lineNumbers}<span class="line-number">{lineIndex+1}</span>{/if}
			  {#each line.split() as char, charIndex}
				  <span class:highlight={isSelected(lineIndex, charIndex)}>{char}</span>
			  {/each}<br/>
			{/each}<span class="cursor"></span>
	  </div>
	{/if}
	
	<div class="transcription-wrapper">
		<div class="transcription" class:visible={!!transcription}>
			{transcription}
		</div>
	</div>
</section>

<article>
	<h1>Tap</h1>
	<p>
	Tap is a simple, strongly-typed interpreted programming language crafted in
	modern C++. Its syntax is a fusion of features offered by languages I love,
	such as C++, Haskell, Rust, GoLang, and OCaml. Tap was created as a
	playground for learning programming language design, exploring C++17 and
	C++20 features (including modules and variants), diving into CMake project
	management, and implementing unit testing using GoogleTest. As part of this
	exploration, I've implemented my own lexer, parser, and interpreter—avoiding
	the use of GNU Bison.
	</p>
	<br/>
	<p>
	Disclaimer: Tap is in its infancy and many of the features are still not
	implemented. You can find the project repository <a href="https://github.com/MKJM2/Tap>">here</a>.
	</p>
</article>
</div>

<style>
	:global(body) {
		background: white;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row; 
		height:100%;
		min-height: 80vh;
    }

	article {
		text-align: justify
	}

    @media screen and (max-width: 1000px) {
      .wrapper {
		  flex-direction: column;
      }
	  .terminal {
		  width: 90%;
		  font-size: 1rem;
		  min-height: 20em;
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
		.terminal {
			font-size: 1.2rem;
		    min-height: 25rem;
		    margin: 5rem;
		}
    }
	
	.terminal {
		position: relative;
		font-family: monospace;
		/* font-size: 1.5rem; */
		background: #333;
		padding: 0.7rem 1rem;
		/* margin: 5rem; */
		border-radius: 0.5rem;
		color: #b8b8b8;
		box-shadow: 1px 1px #ccc;
		/* min-height: 25rem; */
		min-width: 40%;
		overflow: hidden;
	}
	
	.terminal .bar {
		margin-bottom: 1rem;
	}
	
	.transcription-wrapper {
		position: absolute;
		bottom: 0px;
		width: 100%;
		text-align: center;
        margin: 1.6rem 0;
        margin-left: -1rem;
	}
	
	.editor {
        position: absolute;
        top: 3.5rem;
        background: #333;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        margin-left: -1rem;
		padding: 0 1rem;
	}
	
	.editor .line-number {
		color: #FFBD2E;
        font-weight: bold;
        display: inline-block;
        margin-right: 0.5rem;
	}
	
	.editor .highlight {
		background: white;
		color: black;
	}
	
	.transcription {
		display: inline-block;
		font-family: sans-serif;
        font-size: 0.9rem;
        background: #ccc;
        padding: 0.5em;
        border-radius: 0.1em;
        color: #222;
		top: 5rem;
        position: relative;
        transition: all .3s ease-out;
	}
	
	.transcription.visible {
		top: 0px;
	}
	
	.prompt {
		color: #27C93F;
		font-weight: bold
	}
	
	p {
		margin: 0.2rem 0;
	}
	p.output {
		font-weight: normal;
	}
</style>
