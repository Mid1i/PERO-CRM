<script setup lang="ts">
	import type { IUser } from "@/interfaces/IUser";
	import BaseSearchInput from "@/components/BaseSearchInput.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { useSearch } from "@/composables/useSearch";
	import { formatPhone } from "@/helpers/formatters";

	const props = defineProps<{
		isVisible: boolean,
		users: IUser[]
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void
	}>();

	const { 
		searchRequest, 
		results, 
		clearSearch, 
		highlightMatches, 
		generateResultsMessage 
	} = useSearch<IUser>(props.users, ["login", "email"], () => emits("closePopup"));
</script>


<template>
	<TheBlackout 
		@close-popup="clearSearch"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="clearSearch"
			:is-visible="isVisible"	
			title="Поиск по пользователям"
		>
			<main class="content">
				<BaseSearchInput
					v-model="searchRequest"
					placeholder="Введите логин или почту пользователя"
				/>
				<section :class="['content__results', { empty: results.length === 0 }]">
					<h3 v-if="results.length === 0" class="content__title">{{ !searchRequest ? "Здесь будут показаны результаты" : "Ничего не найдено" }}</h3>
					<template v-else>
						<h3 class="content__title">{{ generateResultsMessage }}</h3>
						<ul class="content__list">
							<li 
								v-for="user in results"
								:key="user.id"
								class="content__list-el"
							>
								<div class="content__list-wrapper">
									<img 
										:alt="user.login"
										:src="user.avatar" 
										class="content__list-image"
									>
								</div>
								<h6 class="content__list-title" v-html="highlightMatches(user.login)"></h6>
								<span class="content__list-text date">На сайте с <b>{{ user.dateOfRegistration }}</b></span>
								<span class="content__list-text email" v-html="highlightMatches(user.email)"></span>
								<span class="content__list-text phone">{{ formatPhone(user.phone) }}</span>
								<span class="content__list-text country">{{ user.country }}</span>
							</li>
						</ul>
					</template>
				</section>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.content {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		gap: 20px;

		&__results {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			&.empty {
				align-items: center;
				justify-content: center;
			}
		}

		&__title {
			@include h3;
		}

		&__list {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			margin-top: 5px;
			padding-bottom: 50px;
			overflow-y: auto;
			height: 0px;

			&::-webkit-scrollbar {
				width: 20px;

				&-thumb {
					background: $--text-primary;
					border-right: 1px solid $--background-primary;
					border-left: 16px solid $--background-primary;
				}

				&-track-piece:start,
				&-track-piece:end {
					background: $--text-secondary;
					border-right: 2px solid $--background-primary;
					border-left: 17px solid $--background-primary;
				}

				&-track-piece:end {
					margin-bottom: 50px;
				}
			}

			&-el {
				display: grid;
				column-gap: 20px;
				grid-template-columns: 60px 1fr 1fr;
				grid-template-areas: "avatar nickname email"
														 "avatar nickname phone"
														 "avatar date country";

				cursor: pointer;
				padding: 25px 0px;

				&:not(:last-child) {
					border-bottom: 1px solid $--background-secondary;
				}

				&:deep(.highlight) {
					color: $--blue;
					text-decoration: underline;
				}
			}

			&-wrapper {
				grid-area: avatar;
				border-radius: 100%;

				overflow: hidden;
				height: 60px;
				width: 60px;
			}

			&-title {
				@include h3;
				grid-area: nickname;
			}

			&-text {
				@include text;
				text-align: right;

				&.date {
					grid-area: date;
					text-align: left;

					& b {
						color: $--text-primary;
					}
				}

				&.email {
					grid-area: email;
				}

				&.phone {
					grid-area: phone;
				}

				&.country {
					grid-area: country;
				}
			}
		}
	}


	@media(hover: hover) {
		.content__list-el:hover .content__list-text {
			color: $--text-primary;
		}
	}
</style>