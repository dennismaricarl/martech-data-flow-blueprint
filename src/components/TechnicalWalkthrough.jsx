import { useState } from 'react';
import GlossaryText from './GlossaryText';
import TechLogPanel from './TechLogPanel';

const DEFAULT_FORM_DATA = {
  name: 'Mari Koehler',
  email: 'mari@maricompany.com',
  company: 'Mari Company',
};

function buildUrl(channel) {
  if (!channel.hasUtm) return 'https://yoursite.com/demo';
  const { source, medium, campaign } = channel.utm;
  const gclidPart = channel.gclid ? `&gclid=${channel.gclid}` : '';
  return `https://yoursite.com/demo?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}${gclidPart}`;
}

function arrivalTitle(channel) {
  if (channel.hasUtm) return 'Page Loads With UTM Parameters';
  if (channel.referrer) return 'Page Loads With Only a Referrer';
  return 'Page Loads With No Tracking Data at All';
}

function arrivalDescription(channel) {
  if (channel.hasUtm && channel.gclid) {
    return 'When the visitor clicked the ad, the landing page URL loaded with pre-packaged UTM parameters (for Marketo lead attribution) and a gclid (Google’s click ID for conversion tracking). Both scripts read this same URL string independently, before the user takes any action.';
  }
  if (channel.hasUtm) {
    return 'The link the visitor clicked appended UTM parameters to the URL. Both Marketo’s form script and Google Tag Manager can read this same URL independently, before the visitor does anything.';
  }
  if (channel.referrer) {
    return 'This link carries no UTM parameters, but the browser automatically sends a referrer header, telling the site the visitor arrived from Google’s search results.';
  }
  return 'There’s no query string and no referrer at all. Typed straight into the address bar, this page load carries zero information about where the visitor came from.';
}

function arrivalParams(channel) {
  if (channel.hasUtm) {
    const { source, medium, campaign } = channel.utm;
    const params = [
      { key: 'utm_source', value: source },
      { key: 'utm_medium', value: medium },
      { key: 'utm_campaign', value: campaign },
    ];
    if (channel.gclid) params.push({ key: 'gclid', value: channel.gclid });
    return params;
  }
  if (channel.referrer) {
    return [{ key: 'referrer', value: channel.referrer }];
  }
  return [];
}

function captureBranches(channel) {
  if (channel.hasUtm) {
    const { source, medium } = channel.utm;
    if (channel.hasAdPlatform) {
      return [
        {
          id: 'marketo-scrape',
          system: 'Marketo Form (Embedded)',
          log: [
            { k: 'window.location.search', v: `?utm_source=${source}&utm_medium=${medium}` },
            { k: 'Hidden field: utm_source', v: `"${source}"` },
            { k: 'Hidden field: utm_medium', v: `"${medium}"` },
          ],
          caption: 'The Marketo script reads the URL directly and drops the values into hidden form fields. The visitor hasn’t typed anything yet.',
        },
        {
          id: 'gtm-capture',
          system: 'GTM – Conversion Linker Tag',
          log: [
            { k: 'Origin', v: 'Google Ads Auto-Tagging appended gclid on ad click' },
            { k: 'Conversion Linker tag fires', v: `Detects gclid in URL → "?gclid=${channel.gclid}"` },
            { k: 'Stores in cookie', v: '_gcl_aw (first-party)' },
          ],
          caption: 'Google Ads automatically attaches a unique gclid to the URL on ad click. GTM’s Conversion Linker tag detects this ID and saves it to a first-party cookie (_gcl_aw), keeping it active until the visitor submits a form.',
        },
      ];
    }
    return [
      {
        id: 'marketo-scrape',
        system: 'Marketo Form (Embedded)',
        log: [
          { k: 'window.location.search', v: `?utm_source=${source}&utm_medium=${medium}` },
          { k: 'Hidden field: utm_source', v: `"${source}"` },
          { k: 'Hidden field: utm_medium', v: `"${medium}"` },
        ],
        caption: `The Marketo script reads the URL directly and drops the values into hidden form fields. The visitor hasn’t typed anything yet. GTM doesn’t come into play here, there’s no ad platform to eventually notify, ${channel.label.toLowerCase()} is an owned channel, not paid media.`,
      },
    ];
  }
  if (channel.referrer) {
    return [
      {
        id: 'marketo-scrape',
        system: 'Marketo Munchkin (Tracking)',
        log: [
          { k: 'window.location.search', v: '"" (empty, no UTM parameters)' },
          { k: 'Munchkin logs', v: `Page view, referrer = "${channel.referrer}"` },
          { k: 'Form hidden field: utm_source', v: '(not set, nothing to scrape)' },
        ],
        caption: 'Munchkin, Marketo’s built-in tracking script, logs the referrer automatically as web activity, no custom code needed. The form itself has no UTM to grab, so its hidden fields stay blank. GTM doesn’t come into play here, there’s no ad platform to eventually notify.',
      },
    ];
  }
  return [
    {
      id: 'marketo-scrape',
      system: 'Marketo Form (Embedded)',
      log: [
        { k: 'window.location.search', v: '"" (empty)' },
        { k: 'document.referrer', v: '"" (empty)' },
        { k: 'Hidden field: utm_source', v: '(not set)' },
      ],
      caption: 'Nothing to read at all. The hidden fields stay blank, this lead’s source will default to Direct. GTM doesn’t come into play here, there’s no ad platform to eventually notify.',
    },
  ];
}

