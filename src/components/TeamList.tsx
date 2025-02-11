import React from 'react';
import { TeamMember } from '../types';
interface TeamListProps {
    members: TeamMember[];
    onHover: (time: string) => void;
    onMouseLeave: () => void;
    activeTime: string;
}

const TeamList: React.FC<TeamListProps> = ({ members, onHover, activeTime, onMouseLeave }) => {
    return (
        <div className="space-y-3 w-full max-w-md" onMouseLeave={onMouseLeave}>
            {members.map((member) => (
                <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 rounded-3xl hover:bg-gray-200/50 cursor-pointer transition-colors
            ${activeTime === member.time ? 'bg-gray-50' : ''}`}
                    onMouseEnter={() => onHover(member.time)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {member.avatar}
                        </div>
                        <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.location}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-medium">{member.time}</span>
                        {member.timeOffset && (
                            <p className="text-sm text-gray-500">{member.timeOffset}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamList;