import { StatisticPage } from '@pages';
import { statisticModel, authModel } from '@models';

export class StatisticView {
  constructor() {
    this.parent = 'app';
    statisticModel.addObserver(this);
    authModel.addObserver(this);
    this.statisticPage = new StatisticPage(this.parent, {});
    statisticModel.updateState();
    console.log(this.statisticPage);
  }

  render() {
    this.statisticPage.renderAndDidMount();
  }

  update(event) {
    console.log('пришлиприезали');
    this.statisticPage.componentDidUpdate(event);
  }

  clean() {
    this.statisticPage.unmountAndClean();
  }
}
