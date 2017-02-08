import { render } from "react-dom";

export default app => () => {
  render(app(), document.querySelector("#app"));
};
