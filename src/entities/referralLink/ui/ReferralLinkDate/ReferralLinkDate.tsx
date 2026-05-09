import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface ReferralLinkDateProps {
	label: typeof ReferralLinks.DETAIL_CREATED_AT | typeof ReferralLinks.DETAIL_UPDATED_AT;
	date: string;
}

export const ReferralLinkDate = ({ label, date }: ReferralLinkDateProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	return (
		<Flex direction="column" gap="16">
			<Text variant="body3" color="black-700">
				{t(label)}:
			</Text>
			<Chip active label={new Date(date).toLocaleDateString('ru-RU')} />
		</Flex>
	);
};
