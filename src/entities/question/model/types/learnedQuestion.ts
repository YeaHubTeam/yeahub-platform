import { Response } from '@/shared/libs';

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
	rowNumber: number;
}

export type GetLearnedQuestionsParamsRequest = {
	page?: number;
	limit?: number;
	specializationId?: number;
	skillId?: number;
};

export type GetLearnedQuestionsResponse = Response<LearnedQuestion[]>;
