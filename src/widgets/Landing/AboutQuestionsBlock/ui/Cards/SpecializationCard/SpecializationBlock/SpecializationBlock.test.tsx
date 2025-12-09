import { renderComponent } from '@/shared/libs';

import { SpecializationBlock } from './SpecializationBlock';

describe('SpecializationBlock', () => {
	test('should render SpecializationBlock', () => {
		const { container } = renderComponent(<SpecializationBlock />);
		expect(container).toBeInTheDocument();
	});
});
