import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Video } from "lucide-react";
import JitsiMeet from "./partials/petugas/consultation/JitsiMeet";
;

interface Consultation {
  id: string;
  patient: {
    name: string;
    photo?: string;
  };
  status: string;
}

interface VideoCallInterfaceProps {
  consultation: Consultation;
  roomName: string;
  user: {
    id: number;
    name: string;
    email?: string;
  };
}

export function VideoCallInterface({ consultation, roomName, user }: VideoCallInterfaceProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Video Consultation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Embed Jitsi */}
        <JitsiMeet roomName={roomName} user={user} />
      </CardContent>
    </Card>
  );
}
