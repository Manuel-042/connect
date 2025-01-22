import { LuPlus, LuX } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import { PollChoice, PollLength } from '../../../types';

interface PollCreatorProps {
    onClose: () => void;
    choices: PollChoice[];
    setChoices: React.Dispatch<React.SetStateAction<PollChoice[]>>
    pollLength: PollLength;
    setPollLength:  React.Dispatch<React.SetStateAction<PollLength>>
}

const PollCreator = ({ onClose, choices, setChoices, pollLength, setPollLength }: PollCreatorProps) => {

    const addChoice = () => {
        if (choices.length < 4) {
            setChoices([...choices, { text: '', id: uuidv4() }]);
        }
    };

    const removeChoice = (id: string) => {
        if (choices.length > 2) {
            setChoices(choices.filter(choice => choice.id !== id));
        }
    };

    const updateChoice = (id: string, text: string) => {
        setChoices(choices.map(choice => 
            choice.id === id ? { ...choice, text } : choice
        ));
    };

    return (
        <div className="bg-black border border-dark-border rounded-xl">
            <div className="space-y-3 border-b border-dark-border p-4">
                {choices.map((choice, index) => (
                    <div key={choice.id} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={choice.text}
                            onChange={(e) => updateChoice(choice.id, e.target.value)}
                            placeholder={`Choice ${index + 1}`}
                            maxLength={25}
                            className="w-full h-14 dark:text-white bg-transparent border border-dark-border rounded-md p-2 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">{choice.text.length}/25</span>
                        {choices.length > 2 && (
                            <button 
                                onClick={() => removeChoice(choice.id)}
                                className="text-gray-500 hover:text-gray-400"
                            >
                                <LuX size={16} />
                            </button>
                        )}
                    </div>
                ))}

                {choices.length < 4 && (
                    <button
                        onClick={addChoice}
                        className="text-blue-500 hover:text-blue-400 flex items-center gap-2"
                    >
                        <LuPlus size={16} />
                        Add choice
                    </button>
                )}
            </div>

            <div className="mt-4 px-4 border-b border-dark-border">
                <h4 className="text-sm font-medium mb-2 dark:text-white">Poll length</h4>
                <div className="flex gap-3 mb-3 w-full">
                    <select
                        value={pollLength.days}
                        onChange={(e) => setPollLength({ ...pollLength, days: Number(e.target.value) })}
                        className="flex-1 bg-transparent border border-dark-border dark:text-white rounded-md p-2"
                    >
                        {[...Array(8)].map((_, i) => (
                            <option key={i} value={i} className='dark:bg-black dark:text-white'>{i} Days</option>
                        ))}
                    </select>
                    <select
                        value={pollLength.hours}
                        onChange={(e) => setPollLength({ ...pollLength, hours: Number(e.target.value) })}
                        className="flex-1 bg-transparent border border-dark-border dark:text-white rounded-md p-2"
                    >
                        {[...Array(24)].map((_, i) => (
                            <option key={i} value={i} className='dark:bg-black dark:text-white'>{i} Hours</option>
                        ))}
                    </select>
                    <select
                        value={pollLength.minutes}
                        onChange={(e) => setPollLength({ ...pollLength, minutes: Number(e.target.value) })}
                        className="flex-1 bg-transparent border border-dark-border dark:text-white rounded-md p-2"
                    >
                        {[...Array(60)].map((_, i) => (
                            <option key={i} value={i} className='dark:bg-black dark:text-white'>{i} Minutes</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={onClose}
                className="text-red-500 hover:bg-red-600 hover:bg-opacity-10 rounded-b-lg w-full text-center h-12"
            >
                Remove poll
            </button>
        </div>
    );
};

export default PollCreator
