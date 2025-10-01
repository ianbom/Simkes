import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface JitsiMeetProps {
  roomName: string;
  user: {
    id: number;
    name: string;
    email?: string;
  };
}

export default function JitsiMeet({ roomName, user }: JitsiMeetProps) {
  const jitsiContainer = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!jitsiContainer.current || !window.JitsiMeetExternalAPI) return;

    const domain = "meet.jit.si"; // public Jitsi server
    const options = {
      roomName,
      parentNode: jitsiContainer.current,
      userInfo: {
        displayName: user.name,
        // email: user.email,  // optional
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        disableModeratorIndicator: true,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "desktop",
          "chat",
          "raisehand",
          "hangup",
        ],
      },
      width: "100%",
      height: "120%",
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose();
  }, [roomName, user]);

  return (
    <div className="relative w-full">
      {/* Jitsi container */}
      <div
        ref={jitsiContainer}
        className={`${isFullScreen ? "fixed inset-0 z-50" : "aspect-video w-full"} bg-black`}
      />

      {/* Control button maximize/minimize */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-4 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      </Button>
    </div>
  );
}
