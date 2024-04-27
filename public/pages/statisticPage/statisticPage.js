import { BaseComponent, Button } from '@components';
import statisticPage from './statisticPage.hbs';

export class StatisticPage extends BaseComponent {
    constructor(parent, state) {
        console.log('зашёл в StatisticPage');
        const template = statisticPage;
        const refreshButton = new Button('statistic', {
            mode: 'primary',
            text: 'Обновить',
            id: 'refresh_button',
        })
        const innerComponents = [refreshButton];
        super({
          parent, template, state, innerComponents,
        });
      }
}