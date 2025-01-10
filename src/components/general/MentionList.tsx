import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { MentionListProps } from '../../types';


const MentionList = forwardRef<any, MentionListProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
        const item = props.items[index];
        if (item) {
            props.command({ id: item.profile_username });
        }
    };

    const upHandler = () => {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
        selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
            if (event.key === 'ArrowUp') {
                upHandler();
                return true;
            }
            if (event.key === 'ArrowDown') {
                downHandler();
                return true;
            }
            if (event.key === 'Enter') {
                enterHandler();
                return true;
            }
            return false;
        },
    }));

    return (
        <div className="absolute z-50 w-60 bg-dark dark:bg-gray-800 rounded-lg shadow-white shadow-sm">
            {props.items.length ? (
                props.items.map((item, index) => (
                    <button
                        key={item.username}
                        onClick={() => selectItem(index)}
                        className={`flex items-center w-full py-3 px-5 hover:bg-gray-700 hover:bg-opacity-10 dark:hover:bg-gray-700 ${index === selectedIndex ? 'bg-gray-700 bg-opacity-10 dark:bg-gray-700' : ''
                            }`}
                    >
                        <img
                            src={item.avatar}
                            alt={item.username}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="flex flex-col text-left">
                            <span className="font-medium text-white">{item.username}</span>
                            <span className="text-sm text-gray-500">@{item.profile_username}</span>
                        </div>
                    </button>
                ))
            ) : (
                <div className="p-2 text-gray-500">No users found</div>
            )}
        </div>
    );
});

export default MentionList;