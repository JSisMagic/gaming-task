interface SlotMachineInterface {
  id: number
  name: string
  betAmount: number
  placeBet: (betAmount: number) => void
  spin: () => number
}

export class SlotMachine implements SlotMachineInterface {
  #id: number
  #name: string
  #betAmount: number = 0

  constructor(id: number, name: string) {
    this.#id = id
    this.#name = name
  }

  placeBet(betAmount: number) {
    this.#betAmount = betAmount
  }

  spin(): number {
    return (Math.random() - 0.5) * 2
  }

  get id(): number {
    return this.#id
  }

  get name(): string {
    return this.#name
  }

  get betAmount(): number {
    return this.#betAmount
  }
}
