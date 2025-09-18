'use client';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Headset, Mail } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    heading: string;
    description: string;
    guides: FAQ[];
}
const GuideDropdownSection = ({
    heading,
    description,
    guides,
}: FaqSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-sky-50/30 to-gray-50 py-20">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                        <span className="text-gradient">{heading}</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        {description}
                    </p>
                </div>
                <div className="mx-auto mb-8 w-full space-y-6">
                    {guides.map((guides, index) => (
                        <div
                            key={index}
                            className="faq-item floating overflow-hidden rounded-2xl bg-white shadow-lg"
                        >
                            <button
                                className="w-full px-8 py-6 text-left focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="pr-4 text-xl font-bold text-gray-900">
                                        {guides.question}
                                    </h3>
                                    <svg
                                        className={`faq-toggle h-6 w-6 flex-shrink-0 text-black transition-transform duration-300 ${
                                            openIndex === index
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>
                            {openIndex === index && (
                                <div className="faq-content bg-sky-100 px-8 py-6 text-justify text-lg leading-relaxed text-gray-800">
                                    <p>{guides.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <div className="rounded-2xl bg-sky-900/70 bg-[url('/assets/images/hero-bg.jpg')] bg-cover p-8 py-16 text-white bg-blend-multiply shadow-lg">
                        <h3 className="mb-4 text-3xl font-bold text-white">
                            Masih Ada Pertanyaan?
                        </h3>
                        <p className="mb-6 leading-relaxed text-white">
                            Dokter berpengalaman kami siap membantu.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="bg-white text-cyan-600 hover:bg-cyan-50"
                                >
                                    Konsultasi Sekarang
                                    <Headset className="ml-1 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/laporan">
                                <Button
                                    size="lg"
                                    className="bg-blue-900 text-white hover:bg-indigo-700"
                                >
                                    Email Kami
                                    <Mail className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuideDropdownSection;
