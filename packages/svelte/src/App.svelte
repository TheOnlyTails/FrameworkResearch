<script lang="ts">
	type Item = {
		value: string,
		done: boolean,
	}

	export let items: Item[] = []
	$: undoneItems = items.filter(i => !i.done)

	let value: string
	let showFinished = true

	const addItem = () => {
		if (value !== "" && value) {
			items = [{ value, done: false }, ...items]
			value = ""
		}
	}

	const submitItem = (e: KeyboardEvent) => {
		if (e.key === "Enter") addItem()
	}
</script>

<h1>This was built with Svelte!</h1>
<input bind:value on:keypress={submitItem}>
<button on:click={addItem}>Add</button>
<input bind:checked={showFinished} id="show-done" type="checkbox">
<label for="show-done">Show done</label>
<ul>
	{#each (showFinished ? items : undoneItems) as item}
		<li class="item" on:click={() => item.done = !item.done} class:done={item.done}>
			{item.value}
		</li>
	{/each}
</ul>