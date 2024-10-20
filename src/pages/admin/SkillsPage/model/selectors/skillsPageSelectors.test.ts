import { State } from '@/shared/config/store/State';

import { getSkillsPageNum } from './skillsPageSelectors';

describe('skillsPageSelectors', () => {
	test('getSkillsPageNum', () => {
		const state: DeepPartial<State> = {
			skillsPage: { page: 2 },
		};
		expect(getSkillsPageNum(state as State)).toEqual(2);
	});
});
