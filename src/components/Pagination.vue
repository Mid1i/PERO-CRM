<script setup lang="ts">
	import { computed } from "vue";


	const props = defineProps<{
		currentPage: number,
		pages: number
	}>();

	defineEmits<{
		(e: "switchPage", newPage: number): void
	}>();


	const getPages = computed<number[]>(() => {
		if (props.pages < 4) return Array.from({ length: props.pages }, (_, index) => index + 1);
		
		if (props.currentPage < 4) return [1, 2, 3, 4];

		if (props.currentPage > props.pages - 3) return [...Array(4)].map((_, index) => props.pages - 3 + index);

		return [props.currentPage - 1, props.currentPage, props.currentPage + 1];
	});
</script>


<template>
	<div class="pagination">
		<button 
			@click="$emit('switchPage', 1)"
			class="pagination__button"
			:disabled="currentPage === 1"
		>
			<svg class="pagination__button-icon" fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M9.19191 4C9.60007 4 9.88971 4.15371 10.0608 4.46114C10.2326 4.768 10.2042 5.06429 9.97559 5.35L6.17962 10L9.97559 14.65C10.2042 14.9357 10.2326 15.2323 10.0608 15.5397C9.88971 15.8466 9.60007 16 9.19191 16C9.01231 16 8.84904 15.9609 8.7021 15.8826C8.55516 15.8037 8.43271 15.7071 8.33475 15.5929L4.19592 10.4929C4.13061 10.4214 4.08163 10.3429 4.04898 10.2571C4.01633 10.1714 4 10.0857 4 10C4 9.91429 4.01633 9.83229 4.04898 9.754C4.08163 9.67514 4.13061 9.59286 4.19592 9.50714L8.33475 4.40714C8.43271 4.29286 8.55516 4.19629 8.7021 4.11743C8.84904 4.03914 9.01231 4 9.19191 4ZM15.0206 4C15.4287 4 15.7184 4.15371 15.8895 4.46114C16.0612 4.768 16.0328 5.06429 15.8042 5.35L12.0083 10L15.8042 14.65C16.0328 14.9357 16.0612 15.2323 15.8895 15.5397C15.7184 15.8466 15.4287 16 15.0206 16C14.841 16 14.6777 15.9609 14.5308 15.8826C14.3838 15.8037 14.2614 15.7071 14.1634 15.5929L10.0246 10.4929C9.95926 10.4214 9.91028 10.3429 9.87763 10.2571C9.84497 10.1714 9.82865 10.0857 9.82865 10C9.82865 9.91429 9.84497 9.82857 9.87763 9.74286C9.91028 9.65714 9.95926 9.57857 10.0246 9.50714L14.1634 4.40714C14.2614 4.29286 14.3838 4.19629 14.5308 4.11743C14.6777 4.03914 14.841 4 15.0206 4Z" fill="currentColor"/>
			</svg>
		</button>
		<button 
			@click="$emit('switchPage', currentPage - 1)"
			class="pagination__button"
			:disabled="currentPage === 1"
		>
			<svg class="pagination__button-icon" fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M11.8111 15.7625L7.15207 10.4433C7.09677 10.3799 7.0577 10.3113 7.03484 10.2375C7.01161 10.1636 7 10.0844 7 10C7 9.91557 7.01161 9.83641 7.03484 9.76253C7.0577 9.68865 7.09677 9.62005 7.15207 9.55673L11.8111 4.22164C11.9401 4.07388 12.1014 4 12.2949 4C12.4885 4 12.6544 4.07916 12.7926 4.23747C12.9309 4.39578 13 4.58047 13 4.79156C13 5.00264 12.9309 5.18734 12.7926 5.34565L8.72811 10L12.7926 14.6544C12.9217 14.8021 12.9862 14.9841 12.9862 15.2002C12.9862 15.4168 12.9171 15.6042 12.7788 15.7625C12.6406 15.9208 12.4793 16 12.2949 16C12.1106 16 11.9493 15.9208 11.8111 15.7625Z" fill="currentColor"/>
			</svg>
		</button>
		<ul class="pagination__list">
			<li 
				v-for="page in getPages"
				@click="$emit('switchPage', page)"
				:key="page"
				:class="[
					'pagination__list-el',
					currentPage === page && 'active'
				]"
			>
				{{ page }}
			</li>
		</ul>
		<button 
			@click="$emit('switchPage', currentPage + 1)"
			class="pagination__button"
			:disabled="currentPage === pages"
		>
			<svg class="pagination__button-icon" fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M8.18894 4.23747L12.8479 9.55673C12.9032 9.62005 12.9423 9.68865 12.9652 9.76253C12.9884 9.83641 13 9.91557 13 10C13 10.0844 12.9884 10.1636 12.9652 10.2375C12.9423 10.3113 12.9032 10.3799 12.8479 10.4433L8.18894 15.7784C8.05991 15.9261 7.89862 16 7.70507 16C7.51152 16 7.34562 15.9208 7.20737 15.7625C7.06912 15.6042 7 15.4195 7 15.2084C7 14.9974 7.06912 14.8127 7.20737 14.6544L11.2719 10L7.20737 5.34565C7.07834 5.19789 7.01382 5.01594 7.01382 4.79979C7.01382 4.58322 7.08295 4.39578 7.2212 4.23747C7.35945 4.07916 7.52074 4 7.70507 4C7.8894 4 8.05069 4.07916 8.18894 4.23747Z" fill="currentColor"/>
			</svg>
		</button>
		<button 
			@click="$emit('switchPage', pages)"
			class="pagination__button"
			:disabled="currentPage === pages"
		>
			<svg class="pagination__button-icon" fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M10.8081 16C10.3999 16 10.1103 15.8463 9.93919 15.5389C9.76743 15.232 9.79584 14.9357 10.0244 14.65L13.8204 10L10.0244 5.35C9.79584 5.06429 9.76743 4.76771 9.93919 4.46029C10.1103 4.15343 10.3999 4 10.8081 4C10.9877 4 11.151 4.03914 11.2979 4.11743C11.4448 4.19629 11.5673 4.29286 11.6652 4.40714L15.8041 9.50714C15.8694 9.57857 15.9184 9.65714 15.951 9.74286C15.9837 9.82857 16 9.91429 16 10C16 10.0857 15.9837 10.1677 15.951 10.246C15.9184 10.3249 15.8694 10.4071 15.8041 10.4929L11.6652 15.5929C11.5673 15.7071 11.4448 15.8037 11.2979 15.8826C11.151 15.9609 10.9877 16 10.8081 16ZM4.97945 16C4.57128 16 4.28164 15.8463 4.11054 15.5389C3.93878 15.232 3.96719 14.9357 4.19576 14.65L7.99173 10L4.19576 5.35C3.96719 5.06429 3.93878 4.76771 4.11054 4.46029C4.28164 4.15343 4.57128 4 4.97945 4C5.15904 4 5.32231 4.03914 5.46925 4.11743C5.61619 4.19629 5.73864 4.29286 5.8366 4.40714L9.97543 9.50714C10.0407 9.57857 10.0897 9.65714 10.1224 9.74286C10.155 9.82857 10.1714 9.91429 10.1714 10C10.1714 10.0857 10.155 10.1714 10.1224 10.2571C10.0897 10.3429 10.0407 10.4214 9.97543 10.4929L5.8366 15.5929C5.73864 15.7071 5.61619 15.8037 5.46925 15.8826C5.32231 15.9609 5.15904 16 4.97945 16Z" fill="currentColor"/>
			</svg>
		</button>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.pagination {
		align-items: center;
		display: flex;
		gap: 15px;

		&__button path {
			fill: $--text-secondary;
			transition: all 0.1s ease-in-out;
		}

		&__button:disabled {
			pointer-events: none;

			& path {
				fill: $--background-primary;
			}
		}

		&__button:active {
			transform: scale(0.95);
		}

		&__list {
			display: flex;
			justify-content: center;
			gap: 5px;

			width: 120px;

			&-el {
				align-items: center;
				display: flex;
				justify-content: center;

				border-radius: 100%;

				@include text;
				color: $--text-secondary;
				cursor: pointer;

				transition: background 0s, color 0.1s ease-in-out;
				height: 24px;
				width: 24px;

				&.active {
					background: $--blue;
					color: $--white;
				}

				&:active {
					transform: scale(0.95);
				}
			}
		}
	}


	@media(hover: hover) {
		.pagination__list-el:hover:not(.active) {
			color: $--text-primary;
		}

		.pagination__button:hover path {
			fill: $--text-primary;
		}
	}
</style>