<script setup lang="ts">
import ProductListItem from '@/components/molecules/ProductListItem.vue';

defineProps({
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
