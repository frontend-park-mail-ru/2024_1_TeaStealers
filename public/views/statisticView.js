import { StatisticPage } from '@pages';
import { statisticModel, authModel } from '@models';

export class StatisticView {
  constructor() {
    this.parent = 'app';
    statisticModel.addObserver(this);
    authModel.addObserver(this);
    this.statisticPage = new StatisticPage(this.parent, {});
    console.log(this.statisticPage);
    // statisticModel.getMeInfo();
  }

  render() {
    this.statisticPage.renderAndDidMount();
  }

  update(event) {
    this.statisticPage.componentDidUpdate(event);
  }

  clean() {
    this.statisticPage.unmountAndClean();
  }
}
