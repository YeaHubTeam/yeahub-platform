import { Flex } from '@/shared/ui/Flex';

import { RESOURCES_LINKS } from '../../model/constants/footerConstants';
import { FooterCopyright } from '../FooterCopyright/FooterCopyright';
import { FooterLinks } from '../FooterLinks/FooterLinks';

export const FooterMeta = () => {
	return (
		<Flex justify="between" align="center">
			<FooterCopyright />
			<FooterLinks className="footer-resources-links" links={RESOURCES_LINKS} />
		</Flex>
	);
};
