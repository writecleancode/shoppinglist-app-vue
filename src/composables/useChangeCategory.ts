import { ref } from 'vue';

const initialCategoryPanelState = false;

export const useChangeCategory = () => {
	const isCategoryPanelOpen = ref(initialCategoryPanelState);
	const highlightedCategory = ref('');
	const categoryChangeProductId = ref(null);

	const openCategoryPanel = (clickedCategory, clickedId, clickedFirestoreId) => {
		highlightedCategory.value = clickedCategory;
		isCategoryPanelOpen.value = true;

		if (clickedId && clickedFirestoreId) {
			categoryChangeProductId.value = { id: clickedId, firestoreId: clickedFirestoreId };
		}
	};

	const resetCategoryChangeProductId = () => (categoryChangeProductId.value = null);

	const closeCategoryPanel = () => {
		isCategoryPanelOpen.value = false;
		resetCategoryChangeProductId();
		highlightedCategory.value = '';
	};

	return {
		isCategoryPanelOpen,
		closeCategoryPanel,
	};
};
