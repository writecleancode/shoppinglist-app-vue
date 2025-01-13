<script setup lang="ts">
const props = defineProps({
	isAcitve: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div class="content-overlay" :class="{ active: isAcitve }">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.content-overlay {
	position: absolute;
	inset: 0;
	z-index: 1;
	width: 100%;
	min-height: 100%;
	background-color: rgba(0, 0, 0, 0.25);
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s;

	.active {
		opacity: 1;
		pointer-events: auto;
	}
}
</style>
