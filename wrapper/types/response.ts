export interface VolumeInfo {
	authors: string[];
	averageRating: number;
	description: string;
	imageLinks?: {
		thumbnail?: string;
	};
	ratingsCount?: number;
	title: string;
}

export interface SaleInfo {
	listPrice?: { amount: number; currencyCode: string };
}

export interface Item {
	saleInfo: SaleInfo;
	volumeInfo: VolumeInfo;
}

export interface ApiResponse {
	items: Item[];
}
