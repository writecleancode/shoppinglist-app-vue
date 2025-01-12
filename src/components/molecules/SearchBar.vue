<script setup lang="ts">
import debounce from 'lodash.debounce';
import { useProductsContext } from '@/providers/ProductsProvider';

const { initialProductState, setSearchInputValue, clearInput, setProductsToAdd, setCustomProduct } = defineProps({
	initialProductState: {
		type: Object,
	},
	searchInputValue: {
		type: String,
	},
	setSearchInputValue: {
		type: Function,
	},
	clearInput: {
		type: Function,
	},
	setProductsToAdd: {
		type: Function,
	},
	setCustomProduct: {
		type: Function,
	},
});
const { productsList } = useProductsContext();

const updateProductsList = debounce((searchPhrase = '') => {
	if (!searchPhrase) return setProductsToAdd(productsList);

	const matchingProducts = productsList.value.filter(product => product.name.toLowerCase().includes(searchPhrase.toLowerCase()));
	setProductsToAdd(matchingProducts);
}, 500);

const handleCustomProduct = debounce((searchPhrase = '') => {
	if (!searchPhrase || productsList.value.map(product => product.name).includes(searchPhrase)) return setCustomProduct(initialProductState);

	setCustomProduct({
		...initialProductState,
		name: searchPhrase,
	});
}, 500);

const handleInputChange = e => {
	setSearchInputValue(e.target.value);
	updateProductsList(e.target.value);
	handleCustomProduct(e.target.value);
};

const handleClearInputButton = () => {
	clearInput();
	setProductsToAdd(productsList);
};
</script>

<template>
	<div class="search-bar-wrapper">
		<input
			class="search-input"
			name="searchInput"
			placeholder="add new item"
			type="text"
			:value="searchInputValue"
			@input="handleInputChange" />
		<button class="clear-search-input-btn" @click="handleClearInputButton;" aria-label="clear input">
			<img src="/icons/x-circle.svg" alt="" />
		</button>
	</div>
</template>

<style lang="scss" scoped>
.search-bar-wrapper {
	position: relative;
}

.search-input {
	padding: 0.8rem 1.6rem;
	padding-right: 3.6rem;
	border: none;
	border-radius: 100px;
	color: inherit;
	font-size: 1.6rem;
	max-width: 220px;
}

.clear-search-input-btn {
	position: absolute;
	top: 50%;
	right: 0;
	translate: 0 -50%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.7rem;
	border: none;
	width: 24px;
	height: 24px;
	background-color: transparent;
	transition: opacity 0.15s;

	&:hover {
		opacity: 0.7;
	}
}

@media (min-width: 340px) {
	.search-input {
		max-width: none;
	}
}
</style>
