<script setup lang="ts">
	import { ref, watch } from "vue";
	import type { IUser } from "@/interfaces/IUser";
	import BaseDropdownList from "@/components/BaseDropdownList.vue";
	import BaseDateInput from "@/components/BaseDateInput.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import BaseInput from "@/components/BaseInput.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { useApi } from "@/composables/useApi";
	import { getWordByAmount } from "@/helpers/words";
	import { formatPhone } from "@/helpers/formatters";
	import { formatResponseDate } from "@/helpers/formatters";
	import { useActivePopup } from "@/composables/useActivePopup";
	import { ROLES_FILTERS } from "@/constants";


	const props = defineProps<{
		isVisible: boolean,
		id: number | null
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void
	}>();


	const { activePopup, updateActivePopup } = useActivePopup();

	const currentUser = ref<IUser | null>(null);
	const isReadonly = ref<boolean>(false);

	const { data, isLoading, fetchData } = useApi<IUser[]>();


	const setUser = () => {
		!isLoading.value && (currentUser.value = data.value?.[0] || null);
		currentUser.value && (currentUser.value.phone = formatPhone(currentUser.value.phone));
	}

	const calculateAge = (date: Date): string => {
		const currentDate = new Date();

		let difference = currentDate.getFullYear() - date.getFullYear();

		(currentDate.getMonth() < date.getMonth() || (date.getMonth() === currentDate.getMonth() && currentDate.getDate() < date.getDate())) && difference--;

		if (difference < 1) return "(Менее года)";
		return `(${getWordByAmount(difference, "год", "года", "лет")})`;
	}

	const isActive = (element: any, id: string): boolean => currentUser.value?.[id as keyof IUser] === element;

	watch(isLoading, setUser);
	watch(currentUser, () => console.log(currentUser.value), { deep: true });
	watch(() => props.id, () => props.id && fetchData("/users", { id: props.id }));
</script>


<template>
	<TheBlackout 
		@close-popup="$emit('closePopup')"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="$emit('closePopup')"
			:is-visible="isVisible"	
			title="Информация по пользователю"
		>
			<main v-if="!isLoading && currentUser" class="content">
				<div class="content__top">
					<div class="content__wrapper">
						<img 
							:alt="currentUser.login"
							:src="currentUser.avatar" 
							class="content__wrapper-image"
						>
					</div>
					<div class="content__col">
						<BaseInput
							v-model="currentUser.login"
							:readonly="isReadonly"
							label="Логин"
							type="text"
						/>
						<BaseInput
							v-model="currentUser.fullName"
							:readonly="isReadonly"
							label="ФИО"
							type="text"
						/>
						<BaseInput
							v-model="currentUser.email"
							:readonly="isReadonly"
							label="Email"
							type="email"
						/>
						<BaseInput
							v-model="currentUser.phone"
							:readonly="isReadonly"
							label="Телефон"
							type="text"
						/>
					</div>
				</div>
				<div class="content__row">
					<div :class="['content__field', { readonly: isReadonly }]">
						<label class="content__label" for="dateOfBirth">Дата рождения</label>
						<BaseDateInput
							@update-active-popup="updateActivePopup"
							:date="new Date(currentUser.dateOfBirth)"
							:active-popup="activePopup" 
							id="dateOfBirth"
						/>
						<span class="content__period">{{ calculateAge(new Date(currentUser.dateOfBirth)) }}</span>
					</div>
					<div :class="['content__field', { readonly: isReadonly }]">
						<label class="content__label" for="dateOfRegistration">Дата регистрации</label>
						<BaseDateInput
							@update-active-popup="updateActivePopup"
							:date="new Date(currentUser.dateOfRegistration)"
							:active-popup="activePopup" 
							id="dateOfRegistration"
						/>
						<span class="content__period">{{ calculateAge(new Date(currentUser.dateOfRegistration)) }}</span>
					</div>
				</div>
				<div class="content__row">

					<div class="content__field">
						<!-- <BaseDropdownList
							v-if="!isReadonly"
							@change-element="updateUser"
							:is-active-element="(element: any, id: string) => isActive(element, id)"
							:elements="ROLES_FILTERS"
							id="role"
							title="Роль пользователя"
						/> -->
					</div>
				</div>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.content {
		display: flex;
		flex-direction: column;
		gap: 35px;

		&__top {
			align-items: flex-start;
			display: flex;
			gap: 35px;
		}

		&__wrapper {
			border-radius: 20px;
			flex: 0 0 auto;

			overflow: hidden;
			height: 230px;
			width: 230px;

			&-image {
				pointer-events: none;
			}
		}

		&__col {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			gap: 20px;
		}

		&__row {
			display: flex;
			gap: 30px;
		}

		&__label {
			background: linear-gradient(to bottom, $--background-primary 50%, $--background-secondary 50%);
			color: $--text-primary;
			font-size: 14px;
			
			padding: 0px 2px;
			position: absolute;
			left: 15px;
			top: -8px;

			z-index: 1;
		}

		&__period {
			@include h3;

			pointer-events: none;
			opacity: 0;

			position: absolute;
			left: 120px;
			top: 50%;

			transform: translateY(-50%);
		}

		&__text {
			@include h3;
			background: $--background-secondary;

			align-items: center;
			display: flex;

			padding: 15px;

			text-overflow: ellipsis;
			transition: all 0.1s ease-in-out;
			
			height: 40px;
			width: 100%;
		}

		&__field {
			flex: 1 1 46%;
			position: relative;

			&:deep(.wrapper) {
				width: 100%;
			}

			&:deep(.dropdown) {
				width: 100%;
			}

			&.readonly {
				&:deep(.wrapper) {
					box-shadow: none;
					pointer-events: none;
				}

				&:deep(.wrapper__button) {
					background: transparent;
				}
	
				&:deep(.wrapper__button-icon) {
					opacity: 0;
				}
	
				&:deep(.wrapper__cross) {
					pointer-events: none;
					opacity: 0;
				}

				& .content__label {
					color: $--text-secondary;
					font-size: 12px;
				}

				& .content__period {
					opacity: 1;
				}

				& .content__text {
					background: transparent;
				}
			}
		}
	}
</style>