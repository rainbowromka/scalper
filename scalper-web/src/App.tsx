import React, {Component} from 'react';
import FullScreenLayout from "./layout/FullScreenLayout";
import AppStore from "./store/AppStore";
import {observer, Provider} from "mobx-react";
import AppScreen from "./layout/AppScreen";


class RootStore {
  store: AppStore;

  constructor() {
    this.store = new AppStore();
  }
}

@observer
export default class App extends Component<any, {}> {

  constructor(props: any) {
    super(props);
    this.rootStore = new RootStore();
  }

  rootStore: RootStore;

  render() {
    return (
        <FullScreenLayout store={this.rootStore.store}>
            {/* TODO: Внедрить компонент ROUTER и прописать авторизацию */}
          <Provider rootStore={this.rootStore} store={this.rootStore.store}>
            <AppScreen/>
          </Provider>
        </FullScreenLayout>
    );
  }
}

