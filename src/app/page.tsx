'use client';

import React from 'react';
import { useNexus } from '../context/NexusContext';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { CommandPalette } from '../components/modals/CommandPalette';
import { QuickCreateModal } from '../components/modals/QuickCreateModal';

// Views
import { ListView } from '../components/views/ListView';
import { BoardView } from '../components/views/BoardView';
import { CalendarView } from '../components/views/CalendarView';
import { TimelineView } from '../components/views/TimelineView';
import { GanttView } from '../components/views/GanttView';
import { DashboardView } from '../components/views/DashboardView';
import { HomeView } from '../components/views/HomeView';
import { InboxView } from '../components/views/InboxView';
import { MyWorkView } from '../components/views/MyWorkView';
import { PortfoliosView } from '../components/views/PortfoliosView';
import { GoalsView } from '../components/views/GoalsView';
import { FormsView } from '../components/views/FormsView';
import { AutomationsView } from '../components/views/AutomationsView';
import { TimeTrackingView } from '../components/views/TimeTrackingView';
import { IntegrationsView } from '../components/views/IntegrationsView';
import { SettingsView } from '../components/views/SettingsView';

export default function MainPage() {
  const { activeSection, activeView } = useNexus();

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeView />;
      case 'inbox':
        return <InboxView />;
      case 'my-work':
        return <MyWorkView />;
      case 'portfolios':
        return <PortfoliosView />;
      case 'goals':
        return <GoalsView />;
      case 'dashboards':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'forms':
        return <FormsView />;
      case 'automations':
        return <AutomationsView />;
      case 'time-tracking':
        return <TimeTrackingView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'settings':
        return <SettingsView />;
      case 'projects':
      default:
        switch (activeView) {
          case 'list':
            return <ListView />;
          case 'board':
            return <BoardView />;
          case 'calendar':
            return <CalendarView />;
          case 'timeline':
            return <TimelineView />;
          case 'gantt':
            return <GanttView />;
          case 'dashboard':
            return <DashboardView />;
          case 'table':
          default:
            return <ListView />;
        }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#080B13] text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderContent()}
        </main>
      </div>

      <CommandPalette />
      <QuickCreateModal />
    </div>
  );
}
