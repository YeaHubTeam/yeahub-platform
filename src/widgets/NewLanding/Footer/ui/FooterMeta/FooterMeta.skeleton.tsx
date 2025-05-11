import { Flex } from '@/shared/ui/Flex';

import { FooterCopyrightSkeleton } from '../FooterCopyright/FooterCopyright.skeleton';
import { FooterLinksSkeleton } from '../FooterLinks/FooterLinks.skeleton';

export const FooterMetaSkeleton = () => {
	return (
		<Flex justify="between" align="center">
			<FooterCopyrightSkeleton />
			<FooterLinksSkeleton className="footer-resources-links" />
		</Flex>
	);
};
