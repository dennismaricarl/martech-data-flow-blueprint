import { flows } from '../data/flows';

export default function Sidebar({ activeFlowId, onSelect }) {
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {flows.map((flow) => {
          const isActive = flow.id === activeFlowId;
          return (
            <li key={flow.id}>
              <button
                className={`sidebar-item${isActive ? ' is-active' : ''}${flow.available ? '' : ' is-disabled'}`}
                disabled={!flow.available}
                onClick={() => flow.available && onSelect(flow.id)}
              >
                {flow.name}
                {!flow.available && <span className="sidebar-soon">Coming soon</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
