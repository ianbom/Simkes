
import ChatBotPage from '@/Components/features/pasien/chatbot/ChatBotPage';
import PasienLayout from '@/Layouts/PasienLayout';

export default function ChatBotPageRoute({ user, chatLogs }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ChatBotPage chatLogs={chatLogs}/>
        </PasienLayout>
    );
}
