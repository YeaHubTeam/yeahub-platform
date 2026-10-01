import { Author } from '@/shared/ui/AuthorInfo';

export interface TestQuestionReference {
	id: number;
	name?: string;
	title?: string;
}

export interface TestQuestion {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	status: 'public' | 'draft';
	variants: Record<string, string>;
	successVariants?: string[] | null;
	keywords?: string[] | null;
	rate?: number | null;
	complexity: number | null;
	createdAt: string;
	updatedAt: string;
	createdById?: string | null;
	createdBy?: Author | null;
	questionSpecializations: TestQuestionReference[];
	questionSkills: TestQuestionReference[];
}
