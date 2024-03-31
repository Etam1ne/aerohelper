import { DocumentPointEnum } from '../enums';

export const documentPointTranslation: Record<DocumentPointEnum, string> = {
  [DocumentPointEnum.PASSED_TO_EMPLOYEE]: 'Передан сотруднику',
  [DocumentPointEnum.REGISTRATION_POINT]: 'Стойка регистрации',
  [DocumentPointEnum.LOOKUP_POINT]: 'Прохождение досмотра',
  [DocumentPointEnum.PLANE_ENTRANCE]: 'Вход в самолет',
  [DocumentPointEnum.PLANE_EXIT]: 'Выход из самолета',
  [DocumentPointEnum.PASSED_TO_PARENT]: 'Передан родителю',
  [DocumentPointEnum.GET_FROM_EMPLOYEE]: 'Получено от сотрудника',
};
