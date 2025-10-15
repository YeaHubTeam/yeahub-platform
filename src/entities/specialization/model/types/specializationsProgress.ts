import { Response } from '@/shared/types/types';

import { Specialization } from '@/entities/specialization';

export interface SpecializationsProgress {
	id: number;
	skillCount: number;
	questionCount: number;
	averageProgress: number;
	specialization: Specialization;
	calculatedAt: string;
}

export type GetSpecializationsProgressResponse = Response<SpecializationsProgress[]>;

export interface GetSpecializationsProgressParamsRequest {
	page?: number;
	limit?: number;
	specializationId?: number;
}
