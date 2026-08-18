import { useState } from 'react';
export function usePreviewState() {
    const [activeSection, setActiveSection] = useState('incidents');
    return {
        activeSection,
        setActiveSection,
    };
}
