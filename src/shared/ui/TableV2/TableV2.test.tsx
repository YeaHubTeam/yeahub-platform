import { fireEvent, screen } from '@testing-library/react';

import { Translation } from '@/shared/config';
import { i18nForJest } from '@/shared/config/jest';
import { renderComponent } from '@/shared/libs';

import { TableV2 } from './TableV2';

describe('TableV2', () => {
	test('does not render delete action without onDelete', () => {
		renderComponent(
			<TableV2
				data={[{ id: 1, title: 'Company' }]}
				columns={[{ id: 'title', header: 'Title' }]}
				actions={['detail', 'delete']}
				entity="companies"
			/>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(screen.queryByText(i18nForJest.t(Translation.DELETE))).not.toBeInTheDocument();
	});
});
