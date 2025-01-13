<script setup lang="ts"></script>

<template>
	<button class="add-products-btn" aria-label="add products">
		<img src="/icons/plus.svg" alt="" />
		Add
	</button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.add-products-btn {
	position: absolute;
	bottom: 1.6rem;
	right: 1.6rem;
	display: flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.8rem 1.6rem 0.8rem 0.8rem;
	border: none;
	border-radius: 100px;
	background-color: $secondary;
	color: #fff;
	box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.25);
	font-size: 1.6rem;
	text-transform: uppercase;
}

@media (min-width: 576px) {
	.add-products-btn {
		font-size: 1.8rem;
	}
}
</style>
