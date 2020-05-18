export interface SharedState {
  loading: {
    counter: number;
    visible: boolean;
  };
}

const state: SharedState = {
  loading: {
    counter: 0,
    visible: false,
  },
}

export default state
