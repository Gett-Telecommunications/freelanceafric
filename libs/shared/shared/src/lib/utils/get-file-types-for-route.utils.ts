import { E_FileRoutes, T_FileTypes } from '../interfaces';

export function getFileTypesForRoute(route: E_FileRoutes): T_FileTypes[] {
  switch (route) {
    case E_FileRoutes.PUBLIC_CATEGORY_IMAGES:
      return ['image/*'];
    case E_FileRoutes.PUBLIC_SELLER_PROFILE_IMAGES:
      return ['image/*'];
    case E_FileRoutes.PRIVATE_CHAT_UPLOADS:
      return ['**/*'];
    case E_FileRoutes.PUBLIC_GIG_IMAGES:
      return ['image/*'];
    default: {
      const _route: never = route;
      return _route;
    }
  }
}
