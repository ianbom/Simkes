import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Send, Loader2, Bot, User, Menu } from 'lucide-react';
import axios from 'axios';

interface ChatLog {
    id: number;
    user_id: number;
    question: string;
    answer: string;
    model_name: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    chatLogs: ChatLog[];
}

export default function ChatBotPage({ chatLogs = [] }: Props) {
    const [messages, setMessages] = useState<ChatLog[]>(chatLogs);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const question = input.trim();
        setInput('');
        setIsLoading(true);

        const tempMessage: ChatLog = {
            id: Date.now(),
            user_id: 0,
            question,
            answer: '',
            model_name: 'gemini-2.5-flash',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, tempMessage]);

        try {
            const response = await axios.post('/pasien/chat',
                { question },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    withCredentials: true
                }
            );

            if (response.data.status) {
                const newMessage: ChatLog = {
                    ...tempMessage,
                    answer: response.data.answer,
                    model_name: 'gemini-2.5-flash',
                    updated_at: new Date().toISOString(),
                };

                setMessages(prev => [...prev.slice(0, -1), newMessage]);
            } else {
                throw new Error(response.data.message || 'Gagal mendapatkan jawaban');
            }
        } catch (error: any) {
            console.error('Chat error:', error);

            let errorMessage = 'Maaf, terjadi kesalahan. Silakan coba lagi.';

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Sesi Anda telah berakhir. Silakan login kembali.';
                } else if (error.response.status === 400) {
                    errorMessage = error.response.data.message || 'Pertanyaan tidak valid.';
                } else if (error.response.status === 500) {
                    errorMessage = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
                }
            } else if (error.request) {
                errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
            }

            const errorMsg: ChatLog = {
                ...tempMessage,
                answer: `❌ ${errorMessage}`,
                updated_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev.slice(0, -1), errorMsg]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const extractSources = (answer: string) => {
        const markdownRegex = /\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
        const plainRegex = /https?:\/\/[^\s)]+/g;

        const urls: string[] = [];

        let match;
        while ((match = markdownRegex.exec(answer)) !== null) {
            urls.push(match[1]);
        }

        const plainMatches = answer.match(plainRegex) || [];
        urls.push(...plainMatches);

        const cleanedUrls = urls.map(url => {
            return url
                .replace(/^https?:\/\//, 'https://')
                .replace(/^[\[\]()]+/, '')
                .replace(/[\[\]()]+$/, '')
                .replace(/[.,;:]+$/, '')
                .trim();
        });

        const uniqueUrls = Array.from(
            new Set(cleanedUrls.map(u => u.replace(/[\])]+$/, '').trim()))
        );

        return uniqueUrls;
    };

    const formatAnswer = (text: string) => {
        let formatted = text;

        // Hapus simbol ** untuk bold dan ganti dengan <strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Hapus simbol * untuk list items dan ganti dengan bullet point
        formatted = formatted.replace(/^\* (.+)$/gm, '• $1<br>');
        // Format heading dengan garis bawah
        formatted = formatted.replace(/^(.+:)$/gm, '<span class="font-semibold text-blue-800">$1</span>');

        return formatted;
    };

    return (
        <>
            <Head title="Chatbot SIMKESIA" />

            <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
                {/* Header - Optimized for Mobile */}
                <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
                    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg shrink-0">
                                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-sm sm:text-lg font-semibold text-blue-900 truncate">
                                        SIMKESIA AI Assistant
                                    </h1>
                                    <p className="text-[10px] sm:text-xs text-blue-600 truncate">
                                        Tanyakan seputar kesehatan
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </header>

                {/* Chat Body - Full Height with Proper Scrolling */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea
                        ref={scrollRef}
                        className="h-full px-3 sm:px-4 py-4 sm:py-6"
                    >
                        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-3 sm:space-y-4 px-4">
                                    <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
                                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
                                        Selamat Datang di SIMKESIA AI
                                    </h2>
                                    <p className="text-blue-700 text-xs sm:text-sm max-w-md">
                                        Mulai dengan mengetik pertanyaan Anda di bawah.
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={index} className="space-y-3">
                                        {/* User Message */}
                                        <div className="flex justify-end">
                                            <div className="max-w-[85%] sm:max-w-[75%] bg-blue-600 text-white p-3 sm:p-3.5 rounded-2xl rounded-tr-md shadow-md">
                                                <p className="text-xs sm:text-sm leading-relaxed break-words">
                                                    {msg.question}
                                                </p>
                                                <p className="text-[10px] sm:text-xs text-blue-100 mt-1.5">
                                                    {formatDate(msg.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bot Message */}
                                        {msg.answer && (
                                            <div className="flex justify-start">
                                                <div className="flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%]">
                                                    <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full h-fit shrink-0">
                                                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700" />
                                                    </div>
                                                    <div className="bg-white border border-blue-100 rounded-2xl rounded-tl-md p-3 sm:p-3.5 shadow-sm">
                                                        <div
                                                            className="text-xs sm:text-sm text-gray-800 leading-relaxed break-words prose prose-sm max-w-none"
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatAnswer(msg.answer)
                                                                    .split('\n')
                                                                    .map(line => line.trim())
                                                                    .join('\n')
                                                            }}
                                                        />

                                                        {/* Sumber Referensi */}
                                                        {extractSources(msg.answer).length > 0 && (
                                                            <div className="mt-3 border-t border-blue-100 pt-2">
                                                                <p className="text-[10px] sm:text-xs text-blue-700 font-semibold mb-1.5">
                                                                    🔗 Sumber Referensi:
                                                                </p>
                                                                <div className="space-y-1">
                                                                    {extractSources(msg.answer).map((src, i) => (
                                                                        <a
                                                                            key={i}
                                                                            href={src}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="block text-[10px] sm:text-xs text-blue-500 hover:text-blue-700 hover:underline break-all"
                                                                        >
                                                                            {src}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            {/* Loading Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2 bg-blue-50 px-3 sm:px-4 py-2 rounded-2xl border border-blue-100">
                                        <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 animate-spin" />
                                        <p className="text-[10px] sm:text-xs text-blue-600 font-medium">
                                            AI sedang mengetik...
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Input Field - Fixed at Bottom */}
                <div className="border-t border-blue-100 bg-white/95 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ketik pertanyaan Anda..."
                                disabled={isLoading}
                                className="flex-1 h-10 sm:h-12 text-sm sm:text-base border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 shrink-0"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="hidden sm:inline ml-2">Kirim</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
