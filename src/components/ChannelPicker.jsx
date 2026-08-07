export default function ChannelPicker({ channels, onSelect, title = 'How Does Traffic Land on the Site?' }) {
  return (
    <div className="walkthrough">
      <div className="walkthrough-stage">
        <p className="walkthrough-kicker">Step 0 · Pick how the visitor arrives</p>
        <h2 className="walkthrough-title">{title}</h2>
        <p className="channel-picker-note">
          This choice applies to both Visitor View and Systems View, so you can compare the same scenario from either angle.
        </p>
        <div className="channel-grid">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className="channel-card"
              onClick={() => onSelect(channel.id)}
            >
              <span className="channel-card-label">{channel.label}</span>
              <span className="channel-card-sublabel">{channel.sublabel}</span>
              <p className="channel-card-description">{channel.pickerDescription}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
