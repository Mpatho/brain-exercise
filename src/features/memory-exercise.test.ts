import { describe, expect, it } from '@jest/globals';
import { getRandomString, workingMemoryChallenge, MemoryChallenge } from './memory-exercise';


describe('getRandomString', () => {
    it.each([1, 2, 3, 4])('should create correct length', (length) => {
        const str = getRandomString(length);
        expect(str.length).toBe(length)
    });
});

describe('memoryChallenge', () => {
    it.each([1, 2, 3, 4, 5])('should create challenge of min legnth and max length', (level) => {
        const challenge = workingMemoryChallenge(level);
        const length = level + 2;
        expect(challenge.problem().length).toBe(length);
    });
});

describe('memory challenge', () => {
    it('should problem timeout in 1.5s', () => {
        const challenge = new MemoryChallenge('a');
        expect(challenge.problemTimeout()).toBe(1500);
    });

    it('should solution timeout in 1.5s', () => {
        const challenge = new MemoryChallenge('');
        expect(challenge.solutionTimeout()).toBe(1500);
    });

    it('should solution timeout in 2s', () => {
        const challenge = new MemoryChallenge('a');
        expect(challenge.solutionTimeout()).toBe(2000);
    });

    it('should solution timeout in 2.5s', () => {
        const challenge = new MemoryChallenge('aa');
        expect(challenge.solutionTimeout()).toBe(2500);
    });

    it('should solution timeout in 6s', () => {
        const challenge = new MemoryChallenge('123456789');
        expect(challenge.solutionTimeout()).toBe(6000);
    });

});

