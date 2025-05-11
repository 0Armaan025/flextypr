"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// Simple avatar component
const Avatar = ({ name, active = false }: any) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"];
    const randomColor = colors[name.length % colors.length];

    return (
        <div className={`relative flex items-center space-x-2 ${active ? "opacity-100" : "opacity-60"}`}>
            <div className={`${randomColor} h-8 w-8 rounded-full flex items-center justify-center text-white font-bold`}>
                {name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{name}</span>
            {active && (
                <span className="absolute -right-2 -top-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
        </div>
    );
};

// Main component
const TypeGame = () => {
    const code = usePathname().split("/")[2] || "ABC123";
    const containerRef = useRef<any>(null);
    const startTimeRef = useRef<any>(null);

    // Game state
    const [targetText, setTargetText] = useState("the quick brown fox jumps over the lazy dog");
    const [typedText, setTypedText] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isBlinking, setIsBlinking] = useState(true);
    const [status, setStatus] = useState("waiting");

    // Stats
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Add mock participant (just you)
    const [participants] = useState([
        { id: "you", name: "You", active: true }
    ]);

    // Timer for WPM calculation
    const [timerActive, setTimerActive] = useState(false);

    // Reset game
    const resetGame = useCallback(() => {
        setTypedText("");
        setCursorPosition(0);
        setStatus("waiting");
        setWpm(0);
        setElapsedTime(0);
        setTimerActive(false);
        startTimeRef.current = null;
    }, []);

    // Initialize game on mount
    useEffect(() => {
        resetGame();

        // Focus on the container
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, [resetGame]);

    // Handle cursor blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(prev => !prev);
        }, 530);
        return () => clearInterval(blinkInterval);
    }, []);

    // Handle timer for WPM calculation
    useEffect(() => {
        let interval = null;

        if (timerActive) {
            interval = setInterval(() => {
                const now = Date.now();
                if (startTimeRef.current) {
                    const elapsed = (now - startTimeRef.current) / 1000; // Convert to seconds
                    setElapsedTime(elapsed);

                    // Calculate WPM: (characters typed / 5) / (minutes elapsed)
                    if (elapsed > 0) {
                        const minutes = elapsed / 60;
                        const wordsTyped = typedText.length / 5;
                        const currentWpm = Math.round(wordsTyped / minutes);
                        setWpm(currentWpm);
                    }
                }
            }, 100);
        }

        return () => clearInterval(interval as any);
    }, [timerActive, typedText.length]);

    // Handle keydown events
    const handleKeyDown = (e: any) => {
        // Prevent default for spacebar
        if (e.key === " ") e.preventDefault();

        // Start timer on first keystroke
        if (status === "waiting") {
            setStatus("typing");
            setTimerActive(true);
            startTimeRef.current = Date.now();
        }

        if (status === "completed") return;

        if (e.key === "Backspace") {
            // Handle backspace
            if (typedText.length > 0) {
                setTypedText(prev => prev.slice(0, -1));
                setCursorPosition(prev => Math.max(0, prev - 1));
            }
            return;
        }

        // Only accept single characters
        if (e.key.length === 1) {
            const newTypedText = typedText + e.key;
            setTypedText(newTypedText);
            setCursorPosition(prev => prev + 1);

            // Check if challenge is completed
            if (newTypedText.length >= targetText.length) {
                const correctChars = newTypedText
                    .split('')
                    .filter((char, idx) => idx < targetText.length && char === targetText[idx])
                    .length;

                const finalAccuracy = Math.round((correctChars / targetText.length) * 100);
                setAccuracy(finalAccuracy);
                setStatus("completed");
                setTimerActive(false);
            }
        }
    };

    // Calculate character classes for text display
    const getCharClass = (char: any, idx: any) => {
        const baseClass = "relative transition-all duration-150";

        if (idx >= typedText.length) {
            return `${baseClass} text-gray-400`;
        }

        return typedText[idx] === char
            ? `${baseClass} text-gray-900 font-medium`
            : `${baseClass} text-red-500 bg-red-50 rounded`;
    };

    // Calculate accuracy in real-time
    const calculateCurrentAccuracy = () => {
        if (typedText.length === 0) return 100;

        const correctChars = typedText
            .split('')
            .filter((char, idx) => idx < targetText.length && char === targetText[idx])
            .length;

        return Math.round((correctChars / typedText.length) * 100);
    };

    const currentAccuracy = calculateCurrentAccuracy();

    // Get progress percentage
    const progressPercentage = Math.min(100, Math.round((typedText.length / targetText.length) * 100));

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 flex">
                {/* Main typing area */}
                <div className="flex-1 mr-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">SpeedType</h1>
                        <div className="bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-indigo-800">
                            Room: {code}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Stats area */}
                        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="text-sm">
                                    WPM: <span className="font-bold text-blue-600">{wpm}</span>
                                </div>
                                <div className="text-sm">
                                    Accuracy: <span className={`font-bold ${currentAccuracy > 90 ? 'text-green-500' :
                                        currentAccuracy > 70 ? 'text-yellow-500' : 'text-red-500'
                                        }`}>{currentAccuracy}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-1 w-full bg-gray-100">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            ></motion.div>
                        </div>

                        {/* Typing area */}
                        <div
                            ref={containerRef}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}
                            className="p-6 font-mono text-xl focus:outline-none cursor-text min-h-32 flex flex-col justify-center"
                        >
                            {/* Typing text */}
                            <div className="mb-4 leading-relaxed tracking-wide">
                                {targetText.split("").map((char, idx) => (
                                    <span
                                        key={idx}
                                        className={getCharClass(char, idx)}
                                    >
                                        {char}
                                        {idx === cursorPosition && (
                                            <>
                                                <motion.span
                                                    className={`absolute -right-px top-0 inline-block w-0.5 h-8 bg-blue-500 ml-0.5 ${isBlinking ? 'opacity-100' : 'opacity-0'}`}
                                                    animate={{ height: [28, 32, 28] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                ></motion.span>

                                                {/* Typing indicator with avatar */}
                                                <motion.div
                                                    className="absolute -top-8 -left-2"
                                                    initial={{ y: 5, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                >
                                                    <div className="bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        Y
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </span>
                                ))}
                                {cursorPosition >= targetText.length && (
                                    <motion.span
                                        className={`inline-block w-0.5 h-8 bg-blue-500 ml-0.5 ${isBlinking ? 'opacity-100' : 'opacity-0'}`}
                                        animate={{ height: [28, 32, 28] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    ></motion.span>
                                )}
                            </div>

                            {/* Status message */}
                            <div className="text-sm text-gray-500 italic">
                                {status === "waiting" && "Click here and start typing..."}
                                {status === "typing" && "Keep going..."}
                                {status === "completed" && (
                                    <button
                                        onClick={resetGame}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participants panel */}
                <div className="w-64">
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3 border-b pb-2">Participants</h3>
                        <div className="space-y-3">
                            {participants.map(participant => (
                                <Avatar
                                    key={participant.id}
                                    name={participant.name}
                                    active={participant.active}
                                />
                            ))}

                            {/* Empty state */}
                            {participants.length === 1 && (
                                <div className="text-sm text-gray-500 mt-2 italic">
                                    Waiting for others to join...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypeGame;