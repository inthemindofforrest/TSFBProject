import { Inventory, item } from "./game/Inventory";

interface IQuestConditional {
    evaluateConditional(): boolean
}

class QuestConditionalContainItems implements IQuestConditional {
    requiredItems: item[]
    inventory: Inventory

    constructor(inventory: Inventory, items: item[]) {
        this.inventory = inventory
        this.requiredItems = items
    }

    public evaluateConditional(): boolean {
        let hasRequiredItems = true
        this.requiredItems.forEach((item) => {
            if (!this.inventory.items.includes(item)) {
                hasRequiredItems = false
            }
        })
        return hasRequiredItems
    }
}

interface IQuest {
    name: string
    description: string
    reward: item | null
    prerequisites: IQuest[]
    questConditional: IQuestConditional | null
    isCompleted: boolean
}

class Quest implements IQuest {
    name: string
    description: string
    prerequisites: Quest[] = []
    reward: item | null
    questConditional: IQuestConditional | null

    isCompleted: boolean = false

    constructor(name: string, description: string, reward: item | null, conditional?: IQuestConditional) {
        this.name = name
        this.description = description

        if (reward === null) {
            reward = null
        }
        this.reward = reward

        if (conditional) {
            this.questConditional = conditional
        }
        else {
            this.questConditional = null
        }

    }

    public complete(): void {
        let prerequisitesCompleted = true
        let questConditional = false

        if (!this.prerequisites) {
            this.complete()
            return
        }

        this.prerequisites.forEach((prerequisites, index) => {
            if (!prerequisites.isCompleted) {
                prerequisitesCompleted = false
            }
        })

        if (prerequisitesCompleted) {
            if (this.questConditional) {
                if (this.questConditional.evaluateConditional()) {
                    questConditional = true
                }
            }
            else {
                questConditional = true
            }

        }

        this.isCompleted = prerequisitesCompleted && questConditional
    }

    public addPrerequisite(quest: Quest) {
        this.prerequisites?.push(quest)
    }

    public describe(): string {
        let prereqsFinished = true
        this.prerequisites.forEach((prereq, index) => {
            if (!prereq.isCompleted) {
                prereqsFinished = false
            }
        })

        return `Quest: ${this.name} ${this.description} ${prereqsFinished ? this.isCompleted ? `(Completed)` : `(In Progress)` : `(Locked)`}`
    }
}

class QuestLog {
    quests: Quest[] = []
    inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }

    public addQuest(quest: Quest, prereq: Quest[] | null) {
        if (prereq === null) {
            this.quests.push(quest)
            return
        }

        this.quests.forEach((questFromList) => {
            if (prereq.find((e) => e.name === questFromList.name)) {
                quest.addPrerequisite(questFromList)
            }
        })

        this.quests.push(quest)
    }

    public completeQuest(questName: string): void {
        const quest = this.quests.find((e) => e.name === questName)

        if (!quest) {
            console.log(`Quest: ${questName} could not be found`)
            return
        }

        quest?.complete()

        if (quest.reward) {
            this.inventory.addItem(quest.reward)
        }
    }

    public viewQuests(): string {
        let quests: string = `Quest Log: `

        this.quests.forEach((quest, index) => {
            quests += `${index + 1}. ${quest.describe()} `
        })

        return quests
    }

    public evaluateQuests(): void {
        this.quests.forEach((quest) => {
            this.completeQuest(quest.name)
        })
    }
}