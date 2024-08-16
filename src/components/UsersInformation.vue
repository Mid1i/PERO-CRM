<script setup lang="ts">
	import { ref, watch } from "vue";
	import type { IUser } from "@/interfaces/IUser";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import BaseInput from "@/components/BaseInput.vue";
	import ThePopup from "@/layouts/ThePopup.vue";


	const props = defineProps<{
		isVisible: boolean,
		user: IUser | null
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void
	}>();

	const localUser = ref<IUser | null>(null);
	const isReadonly = ref<boolean>(false);


	watch(() => props.user, () => localUser.value = props.user, { immediate: true });
	watch(localUser, () => console.log(localUser.value), { deep: true });
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
			<main v-if="localUser" class="content">
				<div class="content__top">
					<div class="content__wrapper">
						<img 
							:alt="localUser.login"
							:src="localUser.avatar" 
							class="content__wrapper-image"
						>
					</div>
					<div class="content__col">
						<BaseInput
							v-model="localUser.login"
							:readonly="isReadonly"
							label="Логин"
							type="text"
						/>
						<BaseInput
							v-model="localUser.fullName"
							:readonly="isReadonly"
							label="ФИО"
							type="text"
						/>
						<BaseInput
							v-model="localUser.email"
							:readonly="isReadonly"
							label="Email"
							type="email"
						/>
						<BaseInput
							v-model="localUser.phone"
							:readonly="isReadonly"
							label="Телефон"
							type="text"
						/>
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
		gap: 50px;

		&__top {
			align-items: center;
			display: flex;
			gap: 35px;
		}

		&__wrapper {
			border-radius: 100%;
			flex: 0 0 auto;

			overflow: hidden;
			height: 200px;
			width: 200px;
		}

		&__col {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>