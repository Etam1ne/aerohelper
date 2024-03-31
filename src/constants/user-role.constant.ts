import { Role } from '@prisma/client';

export const userRoleTranslation: Record<Role, string> = {
    [Role.employee]: 'Сотрудник',
    [Role.parent]: 'Родитель',
}