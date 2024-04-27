import { BaseComponent, Button } from '@components';
import statisticPage from './statisticPage.hbs';
import { statisticControler } from '@controllers';

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
        [this.refreshButton] = this.innerComponents;
      }

      componentDidMount() {
        document.getElementById('refresh_button').addEventListener('click', this.refresh.bind(this));
      }

      componentDidUpdate(event) {
        this.unmountAndClean();
        // this.state = { ...event.data };
        // event.data = [{"theme":"createAdvert","questions":[{"title":"Насколько вам было удобно создать объявление?","questions_stat":[{"count_answers":1,"mark":4}, {"count_answers":1,"mark":4}]}]}];
        this.state.statistic = { ...event.data };
        console.log(this.state);
        this.renderAndDidMount();
      }

      refresh() {
        statisticControler.updateStatisticModel();
      }

      componentWillUnmount() {
        // document.getElementById('refresh_button').removeEventListener('click', this.refresh.bind(this));
      }
}