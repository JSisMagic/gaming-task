export type TMachineData = {
  id: number
  name: string
  betAmounts: number[]
}

const getMachines = () => {
  return new Promise<{ slotMachines: TMachineData[] }>((resolve, reject) => {
    resolve({
      slotMachines: [
        {
          id: 1,
          name: "Slot Machine A",
          betAmounts: [1, 5, 10, 20],
        },
        {
          id: 2,
          name: "Slot Machine B",
          betAmounts: [2, 5, 25, 50],
        },
        {
          id: 3,
          name: "Slot Machine C",
          betAmounts: [5, 10, 25, 100],
        },
      ],
    })
  })
}

export { getMachines }
