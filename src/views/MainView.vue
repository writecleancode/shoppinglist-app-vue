<script setup lang="ts">
import Header from '@/components/molecules/Header.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import LoadingGif from '@/components/atoms/LoadingGif.vue';
import ProductsList from '@/components/organisms/ProductsList.vue';
import AddButton from '@/components/atoms/AddButton.vue';
import AddProducts from '@/views/AddProducts.vue';
import EmptyShoppingList from '@/components/molecules/EmptyShoppingList.vue';
import EditPanel from '@/components/molecules/EditPanel.vue';
import ChangeCategoryPanel from '@/components/molecules/ChangeCategoryPanel.vue';

import type { ProductType } from '@/types/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { onMounted, ref, watch } from 'vue';
import { useProductsContext } from '@/providers/ProductsProvider';
import { useEditProductContext } from '@/providers/EditProductProvider';
import { useChangeCategoryContext } from '@/providers/useChangeCategory';

const isAddProductActive = ref(false);
const {
	defaultProducts,
	customProducts,
	productsList,
	setDefaultProducts,
	setCustomProducts,
	setProductsList,
	sortProducts,
	countShoppingProgress,
} = useProductsContext();
const { isEditPanelOpen, closeEditPanel } = useEditProductContext();
const { isCategoryPanelOpen, closeCategoryPanel } = useChangeCategoryContext();

const showAddProductView = () => (isAddProductActive.value = true);
const hideAddProductView = () => (isAddProductActive.value = false);

const handleClosePanels = (e: KeyboardEvent) => {
	if (e.key !== 'Escape') return;

	if (isCategoryPanelOpen.value) {
		closeCategoryPanel();
		return;
	}

	closeEditPanel();
};

onMounted(() => {
	const productsQuery = query(collection(db, 'defaultProducts'));
	const unsub = onSnapshot(productsQuery, productsSnapshot => {
		const productsList = productsSnapshot.docs.map(
			product =>
				({
					firestoreId: product.id,
					...product.data(),
				} as ProductType)
		);
		setDefaultProducts(productsList);
	});

	return () => unsub();
});

onMounted(() => {
	const productsQuery = query(collection(db, 'customProducts'));
	const unsub = onSnapshot(productsQuery, productsSnapshot => {
		const productsList = productsSnapshot.docs.map(
			product =>
				({
					firestoreId: product.id,
					...product.data(),
				} as ProductType)
		);
		productsList.length ? setCustomProducts(productsList) : setCustomProducts([]);
	});

	return () => unsub();
});

onMounted(() => {
	countShoppingProgress();
});

watch([defaultProducts, customProducts], () => {
	setProductsList([...defaultProducts.value, ...customProducts.value]);
	sortProducts();
});

watch(productsList, () => {
	countShoppingProgress();
});

watch([isEditPanelOpen, isCategoryPanelOpen], () => {
	window.addEventListener('keydown', handleClosePanels);

	return () => window.removeEventListener('keydown', handleClosePanels);
});
</script>

<template>
	<div class="main-view-wrapper">
		<div :inert="isAddProductActive || isEditPanelOpen || isCategoryPanelOpen">
			<Header />
			<ProgressBar />
		</div>
		<LoadingGif v-if="!productsList.length" />
		<template v-else>
			<ProductsList
				v-if="productsList.some(product => product.quantity >= 0)"
				:productsList
				:isInert="isAddProductActive || isEditPanelOpen || isCategoryPanelOpen" />
			<EmptyShoppingList v-else />
		</template>
		<AddButton @click="showAddProductView" :inert="isAddProductActive || isEditPanelOpen || isCategoryPanelOpen" />
		<AddProducts :isActive="isAddProductActive" :hideAddProductView />
		<EditPanel />
		<ChangeCategoryPanel />
	</div>
</template>

<style lang="scss" scoped>
.main-view-wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	height: 100dvh;
}

@media (min-width: 720px) {
	.main-view-wrapper {
		flex-grow: 1;
		box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.12);
	}
}

@media (min-width: 720px) and (orientation: landscape) {
	.main-view-wrapper {
		box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.12);
		overflow: hidden;
		overflow: clip;
	}
}

@media (min-width: 992px) {
	.main-view-wrapper {
		max-width: 720px;
	}
}

@media (min-width: 992px) and (min-height: 880px) {
	.main-view-wrapper {
		border-radius: 24px;
		height: 100%;
		max-height: 880px;
	}
}
</style>