function hiddenFields(channel) {
  if (channel.hasUtm) {
    const { source, medium, campaign } = channel.utm;
    return [
      { k: 'utm_source', v: source },
      { k: 'utm_medium', v: medium },
      { k: 'utm_campaign', v: campaign },
    ];
  }
  if (channel.referrer) {
    return [
      { k: 'utm_source', v: '(not set, no UTM to submit)' },
      { k: 'Referrer attribution', v: 'Handled separately by Munchkin, not this form' },
    ];
  }
  return [
    { k: 'utm_source', v: '(not set)' },
    { k: 'referrer', v: '(not set)' },
  ];
}

function reactionBranches(channel) {
  const marketo = {
    id: 'marketo-ingest',
    system: 'Marketo – Smart Campaign',
    log: [
      { k: 'Trigger', v: 'Fills Out Form on "Request a Demo"' },
      { k: 'Action', v: 'Create or Update Lead' },
      {
        k: 'Lead Source ←',
        v: channel.hasUtm
          ? `utm_source ("${channel.leadSource}")`
          : channel.referrer
          ? `Choice step ("${channel.leadSource}")`
          : `ELSE branch ("${channel.leadSource}")`,
      },
      ...(channel.hasUtm ? [{ k: 'UTM Medium ←', v: `utm_medium ("${channel.utm.medium}")` }] : []),
      {
        k: channel.hasUtm ? 'UTM Campaign ←' : 'Attribution Logic',
        v: channel.hasUtm
          ? `utm_campaign ("${channel.utm.campaign}")`
          : channel.referrer
          ? 'IF Munchkin Referrer Contains "google.com"'
          : 'ELSE (no UTM, no referrer present)',
      },
      { k: 'Result', v: 'Lead record saved with attribution' },
    ],
    caption: channel.hasUtm
      ? 'In Marketo, the Trigger listens for a submission on the "Request a Demo" form and creates or updates the Lead record. That lead then moves through the Flow’s steps, where it’s attributed a source, medium, and campaign from the incoming UTM parameters.'
      : channel.referrer
      ? 'In Marketo, the Trigger listens for a submission on the "Request a Demo" form and creates or updates the Lead record. Since there’s no UTM data, a Choice step in the Flow checks the Munchkin-logged referrer instead, to decide what source to attribute.'
      : 'In Marketo, the Trigger listens for a submission on the "Request a Demo" form and creates or updates the Lead record. With no UTM data and no referrer to check, the Flow falls through to its ELSE branch and attributes the default Direct source.',
  };

  if (!channel.hasAdPlatform) return [marketo];

  return [
    marketo,
    {
      id: 'gtm-trigger-google',
      system: 'GTM – Google Ads Conversion Tag',
      log: [
        { k: 'Custom event pushed', v: 'dataLayer.push({ event: "form_submit" })' },
        { k: 'GTM Trigger fires', v: 'Custom Event = "form_submit"' },
        { k: 'Reads', v: 'gclid from _gcl_aw cookie' },
        { k: 'Fires', v: "gtag('event', 'conversion', {...})" },
        { k: 'Destination', v: 'Google Ads' },
        { k: 'Status', v: '200, gclid decrypted → matched to Campaign, Keyword, Ad' },
      ],
      caption: 'The GTM Trigger watches the Data Layer for the form submit event. Once detected, it fires the Google Ads Conversion Tag, which grabs the saved gclid cookie and sends it to Google Ads, matching the lead directly to the exact campaign, keyword, and ad.',
    },
  ];
}

function capturesStageTitle(channel) {
  if (channel.hasUtm && channel.hasAdPlatform) return 'Two Scripts Read the Same URL';
  if (channel.hasUtm) return 'Marketo Reads the UTM Parameters';
  if (channel.referrer) return 'Marketo Reads the Referrer';
  return 'Marketo Reads the URL';
}

