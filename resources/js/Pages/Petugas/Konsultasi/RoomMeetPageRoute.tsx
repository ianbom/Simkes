import JitsiMeet from "@/Components/partials/petugas/consultation/JitsiMeet";
import PetugasLayout from "@/Layouts/PetugasLayout";

interface JoinMeetPageProps {
  roomName: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function RoomMeetPageRoute({ roomName, user }: JoinMeetPageProps) {
  return (
    <PetugasLayout user={user}>
      <div className="h-screen w-full">
        <JitsiMeet roomName={roomName} user={user} />
      </div>
    </PetugasLayout>
  );
}
