<script setup lang="ts">
import ContentOverlay from '@/components/atoms/ContentOverlay.vue';
import CategoryIcon from '@/components/atoms/CategoryIcon.vue';

import type { ProductType } from '@/types/types';
import { useChangeCategoryContext } from '@/providers/useChangeCategory';
import { useEditProductContext } from '@/providers/EditProductProvider';
import { useProductsContext } from '@/providers/ProductsProvider';

const { updateProductsList } = useProductsContext();
const {
	isEditPanelOpen,
	editedProduct,
	closeEditPanel,
	setEditedProductValue,
	setProductsQuantity,
	changeProductsQuantity,
	setProductsUnit,
} = useEditProductContext();
const { isCategoryPanelOpen, openCategoryPanel } = useChangeCategoryContext();

const handleInputChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	setEditedProductValue(target.name as keyof ProductType, target.value);
};

const handleQuantityChange = (e: Event) => {
	setProductsQuantity((e.target as HTMLInputElement).value);
};

const handleUnitButtons = (unit: string) => {
	setProductsUnit(unit);
};

const handleQuantityButtons = (direction: string) => {
	const quantityChanger = direction === 'increase' ? 1 : -1;
	changeProductsQuantity(quantityChanger);
};

const handleSaveChangesButton = () => {
	updateProductsList(editedProduct.value);
	closeEditPanel();
};
</script>

<template>
	<ContentOverlay :isActive="isEditPanelOpen" @click="closeEditPanel" />
	<div id="editPanel" class="edit-panel-wrapper" :class="{ active: isEditPanelOpen }" :inert="!isEditPanelOpen && isCategoryPanelOpen">
		<div class="control-changes-buttons-wrapper">
			<button class="control-changes-btn abort" @click="closeEditPanel">
				<img src="/icons/arrow-left-small.svg" alt="" />
				abort
			</button>
			<button class="control-changes-btn save-changes" @click="handleSaveChangesButton">
				<img src="/icons/check-small.svg" alt="" />
				save
			</button>
		</div>
		<div class="main-info-wrapper">
			<input type="text" class="styled-input product-name-input" name="name" :value="editedProduct.name" @input="handleInputChange" />
			<button class="category-btn" aria-label="change product category" @click="openCategoryPanel(editedProduct.category.name)">
				<CategoryIcon class="category-icon-circle" :category="editedProduct.category.name" :isBought="false">
					<img :src="editedProduct.category.imgSrc" :alt="`icon of category: ${editedProduct.category.imgSrc}`" />
				</CategoryIcon>
				<span>{{ editedProduct.category.name }}</span>
				<img src="/icons/chevron-right.svg" alt="" class="chevron-right-icon" />
			</button>
		</div>
		<div class="quantity-wrapper">
			<input
				type="number"
				class="styled-input quantity-input"
				name="quantity"
				placeholder="quantity"
				min="0"
				max="9999999"
				:value="editedProduct.quantity > 0 ? editedProduct.quantity : ''"
				@input="handleQuantityChange" />
			<input
				type="text"
				class="styled-input unit-input"
				name="unit"
				placeholder="unit"
				maxLength="10"
				:value="editedProduct.unit"
				@input="handleInputChange" />
			<div class="unit-buttons-wrapper">
				<button
					class="unit-btn"
					:class="{ 'current-unit': editedProduct.unit === 'l' }"
					@click="handleUnitButtons('l')"
					aria-label="set unit: l">
					l
				</button>
				<button
					class="unit-btn"
					:class="{ 'current-unit': editedProduct.unit === 'ml' }"
					@click="handleUnitButtons('ml')"
					aria-label="set unit: ml">
					ml
				</button>
				<button
					class="unit-btn"
					:class="{ 'current-unit': editedProduct.unit === 'kg' }"
					@click="handleUnitButtons('kg')"
					aria-label="set unit: kg">
					kg
				</button>
				<button
					class="unit-btn"
					:class="{ 'current-unit': editedProduct.unit === 'g' }"
					@click="handleUnitButtons('g')"
					aria-label="set unit: g">
					g
				</button>
			</div>
			<div class="quantity-buttons-wrapper">
				<button
					class="change-quantity-btn"
					@click="handleQuantityButtons('decrease')"
					:disabled="editedProduct.quantity <= 0"
					:aria-label="`decrease quantity of ${editedProduct.name}`">
					<img src="/icons/minus.svg" alt="" />
				</button>
				<button
					class="change-quantity-btn"
					@click="handleQuantityButtons('increase')"
					:disabled="editedProduct.quantity >= 9999999"
					:aria-label="`increase quantity of ${editedProduct.name}`">
					<img src="/icons/plus.svg" alt="" />
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.edit-panel-wrapper {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	padding: 1.2rem 0.8rem 1.6rem;
	border-top-left-radius: 24px;
	border-top-right-radius: 24px;
	width: 100%;
	background-color: #fff;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.18);
	translate: 0 104%;
	pointer-events: none;
	transition: translate 0.3s;

	&:focus {
		outline: none;
	}

	&.active {
		translate: 0 0;
		pointer-events: auto;
	}
}

