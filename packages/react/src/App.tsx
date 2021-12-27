import { type KeyboardEvent, useEffect, useState } from "react"

type Item = {
	value: string,
	done: boolean,
}

const App = () => {
	const [items, setItems] = useState([] as Item[])
	const [undoneItems, setUndoneItems] = useState(items.filter(i => !i.done))
	useEffect(() => setUndoneItems(items.filter(i => !i.done)), [items])

	const [value, setValue] = useState("")
	const [showFinished, setShowFinished] = useState(true)

	const addItem = () => {
		if (value !== "" && value) {
			setItems(items.concat({ value, done: false }))
			setValue("")
		}
	}

	const submitItem = (e: KeyboardEvent) => {
		if (e.key === "Enter") addItem()
	}

	return <>
		<h1>This was built with React!</h1>
		<input value={ value } onKeyPress={ submitItem } onChange={ ({ target }) => setValue(target.value) }/>
		<button onClick={ addItem }>Add</button>
		<input type="checkbox" checked={ showFinished } id="show-done" onChange={ () => setShowFinished(!showFinished) }/>
		<label htmlFor="show-done">Show done</label>
		<ul>{
			(showFinished ? items : undoneItems).map((item, index) =>
				<li className={ `item ${ item.done ? "done" : "" }` } onClick={ () => {
					const newItems = [...items]
					newItems[index] = { ...item, done: !item.done }
					setItems(newItems)
				} }>
					{ item.value }
				</li>,
			)
		}</ul>
	</>
}

export default App