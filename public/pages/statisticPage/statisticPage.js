import { BaseComponent, Button } from '@components';
import statisticPage from './statisticPage.hbs';
import { statisticControler } from '@controllers';

const DEFAULT_STATISTICS = {
    statistic:
        [
            {
            title: 'Интерфейс',
            marks: [
                {
                    mark: '1',
                    mark_count: '10',
                },
                {
                    mark: '2',
                    mark_count: '15',
                },
                {
                    mark: '3',
                    mark_count: '5',
                }
            ]
            },
            {
                title: 'Формы',
                marks: [
                    {
                        mark: '1',
                        mark_count: '10',
                    },
                    {
                        mark: '2',
                        mark_count: '15',
                    },
                    {
                        mark: '3',
                        mark_count: '5',
                    }
                ]
            }
    ]
}

export class StatisticPage extends BaseComponent {
    constructor(parent, state) {
        state = { ...DEFAULT_STATISTICS };
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
        this.state = { ...event.data };
        this.renderAndDidMount();
      }

      refresh() {
        statisticControler.updateStatisticModel();
      }

      componentWillUnmount() {
        document.getElementById('refresh_button').removeEventListener('click', this.refresh.bind(this));
      }
}