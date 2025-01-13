<script setup lang="ts">
import ProductsToBuy from '@/components/molecules/ProductsToBuy.vue';
import BoughtProducts from '@/components/molecules/BoughtProducts.vue';

const { productsList } = defineProps({
	isInert: {
		type: Boolean,
		required: true,
	},
	productsList: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="products-list-wrapper" :inert="isInert">
		<ProductsToBuy :productsList />
		<BoughtProducts :productsList />
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.products-list-wrapper {
	padding-bottom: 7rem;
	background-color: $lightGrey;
	overflow-y: auto;
}

@media (min-width: 576px) {
	.products-list-wrapper {
		font-size: 1.8rem;
	}
}
</style>
