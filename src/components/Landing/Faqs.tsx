'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What is E-Voting?',
            answer: 'E-Voting is a secure electronic voting system. It uses RSA cryptography, blind signatures, and hash functions to guarantee vote anonymity, integrity, and verifiability.',
        },
        {
            id: 'item-2',
            question: 'How does the voting process work?',
            answer: 'Each voter receives two codes: one for authentication (N1) and one for verification (N2). After authentication, the vote is securely processed, signed, encrypted, and submitted without revealing the voter’s identity.',
        },
        {
            id: 'item-3',
            question: 'Is my vote anonymous?',
            answer: 'Yes. The system is designed so that no authority can link a voter to their vote. Sensitive steps are separated across different roles to preserve complete anonymity.',
        },
        {
            id: 'item-4',
            question: 'How does the system prevent fraud?',
            answer: "Security is ensured through role separation and cryptographic controls. No single entity has enough information or access to manipulate votes or compromise the system.",
        },
        {
            id: 'item-5',
            question: 'Can I verify that my vote was counted?',
            answer: 'Yes. After the voting phase, verification data is published. Each voter can use their personal code (N2) to confirm that their vote was included, without revealing their identity.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base font-bold hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
