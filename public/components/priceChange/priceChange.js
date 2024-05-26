import { BaseComponent } from '@components';
import priceChange from './priceChange.hbs';

export class PriceChange extends BaseComponent {
  constructor(parent, state) {
    const template = priceChange;
    state = { ...state };
    super({ parent, template, state });
  }
}
