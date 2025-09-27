import { Response } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

export interface LearnedQuestion {
	id: number;
	skill: Skill;
	specialization: Specialization;
	total: number;
	learnedPercentage: number;
	calculatedAt: string;
}

export type LearnedQuestionsParamsRequest = {
	page?: number;
	limit?: number;
	specializationId?: number;
};

export type LearnedQuestionsResponse = Response<LearnedQuestion[]>;
