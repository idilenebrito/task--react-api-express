import App from "../App";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ModalEditar from "../components/ModalEditar";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/editar/:id" element={<ModalEditar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
