<script setup lang="ts">
defineProps({
	quantity: {
		type: Number,
		required: true,
	},
});
</script>

<template>
	<div class="quantity-of-product" :class="{ visible: quantity > 0 }">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.quantity-of-product {
	padding-left: 0.8rem;
	color: $lightBlack;
	font-size: 1.6rem;
	visibility: hidden;

	&.visible {
		visibility: visible;
	}
}
</style>
