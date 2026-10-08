export interface Project {
  slug: string;
  title: string;
  year: string;
  client: string;
  scope: string;
  duration: string;
  desc: string;
  challenge: string;
  solution: string;
  img: string;
  thumb?: string;
  /** object-position for the cover (tall screenshots read best top-anchored) */
  align?: string;
  /** tall portrait screenshots get a tall card so nothing important crops */
  tall?: boolean;
  gallery: string[];
  url: string;
}

const L = (name: string) => `/projects/${name}`;

export const projects: Project[] = [
  {
    slug: "credit-risk",
    title: "Credit Risk Scoring",
    tall: true,
    year: "2026",
    client: "Lending portfolio",
    scope: "ML Risk Modeling",
    duration: "6 weeks",
    desc: "ML-driven credit risk analysis with borrower segmentation and cost-aware recovery strategy.",
    challenge:
      "Through-the-cycle scorecards judge borrowers on static attributes while ignoring the macro weather — unemployment and rates that actually drive defaults. Worse, halting originations on high default rates alone is financially suboptimal: borrowers paying 14–18% cover their losses and still print positive net returns.",
    solution:
      "Built a 5-phase engine on 1.34M LendingClub loans plus 234 months of FRED macro data in DuckDB: a LightGBM champion (0.6919 out-of-time ROC-AUC) for point-in-time default risk, econometric shocks (+3.5% UNRATE, +1.5% FEDFUNDS) quantifying a $32.8M severe ECL expansion on the $7.5B book, and a SQL net-profit matrix (ECL = PD × 0.50 × EAD) that halts only loss-making FICO/DTI cells — killing $30.8M in net losses while preserving $55.7M of profitable originations, served through a 5-tab Streamlit app with Power BI exports.",
    img: L("credit-main.png"),
    thumb: L("credit-2.png"),
    align: "50% 0%",
    gallery: [L("credit-2.png"), L("credit-3.png"), L("credit-4.png"), L("credit-main.png")],
    url: "https://github.com/JAMIEL-J/credit-risk-analysis"
  },
  {
    slug: "hubspot-forecast",
    title: "HubSpot Rolling Forecast",
    tall: true,
    year: "2026",
    client: "HubSpot Inc.",
    scope: "FP&A Forecasting",
    duration: "5 weeks",
    desc: "Driver-based rolling forecast and variance engine for HubSpot, built purely from SEC EDGAR filings and earnings calls.",
    challenge:
      "Static annual plans go stale the moment the quarter turns. For HubSpot the live question was concrete: which revenue driver carries the highest forecast risk into 2026-Q3 → 2027-Q2?",
    solution:
      "Built entirely from public SEC data — 30 quarters of actuals (2019-Q1 → 2026-Q2) from EDGAR Company Facts, 8-Ks and call transcripts. An 18-vantage rolling forecast with accuracy gates, 11 driver scenarios off a validated revenue identity (0.13% mean error), and 62-pair variance splits on price, volume and mix behind a pinned noise floor. Answer: ASRPC (price) — 37 of 62 quarters above the floor; net income is an opex story, not a revenue story. Five-view Streamlit dashboard where every chart traces to engine outputs through automated gates.",
    img: L("hubspot-main.png"),
    thumb: L("hubspot-1.png"),
    align: "50% 0%",
    gallery: [L("hubspot-1.png"), L("hubspot-2.png"), L("hubspot-3.png"), L("hubspot-main.png")],
    url: "https://github.com/JAMIEL-J/Driver-Based-Rolling-Forecast-Variance-Engine"
  },
  {
    slug: "conversion-funnel",
    title: "Conversion Funnel Audit",
    year: "2026",
    client: "E-commerce brand",
    scope: "Funnel Analytics",
    duration: "4 weeks",
    desc: "Finds where e-commerce revenue leaks across the funnel, with data-driven fixes for user journeys.",
    challenge:
      "132K sessions and $1.78M in revenue — but product views weren’t converting, and nobody could point to the exact stage where the funnel was breaking.",
    solution:
      "Built the session-level funnel in BigQuery SQL (validation → construction → leakage → segmentation) with Python validation: View→Cart bled 73,961 sessions worth $1.14M — roughly 65—70% of all leakage — with desktop alone leaking $835K. Fixes ordered by ROI: above-the-fold Add-to-Cart on desktop, trust signals against hesitation, and landing pages matched to the Direct and Google intent behind $1M+ of leakage.",
    img: L("conversion-revenue-main.png"),
    gallery: [L("conversion-revenue-2.png"), L("conversion-revenue-3.png"), L("conversion-revenue-main.png")],
    url: "https://github.com/JAMIEL-J/Conversion-Funnel-Analysis"
  },
  {
    slug: "sales-optimization",
    title: "Sales Performance Optimization",
    year: "2026",
    client: "E-commerce brand",
    scope: "Sales Analytics",
    duration: "4 weeks",
    desc: "E-commerce sales performance — revenue concentration risks, territory gaps and seller dependency.",
    challenge:
      "Revenue across ~99K Olist orders (₹13.59M) looked strong, but São Paulo alone drove ~38% of it on both the customer and seller side — one shock away from a bad quarter.",
    solution:
      "Staging→clean SQL modeling into one order-item-grain sales_fact, validated in Python and visualized in Tableau with state, seller and Top-N filters. Found supply-side dependency worse than demand-side, plus mid-tier states (RS, PR, SC, BA) with real revenue and low saturation — growth without acquisition cost. Takeaway: growth is constrained by execution concentration, not demand.",
    img: L("sales-main.png"),
    gallery: [L("sales-1.png"), L("sales-2.png"), L("sales-main.png")],
    url: "https://github.com/JAMIEL-J/Sales-performance-Optimization"
  },
  {
    slug: "churn-prediction",
    title: "Churn Prediction System",
    tall: true,
    year: "2026",
    client: "Subscription business",
    scope: "Churn ML",
    duration: "5 weeks",
    desc: "Decision-focused churn ML with business-aware thresholds, ROI analysis and retention strategy.",
    challenge:
      "Churn models predict who leaves but never answer what to do about it — who to contact, how much to spend, and whether it pays. Default 0.5 thresholds either overspend retention or miss at-risk customers.",
    solution:
      "14 business hypotheses validated in EDA, 24 features across tenure, pricing and service buckets, then the decision layer: a CLV-based cost matrix (~$1,554 CLV, $50 intervention, 25% save rate), ROI-driven threshold sweeps and segment-specific thresholds. Random Forest at 0.20: 96.5% recall, $140K revenue saved for $33.9K spend — $106K net ROI across ~678 targeted customers, explored through a four-view Streamlit decision tool.",
    img: L("churn-main.png"),
    align: "50% 0%",
    gallery: [L("churn-3.png"), L("churn-5.png"), L("churn-6.png"), L("churn-main.png")],
    url: "https://github.com/JAMIEL-J/Customer-Churn-Prediction"
  },
  {
    slug: "demand-forecasting",
    title: "Demand Forecasting Engine",
    year: "2026",
    client: "Retail chain",
    scope: "Forecasting & Inventory",
    duration: "6 weeks",
    desc: "Multi-horizon demand forecasts converted into inventory policy via quantile regression.",
    challenge:
      "Ordering average expected demand means ~50% stockout probability under skewed demand. Point forecasts ignore risk and produce fragile inventory.",
    solution:
      "Walk-forward validated XGBoost quantile regression (4.01% WAPE, 31.7% better than seasonal naïve) across 45 stores at 1, 2 and 4-week horizons, converted to policy by formula — safety stock = Q90−Q50, reorder point = expected lead-time demand + safety stock for ~90% coverage. A Streamlit decision dashboard per store with 80% prediction intervals and stress scenarios for growth, volatility and supply delay.",
    img: L("demand-main2.png"),
    thumb: L("demand-2.png"),
    align: "50% 0%",
    gallery: [L("demand-main2.png"), L("demand-2.png"), L("demand-3.png")],
    url: "https://github.com/JAMIEL-J/Demand-Forecasting-and-Inventory-Optimization"
  },
  {
    slug: "vizzy-pilot",
    title: "Vizzy Analytics Platform",
    year: "2026",
    client: "Independent",
    scope: "Full-stack Platform",
    duration: "Ongoing",
    desc: "Full-stack data analytics platform — flagship standalone build for conversational data work.",
    challenge:
      "Analysis lived in notebooks only experts could run — everyone else waited in line for answers to questions they could have asked themselves.",
    solution:
      "Vizzy Pilot wraps the full analytics loop in a platform anyone can drive: ask in plain language, get governed charts, forecasts and explanations back.",
    img: L("vizzy-main.png"),
    gallery: [L("vizzy-1.png"), L("vizzy-2.png"), L("vizzy-3.png"), L("vizzy-main.png")],
    url: "https://github.com/JAMIEL-J/Vizzy-Pilot"
  },
  {
    slug: "citi",
    title: "Citigroup Expense Variance",
    year: "2025",
    client: "Citigroup",
    scope: "FP&A Modeling",
    duration: "4 weeks",
    desc: "Excel FP&A model explaining why Citigroup's operating expenses rose 2.9% in FY2025 — volume/rate splits, FY24→FY25 bridge, CET1 tied to the 10-K with live integrity checks.",
    challenge:
      "The $259mm restructuring charge flipped to a $14mm credit — yet reported opex still rose $1,565mm (+2.9%). Was it headcount, pay rates, or something else?",
    solution:
      "Split people cost by exact algebra (volume −$793mm on 234k→227.5k heads vs rate/mix +$1,890mm — never netted), bridged FY24→FY25 with no plug, isolated the $726mm Mexico goodwill impairment inside the +$741mm non-people move, and walked CET1 to 13.18% with 1.58pp headroom over the 11.6% stack. Seven-sheet model, zero hardcodes outside RAW_Data, 11/11 integrity checks passing.",
    img: L("citi-main.png"),
    gallery: [L("citi-2.png"), L("citi-main.png")],
    url: "https://github.com/JAMIEL-J/Citigroup-FY2025-Operating-Expense-Variance-Capital-Analysis"
  },
  {
    slug: "jpmc",
    title: "JPMorgan NII Attribution",
    year: "2026",
    client: "JPMorgan Chase",
    scope: "NII Attribution",
    duration: "5 weeks",
    desc: "Net interest income and deposit-beta attribution across 18 quarters — source-verified from SEC EDGAR and FRED in a formula-verified workbook.",
    challenge:
      "Deposit beta had two answers: contemporaneous data said down-beta (0.53) beats up-beta (0.26), while cumulative said the reverse (0.53 vs 0.44). A single pooled beta (0.43) hid the entire question.",
    solution:
      "Two-tier attribution across 18 quarters (2022-Q1→2026-Q2): an NII rate/volume bridge plus regime-separated OLS betas with n attached to every number. Tested the asymmetry directly — repricing lags 2+ quarters on the way up but tracks cuts promptly on the way down — flagged the FRB acquisition quarters with sensitivity runs, byte-matched all 18 quarters to EDGAR, and verified the workbook through two independent engines, 194/194 cells.",
    img: L("jpmc-3.png"),
    gallery: [L("jpmc-1.png"), L("jpmc-2.png"), L("jpmc-3.png")],
    url: "https://github.com/JAMIEL-J/JPMorgan-Chase-Net-Interest-Income-Deposit-Beta-Attribution-Model"
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
