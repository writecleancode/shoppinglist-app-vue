<script setup lang="ts">
import ProductListItem from './ProductListItem.vue';

const props = defineProps({
	productsList: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<ul class="products-to-buy-list">
		<template v-for="product in productsList">
			<ProductListItem v-if="product.quantity >= 0 && !product.isBought" :key="product.id" :product />
		</template>
	</ul>
</template>

<style lang="scss" scoped>
.products-to-buy-list {
	background-color: #fff;
	box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.18);
	list-style: none;
}
</style>
