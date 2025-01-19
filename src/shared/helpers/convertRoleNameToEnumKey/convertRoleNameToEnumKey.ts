import { User as Users } from '@/shared/config/i18n/i18nTranslations';

export const convertRoleNameToEnumKey = (roleName: string): keyof typeof Users => {
	return roleName.replace(/-/g, '_').toUpperCase() as keyof typeof Users;
};
