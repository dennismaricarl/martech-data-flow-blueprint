export const glossary = [
  // Client-Side Mechanics
  {
    id: 'client-side-script',
    label: 'Client-Side Script',
    category: 'Client-Side Mechanics',
    definition:
      'A small piece of JavaScript that runs directly in the visitor’s browser rather than on a server. It can read the page URL, cookies, and the DOM, and react instantly without a round trip to a backend.',
    mopsContext:
      'Marketo’s embedded form script and Google Tag Manager both run client-side, which is how they scrape UTM parameters and click IDs out of the URL the instant a page loads, before the visitor fills out anything.',
    match: [],
  },
  {
    id: 'window-location-search',
    label: 'window.location.search',
    category: 'Client-Side Mechanics',
    definition:
      'A built-in browser property that returns everything in the current URL starting from the ? (the query string), like "?utm_source=google&utm_medium=cpc". Any client-side script can read it instantly, no server request needed.',
    mopsContext:
      'This is the exact property Marketo’s form script and GTM read on page load to instantly pull UTM parameters and click IDs out of the URL. While scripts read this data immediately to populate hidden fields or store first-party cookies, these parameters aren’t tied to a person in Marketo until the visitor submits a form (or clicks a tracked email) to convert from an anonymous visitor into a known lead.',
    match: ['window.location.search'],
  },
  {
    id: 'first-party-cookie',
    label: '1st-Party Cookie',
    category: 'Client-Side Mechanics',
    definition:
      'A small piece of data a website stores in the visitor’s browser under its own domain. Because it’s set by the site the visitor is actually on, it survives longer and isn’t blocked by the same privacy restrictions as third-party cookies.',
    mopsContext:
      'GTM’s Conversion Linker tag stores the gclid in a first-party cookie (_gcl_aw) so it can still be read later when the visitor finally submits a form, even if that happens on a different page of the same site.',
    match: ['first-party cookie', 'First-Party Cookie', '1st-party cookie', '1st-Party Cookie'],
  },
  {
    id: 'third-party-cookie',
    label: '3rd-Party Cookie',
    category: 'Client-Side Mechanics',
    definition:
      'A cookie set by a domain other than the one the visitor is currently on, typically dropped by an embedded ad, tracking pixel, or widget. Most modern browsers block or heavily restrict these by default.',
    mopsContext:
      'Because third-party cookies are increasingly blocked, MOPs teams lean on first-party alternatives (UTM parameters, server-side sync, native platform integrations) to keep attribution working.',
    match: ['third-party cookie', 'Third-Party Cookie', '3rd-party cookie', '3rd-Party Cookie'],
  },
  {
    id: 'utm-parameter',
    label: 'UTM Parameter',
    category: 'Client-Side Mechanics',
    definition:
      'A tag appended to the end of a URL (like ?utm_source=linkedin&utm_medium=cpc) that tells the receiving system where the click came from. It’s plain text, visible in the address bar, with no security or expiration built in.',
    mopsContext: [
      'Marketo’s form script reads UTM parameters straight off the URL and drops them into hidden fields, which is how a lead record gets stamped with its original source, medium, and campaign.',
      'The three core ones: utm_source (where, e.g. "google"), utm_medium (channel type, e.g. "cpc"), utm_campaign (which campaign, e.g. "demo_request").',
    ],
    match: ['UTM parameters', 'UTM Parameters', 'UTM parameter', 'UTM Parameter'],
  },
  {
    id: 'utm-source',
    label: 'utm_source',
    category: 'Client-Side Mechanics',
    definition: 'The UTM parameter naming where the traffic came from, e.g. "google" or "linkedin".',
    mopsContext: 'Marketo maps utm_source straight into the Lead Source field on the record.',
    match: ['utm_source', 'UTM Source'],
  },
  {
    id: 'utm-medium',
    label: 'utm_medium',
    category: 'Client-Side Mechanics',
    definition: 'The UTM parameter naming the channel type, e.g. "cpc" or "email".',
    mopsContext: 'Marketo auto-populates utm_medium into a hidden form field that maps directly to the Lead Medium field on the Person record (e.g., cpc, organic, email), allowing MOPs teams to distinguish paid traffic from organic traffic regardless of the source.',
    match: ['utm_medium', 'UTM Medium'],
  },
  {
    id: 'utm-campaign',
    label: 'utm_campaign',
    category: 'Client-Side Mechanics',
    definition: 'The UTM parameter naming the specific campaign, e.g. "demo_request".',
    mopsContext: 'Marketo stamps utm_campaign onto the lead record so results trace back to the exact campaign that drove them.',
    match: ['utm_campaign', 'UTM Campaign'],
  },
  {
    id: 'gclid',
    label: 'gclid',
    category: 'Client-Side Mechanics',
    definition:
      'Google’s own click identifier, appended to a URL as ?gclid=... the moment someone clicks a Google Ads link. It’s how Google Ads recognizes that a later conversion traces back to a specific ad click.',
    mopsContext:
      'GTM’s Conversion Linker tag detects the gclid on page load and stores it in a first-party cookie, so it can still be reported back to Google Ads later, even if the form submission happens on a different page.',
    match: ['gclid'],
  },
  {
    id: 'click-id',
    label: 'Click ID',
    category: 'Client-Side Mechanics',
    definition:
      'A general term for the unique identifier an ad platform appends to a link so it can match a later conversion back to the exact ad click. Google’s version is called gclid; other platforms use their own equivalents (fbclid, msclkid, li_fat_id).',
    mopsContext:
      'MOPs teams treat click IDs as separate from UTM parameters: UTMs describe the campaign in human-readable terms, while a click ID is the platform’s own tracking key used purely for conversion matching.',
    match: ['click ID', 'Click ID'],
  },
  {
    id: 'marketo-script',
    label: 'Marketo Script',
    category: 'Client-Side Mechanics',
    definition:
      'Marketo forms have a built-in tracking feature. The moment the embed code loads the form on your website, its pre-programmed JavaScript automatically scans the browser’s address bar for UTM parameters and copies them into your hidden tracking fields before a visitor even interacts with the page.',
    mopsContext:
      'This is what lets a Marketo form scrape UTM parameters straight off the URL and drop them into hidden fields, so the lead record gets attributed correctly without the visitor typing a thing.',
    match: ['Marketo script', 'Marketo Script', 'Marketo’s form script'],
  },
  {
    id: 'hidden-field',
    label: 'Hidden Field',
    category: 'Client-Side Mechanics',
    definition:
      'A form field that’s part of the submission payload but never rendered for the visitor to see or edit. It’s populated programmatically, usually by a script reading the URL, a cookie, or a prior form fill.',
    mopsContext:
      'Marketo forms use hidden fields to smuggle UTM values, lead source, and other tracking data into the lead record without cluttering the visible form.',
    match: ['hidden field', 'Hidden field', 'Hidden Field', 'hidden fields', 'Hidden fields', 'Hidden Fields'],
  },
  {
    id: 'referrer',
    label: 'Referrer',
    category: 'Client-Side Mechanics',
    definition:
      'A header the browser automatically sends with a page request, naming the previous page the visitor came from. Unlike UTM parameters, it’s set by the browser itself, not appended by a marketer.',
    mopsContext:
      'When a click carries no UTM parameters, Marketo’s Munchkin script can fall back on the logged referrer to guess a reasonable lead source, like attributing a visit to “Organic Search” because the referrer contains google.com.',
    match: ['referrer header', 'Referrer Header', 'referrer', 'Referrer'],
  },
  {
    id: 'munchkin',
    label: 'Munchkin',
    category: 'Client-Side Mechanics',
    definition:
      'Marketo’s built-in web-tracking script, embedded sitewide, that logs anonymous page views, referrers, and behavior against a browser cookie, then stitches that activity to a lead record once it’s identified.',
    mopsContext:
      'Munchkin is what lets Marketo log a page view and its referrer automatically, no custom code required, even before it knows who the visitor is.',
    match: ['Munchkin'],
  },
  {
    id: 'data-layer',
    label: 'Data Layer (GTM)',
    category: 'Client-Side Mechanics',
    definition:
      'A JavaScript object on a page that temporarily stores structured information, like a UTM value or a custom event name, so tag managers and analytics tools can read it in a consistent format.',
    mopsContext:
      'Google Tag Manager pushes events like "form_submit" into the data layer, which is what lets a GTM trigger detect the submission and fire a conversion tag back to Google Ads.',
    match: ['Data Layer', 'data layer'],
  },
  {
    id: 'conversion-linker',
    label: 'Conversion Linker',
    category: 'Client-Side Mechanics',
    definition:
      'A pre-built Google Tag Manager tag that automatically detects a gclid in the URL and stores it in a first-party cookie, no custom configuration required.',
    mopsContext:
      'MOPs and web teams add the Conversion Linker tag once, sitewide, so every future ad click is captured for Google Ads conversion matching without any per-campaign setup.',
    match: ['Conversion Linker'],
  },
  {
    id: 'google-tag-manager',
    label: 'Google Tag Manager (GTM)',
    category: 'Client-Side Mechanics',
    definition:
      'A free tool that lets marketers deploy and manage tracking scripts (called tags) on a website without editing the site’s code directly. Tags fire based on triggers, like a page load or a button click.',
    mopsContext:
      'GTM is what runs the Conversion Linker and Google Ads Conversion tags on the site, capturing the gclid on arrival and reporting the conversion back to Google Ads once the visitor submits a form.',
    match: ['Google Tag Manager', 'GTM'],
  },
  {
    id: 'gtm-trigger',
    label: 'GTM Trigger',
    category: 'Client-Side Mechanics',
    definition:
      'A rule configured inside Google Tag Manager that listens for a specific browser event, like a custom Data Layer event or a click, and fires a tag when it matches. This is a GTM-native concept, separate from a Marketo Smart Campaign trigger.',
    mopsContext:
      'The GTM Trigger here watches the Data Layer for the "form_submit" event pushed by Marketo’s script, then fires the Google Ads Conversion Tag. It’s configured entirely in GTM and has nothing to do with the Marketo trigger that already fired to create the Lead.',
    match: ['GTM Trigger', 'GTM trigger'],
  },
  {
    id: 'google-ads',
    label: 'Google Ads',
    category: 'Client-Side Mechanics',
    definition:
      'Google’s advertising platform, where advertisers bid on keywords to show sponsored ads in search results. It has its own Auto-Tagging setting that appends a gclid to the destination URL on every click by default.',
    mopsContext:
      'Google Ads is the destination the gclid ultimately reports back to, letting it match a form submission to the exact campaign, keyword, and ad that earned the click.',
    match: ['Google Ads'],
  },

  // Protocols & Data Transfer
  {
    id: 'webhook',
    label: 'Webhook',
    category: 'Protocols & Data Transfer',
    definition:
      'An automated, one-way HTTP callback: the moment an event happens in one system, it pushes a data payload directly to a URL you’ve configured on another system. No polling required.',
    mopsContext:
      'Third-party vendors and social ad platforms use webhooks to push new leads into Marketo (via LaunchPoint) or middleware like Zapier the instant a form is submitted, rather than waiting for a batch sync.',
    match: ['webhook', 'Webhook', 'webhooks', 'Webhooks'],
  },
  {
    id: 'rest-api',
    label: 'REST API',
    category: 'Protocols & Data Transfer',
    definition:
      'A standardized way for two systems to talk over HTTP, using predictable endpoints and verbs — `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove) — to read or write data. Most modern MarTech platforms expose one.',
    mopsContext:
      'REST APIs allow tools like LeanData, Zoom, and custom scripts to push, pull, or sync lead records outside of a platform’s manual UI.',
    match: ['REST API'],
  },
  {
    id: 'salesforce-api',
    label: 'Salesforce API',
    category: 'Protocols & Data Transfer',
    definition:
      'Salesforce’s own REST API, the set of endpoints external tools use to create, read, update, or delete records (like Leads, Contacts, and Accounts) directly inside a Salesforce org, authenticated via OAuth rather than a shared login.',
    mopsContext:
      'When a vendor’s webhook lands in Zapier, Zapier acts as the driver, calling the Salesforce API to create or update the Lead record. That record then flows into Marketo via the native sync, rather than Marketo touching Salesforce directly.',
    match: ['Salesforce API'],
  },
  {
    id: 'catch-hook',
    label: 'Catch Hook',
    category: 'Protocols & Data Transfer',
    definition:
      'A dedicated, unique URL hosted by a middleware tool (like Zapier) that sits idle until an external system sends data to it. Receiving a payload on that URL is what wakes up the automation.',
    mopsContext:
      'Vendor platforms fire a webhook at a Zapier Catch Hook, which parses the payload and creates or updates the corresponding record in Salesforce.',
    match: ['Catch Hook'],
  },
  {
    id: 'http-post',
    label: 'HTTP POST',
    category: 'Protocols & Data Transfer',
    definition:
      'One of the standard HTTP verbs, used to send (rather than request) data to a server. When a system “fires an HTTP POST,” it’s actively pushing a payload to another system’s endpoint.',
    mopsContext:
      'Webhooks are almost always delivered as an HTTP POST: the sending platform packages the lead or event data and posts it straight to your endpoint the instant it happens.',
    match: ['HTTP POST', 'HTTPS POST'],
  },
  {
    id: 'endpoint',
    label: 'Endpoint',
    category: 'Protocols & Data Transfer',
    definition:
      'The specific URL a system exposes to receive or serve data over an API or webhook. Think of it as the address a request gets sent to, not the whole platform, just the one door that handles a particular kind of request.',
    mopsContext:
      'Marketo’s LaunchPoint connectors and Zapier’s Catch Hooks each expose their own endpoint, which is the exact address vendor platforms are configured to push lead data to.',
    match: ['endpoint URL', 'API Endpoint', 'endpoint'],
  },
  {
    id: 'payload',
    label: 'Payload',
    category: 'Protocols & Data Transfer',
    definition:
      'The actual bundle of data sent in a single request, usually formatted as JSON, a structured, text-based way of representing fields and values that both systems can read.',
    mopsContext:
      'When a vendor’s webhook fires, the payload contains the lead’s submitted fields, name, email, company, packaged so Marketo or Zapier can parse it and create the record automatically.',
    match: [
      'JSON data object',
      'JSON data packet',
      'JSON Object',
      'JSON object',
      'JSON payload',
      'data packet',
      'API payload',
      'data payload',
      'Payload',
      'payload',
    ],
  },
  {
    id: 'oauth',
    label: 'OAuth',
    category: 'Protocols & Data Transfer',
    definition:
      'A standard way for two systems to authenticate a connection without sharing a raw password, instead exchanging a secure token (sometimes a JWT, JSON Web Token) that proves the connection is authorized.',
    mopsContext:
      'A Marketo LaunchPoint integration is typically set up once via OAuth, establishing a standing, secure connection that every future API call between the two systems reuses.',
    match: ['OAuth', 'JWT', 'API key'],
  },
  {
    id: 'middleware',
    label: 'Middleware',
    category: 'Protocols & Data Transfer',
    definition:
      'A third-party tool (like Zapier or Tray.io) that sits between two systems that don’t talk to each other natively, catching data from one and reformatting or routing it into the other.',
    mopsContext:
      'When a platform doesn’t have a native Marketo or Salesforce connector, MOPs teams reach for middleware to catch its webhook and translate the payload into a format Salesforce or Marketo can ingest.',
    match: ['middleware', 'Middleware'],
  },

  // Integrations
  {
    id: 'native-sync',
    label: 'Native Sync',
    category: 'Integrations',
    definition:
      'A built-in, bi-directional data connection between two platforms (most commonly Marketo and Salesforce) that keeps records mirrored on a near-continuous schedule without custom middleware.',
    mopsContext:
      'Once a lead is created in Salesforce by an outside process, the Marketo–Salesforce native sync automatically mirrors that record back into Marketo so it can re-enter the marketing lifecycle.',
    match: ['native sync', 'Native Sync', 'native connector', 'bi-directional sync', 'bi-directional'],
  },
  {
    id: 'launchpoint-api',
    label: 'LaunchPoint API',
    category: 'Integrations',
    definition:
      'Marketo’s framework for connecting approved third-party applications directly into a Marketo instance, exposing a governed API surface for pushing or pulling lead data.',
    mopsContext:
      'Social platforms like LinkedIn and event tools like Zoom connect through LaunchPoint so their native integrations can create and update Marketo leads without a separate middleware hop.',
    match: ['LaunchPoint API', 'LaunchPoint'],
  },
  {
    id: 'data-orchestration',
    label: 'Data Orchestration',
    category: 'Integrations',
    definition:
      'A dedicated platform (like OpenPrise or RingLead) that sits in front of your CRM/MAP and automatically cleans, standardizes, and deduplicates incoming records before they’re allowed to touch your core systems.',
    mopsContext:
      'Instead of dumping raw vendor leads straight into Marketo, high-volume feeds are routed through an orchestration platform first, so only clean, deduplicated, correctly formatted records ever land in the database.',
    match: ['data orchestration', 'Data Orchestration', 'orchestration platform', 'Orchestration Platform', 'orchestration tools'],
  },

  // Marketo Concepts
  {
    id: 'mql',
    label: 'MQL (Marketing Qualified Lead)',
    category: 'Marketo Concepts',
    definition:
      'A lifecycle status assigned once a lead’s score crosses a predefined threshold, signaling that Marketing believes the lead is ready for Sales attention.',
    mopsContext:
      'Marketo’s scoring program adds or subtracts points based on fit and behavior; the moment the score crosses the threshold, a smart campaign flips the lead’s lifecycle status to MQL and hands it off toward Salesforce.',
    match: ['MQL'],
  },
  {
    id: 'smart-campaign',
    label: 'Smart Campaign',
    category: 'Marketo Concepts',
    definition:
      'Marketo’s core automation unit: a trigger- or batch-based campaign made of a Smart List (who qualifies) and a Flow (what happens to them), used to run nearly every piece of logic in the platform.',
    mopsContext:
      'Lead scoring, MQL promotion, list hygiene, and routing are all built as Smart Campaigns, chained together to move a record through its lifecycle automatically.',
    match: ['Smart Campaign', 'Smart Campaigns'],
  },
  {
    id: 'trigger',
    label: 'Trigger',
    category: 'Marketo Concepts',
    definition:
      'A listener that watches for a specific event, like a form fill, a field change, or a record being created, and automatically fires an automation the instant that event happens.',
    mopsContext:
      'A Marketo Smart Campaign’s trigger is what makes it real-time: instead of waiting for a scheduled batch run, the campaign fires the moment its trigger condition is met.',
    match: ['Trigger', 'trigger', 'Triggers', 'triggers', 'triggered'],
  },
  {
    id: 'flow-step',
    label: 'Flow Step',
    category: 'Marketo Concepts',
    definition:
      'A single action inside a Smart Campaign’s Flow, executed in order for every record that qualifies. Common flow steps include changing a data value, sending an email, waiting before continuing, or branching with a Choice step.',
    mopsContext:
      'MOPs teams often add a short Wait Step before a Send Email step, to guarantee an API response (like a Zoom join link) has time to populate before the email actually renders.',
    match: ['Flow’s steps', 'Send Email flow step', 'Send Email step', 'Choice step', 'Wait Step', 'ELSE branch', 'flow step'],
  },
  {
    id: 'merge-field',
    label: 'Merge Field / Token',
    category: 'Marketo Concepts',
    definition:
      'A placeholder inside an email or landing page, written like {{member.fieldName}}, that Marketo swaps out for a real value from the record at send time.',
    mopsContext:
      'A confirmation email can merge in a value, like a personal Zoom join link, that was written to the lead’s record by an earlier API call, so every recipient gets their own unique link automatically.',
    match: ['merge field', 'Merge Field', 'token'],
  },
  {
    id: 'lead-source',
    label: 'Lead Source',
    category: 'Marketo Concepts',
    definition:
      'A field on the lead record that records how that person first entered your database, e.g. Paid Social, Organic Search, Content Syndication. It’s usually set once and never overwritten.',
    mopsContext:
      'Because Lead Source can’t always be read straight off the URL (no UTM on a LinkedIn native form, for example), a Smart Campaign often has to stamp it manually based on which trigger fired.',
    match: ['Lead Source', 'lead source'],
  },
  {
    id: 'marketo-program',
    label: 'Marketo Program',
    category: 'Marketo Concepts',
    definition:
      'Marketo’s container for a specific initiative, like a webinar, a content download, or a nurture track. Every Program is built on a Channel (e.g., Webinar, Content, Email), and it’s that Channel that defines the set of Program Statuses available to track people as they move through it.',
    mopsContext:
      'An Event Program built on the Webinar channel ships with statuses like Invited, Registered, Attended, and No Show baked in, so MOps doesn’t have to custom-build a status field for every single webinar.',
    match: ['Marketo Program', 'Event Program', 'Program'],
  },
  {
    id: 'program-member',
    label: 'Program Member / Program Status',
    category: 'Marketo Concepts',
    definition:
      'A person becomes a Program Member the instant they’re added to a Program, whether through a form fill, a flow step, or a list import. That membership tracks one Program Status at a time, e.g., for a Webinar channel: Registered, Attended, Attended Live, No Show, a value defined by the Program’s Channel and completely separate from the person’s record-level Lifecycle Stage.',
    mopsContext:
      'When a registrant fills out the embedded form, they become a Program Member of that webinar’s Event Program with Program Status “Registered.” Marketo can also store data on that specific membership using Member-level custom fields, so a token like {{member.webinar url}} holds a different join link for every registrant, unlike a Program-level field, which holds one shared value for the whole Program.',
    match: ['Program Member', 'Program Membership', 'Program Status'],
  },
  {
    id: 'lifecycle-stage',
    label: 'Lifecycle Stage',
    category: 'Marketo Concepts',
    definition:
      'A single field that tracks where a lead sits in the funnel, e.g. Subscriber, MQL, SQL, Opportunity, Customer. Most lifecycle automation exists to move this one field forward correctly.',
    mopsContext:
      'The moment a lead’s score crosses the MQL threshold, a Smart Campaign flips its Lifecycle Stage to MQL and stamps a timestamp, which is what actually kicks off the handoff to Sales.',
    match: ['Lifecycle Stage', 'lifecycle stage', 'Lifecycle'],
  },
  {
    id: 'lead-scoring',
    label: 'Lead Scoring',
    category: 'Marketo Concepts',
    definition:
      'A points system that adds or subtracts value based on demographic fit (title, company size) and behavioral engagement (page visits, email clicks, form fills), producing a single number used to gauge sales-readiness.',
    mopsContext:
      'Most scoring programs include automated score decay, quietly subtracting points from inactive leads over time, so a stale record doesn’t stay artificially “hot” forever.',
    match: ['Lead Scoring', 'lead score', 'Lead Score', 'score decay', 'Score Decay'],
  },

  // Lead Routing & Data Ops
  {
    id: 'lead-routing',
    label: 'Lead Routing',
    category: 'Lead Routing & Data Ops',
    definition:
      'The process of deciding which salesperson or queue a qualified lead gets assigned to, based on rules like territory, company size, or existing account ownership.',
    mopsContext:
      'Routing can run on native Salesforce Assignment Rules or a dedicated tool like LeanData, which adds more advanced logic like account matching before assigning an owner.',
    match: ['Lead Routing', 'lead routing', 'Routing Rules', 'routing rules', 'Assignment Rules'],
  },
  {
    id: 'l2a-matching',
    label: 'L2A Matching (Lead-to-Account)',
    category: 'Lead Routing & Data Ops',
    definition:
      'The process of checking whether a newly created lead belongs to a company that already exists as an Account in your CRM, so it can be routed to the rep who already owns that relationship.',
    mopsContext:
      'Tools like LeanData run L2A matching automatically the moment a lead lands in Salesforce, preventing a new lead from a known account from being routed to a random rep instead of the existing owner.',
    match: ['L2A Matching', 'L2A matching', 'Lead-to-Account', 'L2A'],
  },
  {
    id: 'sla',
    label: 'SLA (Service Level Agreement)',
    category: 'Lead Routing & Data Ops',
    definition:
      'An internal deadline, e.g. “respond within 5 minutes”, that Sales commits to for following up on a qualified lead. Systems often track it with an automated timer.',
    mopsContext:
      'The moment a lead is routed to an SDR, an SLA timer starts, and an automated Slack alert makes sure the rep knows the clock is running.',
    match: ['SLA timer', 'SLA timers', 'SLA response timer', 'SLA'],
  },
  {
    id: 'icp',
    label: 'ICP (Ideal Customer Profile)',
    category: 'Lead Routing & Data Ops',
    definition:
      'A defined profile of the type of company or contact most likely to buy and succeed as a customer, used as a filter to prioritize or qualify incoming leads.',
    mopsContext:
      'Hygiene campaigns often check incoming leads against ICP criteria (industry, company size, title) before letting them progress, to keep bad-fit records from clogging the pipeline.',
    match: ['ICP', 'Ideal Customer Profile'],
  },
  {
    id: 'list-import',
    label: 'List Import',
    category: 'Lead Routing & Data Ops',
    definition:
      'Marketo’s built-in tool for manually uploading a batch of leads from a file (usually a CSV), mapping its columns to the correct Marketo fields as part of the upload.',
    mopsContext:
      'For smaller vendors or one-off lists, a MOps manager will use List Import instead of building a real-time integration, trading automation for a five-minute manual step.',
    match: ['List Import'],
  },
  {
    id: 'csv',
    label: 'CSV',
    category: 'Lead Routing & Data Ops',
    definition:
      'A plain-text file format (Comma-Separated Values) used to move tabular data, like a spreadsheet, between systems that don’t have a direct integration.',
    mopsContext:
      'When a vendor doesn’t offer a real-time feed, they’ll often just email over a CSV of leads on a schedule, which then has to be manually imported.',
    match: ['CSV'],
  },
  {
    id: 'sftp',
    label: 'SFTP',
    category: 'Lead Routing & Data Ops',
    definition:
      'Secure File Transfer Protocol, a secure way to automatically drop files onto (or pull them from) a remote server on a schedule, without a human involved.',
    mopsContext:
      'High-volume vendor feeds sometimes deliver as a scheduled SFTP file drop instead of a live API, letting an orchestration platform pick up and process the file automatically.',
    match: ['SFTP'],
  },
  {
    id: 'deduplication',
    label: 'Deduplication',
    category: 'Lead Routing & Data Ops',
    definition:
      'The process of detecting and merging or discarding duplicate records, so the same person doesn’t exist as two separate leads with conflicting data.',
    mopsContext:
      'Data orchestration platforms run deduplication logic against your existing database before a new record is allowed in, preventing a returning lead from creating a confusing duplicate.',
    match: ['deduplication', 'Deduplication', 'deduplicate', 'deduplicates', 'deduplicated', 'dedupe'],
  },
];
