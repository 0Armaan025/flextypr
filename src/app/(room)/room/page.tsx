'use client';
import { useState } from 'react';

const RoomPage = () => {
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [challengeType, setChallengeType] = useState('home-row');

    const challengeOptions = [
        { value: 'home-row', label: 'Home Row' },
        { value: 'top-row', label: 'Top Row' },
        { value: 'bottom-row', label: 'Bottom Row' },

        { value: 'symbols', label: 'Symbols' },
        { value: 'simple-words', label: 'Simple Words' },
        { value: 'complex-words', label: 'Complex Words' },
        { value: 'only-numbers', label: 'Only Numbers' },
        { value: 'only-symbols', label: 'Only Symbols' },
        { value: 'complex-sentences', label: 'Complex Sentences' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-4xl px-6 py-8 sm:px-0">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">FlexTypr Rooms</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Create Room Card */}
                    <div className="flex flex-col bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Room</h2>
                        <p className="text-gray-600 mb-6">Create a new typing room and invite friends with the generated code.</p>
                        <input
                            type="text"
                            placeholder="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="challenge-type">
                                Challenge Type
                            </label>
                            <select
                                id="challenge-type"
                                value={challengeType}
                                onChange={(e) => setChallengeType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                {challengeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mt-auto"
                            disabled={!roomName.trim()}
                        >
                            Create Room
                        </button>
                    </div>

                    {/* Join Room Card */}
                    <div className="flex flex-col bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Join Room</h2>
                        <p className="text-gray-600 mb-6">Enter a room code to join an existing typing challenge.</p>
                        <input
                            type="text"
                            placeholder="Room Code"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                        />
                        <button
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium mt-auto"
                            disabled={!roomCode.trim()}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomPage;