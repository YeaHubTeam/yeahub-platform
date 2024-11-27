import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const TariffSelection = () => {
	return (
		<Flex direction="row" gap="8">
			<Button variant="outline" size="L">
				Изменить тариф
			</Button>
			<Button variant="tertiary">Отменить подписку</Button>
		</Flex>
	);
};
