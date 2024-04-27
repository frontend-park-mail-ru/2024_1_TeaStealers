import { BaseComponent, Button } from '@components/index';
import { postCsatAnswer } from '@modules';
import { events } from '@models';
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
    document.getElementById('nextButton').addEventListener('click', this.sendAnswer.bind(this));
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
    this.componentDidUpdate({
      name: 'new_question',
      data: '',
    });
  }

  closeIframe() {
    this.componentWillUnmount();
    const iframe = document.getElementById('csat');
    iframe.parentNode.removeChild(iframe);
  }

  componentDidUpdate(event) {
    if (event.name === events.GET_QUESTIONS) {
      this.state.questionNumber = 0;
      this.questions = { ...event.data };
      this.state.questionTitle = this.questions[0].question_text;
      this.state.question_id = this.questions[0].question_id;
    } else {
      this.state.questionNumber += 1;
      if (this.questions.len < this.state.questionNumber) {
        this.state.questionTitle = this.questions[this.state.questionNumber].question_text;
        this.state.question_id = this.questions[this.state.questionNumber].question_id;
        this.unmountAndClean();
        this.renderAndDidMount();
      } else {
        this.closeIframe();
      }
    }
  }
}
