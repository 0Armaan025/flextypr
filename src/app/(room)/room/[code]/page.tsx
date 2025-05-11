'use client';

import { useState, useEffect, useRef } from "react";
import { UserCircle, Trophy, Clock, RotateCw } from "lucide-react";

const CodeSubPage = () => {
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [visibleInputValue, setVisibleInputValue] = useState(''); // New state for displaying input
    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [accuracy, setAccuracy] = useState(100);
    const [mistakes, setMistakes] = useState(0);
    const inputRef = useRef<any>(null);
    const [userName, setUserName] = useState('Speed Typer'); // Added user name state
    const [userColor, setUserColor] = useState('#4F46E5'); // Added user color state for profile

    const strings = ['asdf; jkl; gh; as": saf adfas;', 'e13431234312'];
    const currentString = strings[currentStringIndex];

    // Start timer on first keypress
    useEffect(() => {
        if (index === 1 && !startTime) {
            setStartTime(Date.now() as any);
        }
    }, [index, startTime]);

    // Calculate WPM
    useEffect(() => {
        if (startTime && index > 0) {
            const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
            const wordsTyped = index / 5; // Standard: 5 characters = 1 word
            const currentWpm = Math.round(wordsTyped / timeElapsed);
            setWpm(currentWpm);
        }
    }, [index, startTime]);

    // Handle string completion
    useEffect(() => {
        if (index === currentString.length) {
            // Focus the input field for the next string
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 100);

            // If completed all strings
            if (currentStringIndex === strings.length - 1) {
                setIsComplete(true);
            } else {
                // Move to next string
                setCurrentStringIndex(currentStringIndex + 1);
            }

            // Reset for next string
            setIndex(0);
            setInputValue('');
            setVisibleInputValue('');
        }
    }, [index, currentString.length, currentStringIndex, strings.length]);

    const handleChange = (e: any) => {
        const value = e.target.value;

        // Show the value briefly
        setVisibleInputValue(value);

        // If backspace was pressed
        if (value.length < inputValue.length) {
            if (index > 0) {
                setIndex(index - 1);
            }
            // Clear visible input after short delay
            setTimeout(() => setVisibleInputValue(''), 300);
            setInputValue(value);
            return;
        }

        // Check if the character typed matches
        const lastLetter = value.charAt(value.length - 1);
        if (lastLetter === currentString.charAt(index)) {
            setIndex(index + 1);
        } else {
            // Track mistakes for accuracy calculation
            setMistakes(mistakes + 1);
            const totalAttempts = index + mistakes + 1;
            const newAccuracy = Math.round((index / totalAttempts) * 100);
            setAccuracy(newAccuracy);
        }

        setInputValue(value);

        // Clear visible input after short delay
        setTimeout(() => setVisibleInputValue(''), 300);
    };

    const resetExercise = () => {
        setIndex(0);
        setInputValue('');
        setVisibleInputValue('');
        setCurrentStringIndex(0);
        setStartTime(null);
        setWpm(0);
        setIsComplete(false);
        setMistakes(0);
        setAccuracy(100);
        if (inputRef.current) inputRef.current.focus();
    };

    // Calculate progress percentage
    const progress = Math.round((index / currentString.length) * 100);

    // Profile picture component with initials
    const ProfilePicture = () => {
        const initials = userName.split(' ').map(name => name[0]).join('').toUpperCase();

        return (
            <div className="relative">
                <div
                    className="flex items-center justify-center rounded-full w-12 h-12 text-white font-bold text-lg"
                    style={{ backgroundColor: userColor }}
                >
                    {initials}
                </div>
                {index >= 3 && (
                    <div className="absolute right-0 bottom-0 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                {/* Header with profile */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <ProfilePicture />
                        <div className="ml-3">
                            <h2 className="font-bold text-lg">{userName}</h2>
                            <p className="text-gray-500 text-sm">Practicing makes perfect</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center text-amber-500">
                                <Trophy size={20} className="mr-1" />
                                <span className="font-bold">{accuracy}%</span>
                            </div>
                            <span className="text-xs text-gray-500">Accuracy</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center text-blue-500">
                                <Clock size={20} className="mr-1" />
                                <span className="font-bold">{wpm}</span>
                            </div>
                            <span className="text-xs text-gray-500">WPM</span>
                        </div>
                    </div>
                </div>

                {/* Typing challenge area */}
                {!isComplete ? (
                    <>
                        <div className="text-center mb-8">
                            <div className="text-2xl font-mono bg-gray-50 p-4 rounded-lg select-none leading-loose">
                                {currentString.split('').map((char, i) => {
                                    let className = "text-gray-400";
                                    if (i < index) className = "text-green-500 font-bold";
                                    if (i === index) className = "text-blue-500 bg-blue-100 px-1 rounded";
                                    return (
                                        <span key={i} className={className}>
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {/* Input field */}
                        <div className="flex items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full border-2 border-gray-300 rounded-lg p-4 text-center text-xl font-mono focus:outline-none focus:border-blue-500"
                                placeholder="Type here..."
                                value={visibleInputValue}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>

                        {/* Stats */}
                        <div className="mt-6 flex justify-between text-sm text-gray-500">
                            <div>String: {currentStringIndex + 1}/{strings.length}</div>
                            <div>Characters: {index}/{currentString.length}</div>
                        </div>
                    </>
                ) : (
                    // Completion screen
                    <div className="flex flex-col items-center py-10">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold mb-2">Well done!</h2>
                        <p className="text-gray-600 mb-6">You've completed all typing challenges</p>

                        <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-xs">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-blue-600">{wpm}</div>
                                <div className="text-sm text-gray-500">WPM</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                                <div className="text-sm text-gray-500">Accuracy</div>
                            </div>
                        </div>

                        <button
                            onClick={resetExercise}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            <RotateCw size={18} className="mr-2" />
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeSubPage;