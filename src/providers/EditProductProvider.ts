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
	const editedProduct = ref(initialEditState);

	const openEditPanel = () => (isEditPanelOpen.value = true);
	const closeEditPanel = () => (isEditPanelOpen.value = false);

	const setEditedProduct = productToEdit => {
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

	const handleInputChange = (inputName, inputValue) => {
		editedProduct.value[inputName] = inputValue;
	};

	const setProductsQuantity = newQuantity => {
		editedProduct.value.quantity = newQuantity;
	};

	const changeProductsQuantity = quantityChanger => {
		editedProduct.value.quantity += quantityChanger;
	};

	const setProductsUnit = newUnit => {
		editedProduct.value.unit = newUnit;
	};

	const setProductsCategory = (newCategoryName, newCategoryIcon) => {
		editedProduct.value.category.name = newCategoryName;
		editedProduct.value.category.imgSrc = newCategoryIcon;
	};

	return {
		isEditPanelOpen,
		openEditPanel,
		closeEditPanel,
		setEditedProduct,
	};
};

export const [useEditProductProvider, useEditProductContext] = createProvider('EditProducts', useEditProduct);
