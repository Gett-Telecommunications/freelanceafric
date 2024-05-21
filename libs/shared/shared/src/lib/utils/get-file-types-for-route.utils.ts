import { E_FileRoutes, T_FileTypes } from '../interfaces';

export function getFileTypesForRoute(route: E_FileRoutes): T_FileTypes[] {
  switch (route) {
    case E_FileRoutes.PUBLIC_CATEGORY_IMAGES:
      return ['image/*'];
    default:
      return [];
  }
}
