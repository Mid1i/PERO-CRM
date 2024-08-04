<script setup lang="ts">
	import { ref, computed, watch } from "vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import type { IUser } from "@/interfaces/IUser";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { onFormatPhone } from "@/helpers/formatters";
	import { getWordByAmount } from "@/helpers/words";
	import { debounce } from "@/helpers/debounce";


	const props = defineProps<{
		searchUser: (request: string) => IUser[],
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup", newStatus?: boolean): boolean
	}>();


	const searchRequest = ref<string>("");
	const results = ref<IUser[]>([]);


	const onClickBlackout = (event: MouseEvent): void => {
		const target = <HTMLElement>event.target;

		target.classList.contains("blackout") && onClosePopup();
	}

	const onClosePopup = (): void => {
		window.setTimeout(() => searchRequest.value = "", 300);
		emits("closePopup");
	}

	const onSearchUser = (): IUser[] => results.value = props.searchUser(searchRequest.value);


	const getSearchAmount = computed<string>(() => {
		const length = results.value.length;
		return `Найден${length % 10 !== 1 ? 'о' : ''} ${getWordByAmount(length, 'результат', 'результата', 'результатов')}`;
	});

	watch(searchRequest, <() => void>debounce(onSearchUser));
</script>


<template>
	<TheBlackout 
		@click="onClickBlackout"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="onClosePopup"
			:is-visible="isVisible"	
			title="Поиск по пользователям"
		>
			<main class="content">
				<div class="content__field">
					<input 
						v-model="searchRequest"
						:class="[
							'content__field-input',
							searchRequest && 'active'
						]"
						id="search"
						type="text"
					>
					<label class="content__field-label" for="search">Введите логин или почту пользователя</label>
				</div>
				<section 
					:class="[
						'content__results',
						results.length === 0 && 'empty'
					]"
				>
					<h3 v-if="results.length === 0 && !searchRequest" class="content__title">Здесь будут показаны результаты</h3>
					<h3 v-if="results.length === 0 && searchRequest" class="content__title">Ничего не найдено</h3>
					<h3 v-if="results.length > 0" class="content__title">{{ getSearchAmount }}</h3>
					<ul v-if="results.length > 0" class="content__list">
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
							<h6 class="content__list-title">{{ user.login }}</h6>
							<span class="content__list-text date">На сайте с <b>{{ user.dateOfRegistration }}</b></span>
							<span class="content__list-text email">{{ user.email }}</span>
							<span class="content__list-text phone">{{ onFormatPhone(user.phone) }}</span>
							<span class="content__list-text country">{{ user.country }}</span>
						</li>
					</ul>
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

		&__field {
			position: relative;

			&-label {
				@include h3;
				color: $--text-secondary;
				font-weight: 400;

				pointer-events: none;
				padding: 2px;

				position: absolute;
				left: 15px;
				top: 50%;

				transition: all 0.1s ease-in-out;
				transform: translateY(-50%);
			}

			&-input {
				@include h3;
				background: $--background-secondary;
				border-radius: 10px;

				transition: all 0.1s ease-in-out;
				padding: 15px;
				height: 50px;
				width: 100%;

				&:focus + .content__field-label,
				&.active + .content__field-label {
					color: $--text-primary;
					font-size: 14px;
					top: 0px;
				}
			}
		}

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