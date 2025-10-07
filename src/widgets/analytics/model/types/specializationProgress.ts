import { Response } from '@/shared/types/types';

import { Specialization } from '@/entities/specialization';

export interface SpecializationProgress {
	id: number;
	skillCount: number;
	questionCount: number;
	averageProgress: number;
	specialization: Specialization;
}

export type GetSpecializationProgressResponse = Response<SpecializationProgress[]>;

export interface GetSpecializationProgressParamsRequest {
	page?: number;
	limit?: number;
	specializationId?: number;
}
