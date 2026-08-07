import { useState } from 'react';
import { flows } from './data/flows';
import Sidebar from './components/Sidebar';
import ChannelPicker from './components/ChannelPicker';
import LogicalWalkthrough from './components/LogicalWalkthrough';
import TechnicalWalkthrough from './components/TechnicalWalkthrough';
import OffPlatformLogicalWalkthrough from './components/OffPlatformLogicalWalkthrough';
import OffPlatformTechnicalWalkthrough from './components/OffPlatformTechnicalWalkthrough';
import VendorLogicalWalkthrough from './components/VendorLogicalWalkthrough';
import PipelineTechnicalWalkthrough from './components/PipelineTechnicalWalkthrough';
import EventLogicalWalkthrough from './components/EventLogicalWalkthrough';
import BackendEnginePipelineView from './components/BackendEnginePipelineView';
import AboutSection from './components/AboutSection';
import GlossaryPage from './components/GlossaryPage';
import GlossaryDrawer from './components/GlossaryDrawer';
import { GlossaryProvider } from './context/GlossaryContext';
import './App.css';

export default function App() {
  const [activeFlowId, setActiveFlowId] = useState('about');
  const [viewMode, setViewMode] = useState('visitor');
  const [channelId, setChannelId] = useState(null);

  const flow = flows.find((f) => f.id === activeFlowId);
  const channel = flow.channels?.find((c) => c.id === channelId) ?? null;

  function handleSelectFlow(id) {
    setActiveFlowId(id);
    setChannelId(null);
  }

  function handleSetView(mode) {
    setViewMode(mode);
  }

  return (
    <GlossaryProvider onNavigateToGlossary={() => handleSelectFlow('glossary')}>
      <div className="app">
        <Sidebar activeFlowId={activeFlowId} onSelect={handleSelectFlow} />
      <main className="main">
        {flow.kind !== 'about' && flow.kind !== 'glossary' && (
          <header className="main-header">
            <h1 className="flow-title">{flow.name}</h1>
            <div className="view-toggle">
              <button
                className={viewMode === 'visitor' ? 'is-active' : ''}
                onClick={() => handleSetView('visitor')}
              >
                {flow.kind === 'backend-engine' ? 'High-Level Pipeline' : 'Visitor View'}
              </button>
              <button
                className={viewMode === 'systems' ? 'is-active' : ''}
                onClick={() => handleSetView('systems')}
              >
                Systems View
              </button>
            </div>
          </header>
        )}

        {flow.kind === 'about' ? (
          <AboutSection />
        ) : flow.kind === 'glossary' ? (
          <GlossaryPage />
        ) : flow.kind === 'backend-engine' ? (
          viewMode === 'visitor' ? (
            <BackendEnginePipelineView channel={flow.channels[0]} />
          ) : (
            <PipelineTechnicalWalkthrough
              key={`${flow.id}-systems`}
              channel={flow.channels[0]}
              pathLabel="Channel"
            />
          )
        ) : !channel ? (
          <ChannelPicker
            channels={flow.channels}
            onSelect={setChannelId}
            title={
              flow.kind === 'off-platform'
                ? 'How Does the Visitor Engage Off-Platform?'
                : flow.kind === 'vendor-inbound'
                ? 'Which Path Does the Vendor Use?'
                : flow.kind === 'event-engagement'
                ? 'How Does the Visitor Engage With the Event?'
                : undefined
            }
          />
        ) : flow.kind === 'off-platform' ? (
          viewMode === 'visitor' ? (
            <OffPlatformLogicalWalkthrough
              key={`${flow.id}-${channel.id}-visitor`}
              channel={channel}
              onChangeChannel={() => setChannelId(null)}
            />
          ) : (
            <OffPlatformTechnicalWalkthrough
              key={`${flow.id}-${channel.id}-systems`}
              channel={channel}
              onChangeChannel={() => setChannelId(null)}
            />
          )
        ) : flow.kind === 'vendor-inbound' ? (
          viewMode === 'visitor' ? (
            <VendorLogicalWalkthrough
              key={`${flow.id}-${channel.id}-visitor`}
              channel={channel}
              entry={flow.views.walkthrough}
              vendorName={flow.vendorName}
              assetName={flow.assetName}
              onChangeChannel={() => setChannelId(null)}
            />
          ) : (
            <PipelineTechnicalWalkthrough
              key={`${flow.id}-${channel.id}-systems`}
              channel={channel}
              pathLabel="Path"
              onChangeChannel={() => setChannelId(null)}
            />
          )
        ) : flow.kind === 'event-engagement' ? (
          viewMode === 'visitor' ? (
            <EventLogicalWalkthrough
              key={`${flow.id}-${channel.id}-visitor`}
              channel={channel}
              entry={flow.views.walkthrough}
              eventName={flow.eventName}
              onChangeChannel={() => setChannelId(null)}
            />
          ) : (
            <PipelineTechnicalWalkthrough
              key={`${flow.id}-${channel.id}-systems`}
              channel={channel}
              pathLabel="Channel"
              onChangeChannel={() => setChannelId(null)}
            />
          )
        ) : viewMode === 'visitor' ? (
          <LogicalWalkthrough
            key={`${flow.id}-${channel.id}-visitor`}
            channel={channel}
            formStep={flow.views.walkthrough.formStep}
            onChangeChannel={() => setChannelId(null)}
          />
        ) : (
          <TechnicalWalkthrough
            key={`${flow.id}-${channel.id}-systems`}
            channel={channel}
            formStage={flow.views.technical.formStage}
            onChangeChannel={() => setChannelId(null)}
          />
        )}
        </main>
      </div>
      <GlossaryDrawer />
    </GlossaryProvider>
  );
}
