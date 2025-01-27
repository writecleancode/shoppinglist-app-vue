<script setup lang="ts">
import debounce from 'lodash.debounce';
import { useProductsContext } from '@/providers/ProductsProvider';

const { initialProductState, setSearchInputValue, clearInput, setProductsToAdd, setCustomProduct } = defineProps({
	initialProductState: {
		type: Object,
		required: true,
	},
	searchInputValue: {
		type: String,
		required: true,
	},
	setSearchInputValue: {
		type: Function,
		required: true,
	},
	clearInput: {
		type: Function,
		required: true,
	},
	setProductsToAdd: {
		type: Function,
		required: true,
	},
	setCustomProduct: {
		type: Function,
		required: true,
	},
});
const { productsList } = useProductsContext();

const updateProductsList = debounce((searchPhrase = '') => {
	if (!searchPhrase) return setProductsToAdd(productsList.value);

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

const handleInputChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	setSearchInputValue(target.value);
	updateProductsList(target.value);
	handleCustomProduct(target.value);
};

const handleClearInputButton = () => {
	clearInput();
	setProductsToAdd(productsList.value);
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
		<button
			class="clear-search-input-btn"
			:class="{ active: searchInputValue.length > 0 }"
			@click="handleClearInputButton"
			aria-label="clear input"
			:inert="!searchInputValue">
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
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.15s;

	&:hover {
		opacity: 0.7;
	}

	&.active {
		opacity: 1;
		pointer-events: auto;
	}
}

@media (min-width: 340px) {
	.search-input {
		max-width: none;
	}
}
</style>
