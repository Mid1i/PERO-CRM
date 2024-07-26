<script setup lang="ts">
	import type { IRecentOrder } from "@/interfaces/IRecentOrder";
	import { onFormatPrice } from "@/helpers/formatters";
	
	
	defineProps<IRecentOrder>();
</script>


<template>
	<tr class="order">
		<td class="order__item">{{ id }}</td>
		<td class="order__item">{{ creationDate }}</td>
		<td class="order__item">{{ onFormatPrice(totalPrice) }}</td>
		<td 
			:class="[
				'order__item',
				status === 'Доставлен' && 'delivered',
				status === 'Отменен' && 'canceled'
			]"
		>
			{{ status }}
		</td>
		<td class="order__item details">Детали</td>
	</tr>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.order {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 20px;

		color: $--text-secondary;
		padding: 20px 0px;

		&:not(:last-child) {
			border-bottom: 1px solid $--background-primary;
		}

		&__item {
			@include text;
			color: currentColor;
			font-weight: inherit;
			text-align: left;

			&:nth-child(4) {
				color: $--yellow;
			}

			&.delivered {
				color: $--green;
			}

			&.canceled {
				color: $--red;
			}

			&.details {
				color: $--blue;
				cursor: pointer;
				text-align: right;
			}
		}
	}


	@media(hover: hover) {
		.order:hover {
			color: $--text-primary;
			font-weight: 500;
		}
	}
</style>