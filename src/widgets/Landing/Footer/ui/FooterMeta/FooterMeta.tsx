import { Flex } from '@/shared/ui/Flex';

import { FooterCopyright } from '../FooterCopyright/FooterCopyright';
import { FooterLinks } from '../FooterLinks/FooterLinks';

export const FooterMeta = () => {
	return (
		<Flex dataTestId="FooterMeta" justify="between" align="center">
			<FooterCopyright />
			<FooterLinks />
		</Flex>
	);
};
