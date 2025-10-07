import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { useState } from 'react';

interface VideoConferenceCardProps {
    doctorName: string;
    doctorImage: string;
    patientImage?: string;
    isCallActive?: boolean;
}

export default function VideoConferenceCard({
    doctorName,
    doctorImage,
    patientImage,
    isCallActive = true,
}: VideoConferenceCardProps) {
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-200 shadow-xl">
            {/* Main Video - Doctor */}
            <div className="relative h-full w-full">
                <img
                    src={doctorImage}
                    alt={doctorName}
                    className="h-full w-full object-cover"
                />

                {/* Doctor Name Badge */}
                <div className="absolute left-4 top-4 rounded-lg bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
                    <p className="font-medium">{doctorName}</p>
                </div>

                {/* Patient Small Video */}
                {patientImage && (
                    <div className="absolute right-4 top-4 h-32 w-32 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                        <img
                            src={patientImage}
                            alt="You"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
                            <p className="text-xs font-medium text-white">
                                Anda
                            </p>
                        </div>
                    </div>
                )}

                {/* Call Controls */}
                <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-4">
                    {/* Mic Toggle */}
                    <button
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`rounded-full p-4 transition-all ${
                            isMicOn
                                ? 'bg-white/20 backdrop-blur-md hover:bg-white/30'
                                : 'bg-red-500 hover:bg-red-600'
                        }`}
                    >
                        {isMicOn ? (
                            <Mic className="h-6 w-6 text-white" />
                        ) : (
                            <MicOff className="h-6 w-6 text-white" />
                        )}
                    </button>

                    {/* End Call */}
                    <button className="rounded-full bg-red-500 p-5 shadow-lg transition-all hover:bg-red-600">
                        <Phone className="h-7 w-7 rotate-[135deg] text-white" />
                    </button>

                    {/* Video Toggle */}
                    <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`rounded-full p-4 transition-all ${
                            isVideoOn
                                ? 'bg-white/20 backdrop-blur-md hover:bg-white/30'
                                : 'bg-red-500 hover:bg-red-600'
                        }`}
                    >
                        {isVideoOn ? (
                            <Video className="h-6 w-6 text-white" />
                        ) : (
                            <VideoOff className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Call Status Indicator */}
                {isCallActive && (
                    <div className="absolute left-1/2 top-4 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                        <span className="text-sm font-medium">Terhubung</span>
                    </div>
                )}
            </div>
        </div>
    );
}
