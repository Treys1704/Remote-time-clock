import { useState } from 'react';
import Clock from './components/Clock';
import TeamList from './components/TeamList';
import { TeamMember } from './types';

const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Treys',
        location: 'Douala, Cameroon',
        time: '01:45',
        avatar: '🤩'
    },
    {
        id: '2',
        name: 'Kumail',
        location: 'Toronto, Canada',
        time: '23:38',
        avatar: '😊',
    },
    {
        id: '3',
        name: 'Stephane',
        location: 'San Francisco, USA',
        time: '13:12',
        avatar: '😎'
    },
    {
        id: '4',
        name: 'Isabella',
        location: 'Paris, France',
        time: '19:17',
        avatar: '😌'
    },
    {
        id: '5',
        name: 'Fabrice',
        location: 'London, UK',
        time: '05:41',
        avatar: '🤨'
    }
];

const DEFAULT_TIME = '15:30';

function App() {
    const [activeTime, setActiveTime] = useState(DEFAULT_TIME);

    const handleHover = (time: string) => {
        setActiveTime(time);
    }

    const handleMouseLeave = () => {
        setActiveTime(DEFAULT_TIME);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-3xl border border-gray-300 flex flex-col md:flex-row w-full md:max-w-3xl items-center">
                <div className="flex flex-col items-center md:w-1/2">
                    <div className="flex items-center gap-2 mb-8">
                        <h2 className="text-2xl font-semibold">Team</h2>
                        <span className="text-sm text-gray-500 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>{teamMembers.length} online</span>
                        </span>
                    </div>
                    <Clock time={activeTime} />
                </div>

                <div className="md:w-1/2 w-full md:bg-slate-50/50 p-4">
                    <TeamList
                        members={teamMembers}
                        onHover={handleHover}
                        onMouseLeave={handleMouseLeave}
                        activeTime={activeTime}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;