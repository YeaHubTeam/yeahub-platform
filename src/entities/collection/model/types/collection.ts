export interface Collection {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
	questionsQuantity?: number;
	questions?: number[];
}
