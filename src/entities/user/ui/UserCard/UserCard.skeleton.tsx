import { AvatarSkeleton } from '@/shared/ui/Avatar';
import { Card } from '@/shared/ui/Card';
import { ChipSkeleton } from '@/shared/ui/Chip';
import { DropdownSkeleton } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { SwitchSkeleton } from '@/shared/ui/Switch';
import { TextSkeleton } from '@/shared/ui/Text';

export const UserCardSkeleton = () => {
	return (
		<Flex direction="column" maxWidth>
			<Card withOutsideShadow>
				<Flex direction="column" gap="28">
					<TextSkeleton variant="body5-strong" width={140} />
					<Flex direction="column" gap="60">
						<FormFieldSkeleton countTextFields={0}>
							<InputSkeleton disabled type="text" size="L" />
						</FormFieldSkeleton>

						<FormFieldSkeleton countTextFields={0}>
							<AvatarSkeleton size={160} borderRadius={20} />
						</FormFieldSkeleton>

						<FormFieldSkeleton>
							<FormControlSkeleton>
								<Flex direction="column" gap="48">
									<DropdownSkeleton disabled />
									<ChipSkeleton disabled variant="big" label="..." withText={80} />
								</Flex>
							</FormControlSkeleton>
						</FormFieldSkeleton>

						<FormFieldSkeleton>
							<Flex align="center" gap="10">
								<SwitchSkeleton />
								<TextSkeleton variant="body2" width={230} />
							</Flex>
						</FormFieldSkeleton>

						<FormFieldSkeleton countTextFields={0}>
							<InputSkeleton size="L" />
						</FormFieldSkeleton>

						<FormFieldSkeleton countTextFields={0} isLimitWidth>
							<Flex direction="column" gap="20" maxWidth>
								{Array.from({ length: 3 }).map((_, index) => (
									<InputSkeleton key={index} size="L" />
								))}
							</Flex>
						</FormFieldSkeleton>
					</Flex>

					<FormFieldSkeleton countTextFields={0}>
						<InputSkeleton size="L" />
					</FormFieldSkeleton>

					<FormFieldSkeleton countTextFields={0}>
						<InputSkeleton size="L" />
					</FormFieldSkeleton>
				</Flex>
			</Card>
		</Flex>
	);
};
