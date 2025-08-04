import { describe, expect, it } from '@jest/globals';
import { OPERATOR, sumChallenge, subtChallenge, multChallenge, divChallenge, MathChallenge, mathChallenge, MathExercise } from './math-exercise';

describe('sumChallenge', () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])('should incement operends max by 10 per level', (level) => {
        const challenge = sumChallenge(level);
        const max = level * 10;
        expect(challenge.leftOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.rightOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.leftOperand).toBeLessThanOrEqual(max);
        expect(challenge.rightOperand).toBeLessThanOrEqual(max);
        expect(challenge.operator).toBe(OPERATOR.SUM)
    });
});

describe('subtChallenge', () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])('should incement operends max by 10 per level', (level) => {
        const challenge = subtChallenge(level);
        const max = level * 10;
        expect(challenge.leftOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.rightOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.leftOperand).toBeLessThanOrEqual(max);
        expect(challenge.rightOperand).toBeLessThanOrEqual(max);
        expect(challenge.operator).toBe(OPERATOR.SUBT)
    });
});

describe('multChallenge', () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])('should incement operends max by 5 per level', (level) => {
        const challenge = multChallenge(level);
        const max = level * 5;
        expect(challenge.leftOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.rightOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.leftOperand).toBeLessThanOrEqual(max);
        expect(challenge.rightOperand).toBeLessThanOrEqual(max);
        expect(challenge.operator).toBe(OPERATOR.MULT)
    });
});

describe('divChallenge', () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])('should incement rigt oparent and answer max by 5 per level', (level) => {
        const challenge = divChallenge(level);
        const max = level * 5;
        expect(challenge.rightOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.leftOperand / challenge.rightOperand).toBeGreaterThanOrEqual(1);
        expect(challenge.rightOperand).toBeLessThanOrEqual(max);
        expect(challenge.leftOperand / challenge.rightOperand).toBeLessThanOrEqual(max);
        expect(challenge.operator).toBe(OPERATOR.DIV)
    });
});

describe('MathChallenge', () => {
    describe('solution', () => {
        it.each([[1, 2, 3], [2, 3, 5], [10, 10, 20]])('should sum when the oparent is SUM', (leftOperand, rightOperand, sum) => {
            const challenge = new MathChallenge(leftOperand, rightOperand, OPERATOR.SUM);
            expect(challenge.solution()).toBe(sum);
        });

        it.each([[2, 2, 0], [8, 3, 5], [30, 10, 20]])('should subtract when the oparent is SUBT', (leftOperand, rightOperand, diff) => {
            const challenge = new MathChallenge(leftOperand, rightOperand, OPERATOR.SUBT);
            expect(challenge.solution()).toBe(diff);
        })

        it.each([[2, 2, 1], [8, 2, 4], [30, 10, 3]])('should divide when the oparent is DIV', (leftOperand, rightOperand, diff) => {
            const challenge = new MathChallenge(leftOperand, rightOperand, OPERATOR.DIV);
            expect(challenge.solution()).toBe(diff);
        });

        it.each([[2, 2, 4], [8, 2, 16], [30, 10, 300]])('should mutliple when the oparent is MULT', (leftOperand, rightOperand, product) => {
            const challenge = new MathChallenge(leftOperand, rightOperand, OPERATOR.MULT);
            expect(challenge.solution()).toBe(product);
        });
    });

    describe('stringfy', () => {
        it('should return summation challenge as text', () => {
            const challenge = new MathChallenge(1, 2, OPERATOR.SUM)
            expect(challenge.problem()).toBe('1 + 2')
        });

        it('should return multiplication challenge as text', () => {
            const challenge = new MathChallenge(1, 2, OPERATOR.MULT)
            expect(challenge.problem()).toBe('1 * 2')
        });

        it('should return division challenge as text', () => {
            const challenge = new MathChallenge(2, 2, OPERATOR.DIV)
            expect(challenge.problem()).toBe('2 / 2')
        });

        it('should return subtraction challenge as text', () => {
            const challenge = new MathChallenge(3, 2, OPERATOR.SUBT)
            expect(challenge.problem()).toBe('3 - 2')
        });
    });

});

describe('mathChallenge', () => {
    it('should not break', () => {
        const challenge = mathChallenge(1);
        expect(challenge.operator).toBeDefined();
        expect(challenge.leftOperand).toBeDefined();
        expect(challenge.rightOperand).toBeDefined();
        expect(challenge.solution()).toBeDefined();
    });

    describe('score', () => {
        it('should score 100%', () => {
            const excesirse = new MathExercise(1, 1);
            const challenge = excesirse.repetition(0);
            excesirse.solution(0, challenge.solution());
            expect(excesirse.score()).toBe(1);
        });

        it('should score 0%', () => {
            const excesirse = new MathExercise(1, 1);
            excesirse.solution(0, '-1');
            expect(excesirse.score()).toBe(0);
        });
    });
});