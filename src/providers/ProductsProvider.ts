import type { CustomProductType, ProductType } from '@/types/types';
import { collection, deleteDoc, deleteField, doc, getDoc, getDocs, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { v4 as uuid } from 'uuid';
import { ref, watch } from 'vue';
import { createProvider } from '@/utils/createProvider';
import { useSort } from '@/hooks/useSort';

const useProducts = () => {
	const defaultProducts = ref<ProductType[]>([]);
	const customProducts = ref<ProductType[]>([]);
	const productsList = ref<ProductType[]>([]);
	const shoppingProgress = ref(0);

	const setDefaultProducts = (productsToSet: ProductType[]) => (defaultProducts.value = productsToSet);

	const setCustomProducts = (productsToSet: ProductType[]) => (customProducts.value = productsToSet);

	const setProductsList = (productsToSet: ProductType[]) => (productsList.value = productsToSet);

	const sortProducts = (productsToSort = productsList.value) => {
		productsList.value = useSort(productsToSort);
	};

	const countShoppingProgress = () => {
		let productToBuy = 0;
		let boughtProducts = 0;

		for (let i = 0; i < productsList.value.length; i++) {
			if (productsList.value[i].quantity >= 0) productToBuy++;
		}

		for (let i = 0; i < productsList.value.length; i++) {
			if (productsList.value[i].quantity >= 0 && productsList.value[i].isBought === true) {
				boughtProducts++;
			}
		}

		const boughtProductsPercentage = Math.round((boughtProducts / productToBuy) * 100);

		shoppingProgress.value = boughtProductsPercentage;
	};

	const handleBoughtStatus = (firestoreId: string, productId: number | string, isBought: boolean) => {
		const timeoutValue = isBought ? 400 : 650;

		const dataToUpdatedPath = typeof productId === 'number' ? 'defaultProducts' : 'customProducts';

		setTimeout(async () => {
			const productRef = doc(db, dataToUpdatedPath, firestoreId);
			try {
				const product = (await getDoc(productRef)).data()!;
				try {
					await updateDoc(productRef, {
						isBought: !product.isBought,
					});
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		}, timeoutValue);
	};

	const removeBoughtProducts = () => {
		customProducts.value.forEach(async product => {
			if (!product.isBought) return;

			try {
				await deleteDoc(doc(db, 'customProducts', product.firestoreId));
			} catch (error) {
				console.log(error);
			}
		});

		defaultProducts.value.forEach(async product => {
			if (product.isBought) {
				const productRef = doc(db, 'defaultProducts', product.firestoreId);
				try {
					await updateDoc(productRef, {
						quantity: -1,
						unit: '',
						isBought: false,
						userCategory: deleteField(),
					});
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const updateProductsList = async (editedProduct: ProductType) => {
		if (typeof editedProduct.id === 'string') {
			const productRef = doc(db, 'customProducts', editedProduct.firestoreId);
			try {
				await updateDoc(productRef, {
					...editedProduct,
				});
			} catch (error) {
				console.log(error);
			}
		} else if (typeof editedProduct.id === 'number') {
			const productRef = doc(db, 'defaultProducts', editedProduct.firestoreId);

			if (defaultProducts.value.map(product => product.name).includes(editedProduct.name)) {
				try {
					await updateDoc(productRef, {
						userCategory: editedProduct.category,
						quantity: editedProduct.quantity,
						unit: editedProduct.unit,
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				try {
					await updateDoc(productRef, {
						quantity: -1,
						unit: '',
						isBought: false,
					});
				} catch (error) {
					console.log(error);
				}

				const id = uuid();
				try {
					await setDoc(doc(db, 'customProducts', id), {
						...editedProduct,
						firestoreId: id,
						id,
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const updateProductsQuantity = async (firebaseId: string, productId: number | string, quantityChanger: 1 | -1) => {
		if (typeof productId === 'number') {
			const productRef = doc(db, 'defaultProducts', firebaseId);
			try {
				const product = (await getDoc(productRef)).data()!;
				try {
					await updateDoc(productRef, {
						quantity: increment(quantityChanger),
						unit: product.quantity + quantityChanger < 0 ? '' : product.unit,
					});
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			const productRef = doc(db, 'customProducts', firebaseId);
			try {
				const product = (await getDoc(productRef)).data()!;
				try {
					await updateDoc(productRef, {
						quantity: increment(quantityChanger),
						unit: product.quantity + quantityChanger < 0 ? '' : product.unit,
					});
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const updateProductCategory = async (
		categoryChangeProductId: { id: string | number; firestoreId: string } | null,
		clickedCategory: { name: string; imgSrc: string }
	) => {
		if (typeof categoryChangeProductId?.id === 'string') {
			const productRef = doc(db, 'customProducts', categoryChangeProductId.firestoreId);
			try {
				await updateDoc(productRef, {
					category: clickedCategory,
				});
			} catch (error) {
				console.log(error);
			}
		} else if (typeof categoryChangeProductId?.id === 'number') {
			const productRef = doc(db, 'defaultProducts', categoryChangeProductId.firestoreId);
			try {
				await updateDoc(productRef, {
					userCategory: clickedCategory,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const updateCustomProductsQuantity = async (customProduct: CustomProductType) => {
		if (customProduct.name === '') return;

		try {
			const customProductsList = (await getDocs(collection(db, 'customProducts'))).docs.map(
				product =>
					({
						firestoreId: product.id,
						...product.data(),
					} as ProductType)
			);

			const checkedProductIndex = customProductsList.map(product => product.name).indexOf(customProduct.name);

			if (customProductsList.length > 0 && checkedProductIndex >= 0) {
				const firestoreId = customProductsList[checkedProductIndex].firestoreId;
				const productRef = doc(db, 'customProducts', firestoreId);
				try {
					await updateDoc(productRef, {
						quantity: customProduct.quantity,
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				const id = uuid();
				try {
					await setDoc(doc(db, 'customProducts', id), {
						id,
						...customProduct,
					});
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		defaultProducts,
		customProducts,
		productsList,
		shoppingProgress,
		setDefaultProducts,
		setCustomProducts,
		setProductsList,
		sortProducts,
		countShoppingProgress,
		handleBoughtStatus,
		removeBoughtProducts,
		updateProductsList,
		updateProductsQuantity,
		updateProductCategory,
		updateCustomProductsQuantity,
	};
};

export const [useProductsProvider, useProductsContext] = createProvider('Products', useProducts);
