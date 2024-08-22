<script setup lang="ts">
	import type { IUser } from "@/interfaces/IUser";
	import { formatPhone, formatDate } from "@/helpers/formatters";
	import { USERS_TABLE_HEADERS } from "@/constants";


	defineProps<{
		currentPage: number,
		isLoading: boolean,
		users: IUser[] | undefined
	}>();

	defineEmits<{
		(e: "clickUser", id: number): void
	}>();
</script>


<template>
	<section class="table">
		<header class="table__header">
			<h3 
				v-for="header in USERS_TABLE_HEADERS"
				:key="header"
				class="table__cell header"
			>
				{{ header }}
			</h3>
		</header>
		<div 
			v-if="isLoading" 
			v-for="num in 10" 
			:key="num"
			class="table__loading"
		></div>
		<div
			@click="$emit('clickUser', user.id)"
			v-for="user in users" 
			:key="user.id"
			v-else
			class="table__row"
		>
			<span class="table__cell">
				<img
					:alt="user.login"
					:src="user.avatar"
					class="table__avatar"
				/>
			</span>
			<span class="table__cell">{{ user.login }}</span>
			<span class="table__cell">{{ user.email }}</span>
			<span class="table__cell">{{ formatPhone(user.phone) }}</span>
			<span class="table__cell">{{ user.role }}</span>
			<span class="table__cell">{{ formatDate(user.dateOfBirth) }}</span>
			<span class="table__cell">{{ formatDate(user.dateOfRegistration) }}</span>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.table {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;

		&__row,
		&__header {
			align-items: center;
			display: flex;
			position: relative;
			gap: 10px;
		}

		&__header {
			margin-bottom: 5px;
		}

		&__row {
			border-bottom: 1px solid $--background-primary;
			color: $--text-secondary;
			font-weight: 400;

			cursor: pointer;
			padding: 10px 0px;

			&:last-child {
				border-bottom: 1px solid transparent;
			}
		}

		&__cell {
			flex: 1;

			@include text;
			color: currentColor;
			font-weight: inherit;
			text-align: left;
			
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&:first-child {
				flex: 0 0 70px;
			}

			&.header {
				@include h3;
				text-align: left;
			}

			&:last-child {
				text-align: right;
			}
		}

		&__avatar {
			border-radius: 5px;

			overflow: hidden;
			height: 40px;
			width: 40px;
		}

		&__loading {
			@include skeleton;

			& {
				margin-bottom: 7px;
				height: 60px;
				width: 100%;
			}
		}
	}


	@media(hover: hover) {
		.table__row:hover {
			color: $--text-primary;
		}
	}
</style>