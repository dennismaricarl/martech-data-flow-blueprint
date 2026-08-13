// First flow is fully built out as a draft for approval.
// The remaining five are placeholders until the pattern is signed off.

export const flows = [
  {
    id: 'about',
    name: 'About This Project',
    available: true,
    kind: 'about',
  },
  {
    id: 'multi-channel-inbound',
    name: 'Multi-Channel Inbound Web Traffic',
    available: true,
    channels: [
      {
        id: 'paid-ad',
        label: 'Paid Ad',
        sublabel: 'Google Ads',
        pickerDescription: 'A sponsored Google search ad. Carries UTM parameters plus Google’s own click ID, and reports back to Google Ads.',
        visualType: 'ad',
        entryTitle: 'Visitor Clicks an Ad',
        entryDescription: 'A visitor searches on Google, clicks a sponsored ad, and lands on the site. The link secretly carries tracking codes about where it came from.',
        entryCta: 'Click the ad to continue',
        entryTrigger: 'Visitor clicks the ad',
        hasUtm: true,
        utm: { source: 'google', medium: 'cpc', campaign: 'demo_request' },
        gclid: 'Cj0KCQiA1234567890abcXYZ',
        referrer: null,
        hasAdPlatform: true,
        leadSource: 'google_ads',
      },
      {
        id: 'organic',
        label: 'Organic Search',
        sublabel: 'Google, unpaid result',
        pickerDescription: 'An unpaid Google search result. No UTM parameters, nothing was paid for, so there’s no ad platform to notify.',
        visualType: 'search',
        entryTitle: 'Visitor Clicks an Organic Search Result',
        entryDescription: 'A visitor searches on Google and clicks your unpaid, organic listing, no ad, no tracking codes attached.',
        entryCta: 'Click the search result to continue',
        entryTrigger: 'Visitor clicks the organic result',
        hasUtm: false,
        utm: null,
        referrer: 'https://www.google.com/',
        hasAdPlatform: false,
        leadSource: 'Organic Search',
      },
      {
        id: 'email',
        label: 'Email Link',
        sublabel: 'Newsletter, webinar invite, nurture campaign',
        pickerDescription: 'A link inside any marketing email you sent, a newsletter, a webinar invite, a nurture drip, a sales follow-up. Carries UTM parameters, but it’s an owned channel, no ad platform involved.',
        visualType: 'email',
        entryTitle: 'Visitor Clicks a Link in an Email',
        entryDescription: 'A visitor opens a marketing email you sent them, could be a newsletter, a webinar reminder, or a nurture campaign, and clicks through to the demo page.',
        entryCta: 'Click the email link to continue',
        entryTrigger: 'Visitor clicks the email link',
        hasUtm: true,
        utm: { source: 'email', medium: 'email', campaign: 'nurture_newsletter' },
        referrer: null,
        hasAdPlatform: false,
        leadSource: 'Email Campaign',
      },
      {
        id: 'direct',
        label: 'Direct / Typed URL',
        sublabel: 'No referrer at all',
        pickerDescription: 'The visitor already knows your URL and types it straight into the browser. No UTM, no referrer, nothing to capture.',
        visualType: 'direct',
        entryTitle: 'Visitor Types the URL Directly',
        entryDescription: 'A visitor already knows your site and types the URL straight into the address bar, there’s no link, so nothing rides along with it.',
        entryCta: 'Click to load the page',
        entryTrigger: 'Visitor presses Enter on the typed URL',
        hasUtm: false,
        utm: null,
        referrer: null,
        hasAdPlatform: false,
        leadSource: 'Direct Traffic',
      },
    ],
    views: {
      walkthrough: {
        formStep: {
          kicker: 'Step 3 of 4',
          title: 'Visitor Fills Out the Form',
          description: 'The visitor fills out the form, requesting a demo, and hits submit.',
          cta: 'Click Submit',
        },
      },
      technical: {
        formStage: {
          title: 'Visitor Fills Out the Form',
          description: 'The visitor only sees Name, Email, and Company, but whatever was captured at page load is submitted right along with them.',
          cta: 'Click Submit',
        },
      },
    },
  },
  {
    id: 'off-platform-leadgen',
    name: 'Off-Platform Lead Generation',
    available: true,
    kind: 'off-platform',
    channels: [
      {
        id: 'linkedin-lead-gen',
        label: 'LinkedIn Lead Gen Form',
        sublabel: 'Native in-feed lead ad',
        pickerDescription: 'A sponsored post in the LinkedIn feed with a native lead form attached. The visitor never leaves LinkedIn, the lead reaches Marketo minutes later through a webhook and the LaunchPoint API, not a page visit.',
        entryTitle: 'Visitor Engages With the Sponsored Post',
        entryDescription: 'A visitor is scrolling their LinkedIn feed and sees a sponsored post from Acme Co. offering a gated report, “The State of Lead Routing, 2026.” They click Download, and a native form pops up pre-filled with their LinkedIn profile data. There’s no link to an external site, everything happens right there inside LinkedIn.',
        entryCta: 'Click Download to open the lead form',
        leadSource: 'Paid Social',
        stampingTrigger: 'Fills Out LinkedIn Lead Gen Form',
        program: 'FY26 – LinkedIn Lead Gen – Content Download',
      },
    ],
  },
  {
    id: 'third-party-vendor',
    name: 'Third-Party & Vendor Inbound',
    available: true,
    kind: 'vendor-inbound',
    touchpoint: 'You pay a content syndication vendor to host your gated whitepaper, and they send you a list of leads who downloaded it. How that list actually reaches Marketo depends on which path the vendor uses.',
    vendorName: 'TechTarget',
    assetName: '“2026 Marketing Operations Benchmark Report”',
    channels: [
      {
        id: 'batch-csv',
        label: 'Batch CSV Import',
        sublabel: 'Manual path',
        pickerDescription: 'The vendor emails over a static CSV of leads once a cycle. A MOps manager manually uploads it into Marketo. Standard for smaller vendors, one-off events, or budget-conscious campaigns where real-time routing isn’t required.',
        leadSource: 'Content Syndication',
        program: 'FY26 – Content Syndication – TechTarget',
        pipeline: [
          {
            title: 'Delivery',
            panels: [
              {
                system: 'Vendor – TechTarget',
                log: [
                  { k: 'Delivery method', v: 'Static CSV file' },
                  { k: 'Channel', v: 'Email, Slack, or client portal' },
                  { k: 'Cadence', v: 'Batched, not real-time' },
                ],
                caption: 'The vendor securely delivers a static CSV file containing lead data, typically via email, Slack, or a client portal. There’s no system-to-system connection here, a person has to go get the file.',
              },
            ],
            cta: 'Continue to List Import →',
          },
          {
            title: 'List Import',
            panels: [
              {
                system: 'Marketo – List Import',
                log: [
                  { k: 'Action', v: 'Manually map CSV columns to Marketo fields' },
                  { k: 'Tool', v: 'Marketo’s standard List Import interface' },
                  { k: 'Operator', v: 'MOps manager, human-in-the-loop' },
                ],
                caption: 'A MOps manager manually maps and uploads the CSV directly into Marketo via the standard List Import interface. This is the one truly manual step in the whole pipeline.',
              },
            ],
            cta: 'Continue to hygiene →',
          },
          {
            title: 'Hygiene & Scrubbing',
            panels: [
              {
                system: 'Marketo – Smart Campaign (Hygiene)',
                log: [
                  { k: 'Checks', v: 'Duplicate or invalid emails' },
                  { k: 'Normalizes', v: 'Messy job titles' },
                  { k: 'Verifies', v: 'Match against Ideal Customer Profile (ICP)' },
                ],
                caption: 'Marketo executes automated hygiene rules (e.g., job title normalization, email domain verification, country formatting, and ICP gates) before record progression.',
              },
            ],
            note: {
              label: 'Enterprise Architecture Note:',
              text: 'While basic hygiene (like country formatting or lead source stamping) can run directly inside Marketo Smart Campaigns, enterprise stacks often route records through specialized orchestration tools (e.g., RingLead or OpenPrise) via API/webhook for advanced fuzzy deduplication, title normalization, and L2A matching.',
            },
            cta: 'Continue to stamping →',
          },
          {
            title: 'Attribution & Stamping',
            panels: [
              {
                system: 'Marketo – Program Membership',
                log: [
                  { k: 'Lead Source ←', v: '“Content Syndication”' },
                  { k: 'Vendor Name ←', v: '“TechTarget”' },
                  { k: 'Program', v: 'FY26 – Content Syndication – TechTarget' },
                ],
                caption: 'Marketo stamps the records with program-specific data, Lead Source and Vendor Name, so attribution survives even though this lead never touched your own systems directly.',
              },
            ],
          },
        ],
      },
      {
        id: 'zapier-middleware',
        label: 'Zapier Middleware',
        sublabel: 'Automated path, CRM first',
        pickerDescription: 'The vendor’s platform fires a webhook the instant a visitor converts. Zapier catches it, creates the record in Salesforce, and Salesforce syncs it to Marketo. Real-time, no manual files, middleware handles the delivery.',
        leadSource: 'Content Syndication',
        program: 'FY26 – Content Syndication – TechTarget',
        pipeline: [
          {
            title: 'Vendor Fires Webhook',
            panels: [
              {
                system: 'Vendor Platform',
                log: [
                  { k: 'Event', v: 'Qualifying form submission' },
                  { k: 'Delivery', v: 'HTTP POST, the exact millisecond it happens' },
                  { k: 'Destination', v: 'A dedicated Zapier “Catch Hook” URL' },
                ],
                caption: 'The vendor’s platform automatically transmits the lead data packet via an HTTP POST request the exact millisecond a prospect submits a form or initiates a qualifying entry point.',
              },
            ],
            cta: 'Continue to Zapier →',
          },
          {
            title: 'Zapier Catches the Payload',
            panels: [
              {
                system: 'Zapier – Catch Hook',
                log: [
                  { k: 'URL', v: 'Dedicated, unique Catch Hook endpoint' },
                  { k: 'State', v: 'Idle until a payload lands on it' },
                  { k: 'Action', v: 'Parses the incoming JSON data packet' },
                ],
                caption: 'Zapier hosts a dedicated, unique Catch Hook URL that sits completely idle until the vendor’s data packet lands on it. That’s what wakes the workflow up.',
              },
            ],
            cta: 'Continue to CRM →',
          },
          {
            title: 'CRM Ingestion & Sync',
            panels: [
              {
                system: 'Salesforce – Lead Ingestion',
                log: [
                  { k: 'Driver', v: 'Zapier calls the Salesforce API' },
                  { k: 'Action', v: 'Create or update Lead record' },
                ],
                caption: 'Zapier becomes the driver, instantly parsing the data to create a new Lead inside Salesforce.',
              },
              {
                system: 'Marketo – Native Sync',
                log: [
                  { k: 'Trigger', v: 'New or updated Salesforce Lead' },
                  { k: 'Sync', v: 'Native, bi-directional CRM-to-Marketing sync' },
                ],
                caption: 'Salesforce automatically mirrors the record over to Marketo via the native sync, no custom code involved.',
              },
            ],
            cta: 'Continue to hygiene →',
          },
          {
            title: 'Hygiene & Attribution',
            panels: [
              {
                system: 'Marketo – Smart Campaign',
                log: [
                  { k: 'Trigger', v: 'Record created via CRM sync' },
                  { k: 'Action', v: 'Run hygiene filters, stamp lead source' },
                  { k: 'Lead Source ←', v: '“Content Syndication”' },
                ],
                caption: 'Marketo Smart Campaigns trigger upon record creation to execute hygiene filters and stamp custom lead source parameters.',
              },
            ],
            note: {
              label: 'Enterprise Architecture Note:',
              text: 'While basic hygiene (like country formatting or lead source stamping) can run directly inside Marketo Smart Campaigns, enterprise stacks often route records through specialized orchestration tools (e.g., RingLead or OpenPrise) via API/webhook for advanced fuzzy deduplication, title normalization, and L2A matching.',
            },
          },
        ],
      },
      {
        id: 'orchestration',
        label: 'Orchestration Platform',
        sublabel: 'Automated cleansing path',
        pickerDescription: 'For high-volume partners, leads stream in continuously via API or a scheduled file drop. A data orchestration platform scrubs, normalizes, and deduplicates everything before it ever touches Marketo.',
        leadSource: 'Content Syndication',
        program: 'FY26 – Content Syndication – TechTarget',
        pipeline: [
          {
            title: 'Vendor Delivers Feed',
            panels: [
              {
                system: 'Vendor Platform',
                log: [
                  { k: 'Delivery', v: 'Real-time API payload, or scheduled SFTP file drop' },
                  { k: 'Destination', v: 'Your data orchestration platform' },
                ],
                caption: 'The vendor’s platform automatically transmits lead data via a real-time API payload or an automated secure file drop, no manual download required.',
              },
            ],
            cta: 'Continue to orchestration →',
          },
          {
            title: 'Orchestration & Hygiene',
            panels: [
              {
                system: 'OpenPrise – Data Orchestration',
                log: [
                  { k: 'Scrubs', v: 'Invalid emails' },
                  { k: 'Normalizes', v: 'Messy text, job titles, regions' },
                  { k: 'Runs', v: 'Deduplication against your existing database' },
                ],
                caption: 'A data orchestration platform like OpenPrise automatically intercepts the incoming data to scrub, normalize, and deduplicate it before it ever touches your core systems.',
              },
            ],
            cta: 'Continue to Marketo →',
          },
          {
            title: 'Marketo Ingestion',
            panels: [
              {
                system: 'Marketo – Clean Ingestion',
                log: [
                  { k: 'Trigger', v: 'OpenPrise clears the record' },
                  { k: 'Action', v: 'Fires a clean webhook into Marketo' },
                  { k: 'Result', v: 'Verified, deduplicated record ingested' },
                ],
                caption: 'Once the lead successfully clears all hygiene gates, OpenPrise pushes the clean, verified record directly into Marketo via an API webhook connection.',
              },
            ],
          },
        ],
      },
    ],
    views: {
      walkthrough: {
        entryTitle: 'Visitor Finds the Gated Content',
        entryDescription: 'A visitor is researching on TechTarget and finds your gated report, “2026 Marketing Operations Benchmark Report.” They fill out TechTarget’s own form, not yours, and download the asset. From here, what happens next depends entirely on which path the vendor uses to deliver the lead.',
        entryCta: 'Click Download to fill out the form',
      },
    },
  },
  {
    id: 'event-engagement',
    name: 'Event & Engagement Operations',
    available: true,
    kind: 'event-engagement',
    eventName: 'Scaling Revenue Ops in 2026',
    channels: [
      {
        id: 'live-webinar',
        label: 'Live Webinar & Virtual Events',
        sublabel: 'ZOOM · BIZZABO · BIGMARKER',
        pickerDescription: 'A visitor registers for and attends (or skips) a live webinar on an external platform. Registration and attendance both sync back to Marketo automatically via native LaunchPoint connectors.',
        pipeline: [
          {
            title: 'Registration',
            panels: [
              {
                system: 'Acme Co. Landing Page (Embedded Marketo Form)',
                log: [
                  { k: 'Trigger', v: 'Prospect submits the embedded Marketo form' },
                  { k: 'Smart Campaign', v: '“Fills Out Form” → Change Program Status → Registered' },
                ],
                caption: "A prospect submits an embedded Marketo form on your landing page. An active Smart Campaign trigger captures the form fill and instantly updates their program status to 'Registered'.",
              },
            ],
            cta: 'Continue to the Zoom sync →',
          },
          {
            title: 'Marketo → Zoom API Push',
            panels: [
              {
                system: 'Marketo – Event Program (LaunchPoint)',
                log: [
                  { k: 'Integration Setup', v: 'Connected to Zoom via native LaunchPoint integration, authenticated securely via OAuth.' },
                  { k: 'Event Mapping', v: 'Marketo Program linked directly to the specific Zoom Webinar ID in Event Settings' },
                  { k: 'Action', v: 'The instant status flips to Registered, Marketo fires an HTTP POST request with the registrant payload' },
                  { k: 'API Endpoint', v: 'POST api.zoom.us/v2/webinars/{webinarId}/registrants' },
                ],
                caption: 'The moment the Program status flips to Registered, Marketo automatically posts the registrant’s details to Zoom’s REST API—no custom webhook required. This is the native LaunchPoint integration doing its job.',
              },
            ],
            cta: 'Continue to Zoom →',
          },
          {
            title: 'Zoom Generates the Join Link',
            panels: [
              {
                system: 'Zoom – Webinar Registrants API',
                log: [
                  { k: 'Receives', v: 'JSON payload: name, email, company' },
                  { k: 'Generates', v: 'A unique join URL for this registrant' },
                  { k: 'Responds', v: 'HTTP 201, join URL in the response body' },
                ],
                caption: 'Zoom’s API processes the registration and generates a join URL tied strictly to this one registrant’s email, then sends it back to Marketo in the API response.',
              },
            ],
            cta: 'Continue to confirmation →',
          },
          {
            title: 'Token Population & Confirmation Email',
            panels: [
              {
                system: 'Marketo – Program Member Field',
                log: [
                  { k: 'Stores response in', v: '{{member.webinar url}} (Program Member level)' },
                  { k: 'Send Email step', v: '“Webinar Confirmation” merges {{member.webinar url}}' },
                  { k: 'Result', v: 'Registrant receives their personal join link by email' },
                ],
                caption: 'Marketo writes the returned URL to a Program Member field. When the confirmation email is sent via the Send Email flow step, Marketo automatically replaces the {{member.webinar url}} token with the registrant’s unique join link.',
              },
            ],
            note: {
              label: 'Note:',
              text: 'This walkthrough assumes a native LaunchPoint connection to the webinar platform, not a custom-built webhook integration.',
            },
            cta: 'Continue to the live event →',
          },
          {
            title: 'Attendance Sync',
            panels: [
              {
                system: 'Zoom – Post-Webinar Sync',
                log: [
                  { k: 'Event Source', v: 'Webinar Host ends session (Zoom “webinar.ended” event fires)' },
                  { k: 'Sync Mechanism', v: 'Zoom’s native webhook, delivered via LaunchPoint, pushes participant logs to Marketo' },
                  { k: 'Result', v: 'Marketo Program Member statuses automatically update to “Attended” or “No Show”' },
                ],
                caption: 'When the host ends the webinar, Zoom fires an automated webhook payload (HTTP POST) containing the Webinar ID and attendee logs directly to Marketo’s LaunchPoint endpoint, automatically updating each registrant’s status to Attended or No Show.',
              },
            ],
          },
        ],
      },
    ],
    views: {
      walkthrough: {
        entryTitle: 'Visitor Sees the Invite',
        entryDescription: 'After clicking a promotional email, LinkedIn ad, or social post, the visitor is invited to register for the upcoming webinar.',
        entryCta: 'Click Register Now to continue',
      },
    },
  },
  {
    id: 'backend-engine',
    name: 'The Backend Systems Engine',
    available: true,
    kind: 'backend-engine',
    touchpoint: 'The grand finale. The moment a lead converts through any of the other five flows, this universal backend machine takes over automatically, no matter how they got here.',
    channels: [
      {
        id: 'universal-engine',
        label: 'The Universal Backend Systems Engine',
        sublabel: 'MARKETO · SALESFORCE · LEANDATA',
        pickerDescription: 'The modular automation framework that evaluates, scores, qualifies, and routes leads the moment any entry point is completed.',
        footnote: {
          label: '💡 MOPs Architecture Note:',
          text: 'While specific scoring thresholds, lifecycle stages, and routing software (e.g., LeanData vs. SFDC Assignment Rules) vary by company tech stack, this 5-step sequence represents the enterprise standard for lead-to-revenue automation.',
        },
        pipeline: [
          {
            crumbTitle: 'Scoring',
            title: 'Scoring (Marketo)',
            panels: [
              {
                system: 'Marketo – Lead Scoring Program',
                log: [
                  { k: 'System Action', v: 'Background Smart Campaigns trigger the millisecond a lead is created or updated' },
                  { k: 'Evaluates', v: 'Demographic Fit (Title, Industry, Company Size) + Behavioral Activity (form submits, web visits, email clicks)' },
                  { k: 'Includes', v: 'Automated score decay for inactivity' },
                ],
                caption: 'Marketo’s background Smart Campaigns trigger the millisecond a lead is created or updated, evaluating demographic fit and behavioral activity to adjust the lead score, with automated decay built in for inactivity.',
              },
            ],
            cta: 'Continue to MQL threshold →',
          },
          {
            crumbTitle: 'MQL Threshold & Lifecycle',
            title: 'MQL Threshold & Lifecycle (Marketo)',
            panels: [
              {
                system: 'Marketo – Lifecycle Smart Campaign',
                log: [
                  { k: 'System Action', v: 'A Smart Campaign evaluates whether Lead Score ≥ Threshold (e.g., 75+ points)' },
                  { k: 'Lifecycle Stage ←', v: '“MQL”' },
                  { k: 'Field Stamped', v: 'MQL Date = System Timestamp' },
                  { k: 'Also Sets', v: 'SLA timers for SDR follow-up' },
                ],
                caption: 'A Smart Campaign evaluates whether the Lead Score crosses your threshold (e.g., 75+ points). Once it does, the Lifecycle Stage flips to MQL, the MQL Date is stamped with a system timestamp, and SLA timers start for SDR follow-up.',
              },
            ],
            cta: 'Continue to CRM sync →',
          },
          {
            crumbTitle: 'CRM Sync',
            title: 'CRM Sync (Marketo → Salesforce Native Sync)',
            panels: [
              {
                system: 'Marketo – Native Salesforce Connector',
                log: [
                  { k: 'System Action', v: 'Marketo triggers a sync action (“Sync Person to SFDC”)' },
                  { k: 'Pushes', v: 'New or updated person record across the native connector' },
                  { k: 'Result', v: 'Created in Salesforce as a Lead record, custom Marketo fields mapped to SFDC fields' },
                ],
                caption: 'Marketo triggers a sync action that pushes the new or updated person record across the native connector into Salesforce as a Lead record, mapping custom Marketo fields to SFDC fields automatically.',
              },
            ],
            cta: 'Continue to routing →',
          },
          {
            crumbTitle: 'Account Matching & Routing',
            title: 'Account Matching & Lead Routing (LeanData / SFDC Rules)',
            panels: [
              {
                system: 'LeanData / Salesforce – Routing Rules',
                log: [
                  { k: 'System Action', v: 'LeanData (or SFDC Assignment Rules) intercepts the newly created Lead in Salesforce' },
                  { k: 'L2A Matching', v: 'Runs Lead-to-Account matching to see if the lead belongs to an existing Target Account' },
                  { k: 'Routing', v: 'Based on territory, region, or enterprise account owner' },
                ],
                caption: 'LeanData, or native SFDC Assignment Rules, intercepts the newly created Lead in Salesforce and runs Lead-to-Account (L2A) matching to see if it belongs to an existing Target Account, then routes it based on territory, region, or enterprise account owner.',
              },
            ],
            note: {
              label: 'Pro-Tip (The Sync Timing Gap):',
              text: 'Standard Salesforce lead assignment updates don’t push back to Marketo in real time. Marketo must wait for its next sync cycle (5–10 min) to detect the owner change. To protect tight SLA response times, best practice is to trigger SDR alerts directly from your routing engine (e.g., LeanData or Salesforce Flow) the instant assignment occurs.',
            },
            cta: 'Continue to handoff →',
          },
          {
            crumbTitle: 'Sales Handoff',
            title: 'Sales Handoff & Notification (Salesforce → Slack / SDR Queue)',
            panels: [
              {
                system: 'Salesforce / Slack – SDR Execution',
                log: [
                  { k: 'System Action', v: 'Salesforce assigns lead ownership to the designated SDR or Queue and fires real-time alerts' },
                  { k: 'Creates', v: 'High-priority Task in Salesforce' },
                  { k: 'Notifies', v: 'Automated Slack notification to #sales-mql-alerts' },
                  { k: 'Starts', v: 'SLA response timer' },
                ],
                caption: 'Salesforce assigns lead ownership to the designated SDR or queue, creates a high-priority Task, and sends an automated Slack notification to #sales-mql-alerts, starting the SLA response timer the instant the rep is notified.',
              },
            ],
          },
        ],
      },
    ],
  },
  { id: 'glossary', name: 'Glossary', available: true, kind: 'glossary' },
];
