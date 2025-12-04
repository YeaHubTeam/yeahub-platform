export interface Topic {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	skillId: number;
	createdAt?: string;
	updatedAt?: string;
}

export type CreateOrEditTopicFormValues = Pick<Topic, 'id' | 'title' | 'description' | 'skillId'>;
