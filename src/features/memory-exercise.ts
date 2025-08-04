import type { Challenge, Exercise } from "./core";

const characters = 'abcdefghijklmnopqrstuvwxyz';

export function getRandomString(length: number) {
    return Array.from({ length }, () => Math.floor(Math.random() * characters.length))
        .map(index => characters[index])
        .join('');
}

export class MemoryChallenge implements Challenge {
    private _problem: string;

    constructor(problem: string) {
        this._problem = problem;
    }

    solution(): string {
        return this._problem;
    }

    problem(): string {
        return this._problem;
    }

    solutionTimeout(): number {
        return 1500 + (500 * this._problem.length);
    }

    problemTimeout(): number {
        return 1500;
    }
}

export function workingMemoryChallenge(level: number): MemoryChallenge {
    const problem = getRandomString(level + 2);
    return new MemoryChallenge(problem)
}

export class WorkingMemoryExercise implements Exercise {
    private challenges: MemoryChallenge[];
    private solutions: string[];

    constructor(level: number, repitations: number) {
        this.challenges =  Array.from({ length: repitations }, () => workingMemoryChallenge(level));
        this.solutions =  Array.from({ length: this.challenges.length }, () => '');
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