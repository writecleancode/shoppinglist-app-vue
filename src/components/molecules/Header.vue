<script setup lang="ts">
import { useProducts } from '@/composables/useProducts';
import { ref } from 'vue';

const isRemoveButtonVisible = ref(false);
const { removeBoughtProducts } = useProducts();

const handleRemoveButtonState = () => (isRemoveButtonVisible.value = !isRemoveButtonVisible.value);

const handleRemoveBoughtProductsButton = () => {
	removeBoughtProducts();
	isRemoveButtonVisible.value = false;
};
</script>

<template>
	<header class="header">
		<img src="/icons/cart.svg" alt="" class="cart-icon" />
		<h1 class="h1">ShoppingList</h1>
		<button
			class="ellipsis-btn"
			@click="handleRemoveButtonState"
			:aria-label="
				isRemoveButtonVisible ? 'hide &quot;remove bought products&quot; button' : 'show &quot;remove bought products&quot; button'
			">
			<img src="/icons/ellipsis-vertical.svg" alt="" />
		</button>
		<button
			class="remove-bought-products-btn"
			:class="{ active: isRemoveButtonVisible }"
			@click="handleRemoveBoughtProductsButton"
			:tabIndex="isRemoveButtonVisible ? 0 : -1">
			<img src="/icons/trash.svg" alt="" />
			Remove bought products
		</button>
	</header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem;
	background-color: $primary;
	overflow: hidden;
}

.cart-icon {
	width: 2.4rem;
}

.h1 {
	font-size: 2.4rem;
}

.ellipsis-btn {
	position: absolute;
	right: 0;
	padding: 0.8rem;
	border: none;
	background-color: transparent;
}

.remove-bought-products-btn {
	position: absolute;
	right: 3.4rem;
	display: flex;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem 1.6rem;
	background-color: #eee;
	border: none;
	border-radius: 100px;
	color: #f10a0a;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	font-size: 1.5rem;
	translate: 0 145%;
	opacity: 0;
	transition: translate 0.2s ease-in-out, opacity 0.2s;

	&.active {
		translate: 0 0;
		opacity: 1;
	}
}

@media (min-width: 992px) {
	.header {
		padding: 1.2rem;
	}
}
</style>
