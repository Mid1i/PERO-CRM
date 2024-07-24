<script setup lang="ts">
	import { ref, onBeforeMount, provide } from "vue";
	import type { TypeThemes } from "@/types/TypeThemes";
  import { RouterView } from "vue-router";
	import Container from "@/layouts/TheContainer.vue";


	const theme = ref<TypeThemes>("dark");


	const switchTheme = (currentTheme: TypeThemes): void => {
		document.documentElement.setAttribute("data-theme", currentTheme);
		localStorage.setItem("theme", currentTheme);
		theme.value = currentTheme;
	}

	provide("theme", theme);
	provide("switchTheme", switchTheme)


	onBeforeMount((): void => {
		const storageTheme = localStorage.getItem("theme");
		(storageTheme === "dark" || storageTheme === "light") && switchTheme(storageTheme);
	})
</script>


<template>
  <Container>
		<RouterView/>
	</Container>
</template>
