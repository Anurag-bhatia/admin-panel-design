import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import { AppShell } from '../shell/components/AppShell';
import SectionRenderer from './SectionRenderer';
import { SECTION_DATA, SECTION_IDS, isSectionId, } from './sectionRegistry';
const FullPreviewPage = () => {
    const [activeSection, setActiveSection] = useState('incidents');
    const [activeSubRoute, setActiveSubRoute] = useState('');
    // Build navigation items from SECTION_DATA
    const navigationItems = SECTION_IDS.map((sectionId) => {
        const data = SECTION_DATA[sectionId];
        const navItem = {
            label: data.label,
            href: `#${sectionId}`, // Using hash for internal navigation
            icon: data.icon,
            isActive: activeSection === sectionId && !activeSubRoute,
        };
        // Add children for Leads section
        if (sectionId === 'leads') {
            navItem.children = [
                {
                    label: 'All Leads',
                    href: '#leads/all',
                    isActive: activeSection === 'leads' && activeSubRoute === 'all',
                },
                {
                    label: 'My Leads',
                    href: '#leads/my',
                    isActive: activeSection === 'leads' && activeSubRoute === 'my',
                },
            ];
        }
        return navItem;
    });
    // Handle navigation - extract section ID from href
    const handleNavigate = (href) => {
        const fullPath = href.replace(/^#/, '');
        const parts = fullPath.split('/');
        const baseSectionId = parts[0];
        const subRoute = parts[1] || '';
        if (isSectionId(baseSectionId)) {
            setActiveSection(baseSectionId);
            setActiveSubRoute(subRoute);
        }
    };
    // Mock user object for the AppShell
    const mockUser = {
        name: 'Preview User',
        email: 'preview@example.com',
        designation: 'Operations Manager',
    };
    // Generate breadcrumbs based on active section and sub-route
    const breadcrumbs = React.useMemo(() => {
        const crumbs = [];
        const sectionData = SECTION_DATA[activeSection];
        if (activeSubRoute) {
            // For sub-routes like "leads/my"
            crumbs.push({
                label: sectionData.label,
                href: `#${activeSection}`,
            });
            if (activeSection === 'leads' && activeSubRoute === 'all') {
                crumbs.push({ label: 'All Leads' });
            }
            else if (activeSection === 'leads' && activeSubRoute === 'my') {
                crumbs.push({ label: 'My Leads' });
            }
        }
        else {
            // Just the section name
            crumbs.push({ label: sectionData.label });
        }
        return crumbs;
    }, [activeSection, activeSubRoute]);
    return (_jsx(AppShell, { navigationItems: navigationItems, user: mockUser, breadcrumbs: breadcrumbs, onNavigate: handleNavigate, onLogout: () => {
            console.log('Logout clicked in preview');
        }, children: _jsx(SectionRenderer, { sectionId: activeSection, subRoute: activeSubRoute }) }));
};
export default FullPreviewPage;
