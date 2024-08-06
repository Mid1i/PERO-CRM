<script setup lang="ts">
	import { useTheme } from "@/composables/theme";
	import { useRoute } from "vue-router";


	const router = useRoute();

	const { theme, switchTheme } = useTheme();
</script>


<template>
	<header class="header">
		<h1 class="header__title">{{ router.meta.headerTitle }}</h1>
		<div class="header__right">
			<div class="header__switcher">
				<button 
					@click="switchTheme('light')"
					:class="['header__switcher-item', theme === 'light' && 'active']"
				>
					<svg class="header__switcher-light" fill="none" height="18" viewBox="0 0 18 18" width="18">
						<path d="M9 4.90909C6.74182 4.90909 4.90909 6.74182 4.90909 9C4.90909 11.2582 6.74182 13.0909 9 13.0909C11.2582 13.0909 13.0909 11.2582 13.0909 9C13.0909 6.74182 11.2582 4.90909 9 4.90909ZM0.818182 9.81818H2.45455C2.90455 9.81818 3.27273 9.45 3.27273 9C3.27273 8.55 2.90455 8.18182 2.45455 8.18182H0.818182C0.368182 8.18182 0 8.55 0 9C0 9.45 0.368182 9.81818 0.818182 9.81818ZM15.5455 9.81818H17.1818C17.6318 9.81818 18 9.45 18 9C18 8.55 17.6318 8.18182 17.1818 8.18182H15.5455C15.0955 8.18182 14.7273 8.55 14.7273 9C14.7273 9.45 15.0955 9.81818 15.5455 9.81818ZM8.18182 0.818182V2.45455C8.18182 2.90455 8.55 3.27273 9 3.27273C9.45 3.27273 9.81818 2.90455 9.81818 2.45455V0.818182C9.81818 0.368182 9.45 0 9 0C8.55 0 8.18182 0.368182 8.18182 0.818182ZM8.18182 15.5455V17.1818C8.18182 17.6318 8.55 18 9 18C9.45 18 9.81818 17.6318 9.81818 17.1818V15.5455C9.81818 15.0955 9.45 14.7273 9 14.7273C8.55 14.7273 8.18182 15.0955 8.18182 15.5455ZM4.08273 2.92909C3.76364 2.61 3.24 2.61 2.92909 2.92909C2.61 3.24818 2.61 3.77182 2.92909 4.08273L3.79636 4.95C4.11545 5.26909 4.63909 5.26909 4.95 4.95C5.26091 4.63091 5.26909 4.10727 4.95 3.79636L4.08273 2.92909ZM14.2036 13.05C13.8845 12.7309 13.3609 12.7309 13.05 13.05C12.7309 13.3691 12.7309 13.8927 13.05 14.2036L13.9173 15.0709C14.2364 15.39 14.76 15.39 15.0709 15.0709C15.39 14.7518 15.39 14.2282 15.0709 13.9173L14.2036 13.05ZM15.0709 4.08273C15.39 3.76364 15.39 3.24 15.0709 2.92909C14.7518 2.61 14.2282 2.61 13.9173 2.92909L13.05 3.79636C12.7309 4.11545 12.7309 4.63909 13.05 4.95C13.3691 5.26091 13.8927 5.26909 14.2036 4.95L15.0709 4.08273ZM4.95 14.2036C5.26909 13.8845 5.26909 13.3609 4.95 13.05C4.63091 12.7309 4.10727 12.7309 3.79636 13.05L2.92909 13.9173C2.61 14.2364 2.61 14.76 2.92909 15.0709C3.24818 15.3818 3.77182 15.39 4.08273 15.0709L4.95 14.2036Z" fill="#EDEFFD"/>
					</svg>
				</button>
				<button 
					@click="switchTheme('dark')"
					:class="['header__switcher-item', theme === 'dark' && 'active']"
				>
					<svg class="header__switcher-dark" fill="none" height="18" viewBox="0 0 18 18" width="18">
						<path d="M8.51229 0.0132171C3.54959 0.282569 -0.256079 4.52505 0.0132722 9.48775C0.282624 14.4504 4.52511 18.2561 9.4878 17.9868C14.4505 17.7174 18.2562 13.4749 17.9868 8.51223C17.9619 8.05291 17.897 7.59575 17.8133 7.15965C16.9089 8.58075 15.3595 9.55615 13.5422 9.65479C10.5666 9.81629 8.01899 7.531 7.85749 4.55538C7.75939 2.74804 8.56083 1.09217 9.87571 0.0393642C9.4331 0.00329834 8.97161 -0.0117128 8.51229 0.0132171Z" fill="#EDEFFD"/>
					</svg>
				</button>
			</div>
			<div class="header__profile">
				<h6 class="header__profile-text">
					Hey, 
					<span class="header__profile-text--nickname">Midi</span><br/>
					Admin
				</h6>
				<div class="header__profile-wrapper">
					<img 
						alt="Аватар пользователя"
						class="header__profile-image"
						src="@/assets/images/avatar.png" 
					>
				</div>
			</div>
		</div>
	</header>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;

		&__title {
			@include h1;
		}

		&__right {
			align-items: center;
			display: flex;
			gap: 30px;
		}

		&__switcher {
			background: $--box-shadow;
			border-radius: 5px;

			align-items: center;
			display: flex;
			justify-content: space-between;

			width: 72px;

			&-item {
				border-radius: 5px;
				cursor: pointer;

				align-items: center;
				display: flex;
				flex: 0 1 50%;
				justify-content: center;

				padding: 5px 10px;

				&.active {
					background: $--blue;
				}
			}

			&-dark path {
				fill: $--text-primary;
			}
		}

		&__profile {
			align-items: center;
			display: flex;
			gap: 15px;

			&-text {
				@include text;
				text-align: right;

				&--nickname {
					color: $--text-primary;
					font-weight: 700;
				}
			}

			&-wrapper {
				height: 40px;
				width: 40px;
			}
		}
	}
</style>