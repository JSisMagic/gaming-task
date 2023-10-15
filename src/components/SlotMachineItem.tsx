import "./SlotMachineItem.css"

export type TSlotMachineItem = {
  id: number
  name: string
  betAmounts: number[]
}

type TSlotMachineItemProps = TSlotMachineItem & {
  handleSelectMachine: (item: TSlotMachineItem) => void
}

const SlotMachineItem = ({
  id,
  name,
  betAmounts,
  handleSelectMachine,
}: TSlotMachineItemProps): JSX.Element => {
  return (
    <li className="machine-list-item">
      <h2 onClick={() => handleSelectMachine({ id, name, betAmounts })}>{name}</h2>
      <p>id: {id}</p>
      <div className="bet-options">
        {betAmounts.map(amount => (
          <button key={amount} disabled>{amount}</button>
        ))}
      </div>
    </li>
  )
}

export default SlotMachineItem
