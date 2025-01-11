<script setup lang="ts">
import { useProductsContext } from '@/providers/ProductsProvider';

const { shoppingProgress } = useProductsContext();

const shoppingProgressStyleValue = `translate(${shoppingProgress.value}%)`;
</script>

<template>
	<div class="progress-bar-wrapper">
		<span class="progress-bar"></span>
	</div>
</template>

<style lang="scss" scoped>
.progress-bar-wrapper {
	padding: 0.8rem;
	background-color: #fff;
}

.progress-bar {
	display: block;
	position: relative;
	border-radius: 100px;
	min-height: 8px;
	background-color: #d9d9d9;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -100%;
		border-radius: inherit;
		width: 100%;
		background-color: #4be447;
		transform: v-bind(shoppingProgressStyleValue);
		transform-origin: left;
		transition: transform 0.2s ease-in-out;
	}
}
</style>
