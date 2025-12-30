import { Response } from '@/shared/libs';

import { Specialization } from './specialization';

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
