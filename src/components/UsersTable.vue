<script setup lang="ts">
	import { computed } from "vue";
	import type { IUser } from "@/interfaces/IUser";
	import { onFormatPhone } from "@/helpers/formatters";
	import { USERS_TABLE_HEADERS } from "@/constants";


	const props = defineProps<{
		currentPage: number,
		users: IUser[]
	}>();


	const getCurrentPageUsers = computed<IUser[]>(() => props.users.slice((props.currentPage - 1) * 10, props.currentPage * 10));
</script>


<template>
	<section class="table">
		<div class="table__row">
			<h3 
				v-for="header in USERS_TABLE_HEADERS"
				:key="header"
				class="table__header"
			>
				{{ header }}
			</h3>
		</div>
		<div
			v-for="user in getCurrentPageUsers" 
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
			<span class="table__cell">{{ onFormatPhone(user.phone) }}</span>
			<span class="table__cell">{{ user.country }}</span>
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
		flex-direction: column;

		&__row {
			align-items: center;
			display: grid;
			grid-template-columns: 80px repeat(auto-fit, minmax(100px, 1fr));
			column-gap: 5px;

			border-bottom: 1px solid $--background-primary;
			color: $--text-secondary;
			font-weight: 400;

			&:not(:first-child) {
				cursor: pointer;
				padding: 10px 0px;
			}

			&:first-child,
			&:last-child {
				border-bottom: 1px solid transparent;
			}
		}

		&__header {
			@include h3;
			text-align: left;
			white-space: nowrap;

			&:last-child {
				text-align: right;
			}
		}

		&__cell {
			@include text;
			color: currentColor;
			font-weight: inherit;
			text-align: left;

			text-overflow: ellipsis;
			overflow: hidden;

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
			font-weight: 500;
		}
	}
</style>