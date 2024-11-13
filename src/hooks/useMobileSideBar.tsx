import { useState } from 'react';

export const useMobileSidebar = () => {
    const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
    
    const toggleProfileSidebar = () => {
        setProfileSidebarOpen(prev => !prev);
    };

    return { isProfileSidebarOpen, toggleProfileSidebar };
};
