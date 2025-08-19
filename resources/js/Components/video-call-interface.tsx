

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/Components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  Camera,
  Users,
} from "lucide-react"

interface Consultation {
  id: string
  patient: {
    name: string
    photo?: string
  }
  status: string
  sessionStartTime: Date | null
}

interface VideoCallInterfaceProps {
  consultation: Consultation
  isCallActive: boolean
  onStartCall: () => void
  onEndCall: () => void
}

export function VideoCallInterface({ consultation, isCallActive, onStartCall, onEndCall }: VideoCallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive && consultation.sessionStartTime) {
      interval = setInterval(() => {
        const now = new Date()
        const start = consultation.sessionStartTime!
        const duration = Math.floor((now.getTime() - start.getTime()) / 1000)
        setCallDuration(duration)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive, consultation.sessionStartTime])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Consultation
          </CardTitle>
          {isCallActive && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live - {formatDuration(callDuration)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Video Area */}
          <div className="aspect-video bg-gray-900 relative overflow-hidden rounded-t-none rounded-b-lg">
            {!isCallActive ? (
              // Pre-call state
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Ready to start consultation</h3>
                  <p className="text-sm text-gray-300 mb-6">
                    Click "Start Call" to begin the video consultation with {consultation.patient.name}
                  </p>
                  <Button onClick={onStartCall} size="lg" className="bg-green-600 hover:bg-green-700">
                    <Video className="h-4 w-4 mr-2" />
                    Start Call
                  </Button>
                </div>
              </div>
            ) : (
              // Active call state
              <>
                {/* Main video area - Patient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoOff ? (
                      <div className="text-center text-white">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold">
                            {consultation.patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <p className="text-lg font-medium">{consultation.patient.name}</p>
                        <p className="text-sm text-gray-300">Video is off</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Camera className="h-16 w-16" />
                        </div>
                        <p className="text-lg font-medium">{consultation.patient.name}</p>
                        <p className="text-sm text-gray-300">Video placeholder</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor's video (small overlay) */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    {isVideoOff ? (
                      <VideoOff className="h-6 w-6 text-white/60" />
                    ) : (
                      <div className="text-center text-white">
                        <Camera className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-xs">You</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connection status */}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Connected
                  </Badge>
                </div>

                {/* Screen sharing indicator */}
                {isScreenSharing && (
                  <div className="absolute bottom-20 left-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Monitor className="h-3 w-3 mr-1" />
                      Screen sharing
                    </Badge>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Call Controls */}
          {isCallActive && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-black/80 rounded-full px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full w-10 h-10 p-0 ${isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"}`}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-4 w-4 text-white" /> : <Mic className="h-4 w-4 text-white" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full w-10 h-10 p-0 ${isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"}`}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4 text-white" /> : <Video className="h-4 w-4 text-white" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full w-10 h-10 p-0 ${isSpeakerOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"}`}
                  onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                >
                  {isSpeakerOff ? (
                    <VolumeX className="h-4 w-4 text-white" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full w-10 h-10 p-0 ${isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"}`}
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                >
                  <Monitor className="h-4 w-4 text-white" />
                </Button>

                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 bg-gray-600 hover:bg-gray-700">
                  <Maximize className="h-4 w-4 text-white" />
                </Button>

                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 bg-gray-600 hover:bg-gray-700">
                  <Settings className="h-4 w-4 text-white" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-10 h-10 p-0 bg-red-600 hover:bg-red-700 ml-2"
                  onClick={onEndCall}
                >
                  <PhoneOff className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
