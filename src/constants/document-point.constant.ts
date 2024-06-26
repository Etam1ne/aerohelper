import { Role } from '@prisma/client';
import { DocumentPointEnum } from '../enums';

export const documentPointTranslation: Record<DocumentPointEnum, string> = {
  [DocumentPointEnum.PASSED_TO_EMPLOYEE]: 'Передан сотруднику',
  [DocumentPointEnum.REGISTRATION_POINT]: 'Стойка регистрации',
  [DocumentPointEnum.LOOKUP_POINT]: 'Прохождение досмотра',
  [DocumentPointEnum.PLANE_ENTRANCE]: 'Вход в самолет',
  [DocumentPointEnum.PLANE_EXIT]: 'Выход из самолета',
  [DocumentPointEnum.PASSED_TO_PARENT]: 'Передан родителю',
  [DocumentPointEnum.GET_FROM_EMPLOYEE]: 'Получен от сотрудника',
};

export const documentPointEditor: Record<DocumentPointEnum, Role> = {
  [DocumentPointEnum.PASSED_TO_EMPLOYEE]: Role.parent,
  [DocumentPointEnum.REGISTRATION_POINT]: Role.employee,
  [DocumentPointEnum.LOOKUP_POINT]: Role.employee,
  [DocumentPointEnum.PLANE_ENTRANCE]: Role.employee,
  [DocumentPointEnum.PLANE_EXIT]: Role.employee,
  [DocumentPointEnum.PASSED_TO_PARENT]: Role.employee,
  [DocumentPointEnum.GET_FROM_EMPLOYEE]: Role.parent,
}