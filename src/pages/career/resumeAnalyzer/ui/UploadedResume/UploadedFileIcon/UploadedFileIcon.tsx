import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { CheckFilled } from '@/shared/ui/Icons';

import styles from './UploadedFileIcon.module.css';

export const UploadedFileIcon = () => {
	return (
		<Flex justify="center" align="center" className={styles['uploaded-file-icon-wrapper']}>
			<Icon size={30} color="purple-700" icon="downloadFile" />
			<CheckFilled className={styles['check-icon']} />
		</Flex>
	);
};
