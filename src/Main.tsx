import React, { Component } from "react";
import { App } from "./App";
import HistoricalDatesBlock from "./components/HistoricalDatesBlock";
import { timeSlicesMock } from "./components/HistoricalDatesBlock/data/timeSlices.mock";

export interface MainProps {
  app: App;
}

interface MainState {}

export class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <>
        <HistoricalDatesBlock slices={timeSlicesMock} />
      </>
    );
  }
}
