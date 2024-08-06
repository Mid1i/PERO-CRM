<script setup lang="ts">
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";


	defineProps<{
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): boolean
	}>();
</script>


<template>
	<TheBlackout 
		@close-popup="$emit('closePopup')"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="$emit('closePopup')"
			:is-visible="isVisible"	
			title="Фильтры по пользователям"
		>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss"></style>