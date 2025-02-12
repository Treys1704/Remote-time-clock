import { motion, useAnimation } from 'framer-motion';
import React, {useEffect} from 'react';

interface ClockProps {
    time: string;
}

const Clock: React.FC<ClockProps> = ({ time }) => {
    const [hours, minutes] = time.split(':').map(Number);
    const redHandControls = useAnimation();

    const hourDegrees = (hours % 12 + minutes / 60) * 30;
    const minuteDegrees = minutes * 6;

    useEffect(() => {
        const animate = async () => {
            await redHandControls.start({
                rotate: 360,
                transition: {
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity
                }
            });
        }
        animate();
    }, [redHandControls]);

    return (
        <div className="w-60 h-60 relative">
            <div className="w-full h-full rounded-full border-2 border-gray-200 relative">
                {/* Clock markers - Main hour markers */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-5 bg-gray-300 ml-[116px] -mt-0.5"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(2px)`,
                            transformOrigin: '50% 120px',
                        }}
                    />
                ))}

                {/* Smaller minute markers */}
                {[...Array(12)].map((_, hourIndex) => (
                    [...Array(4)].map((_, minIndex) => (
                        <div
                            key={`minute-${hourIndex}-${minIndex}`}
                            className="absolute w-0.5 h-2 bg-gray-200 ml-[116px] -mt-0.5"
                            style={{
                                transform: `rotate(${hourIndex * 30 + (minIndex + 1) * 6}deg) translateY(2px)`,
                                transformOrigin: '50% 120px',
                            }}
                        />
                    ))
                ))}

                {/* Hour hand (shorter, black) */}
                <motion.div
                    className="absolute w-1.5 h-16 bg-black rounded-full origin-bottom z-10"
                    style={{
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: '50% 100%',
                    }}
                    animate={{ rotate: hourDegrees }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    layout
                />

                {/* Minute hand (longer, black) */}
                <motion.div
                    className="absolute w-1 h-24 bg-gray-600 rounded-full origin-bottom z-10"
                    style={{
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: '50% 100%',
                    }}
                    animate={{ rotate: minuteDegrees }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    layout
                />

                {/* Dynamic red seconds hand */}
                <motion.div
                    className="absolute w-0.5 h-24 bg-red-600 rounded-full"
                    style={{
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: '50% 100%',
                    }}
                    animate={redHandControls}
                />

                {/* Center dot */}
                <div className="absolute w-[12px] h-[12px] bg-black rounded-full z-10"
                     style={{
                         left: '51%',
                         top: '50%',
                         transform: 'translate(-50%, -50%)',
                     }}
                />
            </div>

            <h2 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-2xl font-medium">
                {time}
            </h2>
        </div>
    );
};

export default Clock;