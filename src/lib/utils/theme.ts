import { BehaviorSubject } from 'rxjs';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
export const isDark = new BehaviorSubject<boolean>(mediaQuery.matches);
mediaQuery.addEventListener('change', (e) => isDark.next(e.matches));
