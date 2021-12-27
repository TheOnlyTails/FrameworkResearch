<script lang="ts" setup>
import { computed, ref } from "vue"

type Item = {
  value: string,
  done: boolean,
}

let items = ref<Item[]>([])
let undoneItems = computed(() => items.value.filter(i => !i.done))

let value = ref("")
let showFinished = ref(true)

const addItem = () => {
  if (value.value !== "" && value.value) {
    items.value.push({ value: value.value, done: false })
    value.value = ""
  }
}

const submitItem = (e: KeyboardEvent) => {
  if (e.key === "Enter") addItem()
}
</script>

<template>
  <h1>This was built with Vue!</h1>
  <input v-model="value" @keydown="submitItem">
  <button @click="addItem">Add</button>
  <input id="show-done" v-model="showFinished" type="checkbox">
  <label for="show-done">Show done</label>
  <ul>
    <li v-for="item in (showFinished ? items : undoneItems)"
        :class="{ done: item.done }"
        class="item"
        @click="() => item.done = !item.done"
    >
      {{ item.value }}
    </li>
  </ul>
</template>
