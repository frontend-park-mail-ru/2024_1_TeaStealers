import { BaseComponent, Button } from '@components/index';
import { postCsatAnswer } from '@modules';
import csatPage from './csatPage.hbs';

export class CsatPage extends BaseComponent {
  state;

  selectedStarNumber;

  constructor(parent, state) {
    const template = csatPage;
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
    const stars = document.querySelectorAll('.csat__star');
    stars.forEach((star) => {
      star.addEventListener('mouseover', this.coloredStars.bind(this));
      star.addEventListener('mouseout', this.uncoloredStars.bind(this));
      star.addEventListener('click', this.selectStar.bind(this));
    });
  }

  coloredStars(event) {
    event.preventDefault();
    const numberStr = event.target.id.replace('csatStar', '');
    const number = parseInt(numberStr, 10);
    const stars = document.querySelectorAll('.csat__star');
    stars.forEach((star) => {
      star.src = '../../static/star.svg';
    });
    for (let i = 0; i < number; i += 1) {
      stars[i].src = '../../static/starSelect.svg';
    }
  }

  uncoloredStars(event) {
    event.preventDefault();
    const stars = document.querySelectorAll('.csat__star');
    for (let i = this.selectedStarNumber; i < 5; i += 1) {
      stars[i].src = '../../static/star.svg';
    }
    for (let i = 0; i < this.selectedStarNumber; i += 1) {
      stars[i].src = '../../static/starSelect.svg';
    }
  }

  selectStar(event) {
    event.preventDefault();
    const numberStr = event.target.id.replace('csatStar', '');
    const number = parseInt(numberStr, 10);
    this.selectedStarNumber = number;
    // отправить ответ
  }

  sendAnswer() {
    postCsatAnswer({
      question_id: this.state.id,
      mark: this.selectedStarNumber,
    });
  }
}
