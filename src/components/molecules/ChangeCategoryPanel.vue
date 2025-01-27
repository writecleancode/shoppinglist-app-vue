<script setup lang="ts">
import ContentOverlay from '@/components/atoms/ContentOverlay.vue';

import { categories } from '@/data/categories';
import { useProductsContext } from '@/providers/ProductsProvider';
import { useEditProductContext } from '@/providers/EditProductProvider';
import { useChangeCategoryContext } from '@/providers/useChangeCategory';

const { updateProductCategory } = useProductsContext();
const { setProductsCategory } = useEditProductContext();
const { isCategoryPanelOpen, highlightedCategory, categoryChangeProductId, closeCategoryPanel } = useChangeCategoryContext();

const handleChangeCategory = (clickedCategory: { name: string; imgSrc: string }) => {
	if (categoryChangeProductId) {
		updateProductCategory(categoryChangeProductId.value, clickedCategory);
	} else {
		setProductsCategory(clickedCategory.name, clickedCategory.imgSrc);
	}

	closeCategoryPanel();
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
					:data-category="category.name"
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

.categories-list-item {
	button {
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
	}

	img {
		width: 2.4rem;
		height: 2.4rem;
	}

	&.highlighted {
		button {
			box-shadow: 0px 0px 4px inset rgba(0, 0, 0, 0.03);
			background-color: #f7f7f7;
		}

		&[data-category='alcohols and tobacco'] {
			button {
				background-color: #fff0f5;
			}
		}

		&[data-category='first aid kit'] {
			button {
				background-color: #f8f2fe;
			}
		}

		&[data-category='articles for animals'] {
			button {
				background-color: #f7f7f7;
			}
		}

		&[data-category='baby articles'] {
			button {
				background-color: #f5f3fe;
			}
		}

		&[data-category='bulk goods'] {
			button {
				background-color: #f5f7ec;
			}
		}

		&[data-category='household chemicals'] {
			button {
				background-color: #ebfaf5;
			}
		}

		&[data-category='cakes, desserts, additives'] {
			button {
				background-color: #fcf3ec;
			}
		}

		&[data-category='convenience foods'] {
			button {
				background-color: #ebf9f9;
			}
		}

		&[data-category='hygiene'] {
			button {
				background-color: #f5f3fe;
			}
		}

		&[data-category='other'] {
			button {
				background-color: #f7f7f7;
			}
		}

		&[data-category='coffee, tea, coco'] {
			button {
				background-color: #f5f5f5;
			}
		}

		&[data-category='meat and cold cut'] {
			button {
				background-color: #f8f2fe;
			}
		}

		&[data-category='frozen foods and ice cream'] {
			button {
				background-color: #f2f5fe;
			}
		}

		&[data-category='dairy product'] {
			button {
				background-color: #f8f5ec;
			}
		}

		&[data-category='garden and DI'] {
			button {
				background-color: #eef9f5;
			}
		}

		&[data-category='baked goods'] {
			button {
				background-color: #fcf3ec;
			}
		}

		&[data-category='preserves'] {
			button {
				background-color: #fcf1f9;
			}
		}

		&[data-category='spices, sauces, additives'] {
			button {
				background-color: #fff0f5;
			}
		}

		&[data-category='cereals and muesli'] {
			button {
				background-color: #f5f7ec;
			}
		}

		&[data-category='fish'] {
			button {
				background-color: #eef7fe;
			}
		}

		&[data-category='household appliances and electronics'] {
			button {
				background-color: #f4f8fb;
			}
		}

		&[data-category='sweets and snack'] {
			button {
				background-color: #f0f6ea;
			}
		}

		&[data-category='fats'] {
			button {
				background-color: #f5f7ec;
			}
		}

		&[data-category='clothes'] {
			button {
				background-color: #ecf7ef;
			}
		}

		&[data-category='vegetables and fruit'] {
			button {
				background-color: #fcf2f1;
			}
		}

		&[data-category='water and drinks'] {
			button {
				background-color: #eef7fe;
			}
		}
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
