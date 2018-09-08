import { observable, computed, action } from 'mobx'

export default class AppStore {
    @observable cnt = 0;

    @action
    add = () => {
        this.cnt++;
    }
    @action
    sub = () => {
        this.cnt--;
    }
    @computed
    get getCnt() {
        return this.cnt;
    }

}