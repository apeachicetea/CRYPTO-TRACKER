import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

interface ICoinsProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router() {
  return (
    <BrowserRouter>
      {/* Switch는 단 하나만 렌더링 해주는 역활 */}
      <Switch>
        <Route exact path='/'>
          <Coins />
        </Route>
        <Route path='/:coinId'>
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
