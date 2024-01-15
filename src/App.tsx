import "./App.scss";
import CutBoardForm from "./features/cutBoardForm";
import DetailsDataTable from "./features/detailsDataTable";
import Boards from "./features/boards";

const App = () => (
  <main className="App">
    <CutBoardForm />
    <DetailsDataTable />
    <Boards />
  </main>
);

export default App;
