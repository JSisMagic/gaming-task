import { PATHS, BASE_URL } from "./common/constants"

function App(): JSX.Element {
  return (
    <>
      <iframe name="machines-list" src={BASE_URL + PATHS.MACHINES_LIST} />
      <iframe name="selected-machines" src={BASE_URL + PATHS.SELECTED_MACHINE} />
    </>
  )
}

export default App
