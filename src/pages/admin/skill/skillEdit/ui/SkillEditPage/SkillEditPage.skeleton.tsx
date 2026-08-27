import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { InputSkeleton } from '@/shared/ui/Input';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { DeleteTaskButtonSkeleton } from '@/features/task/deleteTask';

export const SkillEditPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteTaskButtonSkeleton />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<Flex gap="20" direction="column" style={{ marginTop: '70px', padding: '20px' }}>
				<TextSkeleton variant="head3" width={320} />
				<Flex gap="120" style={{ marginTop: '30px' }}>
					<TextSkeleton variant="head2" width={240} />
					<InputSkeleton size="L" width={200} />
				</Flex>
				<Flex gap="120" style={{ marginTop: '30px' }}>
					<TextSkeleton variant="head2" width={240} />
					<Flex gap="40">
						<ImageWithWrapperSkeleton width={170} height={120} />
						<ImageWithWrapperSkeleton width={460} height={120} />
					</Flex>
				</Flex>
				<Flex gap="120" style={{ marginTop: '10px' }}>
					<TextSkeleton variant="head1" width={240} />
					<SearchInputSkeleton />
				</Flex>
				<Flex gap="120" style={{ marginTop: '30px' }}>
					<TextSkeleton variant="head1" width={240} />
					<div style={{ width: '220px' }}>
						<TextAreaSkeleton />
					</div>
				</Flex>
			</Flex>
		</>
	);
};
