import { createProvider } from '@/utils/createProvider';
import { ref } from 'vue';

const initialCategoryPanelState = false;

const useChangeCategory = () => {
	const isCategoryPanelOpen = ref(initialCategoryPanelState);
	const highlightedCategory = ref('');
	const categoryChangeProductId = ref<null | { id: string | number; firestoreId: string }>(null);

	const openCategoryPanel = (clickedCategory: string, clickedId?: number | string, clickedFirestoreId?: string) => {
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
		highlightedCategory,
		categoryChangeProductId,
		openCategoryPanel,
		closeCategoryPanel,
	};
};

export const [useChangeCategoryProvider, useChangeCategoryContext] = createProvider('ChangeCategory', useChangeCategory);
