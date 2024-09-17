import { useEffect, useState } from "react";
import kroman from "kroman";

import { FrequencyData } from "../types";
import { KoreanCharacter, StyledTextField } from "./styles";

interface Props {
    frequencyData: FrequencyData,
    onAnswer: (isCorrect: boolean) => void
}

function LetterForm({ frequencyData, onAnswer }: Props) {
    const [currentCharacter, setCurrentCharacter] = useState<string>('');
    const [englishCharacter, setEnglishCharacter] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    function getCharacter() {
        const num = Math.floor(Math.random() * (frequencyData.total + 2));
        for (const key of Object.keys(frequencyData)) {
            if (num < frequencyData[key].runningSum) {
                return key;
            }
        }
        throw new Error('No character found');
    }

    function prepareRound() {
        const char = getCharacter();
        setCurrentCharacter(char);
        setEnglishCharacter(kroman.parse(char));
        console.log(kroman.parse(char));
    }

    function submitAnswer(answer: string) {
        onAnswer(answer.toLowerCase() === englishCharacter.toLowerCase());
        prepareRound();
        setAnswer('');
    }

    useEffect(() => {
        prepareRound();
    }, []);


    return (<>
        <KoreanCharacter>
            {currentCharacter}
        </KoreanCharacter>
        <StyledTextField
            fullWidth
            variant="outlined"
            value={answer}
            onKeyDown={e => {
                const value = (e.target as HTMLInputElement).value;
                if (e.key === 'Enter') {
                    submitAnswer(value);
                }
            }
            }
            onChange={
                e => setAnswer(e.target.value)
            }
        />
    </>);
}


export default LetterForm;