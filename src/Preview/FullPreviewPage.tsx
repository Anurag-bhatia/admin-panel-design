import React, { useState } from 'react'
import { AppShell, NavigationItem } from '../shell/components/AppShell'
import SectionRenderer from './SectionRenderer'
import { LoginPage } from '../sections/auth/components/LoginPage'
import {
  SECTION_DATA,
  VISIBLE_SECTION_IDS,
  isSectionId,
  SectionId,
} from './sectionRegistry'

const FullPreviewPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('team')
  const [activeSubRoute, setActiveSubRoute] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Build navigation items from SECTION_DATA
  const navigationItems: NavigationItem[] = VISIBLE_SECTION_IDS.map((sectionId) => {
    const data = SECTION_DATA[sectionId]
    const navItem: NavigationItem = {
      label: data.label,
      href: `#${sectionId}`, // Using hash for internal navigation
      icon: data.icon,
      isActive: activeSection === sectionId && !activeSubRoute,
    }

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
      ]
    }

    // Add children for Experts section
    if (sectionId === 'lawyers') {
      const currentGroup =
        activeSection === 'lawyers'
          ? activeSubRoute === 'individuals'
            ? 'individuals'
            : 'business'
          : null
      navItem.isActive = false
      navItem.children = [
        {
          label: 'Business',
          href: '#lawyers/business',
          isActive: currentGroup === 'business',
        },
        {
          label: 'Individuals',
          href: '#lawyers/individuals',
          isActive: currentGroup === 'individuals',
        },
      ]
    }

    // Add children for CMS section
    if (sectionId === 'cms') {
      const currentCms =
        activeSection === 'cms'
          ? activeSubRoute === 'challanpay-org'
            ? 'challanpay-org'
            : activeSubRoute === 'events-news'
            ? 'events-news'
            : activeSubRoute === 'banners'
            ? 'banners'
            : 'blogs'
          : null
      navItem.isActive = false
      navItem.children = [
        { label: 'Blogs', href: '#cms/blogs', isActive: currentCms === 'blogs' },
        {
          label: 'ChallanPay.org',
          href: '#cms/challanpay-org',
          isActive: currentCms === 'challanpay-org',
        },
        {
          label: 'Events & News',
          href: '#cms/events-news',
          isActive: currentCms === 'events-news',
        },
        { label: 'Banners', href: '#cms/banners', isActive: currentCms === 'banners' },
      ]
    }

    // Add children for Config section
    if (sectionId === 'rewards-config') {
      const currentConfig =
        activeSection === 'rewards-config'
          ? activeSubRoute === 'web'
            ? 'web'
            : activeSubRoute === 'coupon'
            ? 'coupon'
            : activeSubRoute === 'wallet'
            ? 'wallet'
            : 'sales'
          : null
      navItem.isActive = false
      navItem.children = [
        {
          label: 'Sales Config',
          href: '#rewards-config/sales',
          isActive: currentConfig === 'sales',
        },
        {
          label: 'Web Config',
          href: '#rewards-config/web',
          isActive: currentConfig === 'web',
        },
        {
          label: 'Coupon',
          href: '#rewards-config/coupon',
          isActive: currentConfig === 'coupon',
        },
        {
          label: 'CP Pockets',
          href: '#rewards-config/wallet',
          isActive: currentConfig === 'wallet',
        },
      ]
    }

    return navItem
  })

  // Handle navigation - extract section ID from href
  const handleNavigate = (href: string) => {
    const fullPath = href.replace(/^#/, '')
    const parts = fullPath.split('/')
    const baseSectionId = parts[0]
    const subRoute = parts[1] || ''

    if (isSectionId(baseSectionId)) {
      setActiveSection(baseSectionId)
      setActiveSubRoute(subRoute)
    }
  }

  // Mock user object for the AppShell
  const mockUser = {
    name: 'Preview User',
    email: 'preview@example.com',
    designation: 'Operations Manager',
  }

  // Generate breadcrumbs based on active section and sub-route
  const breadcrumbs = React.useMemo(() => {
    const crumbs = []
    const sectionData = SECTION_DATA[activeSection]

    if (activeSubRoute) {
      // For sub-routes like "leads/my"
      crumbs.push({
        label: sectionData.label,
        href: `#${activeSection}`,
      })

      if (activeSection === 'leads' && activeSubRoute === 'all') {
        crumbs.push({ label: 'All Leads' })
      } else if (activeSection === 'leads' && activeSubRoute === 'my') {
        crumbs.push({ label: 'My Leads' })
      } else if (activeSection === 'lawyers' && activeSubRoute === 'business') {
        crumbs.push({ label: 'Business' })
      } else if (activeSection === 'lawyers' && activeSubRoute === 'individuals') {
        crumbs.push({ label: 'Individuals' })
      } else if (activeSection === 'rewards-config') {
        const configLabel: Record<string, string> = {
          sales: 'Sales Config',
          web: 'Web Config',
          coupon: 'Coupon',
          wallet: 'CP Pockets',
        }
        crumbs.push({ label: configLabel[activeSubRoute] ?? activeSubRoute })
      } else if (activeSection === 'cms') {
        const cmsLabel: Record<string, string> = {
          blogs: 'Blogs',
          'challanpay-org': 'ChallanPay.org',
          'events-news': 'Events & News',
          banners: 'Banners',
        }
        crumbs.push({ label: cmsLabel[activeSubRoute] ?? activeSubRoute })
      }
    } else {
      // Just the section name
      crumbs.push({ label: sectionData.label })
    }

    return crumbs
  }, [activeSection, activeSubRoute])

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => {
          setIsLoggedIn(true)
          setActiveSection('team')
          setActiveSubRoute('')
        }}
      />
    )
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={mockUser}
      breadcrumbs={breadcrumbs}
      onNavigate={handleNavigate}
      onLogout={() => setIsLoggedIn(false)}
    >
      <SectionRenderer sectionId={activeSection} subRoute={activeSubRoute} />
    </AppShell>
  )
}

export default FullPreviewPage
