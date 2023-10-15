import { createBrowserRouter } from "react-router-dom"
import MachinesList from "../pages/MachinesList"
import App from "../App"
import { PATHS } from "../common/constants"
import SelectedMachine from "../pages/SelectedMachine"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: PATHS.MACHINES_LIST,
    element: <MachinesList />,
  },
  {
    path: PATHS.SELECTED_MACHINE,
    element: <SelectedMachine />,
  },
])
