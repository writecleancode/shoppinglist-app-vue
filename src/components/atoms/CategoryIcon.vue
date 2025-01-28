<script setup lang="ts">
const { category } = defineProps({
	category: {
		type: String,
		required: true,
	},
	isBought: {
		type: Boolean,
		required: true,
	},
});
</script>

<template>
	<button class="category-icon-wrapper" :class="{ bought: isBought }" :data-category="category">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/category-bgcolors' as *;

.category-icon-wrapper {
	margin-left: 0.8rem;
	border: none;
	border-radius: 100px;
	width: 3.2rem;
	height: 3.2rem;
	background-color: #f7f7f7;
	box-shadow: 0px 0px 4px inset rgba(0, 0, 0, 0.05);

	@each $category, $color in $category-bgcolors {
		&[data-category='#{$category}'] {
			background-color: $color;
		}
	}

	&.bought {
		background-color: transparent;
		box-shadow: none;
		filter: grayscale(85%);
	}

	::v-deep(img) {
		width: 24px;
		height: 24px;
	}
}
</style>
