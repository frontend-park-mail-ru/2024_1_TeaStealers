import { BaseComponent, Button } from '@components/index';
import csatPage from './csatPage.hbs';

export class CsatPage extends BaseComponent {
  state;

  constructor(parent, state) {
    const template = csatPage;
    const nextButton = new Button('csat__button', {
      borderRadius: 'sm',
      size: 'sm',
      mode: 'secondary',
      text: 'Далее',
      id: 'nextButton',
    });
    const innerComponents = [nextButton];
    super({
      parent, template, state, innerComponents,
    });
    this.state = state;
  }

  componentDidMount() {
    const stars = document.querySelectorAll('.csat__star');
    stars.forEach((star) => {
      star.addEventListener('mouseover', this.coloredStars.bind(this));
      star.addEventListener('mouseout', this.uncoloredStars.bind(this));
    });
  }

  coloredStars(event) {
    event.preventDefault();
    const numberStr = event.target.id.replace('csatStar', '');
    const number = parseInt(numberStr, 10);
    const stars = document.querySelectorAll('.csat__star');
    for (let i = 0; i < number; i += 1) {
      stars[i].src = '../../static/starSelect.svg';
    }
  }

  uncoloredStars(event) {
    event.preventDefault();
    const stars = document.querySelectorAll('.csat__star');
    stars.forEach((star) => {
      star.src = '../../static/star.svg';
    });
  }

  selectStar(event) {
    event.preventDefault();
  }
}
