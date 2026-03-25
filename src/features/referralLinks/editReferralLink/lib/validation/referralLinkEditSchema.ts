import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';
import { onlyLatAndNumber } from '@/shared/libs';

import { EditReferralLinkFormValues } from '../../model/types/referralEditPageTypes';

export const referralLinkEditSchema: yup.ObjectSchema<EditReferralLinkFormValues> = yup
  .object()
  .shape({
    id: yup.string().required(),
    refCode: yup
      .string()
      .trim()
      .required(i18n.t(Translation.VALIDATION_REQUIRED))
      .min(3, i18n.t(Translation.VALIDATION_MIN_VALUE, { min: 3 }))
      .max(50, i18n.t(Translation.VALIDATION_MAX_VALUE, { max: 50 }))
      .matches(onlyLatAndNumber, i18n.t(Translation.VALIDATION_LATIN_AND_NUMBER))
      .test('no-spaces', i18n.t(Translation.VALIDATION_NO_SPACE), (value) => !value?.includes(' ')),
    url: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
    ownerId: yup.string().trim().required(i18n.t(Translation.VALIDATION_REQUIRED)),
    ownerUsername: yup.string().required(),
    linkedCount: yup.number().required(),
    amountSum: yup.number().required(),
    createdAt: yup.string().required(),
    updatedAt: yup.string().required(),
  });