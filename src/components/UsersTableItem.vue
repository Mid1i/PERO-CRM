<script setup lang="ts">
	import type { IUser } from "@/interfaces/IUser";
	import { onFormatPhone } from "@/helpers/formatters";
	
	
	defineProps<IUser>();
</script>


<template>
	<tr class="item">
		<td class="item__cell">{{ login }}</td>
		<td class="item__cell">{{ email }}</td>
		<td class="item__cell">{{ onFormatPhone(phone) }}</td>
		<td class="item__cell">{{ country }}</td>
		<td class="item__cell">{{ dateOfBirth }}</td>
		<td class="item__cell">{{ dateOfRegistration }}</td>
	</tr>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.item {
		border-bottom: 1px solid $--background-primary;
		
		&:last-child {
			border-bottom: 1px solid transparent;
		}

		&__cell {
			@include text;
			color: $--text-secondary;
			padding: 25px 0px;
		}
	}


	@media(hover: hover) {
		.item:hover .item__cell {
			color: $--text-primary;
		}
	}
</style>