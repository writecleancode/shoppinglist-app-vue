<script setup lang="ts">
import ContentOverlay from '@/components/atoms/ContentOverlay.vue';

import { categories } from '@/data/categories';
import { useProductsContext } from '@/providers/ProductsProvider';
import { useEditProductContext } from '@/providers/EditProductProvider';
import { useChangeCategoryContext } from '@/providers/useChangeCategory';

const { updateProductCategory } = useProductsContext();
const { setProductsCategory } = useEditProductContext();
const { isCategoryPanelOpen, highlightedCategory, closeCategoryPanel, categoryChangeProductId } = useChangeCategoryContext();

const handleChangeCategory = clickedCategory => {
	if (categoryChangeProductId) {
		updateProductCategory(categoryChangeProductId, clickedCategory);
	} else {
		setProductsCategory(clickedCategory.name, clickedCategory.imgSrc);
	}

	closeCategoryPanel();
};

const bgColor = category => {
	switch (category) {
		case 'alcohols and tobacco':
			return '#fff0f5';

		case 'first aid kit':
			return '#f8f2fe';

		case 'articles for animals':
			return '#f7f7f7';

		case 'baby articles':
			return '#f5f3fe';

		case 'bulk goods':
			return '#f5f7ec';

		case 'household chemicals':
			return '#ebfaf5';

		case 'cakes, desserts, additives':
			return '#fcf3ec';

		case 'convenience foods':
			return '#ebf9f9';

		case 'hygiene':
			return '#f5f3fe';

		case 'other':
			return '#f7f7f7';

		case 'coffee, tea, cocoa':
			return '#f5f5f5';

		case 'meat and cold cuts':
			return '#f8f2fe';

		case 'frozen foods and ice cream':
			return '#f2f5fe';

		case 'dairy products':
			return '#f8f5ec';

		case 'garden and DIY':
			return '#eef9f5';

		case 'baked goods':
			return '#fcf3ec';

		case 'preserves':
			return '#fcf1f9';

		case 'spices, sauces, additives':
			return '#fff0f5';

		case 'cereals and muesli':
			return '#f5f7ec';

		case 'fish':
			return '#eef7fe';

		case 'household appliances and electronics':
			return '#f4f8fb';

		case 'sweets and snacks':
			return '#f0f6ea';

		case 'fats':
			return '#f5f7ec';

		case 'clothes':
			return '#ecf7ef';

		case 'vegetables and fruits':
			return '#fcf2f1';

		case 'water and drinks':
			return '#eef7fe';

		default:
			return '#f7f7f7';
	}
};
</script>

<template>
	<ContentOverlay class="content-overlay-bright" :class="{ active: isCategoryPanelOpen }" @click="closeCategoryPanel" />
	<div class="change-category-panel-wrapper" :class="{ active: isCategoryPanelOpen }" :inert="!isCategoryPanelOpen">
		<div class="change-category-header">
			<p class="change-category-panel-title">Change category</p>
			<button class="close-panel-btn" @click="closeCategoryPanel" aria-label='close "change category" panel'>
				<img src="/icons/x-circle-white.svg" alt="" />
			</button>
		</div>
		<div class="categories-wrapper">
			<ul class="categories-list">
				<li
					v-for="(category, index) in categories"
					class="categories-list-item"
					:class="{ highlighted: category.name === highlightedCategory }"
					:style="{ backgroundColor: bgColor }"
					@click="handleChangeCategory(category)"
					:key="index">
					<button>
						<img :src="category.imgSrc" alt="" />
						<p>{{ category.name }}</p>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.content-overlay-bright {
	display: none;
	z-index: 2;
	background-color: rgba(255, 255, 255, 0.25);
	transition: opacity 0.2s;

	&.active {
		display: block;
	}
}

.change-category-panel-wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 2;
	translate: -50% -51%;
	border-radius: 8px;
	box-shadow: 0 0 9px rgba(0, 0, 0, 0.45);
	opacity: 0;
	pointer-events: auto;
	overflow: hidden;
	transition: opacity 0.2s, translate 0.2s;

	&.active {
		translate: -50% -50%;
		opacity: 1;
		pointer-events: auto;
	}
}

.change-category-header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.8rem 1.6rem;
	background-color: $secondary;
}

.change-category-panel-title {
	color: #fff;
	font-size: 1.8rem;
}

.close-panel-btn {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.8rem;
	border: none;
	background-color: transparent;

	img {
		width: 2.7rem;
		height: 2.7rem;
	}
}

.categories-wrapper {
	padding: 1.6rem;
	background-color: #fff;
	max-height: calc(100vh - 104px);
	overflow: auto;
}

.categories-list {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	list-style: none;
}

.category-list-item {
	display: flex;
	align-items: center;
	gap: 1.6rem;
	padding: 0.8rem;
	padding-right: 1.6rem;
	border: none;
	border-radius: 100px;
	min-width: max-content;
	width: 100%;
	background-color: transparent;
	color: #717171;
	font-size: 1.4rem;
	text-transform: uppercase;

	img {
		width: 2.4rem;
		height: 2.4rem;
	}

	&.highlighted {
		box-shadow: 0px 0px 4px inset rgba(0, 0, 0, 0.03);
	}
}

@media (min-width: 680px) {
	.categories-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 4rem;
	}
}
</style>
