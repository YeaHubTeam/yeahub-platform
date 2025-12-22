import { Response } from '@/shared/libs';

import { Skill } from '@/entities/skill/@x/question';
import { Specialization } from '@/entities/specialization/@x/question';

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
