import { BaseComponent, Button } from '@components';
import { postCsatAnswer } from '@modules';
import csat from './csat.hbs';

export class Csat extends BaseComponent {
  state;

  selectedStarNumber;

  constructor(parent, state) {
    const template = csat;
    const nextButton = new Button('csat__button', {
      borderRadius: 'sm',
      size: 'sm',
      mode: 'secondary',
      text: 'Ответить',
      id: 'nextButton',
    });
    const innerComponents = [nextButton];
    super({
      parent, template, state, innerComponents,
    });
    this.state = state;
    this.selectedStarNumber = 0;
  }

  componentDidMount() {
    this.addClickListener('iframe__close', this.closeIframe.bind(this));
    // const stars = document.querySelectorAll('.csat__star');
    // stars.forEach((star) => {
    //   star.addEventListener('mouseover', this.coloredStars.bind(this));
    //   star.addEventListener('mouseout', this.uncoloredStars.bind(this));
    //   star.addEventListener('click', this.selectStar.bind(this));
    // });
    // document.getElementById('nextButton').addEventListener('click', this.sendAnswer.bind(this));
  }

  closeIframe() {
    this.unmountAndClean();
  }
}
