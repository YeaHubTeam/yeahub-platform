import { screen, within } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { SkillChip } from './SkillChip';

describe('SkillChip', () => {
	const props = {
		src: 'test src',
		alt: 'test at',
	};

	const expectImageToBeRenderedCorrectly = (
		container: HTMLElement,
		{ src, alt }: { src: string; alt: string },
		showLabel: boolean,
	) => {
		const image = within(container).getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', src);
		expect(image).toHaveAttribute('alt', alt);

		const imageSize = showLabel ? 34 : 36;
		expect(image).toHaveStyle({ width: `${imageSize}px`, height: `${imageSize}px` });
	};

	test('should render without label prop', () => {
		const { container } = renderComponent(<SkillChip {...props} />);
		expect(container).toBeInTheDocument();

		expectImageToBeRenderedCorrectly(container, props, false);

		const label = screen.queryByText(props.alt);
		expect(label).not.toBeInTheDocument();
	});

	test('should render with label prop', () => {
		const { container } = renderComponent(<SkillChip showLabel {...props} />);
		expect(container).toBeInTheDocument();

		expectImageToBeRenderedCorrectly(container, props, true);

		const label = screen.queryByText(props.alt);
		expect(label).toBeInTheDocument();
	});
});
