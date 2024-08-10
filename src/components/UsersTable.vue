<script setup lang="ts">
	import { computed } from "vue";
	import type { IUser } from "@/interfaces/IUser";
	import { formatPhone } from "@/helpers/formatters";
	import { USERS_TABLE_HEADERS } from "@/constants";


	const props = defineProps<{
		currentPage: number,
		users: IUser[]
	}>();

	const generatePaginatedData = computed<IUser[]>(() => props.users.slice((props.currentPage - 1) * 10, props.currentPage * 10));
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
			v-for="user in generatePaginatedData" 
			:key="user.id"
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
			<span class="table__cell">{{ user.dateOfBirth }}</span>
			<span class="table__cell">{{ user.dateOfRegistration }}</span>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.table {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;

		&__row,
		&__header {
			align-items: center;
			column-gap: 5px;
			display: grid;
			grid-template-columns: 70px repeat(6, 1fr);
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
			@include text;
			color: currentColor;
			font-weight: inherit;
			text-align: left;

			text-overflow: ellipsis;
			overflow: hidden;

			&.header {
				@include h3;
				text-align: left;
				white-space: nowrap;
			}

			&:last-child {
				text-align: right;
			}
		}

		&__avatar {
			height: 40px;
			width: 40px;
		}
	}


	@media(hover: hover) {
		.table__row:hover {
			color: $--text-primary;
		}
	}
</style>