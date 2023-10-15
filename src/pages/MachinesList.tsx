import { useEffect, useState } from "react"
import { BASE_URL, PATHS } from "../common/constants"
import SlotMachineItem, { TSlotMachineItem } from "../components/SlotMachineItem"
import { TMachineData, getMachines } from "../service/machines"
import "./MachinesList.css"

const MachinesList = () => {
  const [machinesData, setMachinesData] = useState<TMachineData[]>([])
  const [userBalance, setUserBalance] = useState<number>(100)

  const handleSelectMachine = (item: TSlotMachineItem) => {
    window.parent.frames[1].postMessage(
      JSON.stringify({
        item,
        userBalance,
      }),
      BASE_URL + PATHS.SELECTED_MACHINE
    )
  }

  useEffect(() => {
    getMachines()
      .then(data => setMachinesData(data.slotMachines))
      .catch((err: Error) => alert(err.message))

    const messageListener = (ev: MessageEvent) => {
      const { newUserBalance } = JSON.parse(ev.data)

      setUserBalance(newUserBalance)
    }

    window.addEventListener("message", messageListener)

    return () => {
      window.removeEventListener("message", messageListener)
    }
  }, [])

  return (
    <div className="machines-list">
      <h1>Welcome! Your balance is: {userBalance}$</h1>
      <ul>
        {machinesData.map(({ id, name, betAmounts }) => (
          <SlotMachineItem
            key={id}
            id={id}
            name={name}
            betAmounts={betAmounts}
            handleSelectMachine={handleSelectMachine}
          />
        ))}
      </ul>
    </div>
  )
}

export default MachinesList
