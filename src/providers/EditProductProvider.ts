import type { ProductType } from '@/types/types';
import { createProvider } from '@/utils/createProvider';
import { ref } from 'vue';

const initialEditPanelState = false;

const initialEditState = {
	firestoreId: 'abc123',
	id: 'abc123',
	name: 'product name',
	category: {
		name: 'other',
		imgSrc: '/img/category-icons/other.png',
	},
	quantity: -1,
	unit: '',
	isBought: false,
};

const useEditProduct = () => {
	const isEditPanelOpen = ref(initialEditPanelState);
	const editedProduct = ref<ProductType>(initialEditState);

	const openEditPanel = () => (isEditPanelOpen.value = true);
	const closeEditPanel = () => (isEditPanelOpen.value = false);

	const setEditedProduct = (productToEdit: ProductType) => {
		editedProduct.value = {
			firestoreId: productToEdit.firestoreId,
			id: productToEdit.id,
			name: productToEdit.name,
			category: {
				name: productToEdit.userCategory ? productToEdit.userCategory.name : productToEdit.category.name,
				imgSrc: productToEdit.userCategory ? productToEdit.userCategory.imgSrc : productToEdit.category.imgSrc,
			},
			quantity: productToEdit.quantity,
			unit: productToEdit.unit,
			isBought: productToEdit.isBought,
		};
	};

	const setEditedProductValue = <K extends keyof ProductType>(inputName: K, inputValue: ProductType[K]) => {
		editedProduct.value[inputName] = inputValue;
	};

	const setProductsQuantity = (newQuantity: number | string) => {
		editedProduct.value.quantity = Number(newQuantity);
	};

	const changeProductsQuantity = (quantityChanger: 1 | -1) => {
		editedProduct.value.quantity += quantityChanger;
	};

	const setProductsUnit = (newUnit: string) => {
		editedProduct.value.unit = newUnit;
	};

	const setProductsCategory = (newCategoryName: string, newCategoryIcon: string) => {
		editedProduct.value.category.name = newCategoryName;
		editedProduct.value.category.imgSrc = newCategoryIcon;
	};

	return {
		isEditPanelOpen,
		editedProduct,
		openEditPanel,
		closeEditPanel,
		setEditedProduct,
		setEditedProductValue,
		setProductsQuantity,
		changeProductsQuantity,
		setProductsUnit,
		setProductsCategory,
	};
};

export const [useEditProductProvider, useEditProductContext] = createProvider('EditProducts', useEditProduct);
