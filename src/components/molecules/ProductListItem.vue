<script setup lang="ts">
import StatusButton from '@/components/atoms/StatusButton.vue';
import QuantityOfProduct from '@/components/atoms/QuantityOfProduct.vue';
import CategoryIcon from '@/components/atoms/CategoryIcon.vue';

import type { ProductType } from '@/types/types';
import { ref, type PropType } from 'vue';
import { useProductsContext } from '@/providers/ProductsProvider';
import { useEditProductContext } from '@/providers/EditProductProvider';
import { useChangeCategoryContext } from '@/providers/useChangeCategory';

const { product } = defineProps({
	product: {
		type: Object as PropType<ProductType>,
		required: true,
	},
});

const clickedProductId = ref<string | number>(-1);
const { handleBoughtStatus } = useProductsContext();
const { openEditPanel, setEditedProduct } = useEditProductContext();
const { openCategoryPanel } = useChangeCategoryContext();

const handleBoughtStatusButton = (firestoreId: string, productId: number | string, isBought: boolean) => {
	clickedProductId.value = productId;
	handleBoughtStatus(firestoreId, productId, isBought);
};

const handleProductClick = () => {
	setEditedProduct(product);
	openEditPanel();
};
</script>

<template>
	<li class="product-list-item" :class="{ bought: product.isBought }">
		<StatusButton
			:isBought="product.isBought"
			:animationType="product.id === clickedProductId ? (product.isBought ? 'uncheck-animation' : 'check-animation') : 'no-animation'"
			@click="handleBoughtStatusButton(product.firestoreId, product.id, product.isBought)" />
		<button class="product-name-btn" :aria-label="`${product.name} (click to edit product details)`" @click="handleProductClick">
			{{ product.name }}
		</button>
		<QuantityOfProduct :quantity="product.quantity">
			{{ product.quantity }}{{ product.quantity > 0 ? product.unit : '' }}
		</QuantityOfProduct>
		<CategoryIcon
			:category="product.userCategory ? product.userCategory.name : product.category.name"
			:isBought="product.isBought"
			:aria-label="`product category: ${
				product.userCategory ? product.userCategory.name : product.category.name
			} (click to change product category)`"
			@click="openCategoryPanel(product.userCategory ? product.userCategory.name : product.category.name, product.id, product.firestoreId)">
			<img :src="product.userCategory ? product.userCategory.imgSrc : product.category.imgSrc" alt="" />
		</CategoryIcon>
	</li>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.product-list-item {
	display: flex;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem;
	padding-left: 0;
	border-bottom: 1px solid #ececec;

	&.bought {
		border-bottom: none;
		color: $lightBlack;
	}
}

.product-name-btn {
	display: inline-block;
	flex-grow: 10;
	padding: 0.8rem 0;
	border: none;
	background-color: transparent;
	font-size: inherit;
	text-align: left;
}

@media (min-width: 380px) {
	.product-list-item {
		padding-left: 0.8rem;
		padding-right: 1.6rem;
	}
}
</style>
