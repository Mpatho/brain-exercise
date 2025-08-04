interface Challenge {
    solution(): string;
    problem(): string;
    solutionTimeout(): number;
    problemTimeout(): number;
};

interface Exercise {
    repetition(repetition: number): Challenge;
    repetitions(): number;
    solution(repetition: number, solution: string): void;
    score(): number;
}

interface ExerciseContractor {
    new (level: number, repetations: number): Exercise;
};

export type { Challenge, Exercise, ExerciseContractor }