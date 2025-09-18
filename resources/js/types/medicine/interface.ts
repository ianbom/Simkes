export interface Medicine {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    type: string;
    dosage: string;
    safety: 'safe' | 'caution' | 'consult';
}
