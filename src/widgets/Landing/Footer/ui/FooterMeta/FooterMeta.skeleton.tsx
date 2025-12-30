import { Flex } from '@/shared/ui/Flex';

import { FooterCopyrightSkeleton } from '../FooterCopyright/FooterCopyright.skeleton';
import { FooterLinksSkeleton } from '../FooterLinks/FooterLinks.skeleton';

export const FooterMetaSkeleton = () => {
	return (
		<Flex dataTestId="FooterMetaSkeleton" justify="between" align="center">
			<FooterCopyrightSkeleton />
			<FooterLinksSkeleton />
		</Flex>
	);
};
