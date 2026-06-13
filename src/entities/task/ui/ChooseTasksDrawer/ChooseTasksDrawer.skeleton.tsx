import { Flex } from "@/shared/ui/Flex";
import { TextSkeleton } from "@/shared/ui/Text";
import { ButtonSkeleton } from "@/shared/ui/Button";

import styles from './ChooseTasksDrawer.module.css';

export const ChooseTasksDrawerSkeleton = () => {
	return (
		<Flex justify="between">
			<Flex gap="120">
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body4" width={170} />
					<TextSkeleton variant="body2" width={230} />
				</Flex>
				<Flex direction="column" gap="24">
					<TextSkeleton variant="body3-accent" width={220} />
				</Flex>
			</Flex>
			<ButtonSkeleton className={styles['add-button']} width={174} size='medium' />
		</Flex>
	);
};