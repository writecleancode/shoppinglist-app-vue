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

export const actionTypes = {
	setEditedProduct: 'SET CLIKED PRODUCT AS EDITED PRODUCT',
	inputChange: 'INPUT CHANGE',
	quantityChange: 'QUANTITY CHANGE',
	quantityButtonChange: 'QUANTITY CHANGE BY BUTTONS',
	unitButtonsChange: 'UNIT CHANGE BY BUTTONS',
	updateCategory: 'UPDATE CATEGORY',
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.setEditedProduct:
			return {
				firestoreId: action.firestoreId,
				id: action.id,
				name: action.name,
				category: {
					name: action.userCategory ? action.userCategory.name : action.category.name,
					imgSrc: action.userCategory ? action.userCategory.imgSrc : action.category.imgSrc,
				},
				quantity: action.quantity,
				unit: action.unit,
				isBought: action.isBought,
			};

		case actionTypes.inputChange: {
			return {
				...state,
				[action.key]: action.value,
			};
		}

		case actionTypes.quantityChange: {
			return {
				...state,
				quantity: Number(action.value),
			};
		}

		case actionTypes.quantityButtonChange:
			return {
				...state,
				quantity: state.quantity + action.quantityChanger,
			};

		case actionTypes.unitButtonsChange:
			return {
				...state,
				unit: action.unit,
			};

		case actionTypes.updateCategory: {
			return {
				...state,
				category: {
					name: action.categoryName,
					imgSrc: action.categoryImgSrc,
				},
			};
		}

		default:
			return state;
	}
};

export const useEditProduct = () => {
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
		closeEditPanel,
	};
};
