import { renderComponent } from '@/shared/libs';

import { SkillsBlock } from './SkillsBlock';

describe('SkillsBlock', () => {
	test('should render SkillsBlock', () => {
		const { container } = renderComponent(<SkillsBlock />);
		expect(container).toBeInTheDocument();
	});
});
