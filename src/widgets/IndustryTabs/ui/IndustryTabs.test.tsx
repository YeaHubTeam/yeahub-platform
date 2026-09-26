import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { IndustryTabs } from './IndustryTabs';

describe('IndustryTabs', () => {
	test('does not render when industries are unavailable', () => {
		const { container } = renderComponent(<IndustryTabs />);

		expect(container).toBeEmptyDOMElement();
	});

	test('renders all tab along with available industries', () => {
		renderComponent(<IndustryTabs availableIndustries={['Frontend', 'Backend']} />);

		const tabs = screen.getAllByRole('tab');

		expect(tabs).toHaveLength(3);
		expect(screen.getByRole('tab', { name: 'Все' })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'Frontend' })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'Backend' })).toBeInTheDocument();
	});

	test('selects all tab when location hash is empty', () => {
		renderComponent(<IndustryTabs availableIndustries={['Frontend', 'Backend']} />);

		const activeTab = screen.getByRole('tab', { name: 'Все' });
		expect(activeTab).toHaveClass('active');

		const frontendTab = screen.getByRole('tab', { name: 'Frontend' });
		expect(frontendTab).not.toHaveClass('active');
	});

	test('selects industry tab based on location hash', () => {
		renderComponent(<IndustryTabs availableIndustries={['Frontend', 'Backend']} />, {
			route: '/#Backend',
		});

		expect(screen.getByRole('tab', { name: 'Backend' })).toHaveClass('active');
		expect(screen.getByRole('tab', { name: 'Все' })).not.toHaveClass('active');
	});

	test('selects all tab when location hash is unknown', () => {
		renderComponent(<IndustryTabs availableIndustries={['Frontend', 'Backend']} />, {
			route: '/#Unknown',
		});

		expect(screen.getByRole('tab', { name: 'Все' })).toHaveClass('active');
		expect(screen.getByRole('tab', { name: 'Backend' })).not.toHaveClass('active');
		expect(screen.getByRole('tab', { name: 'Frontend' })).not.toHaveClass('active');
	});

	test('changes active tab when user selects an industry', async () => {
		const user = userEvent.setup();

		renderComponent(<IndustryTabs availableIndustries={['Frontend', 'Backend']} />);

		const allTab = screen.getByRole('tab', { name: 'Все' });
		const backendTab = screen.getByRole('tab', { name: 'Backend' });

		expect(allTab).toHaveClass('active');
		expect(backendTab).not.toHaveClass('active');

		await user.click(backendTab);

		expect(backendTab).toHaveClass('active');
		expect(allTab).not.toHaveClass('active');
	});
});
