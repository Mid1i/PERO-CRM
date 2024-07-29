<script setup lang="ts">
	defineProps<{
		title: string
	}>();
</script>


<template>
	<th class="header">
		<h3 class="header__title">
			{{ title }}
			<svg class="header__icon" fill="none" height="14" viewBox="0 0 12 14" width="12">
				<path d="M5.24407 0.872872C5.64284 0.41241 6.35716 0.41241 6.75593 0.872872L9.76318 4.34535C10.3241 4.99299 9.864 6 9.00725 6L2.99275 6C2.136 6 1.67594 4.99299 2.23682 4.34535L5.24407 0.872872Z" fill="#7380EC"/>
				<path d="M6.75593 13.1271C6.35716 13.5876 5.64284 13.5876 5.24407 13.1271L2.23682 9.65465C1.67594 9.00701 2.136 8 2.99275 8H9.00725C9.864 8 10.3241 9.00701 9.76318 9.65465L6.75593 13.1271Z" fill="currentColor"/>
			</svg>
		</h3>
	</th>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.header__title {
		align-items: center;
		display: flex;
		justify-content: flex-start;
		gap: 10px;
		
		@include h3;
	}

	.header__icon {
		color: $--text-secondary;
		cursor: pointer;
		flex: 0 0 auto;
	}
</style>