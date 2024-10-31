import type { ProfileProject } from '@/entities/project';
import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import styles from './ProjectsBlockItem.module.css';
import { Profile } from '@/shared/config/i18n/i18nTranslations';

interface ProjectsBlockItemProps {
	project: ProfileProject;
}

export const ProjectsBlockItem = ({ project }: ProjectsBlockItemProps) => {
	const { name, imgUrl } = project;
	const { t } = useI18nHelpers(i18Namespace.profile);
	return (
		<div className={styles['projects-item']}>
			<div className={styles['projects-img']}>
				<img src={imgUrl} alt={t(Profile.PROJECTLIST_IMAGE_ALT)} />
			</div>
			<span className={styles['projects-name']}>{name}</span>
		</div>
	);
};
