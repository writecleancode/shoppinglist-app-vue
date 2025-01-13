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
	<ul>
		<template v-for="product in productsList">
			<ProductListItem v-if="product.quantity >= 0 && product.isBought" :key="product.id" :product />
		</template>
	</ul>
</template>