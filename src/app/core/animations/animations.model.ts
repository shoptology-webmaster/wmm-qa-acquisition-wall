import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export class Animations {

	public fadeInOut(nameSpace: string, timing?: string) {
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

	public slideBottom(nameSpace: string, timing?: string) {
		nameSpace = nameSpace || 'slideBottom';
		timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

		return trigger(nameSpace, [
			state('in', style({transform: 'translateY(0)'})),
			transition('void => *', [
				style({transform: 'translateY(100%)'}),
				animate(timing)
			]),
			transition('* => void', [
				animate(timing, style({transform: 'translateY(0)'}))
			])
		]);
	}

	public slideTopFade(nameSpace: string, timing?: string) {
		nameSpace = nameSpace || 'slideTop';
		timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

		return trigger(nameSpace, [
			state('in', style({opacity: '0', transform: 'translateY(0)'})),
			transition('void => *', [
				style({opacity: '0', transform: 'translateY(-100%)'}),
				animate(timing)
			]),
			transition('* => void', [
				animate(timing, style({opacity: '0', transform: 'translateY(0)'}))
			])
		]);
	}

	public slideRightFade(nameSpace: string, timing?: string) {
		nameSpace = nameSpace || 'slideRightFade';
		timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

		return trigger(nameSpace, [
			state('in', style({opacity: '0', transform: 'translateX(0)'})),
			transition('void => *', [
				style({opacity: '0', transform: 'translateX(100%)'}),
				animate(timing)
			]),
			transition('* => void', [
				animate(timing, style({opacity: '0', transform: 'translateX(0)'}))
			])
		]);
	}

	public slideUpFade(nameSpace: string, timing?: string) {
		nameSpace = nameSpace || 'slideUpFade';
		timing = timing || '1s 1s cubic-bezier(0.19, 1, 0.22, 1)';

		return trigger(nameSpace, [
			state('in', style({opacity: '0', transform: 'translateY(0)'})),
			transition('void => *', [
				style({opacity: '0', transform: 'translateY(100%)'}),
				animate(timing)
			]),
			transition('* => void', [
				animate(timing, style({opacity: '0', transform: 'translateY(0)'}))
			])
		]);
	}

	public scaleUpFade(nameSpace: string, timing?: string) {
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
}
