<script setup lang="ts">
	import { RouterLink, useRoute } from "vue-router";


	defineProps<{
		icon: string,
		link: string,
		title: string
	}>();

	const router = useRoute();
</script>


<template>
	<li class="menu__list-el menu-item">
		<RouterLink 
			:class="['menu-item__link', router.path === link && 'active']" 
			:title="title"
			:to="link"
		>
			<div class="menu-item__icon" v-html="icon"></div>
			<span class="menu-item__text">{{ title }}</span>
		</RouterLink>
	</li>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.menu-item {
		height: 50px;
		width: 100%;

		&__link {
			border-left: 5px solid transparent;
			color: $--text-secondary;

			align-items: center;
			display: flex;
			gap: 15px;

			padding-left: 25px;
			height: 100%;
			width: 100%;
			transition: none;

			&.active {
				background: $--box-shadow;
				border-left: 5px solid $--blue;
				color: $--blue;
				transition: none;

				.menu-item__icon {
					color: $--blue;
				}
			}
		}

		&__icon {
			color: $--text-secondary;
			transition: transform 0.1s ease-in-out;
		}

		&__text {
			@include text;
			color: currentColor;
		}
	}


	@media(hover: hover) {
		.menu-item:hover .menu-item__icon,
		.menu-item:hover .menu-item__text {
			color: $--blue;
			transform: translateX(10px);
		}
	}
</style>