function UrlBar({ url, params, onAdvance }) {
  return (
    <div className="tech-url-block" onClick={onAdvance} role="button" tabIndex={0}>
      <div className="tech-url-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="tech-url-text">{url}</span>
      </div>
      <div className="tech-param-list">
        {params.length === 0 && <span className="tech-param-empty">No parameters, clean URL, no referrer</span>}
        {params.map((p) => (
          <span className="tech-param-chip" key={p.key}>
            <span className="tech-param-key">{p.key}</span>=<span className="tech-param-value">{p.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FormWithHiddenFields({ channel, formData, onChange, onAdvance }) {
  return (
    <div className="mock-form-card">
      <div className="mock-form-title">Request a Demo</div>
      <label className="mock-form-field">
        <span>Name</span>
        <input
          className="mock-form-input"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
        />
      </label>
      <label className="mock-form-field">
        <span>Work Email</span>
        <input
          className="mock-form-input"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
        />
      </label>
      <label className="mock-form-field">
        <span>Company</span>
        <input
          className="mock-form-input"
          value={formData.company}
          onChange={(e) => onChange({ ...formData, company: e.target.value })}
        />
      </label>
      <div className="tech-hidden-fields">
        <p className="tech-hidden-label">Hidden Fields (submitted, not shown to visitor)</p>
        {hiddenFields(channel).map((row) => (
          <div className="tech-kv-row" key={row.k}>
            <span className="tech-kv-key">{row.k}</span>
            <span className="tech-kv-value">{row.v}</span>
          </div>
        ))}
      </div>
      <button className="mock-form-submit" onClick={onAdvance}>
        Submit
      </button>
    </div>
  );
}

export default function TechnicalWalkthrough({ channel, formStage, onChangeChannel }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const totalStages = 4;
  const isLast = stageIndex === totalStages - 1;

  function advance() {
    setStageIndex((i) => Math.min(i + 1, totalStages - 1));
  }

  function restart() {
    setStageIndex(0);
    setFormData(DEFAULT_FORM_DATA);
  }

  function goTo(i) {
    if (i <= stageIndex) setStageIndex(i);
  }

  const stageTitles = [
    arrivalTitle(channel),
    capturesStageTitle(channel),
    formStage.title,
    'Systems React',
  ];

  return (
    <div className="walkthrough">
      <div className="walkthrough-channel-bar">
        <span>Channel: <strong>{channel.label}</strong></span>
        <button className="walkthrough-change-channel" onClick={onChangeChannel}>
          ← Try a different channel
        </button>
      </div>

      <ol className="walkthrough-progress">
        {stageTitles.map((title, i) => (
          <li
            key={title}
            className={`${i === stageIndex ? 'is-current' : ''} ${i < stageIndex ? 'is-done' : ''}`.trim()}
            onClick={() => goTo(i)}
          >
            {i + 1}. {title}
          </li>
        ))}
      </ol>

      <div className="walkthrough-stage">
        {stageIndex === 0 && (
          <>
            <p className="walkthrough-kicker">Step 1 of {totalStages}</p>
            <h2 className="walkthrough-title">{arrivalTitle(channel)}</h2>
            <div className="walkthrough-visual">
              <UrlBar url={buildUrl(channel)} params={arrivalParams(channel)} onAdvance={advance} />
            </div>
            <p className="walkthrough-caption">
              <GlossaryText text={arrivalDescription(channel)} />
            </p>
            <p className="walkthrough-hint">Click to see how each system reads it</p>
          </>
        )}

        {stageIndex === 1 && (
          <>
            <p className="walkthrough-kicker">Step 2 of {totalStages}</p>
            <h2 className="walkthrough-title">{capturesStageTitle(channel)}</h2>
            <div className="tech-panel-row">
              {captureBranches(channel).map((b) => (
                <TechLogPanel panel={b} key={b.id} />
              ))}
            </div>
            {channel.hasUtm && (
              <p className="tech-production-note">
                <strong>Production Note:</strong>{' '}
                <GlossaryText text="Native Marketo only captures parameters on direct landing pages. In practice, MOPs teams deploy a custom 1st-party cookie script (via GTM or site code) to persist UTMs across multi-page visits." />
              </p>
            )}
            <button className="walkthrough-restart" onClick={advance}>
              Continue to form submission →
            </button>
          </>
        )}

        {stageIndex === 2 && (
          <>
            <p className="walkthrough-kicker">Step 3 of {totalStages}</p>
            <h2 className="walkthrough-title">{formStage.title}</h2>
            <div className="walkthrough-visual">
              <FormWithHiddenFields
                channel={channel}
                formData={formData}
                onChange={setFormData}
                onAdvance={advance}
              />
            </div>
            <p className="walkthrough-caption">
              <GlossaryText text={formStage.description} />
            </p>
            <p className="walkthrough-hint">{formStage.cta}</p>
          </>
        )}

        {stageIndex === 3 && (
          <>
            <p className="walkthrough-kicker">Step 4 of {totalStages}</p>
            <h2 className="walkthrough-title">
              {channel.hasAdPlatform ? 'Two Systems React at Once' : 'Marketo Reacts'}
            </h2>
            <div className="tech-panel-row">
              {reactionBranches(channel).map((b) => (
                <TechLogPanel panel={b} key={b.id} />
              ))}
            </div>
            {!channel.hasAdPlatform && (
              <p className="mock-outcome-note">
                There’s no ad-platform step here, {channel.label.toLowerCase()} isn’t paid media, so there’s nothing to report back.
              </p>
            )}
            {isLast && (
              <button className="walkthrough-restart" onClick={restart}>
                ↺ Replay from the start
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
