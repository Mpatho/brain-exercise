import type { Challenge, Exercise } from "./core";

function getRandomInt(max: number): number {
    const int = Math.ceil(Math.random() * (max - 1));
    return int < 1 ? 1 : int;
}

function getRandomEnumValue<T extends object>(enumObj: T): T[keyof T] {
    const values = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

export enum OPERATOR {
    SUM = '+',
    SUBT = '-',
    MULT = '*',
    DIV = '/'
}

export class MathChallenge implements Challenge {
    private _leftOperand: number;
    private _rightOperand: number;
    private _operator: OPERATOR;

    constructor(leftOperand: number, rightOperand: number, operator: OPERATOR) {
        this._leftOperand = leftOperand;
        this._rightOperand = rightOperand;
        this._operator = operator
    }

    get leftOperand(): number {
        return this._leftOperand;
    }


    get rightOperand(): number {
        return this._rightOperand;
    }

    get operator(): OPERATOR {
        return this._operator;
    }

    public solution(): string {
       return eval(this.problem());
    }

    public problem(): string {
        return `${this._leftOperand} ${this._operator} ${this._rightOperand}`;
    }

    public solutionTimeout(): number {
        return 2000;
    }

    public problemTimeout(): number {
        return 2000;
    }
}

export function sumChallenge(level: number): MathChallenge {
    const max = level * 10;
    const rightOperand = getRandomInt(max);
    const leftOperand = getRandomInt(max);
    return new MathChallenge(leftOperand, rightOperand, OPERATOR.SUM)
}

export function divChallenge(level: number): MathChallenge {
    const max = level * 5;
    const rightOperand = getRandomInt(max);
    const leftOperand = getRandomInt(max) * rightOperand;
    return new MathChallenge(leftOperand, rightOperand, OPERATOR.DIV)
}

export function multChallenge(level: number): MathChallenge {
    const max = level * 5
    const rightOperand = getRandomInt(max);
    const leftOperand = getRandomInt(max);
    return new MathChallenge(leftOperand, rightOperand, OPERATOR.MULT)
}

export function subtChallenge(level: number): MathChallenge {
    const max = level * 10;
    let rightOperand = getRandomInt(max);
    let leftOperand = getRandomInt(max);
    if (leftOperand < rightOperand) {
        [ leftOperand, rightOperand ] = [ rightOperand, leftOperand ]
    }
    return new MathChallenge(leftOperand, rightOperand, OPERATOR.SUBT)
}

export function mathChallenge(level: number): MathChallenge {
    switch(getRandomEnumValue(OPERATOR)) {
        case OPERATOR.SUM: return sumChallenge(level);
        case OPERATOR.SUBT: return subtChallenge(level);
        case OPERATOR.MULT: return multChallenge(level);
        case OPERATOR.DIV: return divChallenge(level);
    }
}

export class MathExercise implements Exercise {
    private challenges: MathChallenge[];
    private solutions: string[];

    constructor(level: number, repitations: number) {
        this.challenges =  Array.from({ length: repitations }, () => mathChallenge(level));
        this.solutions =  Array.from({ length: repitations }, () => '');
    }

    repetition(repetition: number): Challenge {
        return this.challenges[repetition];
    }

    repetitions(): number {
        return this.challenges.length;
    }

    solution(repetition: number, solution: string): void {
        this.solutions[repetition] = solution;
    }

    score(): number {
        let score = 0;
        for (let repetition = 0; repetition < this.repetitions(); repetition++) {
            const challenge = this.challenges[repetition];
            const solution = this.solutions[repetition];
            if (challenge.solution() == solution) {
                score++;
            }
        };
        return score / this.repetitions();
    }
}