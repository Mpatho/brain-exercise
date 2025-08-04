import { useState, useEffect } from 'react';
import type { Exercise } from '../features/core';
import './Test.css'

function Problem({value}: {value: string}) {
    return (
        <div className='problem'>
            <h1>Problem</h1>
            <h1>{value}</h1>
        </div>
    )
}

function Solution({onSolution}: {onSolution: (solution: string) => void}) {
    return (
        <>
           <input className='solution' autoFocus={true} onChange={event => onSolution(event.target.value)} />
        </>
    )
}

function Summary({exercise: exercise} : {exercise: Exercise}) {
    return (
        <div className='summary'>
            {exercise.score()}
        </div>
    );
}

export default function Test({exercise}: {exercise: Exercise}) {
    const [repetition, setRepetition] = useState(0);
    const [showProblem, setShowProblem] = useState(true);
    const challenge =  exercise.repetition(repetition)
    useEffect(() => {
        if (!challenge) return;

        const timeout = showProblem ? challenge.problemTimeout() : challenge.solutionTimeout();
        const timer = setTimeout(() => {
            if (showProblem) {
                setShowProblem(false);
            } else {
                setRepetition(prev => prev + 1);
                setShowProblem(true);
            }
        }, timeout);
        return () => clearTimeout(timer);
    }, [repetition, showProblem]);
    return (
        <div className='test'>
            {challenge && showProblem && <Problem value={challenge.problem()}/>}
            {challenge && !showProblem && <Solution onSolution={solution => exercise.solution(repetition, solution)}/>}
            {!challenge && <Summary exercise={exercise} />}
        </div>
    );
}