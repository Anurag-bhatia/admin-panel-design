import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import { ProductPage } from '@/components/ProductPage';
import { DataModelPage } from '@/components/DataModelPage';
import { DesignPage } from '@/components/DesignPage';
import { SectionsPage } from '@/components/SectionsPage';
import { SectionPage } from '@/components/SectionPage';
import { ScreenDesignPage, ScreenDesignFullscreen } from '@/components/ScreenDesignPage';
import { ShellDesignPage, ShellDesignFullscreen } from '@/components/ShellDesignPage';
import { ExportPage } from '@/components/ExportPage';
import { PreviewPage } from '@/Preview/PreviewPage';
import FullPreviewPage from '@/Preview/FullPreviewPage';
export const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(ProductPage, {}),
    },
    {
        path: '/data-model',
        element: _jsx(DataModelPage, {}),
    },
    {
        path: '/design',
        element: _jsx(DesignPage, {}),
    },
    {
        path: '/sections',
        element: _jsx(SectionsPage, {}),
    },
    {
        path: '/sections/:sectionId',
        element: _jsx(SectionPage, {}),
    },
    {
        path: '/sections/:sectionId/screen-designs/:screenDesignName',
        element: _jsx(ScreenDesignPage, {}),
    },
    {
        path: '/sections/:sectionId/screen-designs/:screenDesignName/fullscreen',
        element: _jsx(ScreenDesignFullscreen, {}),
    },
    {
        path: '/shell/design',
        element: _jsx(ShellDesignPage, {}),
    },
    {
        path: '/shell/design/fullscreen',
        element: _jsx(ShellDesignFullscreen, {}),
    },
    {
        path: '/export',
        element: _jsx(ExportPage, {}),
    },
    {
        path: '/preview',
        element: _jsx(PreviewPage, {}),
    },
    {
        path: '/full-preview',
        element: _jsx(FullPreviewPage, {}),
    },
]);
