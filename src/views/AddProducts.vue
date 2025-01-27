<script setup lang="ts">
import SearchBar from '@/components/molecules/SearchBar.vue';
import ProductsToAdd from '@/components/organisms/ProductsToAdd.vue';

import type { CustomProductType, ProductType } from '@/types/types';
import { ref, watch } from 'vue';
import { useProductsContext } from '@/providers/ProductsProvider';

const { isActive, hideAddProductView } = defineProps({
	isActive: {
		type: Boolean,
		required: true,
	},
	hideAddProductView: {
		type: Function,
		required: true,
	},
});

const initialProductState = {
	name: '',
	category: {
		name: 'other',
		imgSrc: '/img/category-icons/other.png',
	},
	quantity: -1,
	unit: '',
	isBought: false,
};

// setup():
const { defaultProducts, updateCustomProductsQuantity } = useProductsContext();
const productsToAdd = ref(defaultProducts.value);
const customProduct = ref(initialProductState);
const searchInputValue = ref('');

const handleBackButton = () => {
	hideAddProductView();
	customProduct.value = initialProductState;
};

const setSearchInputValue = (inputValue: string) => (searchInputValue.value = inputValue);

const clearInput = () => (searchInputValue.value = '');

const setProductsToAdd = (productsToSet: ProductType[]) => (productsToAdd.value = productsToSet);

const changePorudctsToAddQuantity = (index: number, quantityChanger: 1 | -1) => {
	productsToAdd.value[index].quantity += quantityChanger;
	productsToAdd.value[index].unit = productsToAdd.value[index].quantity + quantityChanger < 0 ? '' : productsToAdd.value[index].unit;
};

const setCustomProduct = (productToSet: CustomProductType) => (customProduct.value = productToSet);

const changeCustomProductQuantity = (quantityChanger: 1 | -1) => (customProduct.value.quantity += quantityChanger);

watch(
	() => isActive,
	() => {
		isActive ? setProductsToAdd(defaultProducts.value) : clearInput();
	}
);

watch(
	() => customProduct.value.quantity,
	() => {
		updateCustomProductsQuantity(customProduct.value);
	}
);
</script>

<template>
	<div class="add-product-wrapper" :class="{ active: isActive }" :inert="!isActive">
		<div>
			<div class="search-wrapper">
				<button class="back-btn" @click="handleBackButton" aria-label="go back to the list of products to buy">
					<img src="/icons/arrow-left.svg" alt="" />
				</button>
				<SearchBar :initialProductState :searchInputValue :setSearchInputValue :clearInput :setProductsToAdd :setCustomProduct />
			</div>
		</div>
		<ProductsToAdd
			:products="productsToAdd"
			:customProduct
			:clearInput
			:setProductsToAdd
			:changePorudctsToAddQuantity
			:changeCustomProductQuantity />
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.add-product-wrapper {
	position: absolute;
	inset: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	height: 100vh;
	height: 100dvh;
	background-color: #f5f5f5;
	translate: 70%;
	opacity: 0;
	pointer-events: none;
	transition: translate 0.3s, opacity 0.3s;

	&.active {
		translate: 0%;
		opacity: 1;
		pointer-events: auto;
	}
}

.search-wrapper {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	gap: 1.6rem;
	padding: 1.6rem;
	background-color: $secondary;
}

.back-btn {
	padding: 0 0.6rem;
	border: none;
	border-radius: 100px;
	max-width: max-content;
	background-color: #fff;

	img {
		width: 3.2rem;
		transition: translate 0.25s;
	}

	&:hover {
		img {
			translate: -3px;
		}
	}
}

@media (min-width: 576px) {
	.back-btn {
		padding: 0 1rem;

		&:hover {
			img {
				translate: -4px;
			}
		}
	}
}

@media (min-width: 992px) and (min-height: 880px) {
	.add-product-wrapper {
		border-radius: 24px;
		height: 100%;
		max-height: 880px;
	}
}
</style>
