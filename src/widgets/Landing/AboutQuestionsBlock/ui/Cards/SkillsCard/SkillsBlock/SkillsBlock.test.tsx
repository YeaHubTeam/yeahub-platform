import { renderComponent } from '@/shared/libs/jest';

import { SkillsBlock } from './SkillsBlock';

describe('SkillsBlock', () => {
	test('should render SkillsBlock', () => {
		const { container } = renderComponent(<SkillsBlock />);
		expect(container).toBeInTheDocument();
	});
});
