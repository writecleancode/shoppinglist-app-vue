<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import QuantityOfProduct from '../atoms/QuantityOfProduct.vue';
import { useProductsContext } from '@/providers/ProductsProvider';

const { products, clearInput, changePorudctsToAddQuantity, changeCustomProductQuantity } = defineProps({
	products: {
		type: Array,
	},
	customProduct: {
		type: Object,
		required: true,
	},
	clearInput: {
		type: Function,
		required: true,
	},
	setProductsToAdd: {
		type: Function,
	},
	changePorudctsToAddQuantity: {
		type: Function,
	},
	changeCustomProductQuantity: {
		type: Function,
		required: true,
	},
});

let timeout;

// setup():
const { updateProductsQuantity } = useProductsContext();
const lastClickedProductId = ref(-1);
const quantityNumber = ref(-1); // used for plus icon rotate animation - to prevent animation after custom product is replaced by another

const cssRotationDegreeValue = computed(() => {
	`${quantityNumber.value * 180}deg`;
});

const handlePlusIconScale = productId => {
	lastClickedProductId.value = productId;
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		lastClickedProductId.value = -1;
	}, 500);
};

const handleCustomProductQuantity = (productId, direction) => {
	const quantityChanger = direction === 'increase' ? 1 : -1;

	handlePlusIconScale(productId);
	quantityNumber.value += quantityChanger;
	changeCustomProductQuantity(quantityChanger);
	clearInput();
};

const handleProductQuantity = (firestoreId: string, productId: number | string, index: number, direction: string) => {
	const quantityChanger = direction === 'increase' ? 1 : -1;

	handlePlusIconScale(productId);
	changePorudctsToAddQuantity(index, quantityChanger);
	clearInput();

	updateProductsQuantity(firestoreId, productId, quantityChanger);
};

watch(() => products, () => {
	products.sort((a, b) => {
		if (a.name.toLowerCase() < b.name.toLowerCase()) {
			return -1;
		} else if (a.name.toLowerCase() > b.name.toLowerCase()) {
			return 1;
		} else {
			return 0;
		}
	});
});
</script>

<template>
	<ul class="products-to-add-list">
		<li v-if="customProduct.name !== ''" class="products-to-add-list-item" :key="-999" id="-999">
			<button
				class="add-product-btn"
				@click="handleCustomProductQuantity(-999, 'increase')"
				:aria-label="`add ${customProduct.name} to the list`">
				<div
					class="plus-icon-wrapper"
					:class="{ added: customProduct.quantity >= 0, animating: -999 === lastClickedProductId }"
					:style="{ rotate: `${customProduct.quantity}deg` }">
					<img src="/icons/plus-big.svg" alt="" />
				</div>
				{{ customProduct.name }}
			</button>
			<QuantityOfProduct :quantity="customProduct.quantity">{{ customProduct.quantity }}</QuantityOfProduct>
			<button
				class="decrease-btn"
				:class="{ active: customProduct.quantity > 0 }"
				@click="handleCustomProductQuantity(-999, 'decrease')"
				:aria-label="`decrease quantity of ${customProduct.name}`"></button>
		</li>
		<li v-for="(product, index) in products" class="products-to-add-list-item" :key="product.id" :id="product.id">
			<button
				class="add-product-btn"
				@click="handleProductQuantity(product.firestoreId, product.id, index, 'increase')"
				:aria-label="`add ${product.name} to the list`">
				<div
					class="plus-icon-wrapper"
					:class="{ added: product.quantity >= 0, animating: product.id === lastClickedProductId }"
					:style="{ rotate: `${product.quantity}deg` }">
					<img src="/icons/plus-big.svg" alt="" />
				</div>
				{{ product.name }}
			</button>
			<QuantityOfProduct :quantity="product.quantity">
				{{ product.quantity }}
				{{ product.quantity > 0 && product.unit }}
			</QuantityOfProduct>
			<button
				class="decrease-btn"
				:class="{ active: product.quantity > 0 }"
				@click="handleProductQuantity(product.firestoreId, product.id, index, 'decrease')"
				:aria-label="`decrease quantity of ${customProduct.name}`"></button>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.products-to-add-list {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 2.4rem 1.6rem;
	background-color: #f5f5f5;
	list-style: none;
	overflow-y: auto;
}

.products-to-add-list-item {
	display: flex;
	align-items: center;
	gap: 0.8rem;
}

.add-product-btn {
	display: flex;
	align-items: center;
	gap: 1.6rem;
	padding: 0.8rem 0;
	border: none;
	width: 100%;
	background-color: transparent;
	color: $lightBlack;
	font-size: 1.6rem;
	text-align: left;
}

.plus-icon-wrapper {
	border: none;
	border-radius: 100px;
	background-color: $grey;
	rotate: v-bind(cssRotationDegreeValue);
	scale: 1;

	transition: rotate 0.5s, scale 0.35s;

	.added {
		background-color: $secondary;
	}

	.animating {
		scale: 0.75;
	}
}

.decrease-btn {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.2rem;
	border: none;
	background-color: transparent;
	translate: 4px;
	visibility: hidden;
	pointer-events: none;

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		width: 18px;
		height: 3px;
		background-color: #e40808;
		border-radius: 100px;
		transition: transform 0.3s;
	}

	&::before {
		transform: rotate(-45deg);
	}

	&::after {
		transform: rotate(45deg);
	}

	&.active {
		visibility: visible;
		pointer-events: auto;

		&::before {
			transform: rotate(0);
		}

		&::after {
			transform: rotate(0);
		}
	}
}
</style>
