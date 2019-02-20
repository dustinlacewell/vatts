export class GuessingGame {
    lower: number;
    upper: number;
    target: number | null;

    constructor(lower = 1, upper = 100) {
        this.lower = lower;
        this.upper = upper;
        this.target = null;
    }

    start(who, lower?: number, upper?: number) {
        this.lower = lower || this.lower;
        this.upper = upper || this.upper;
        this.target = math.random(this.lower, this.upper);
        print(`Guess a number between ${this.lower} and ${this.upper} (inclusive!)`)
    }

    finish(who) {
        print(`${who.steam_name} won the game!`);
        this.target = null;
    }

    terminate(who) {
        print(`${who.steam_name} terminated the game :(`);
        this.target = null;
    }

    guess(message: string, who) {
        if (this.target == null) {
            return;
        }

        const guess = tonumber(message)
        if (guess == null) {
            return;
        }

        if (guess == this.target) {
            this.finish(who);
        } else if (guess < this.target) {
            print("Higher!");
        } else {
            print("Lower!");
        }
    }
}