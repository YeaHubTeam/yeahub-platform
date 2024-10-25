import { State } from '@/shared/config/store/State';

import { getSpecializationsPageNum } from './specializationsPageSelectors';

describe('specializationsPageSelectors', () => {
	test('getSpecializationsPageNum', () => {
		const state: DeepPartial<State> = {
			specializationsPage: { page: 2 },
		};
		expect(getSpecializationsPageNum(state as State)).toEqual(2);
	});
});
