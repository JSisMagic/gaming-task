import { useEffect, useState } from "react"
import { BASE_URL, OUTCOMES, PATHS } from "../common/constants"
import { SlotMachine } from "../models/SlotMachineModel"
import { TSlotMachineItem } from "../components/SlotMachineItem"
import "./SelectedMachine.css"

type TMachineData = {
  item: SlotMachine
  betAmounts: number[]
  currentBet: number
  outcome?: 0 | 1
}

const sendDataToMachineList = (data: { newUserBalance: number }) => {
  window.parent.frames[0].postMessage(JSON.stringify(data), BASE_URL + PATHS.MACHINES_LIST)
}

const SelectedMachine = () => {
  const [machineData, setMachineData] = useState<TMachineData | null>()
  const [userBalance, setUserBalance] = useState<number>(0)

  const handlePlaceBet = (amount: number) => {
    machineData?.item.placeBet(amount)
    setMachineData(prev => ({ ...prev!, currentBet: amount }))
  }

  const handleSpin = () => {
    if (!machineData?.currentBet) {
      return alert("Bet amount should be > 0")
    }

    if (userBalance < machineData!.item.betAmount) {
      return alert("Insufficient funds!")
    }

    const outcome = machineData!.item.spin() > 0 ? 1 : 0
    const newUserBalance =
      outcome === OUTCOMES.LOSS
        ? userBalance - machineData.currentBet
        : userBalance + machineData.currentBet

    const requestObj = {
      newUserBalance: newUserBalance,
    }

    sendDataToMachineList(requestObj)
    setMachineData(prev => ({ ...prev!, outcome: outcome }))
    setUserBalance(newUserBalance)
  }

  useEffect(() => {
    const messageListener = (ev: MessageEvent) => {
      if (ev.source?.name.endsWith("machines-list")) {
        const { item, userBalance }: { item: TSlotMachineItem; userBalance: number } = JSON.parse(
          ev.data
        )

        setUserBalance(userBalance)
        setMachineData({
          item: new SlotMachine(item.id, item.name),
          betAmounts: item.betAmounts,
          currentBet: 0,
        })
      }
    }

    window.addEventListener("message", messageListener)

    return () => window.removeEventListener("message", messageListener)
  }, [])

  return machineData ? (
    <div className="selected-machine">
      <h2>{machineData?.item.name}</h2>
      <p>id: {machineData?.item.id}</p>

      <div className="bets-wrapper">
        <input disabled value={machineData.currentBet} />
        <div className="bet-options">
          {machineData?.betAmounts.map(amount => (
            <button key={amount} onClick={handlePlaceBet.bind(null, amount)}>
              {amount}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleSpin} className="spin-btn">
        SPIN!
      </button>
      {machineData.outcome !== undefined && (
        <h2 className="outcome">
          You {machineData.outcome === OUTCOMES.LOSS ? "lost" : "won"} {machineData.currentBet}$
        </h2>
      )}
    </div>
  ) : (
    <h2 className="text">Select a machine from the list to play</h2>
  )
}

export default SelectedMachine
