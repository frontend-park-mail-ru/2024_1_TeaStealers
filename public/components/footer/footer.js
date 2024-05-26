import { BaseComponent } from '@components';
import footer from './footer.hbs';

/**
 * Класс футера
 */
export class Footer extends BaseComponent {
  /**
   * Создает новый экземпляр футера.
   * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен футера.
   */
  constructor(parent) {
    const template = footer;
    super({ parent, template });
  }

  componentDidMount() {
    document.querySelector('#repo').querySelector('span').addEventListener('click', this.openRepository.bind(this));
  }

  openRepository() {
    window.open('https://github.com/frontend-park-mail-ru/2024_1_TeaStealers', '_blank', 'noopener,noreferrer');
  }

  componentWillUnmount() {
    document.querySelector('#repo').querySelector('span').removeEventListener('click', this.openRepository.bind(this));
  }
}
