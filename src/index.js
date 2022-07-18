import AppNavigator from "./navigation/index";
import { Provider } from "react-redux";
import { store } from "./store";
import { init } from "./db";

init()
  .then(() => {
    console.log("DB initialized");
  })
  .catch((err) => {
    console.log("Error initializing DB", err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
