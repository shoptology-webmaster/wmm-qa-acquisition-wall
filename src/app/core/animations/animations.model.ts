import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export function fadeInOut(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'fadeInOut';
	timing = timing || '200ms';

	return trigger(nameSpace, [
		state('in', style({opacity: '1'})),
		transition('void => *', [
			style({opacity: '0'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0'}))
		])
	]);
}

export function slideTopFade(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'slideTop';
	timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

	return trigger(nameSpace, [
		state('in', style({opacity: '0', transform: 'translate3d(0, 0, 0)'})),
		transition('void => *', [
			style({opacity: '0', transform: 'translate3d(0, -50%, 0)'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0', transform: 'translate3d(0, 0, 0)'}))
		])
	]);
}

export function slideBottomFade(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'slideTop';
	timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

	return trigger(nameSpace, [
		state('in', style({opacity: '0', transform: 'translate3d(0, 0, 0)'})),
		transition('void => *', [
			style({opacity: '0', transform: 'translate3d(0, 50%, 0)'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0', transform: 'translate3d(0, 0, 0)'}))
		])
	]);
}

export function slideRightFade(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'slideRightFade';
	timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

	return trigger(nameSpace, [
		state('in', style({opacity: '0', transform: 'translate3d(0, 0, 0)'})),
		transition('void => *', [
			style({opacity: '0', transform: 'translate3d(100%, 0, 0)'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0', transform: 'translate3d(0, 0, 0)'}))
		])
	]);
}

export function slideUpFade(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'slideUpFade';
	timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

	return trigger(nameSpace, [
		state('in', style({opacity: '0', transform: 'translate3d(0, 0, 0)'})),
		transition('void => *', [
			style({opacity: '0', transform: 'translate3d(0, 100%, 0)'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0', transform: 'translate3d(0, 0, 0)'}))
		])
	]);
}

export function scaleUpFade(nameSpace: string, timing?: string) {
	nameSpace = nameSpace || 'scaleUpFade';
	timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

	return trigger(nameSpace, [
		state('in', style({opacity: '0', transform: 'scale(.1)'})),
		transition('void => *', [
			style({opacity: '0', transform: 'scale(.1)'}),
			animate(timing)
		]),
		transition('* => void', [
			animate(timing, style({opacity: '0', transform: 'scale(.1)'}))
		])
	]);
}
