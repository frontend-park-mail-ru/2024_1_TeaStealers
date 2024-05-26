import { BaseComponent } from '..';
import mapPopup from './mapPopup.hbs';

export class MapPopup extends BaseComponent {
  state;

  parent; // тут - элемент а не id!

  constructor(parent, state) {
    const template = mapPopup;
    super({ parent, template, state });
    this.state = state;
    this.parent = parent;
  }

  componentDidMount() {
    this.addClickListener(`about${this.state.advertId}`, this.goToAdvert.bind(this));
  }

  goToAdvert() {
    this.redirect(`/adverts/${this.state.advertId}`);
  }

  render() {
    this.parent.insertAdjacentHTML(
      'beforeend',
      this.template(this.state),
    );
  }

  clean() {
    document.getElementById(`about${this.state.advertId}`)?.remove();
  }
}
