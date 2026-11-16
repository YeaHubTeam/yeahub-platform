import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

export const AnalyticsPage = () => {
	return (
		<PageWrapper shouldVerify hasData stubs={{}} content={<Flex />}>
			{({ content }) => content}
		</PageWrapper>
	);
};
