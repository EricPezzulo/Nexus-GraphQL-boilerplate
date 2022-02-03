interface DarkModeState {
  isDarkMode: boolean;
}

const initialState = {
  isDarkMode: false,
};

type Action = {
  type: string;
};
const darkModeReducer = (
  state: DarkModeState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "toggleDarkMode":
      return { ...state, isDarkMode: !state.isDarkMode };

    default:
      return state;
  }
};
export default darkModeReducer;
