export type ProductType = {
	firestoreId: string;
	id: number | string;
	name: string;
	category: {
		name: string;
		imgSrc: string;
	};
	userCategory?: {
		name: string;
		imgSrc: string;
	};
	quantity: number;
	unit: string;
	isBought: boolean;
};
