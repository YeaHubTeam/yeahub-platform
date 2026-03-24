import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface ReferralLinkDateProps {
	label: string;
	date: string;
}

export const ReferralLinkDate = ({ label, date }: ReferralLinkDateProps) => {
	return (
		<Flex direction="column" gap="16">
			<Text variant="body3" color="black-700">
				{label}
			</Text>
			<Chip active label={new Date(date).toLocaleDateString('ru-RU')} />
		</Flex>
	);
};