.control-changes-buttons-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.6rem;
}

.control-changes-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem 1.6rem;
	border-radius: 100px;
	background-color: #fff;
	font-size: 1.4rem;
	text-transform: uppercase;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

	img {
		margin-left: -10px;
		translate: 0 1px;
	}

	&.abort {
		border: 3px solid #f55a5a;
	}

	&.save-changes {
		border: 3px solid #56b93c;
	}
}

.main-info-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
}

.styled-input {
	margin-top: auto;
	margin-bottom: auto;
	padding: 0.8rem;
	border: none;
	border-radius: 8px;
	background-color: #f0f0f0;
	font-size: 1.4rem;
	width: 100%;

	&:focus {
		outline-color: $secondary;
	}

	&.product-name-input {
		font-size: 1.6rem;
		color: #222;
	}

	&.quantity-input {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
	}

	&.unit-input {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
	}
}

.category-btn {
	display: flex;
	align-items: center;
	gap: 1.6rem;
	border: none;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	border-bottom-left-radius: 20px;
	border-top-left-radius: 20px;
	width: 100%;
	background-color: #fff;
	background-color: transparent;
	font-size: 1.6rem;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

	span {
		translate: 0 -0.1rem;
	}
}

.category-icon-circle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
}

.chevron-right-icon {
	margin-left: auto;
}

.quantity-wrapper {
	display: grid;
	grid-template-rows: repeat(2, auto);
	grid-template-columns: repeat(3, auto);
	gap: 0.8rem;
}

.unit-buttons-wrapper {
	grid-row: 2 / 3;
	grid-column: 1 / 4;
	display: flex;
	justify-content: center;
	gap: 0.8rem;
}

.unit-btn {
	padding: 0.4rem 0.8rem;
	border: none;
	border-radius: 8px;
	background-color: #fafafa;
	background-color: #fff;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	font-size: 1.2rem;

	.current-unit {
		background-color: #d4e8ff;
	}
}

.quantity-buttons-wrapper {
	grid-row: 1 / 2;
	grid-column: 3 / 4;
	display: flex;
	justify-content: flex-end;
	margin: 0 -0.4rem;
}

.change-quantity-btn {
	padding: 0.4rem;
	border: none;
	border-radius: 50%;
	background-color: transparent;

	img {
		padding: 0.4rem;
		border-radius: 50%;
		background-color: $secondary;
	}

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.8;

		img {
			background-color: $grey;
		}
	}
}

@media (min-width: 380px) {
	.edit-panel-wrapper {
		padding: 1.6rem;
	}
}

@media (min-width: 500px) {
	.styled-input {
		&.quantity-input {
			width: max-content;
		}

		&.unit-input {
			max-width: max-content;
		}
	}

	.quantity-wrapper {
		display: flex;
		align-items: center;
	}
}

@media (min-width: 520px) {
	.quantity-buttons-wrapper {
		margin-left: auto;
	}
}

@media (min-width: 540px) {
	.main-info-wrapper {
		flex-direction: row;
		align-items: center;
	}

	.styled-input {
		&.quantity-input {
			margin-right: 0.8rem;
		}
	}

	.category-btn {
		min-width: 280px;
		max-width: 280px;
	}
}
</style>
