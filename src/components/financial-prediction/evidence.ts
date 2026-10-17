// Public-safe, manually reviewed snapshots. These are archived results, not a live model.
// Course values: original project report IV.A.2; companion synthesis sections 7 and 9.
// Rebuild values: saved outputs/diagnostics/ablation_report.md, read before local removal.
export type ResultRow = {
    id: string;
    name: string;
    model: string;
    cv: number;
    worst: number;
    holdout: number;
    loss: number;
    f1?: number;
    note: string;
};

export const courseResults: ResultRow[] = [
    { id: 'A', name: 'Financial fundamentals', model: 'XGBoost', cv: 0.4878, worst: 0.3872, holdout: 0.5501, loss: 0.7289, f1: 0.5421, note: 'The accounting-only reference. It beat the market-augmented configuration on the 2024 holdout, despite a lower cross-validation average.' },
    { id: 'B', name: '+ Market behavior', model: 'XGBoost', cv: 0.5304, worst: 0.4083, holdout: 0.5020, loss: 0.7776, f1: 0.5357, note: 'Market features raised mean cross-validation AUROC but lowered holdout AUROC. More information did not automatically produce a better result.' },
    { id: 'C', name: '+ Raw sentiment', model: 'Logistic regression', cv: 0.4927, worst: 0.4012, holdout: 0.5958, loss: 0.6939, f1: 0.4792, note: 'Raw sentiment improved the reported holdout score and had the lowest holdout log loss of these four configurations. The selected learner also changed.' },
    { id: 'D', name: '+ Sector-relative sentiment', model: 'Logistic regression', cv: 0.4989, worst: 0.4203, holdout: 0.6038, loss: 0.7115, f1: 0.3765, note: 'The highest reported holdout AUROC, but cross-validation remained near 0.50 and F1 was the lowest of the four. This is the result that needed qualification.' },
];

export const rebuildResults: ResultRow[] = [
    { id: 'A', name: 'Naive training prior', model: 'Training positive-rate prior', cv: 0.5000, worst: 0.5000, holdout: 0.5000, loss: 0.6943, note: 'A constant probability estimated from training labels. This establishes a no-ranking-information AUROC reference of 0.50.' },
    { id: 'B', name: 'Fundamentals only', model: 'L2 logistic regression', cv: 0.5003, worst: 0.4003, holdout: 0.4023, loss: 0.7375, note: 'The accounting-only configuration in the later event-level rebuild. These numbers belong to a different experiment from the course ladder.' },
    { id: 'C', name: 'Market only', model: 'L2 logistic regression', cv: 0.5291, worst: 0.4523, holdout: 0.3577, loss: 0.7609, note: 'The highest mean cross-validation AUROC in this 21-day comparison, followed by weak holdout discrimination.' },
    { id: 'D', name: 'Fundamentals + market', model: 'L2 logistic regression', cv: 0.5251, worst: 0.4710, holdout: 0.3387, loss: 0.7973, note: 'The reference for the sentiment additions in this rebuild. A small gain over this configuration would still leave the model below the naive holdout reference.' },
    { id: 'E', name: 'Sentiment only', model: 'L2 logistic regression', cv: 0.5051, worst: 0.4375, holdout: 0.4943, loss: 0.7038, note: 'The strongest non-naive holdout AUROC in this 21-day comparison, still below 0.50. A positive decile spread elsewhere in the diagnostics did not establish a trading strategy.' },
    { id: 'F', name: 'Combined + raw sentiment', model: 'L2 logistic regression', cv: 0.5176, worst: 0.4528, holdout: 0.3626, loss: 0.7928, note: 'Raw sentiment improved holdout AUROC relative to fundamentals + market, but did not beat the naive reference or establish stable signal.' },
    { id: 'G', name: 'Combined + relative sentiment', model: 'L2 logistic regression', cv: 0.5168, worst: 0.4410, holdout: 0.3412, loss: 0.8006, note: 'The full stack barely improved holdout AUROC relative to fundamentals + market, and remained below the naive reference. Its worst-fold performance and probability quality also failed to establish a dependable improvement.' },
];

export const archiveRoot = 'https://github.com/basssler/data-mining-finance-project';
export const quarterlyConfig = `${archiveRoot}/blob/main/variants/codex-event-pane--63d/configs/event_panel_v2_quarterly_63d_sector_relative.yaml`;

export const decisions = [
    {
        date: 'March 18', title: 'Start with a bounded build', source: 'Project Start Guidance · user questions and ChatGPT replies',
        quote: 'so lets begin with layer 1 and ill proceed with 2015-2024, as long as I can add data to it',
        context: 'I chose a manageable starting window and asked for prompts I could take into Codex. ChatGPT suggested one bounded milestone at a time, beginning with SEC fundamentals before the other layers.',
        changed: 'The implementation developed in steps: data collection, ratio construction, panel assembly, and a baseline. This was an AI-assisted workflow, with me directing the build and asking questions as I went.',
    },
    {
        date: 'April 5', title: 'Give the research assistant the actual scores', source: 'Supervised Learning Pipeline · user correction and ChatGPT response',
        quote: 'i like it,  but why wouldnt we also give it the scores?',
        context: 'ChatGPT drafted a research prompt around the project state. I pointed out that the model scores belonged in that prompt too, then supplied the comparison table.',
        changed: 'ChatGPT revised its advice to use AUROC, F1, precision, recall, log loss, and feature counts as diagnostic evidence. The next research brief carried the results, rather than just saying a layer had lost.',
    },
    {
        date: 'April 22', title: 'Correct what we were predicting', source: 'Quarterly Prediction Refactor · user correction; preserved 63-day config',
        quote: 'I want to do quarterly predictions not 5 day predictions.',
        context: 'I stopped to correct the target. We compared a fixed 63-trading-day window with a variable filing-to-next-filing window. ChatGPT recommended the fixed horizon as a cleaner definition, not evidence of higher realized performance.',
        changed: 'The preserved course configuration names a 63-day sector-relative sign target. The supplied report still contains 21-day wording, so the documentation did not stay fully synchronized with the code.',
    },
    {
        date: 'April 25', title: 'Check whether more text was actually usable', source: 'Project Data Layer Audit · user audit readouts and ChatGPT review',
        quote: 'so we are running another audit?',
        context: 'A large external news corpus looked useful at first. ChatGPT distinguished a broad access/schema check from a targeted test of ticker and event-window coverage. I brought the audit results back for review.',
        changed: 'The targeted audit still recommended against integration. I described to my teammate why we would not use most of that corpus. Dataset size alone was not a reason to run more sentiment inference.',
    },
    {
        date: 'April 27', title: 'Ask whether adding a layer guarantees a gain', source: 'FinBERT Sector-Tuning Integration · user question and ChatGPT clarification',
        quote: 'does each layer build off each other to boost predictive power?',
        context: 'ChatGPT clarified the difference between adding features and demonstrating incremental predictive value. The architecture was additive; the results did not have to improve in that order.',
        changed: 'That distinction is visible in the course ladder: market features improved cross-validation but hurt the 2024 holdout, while sentiment improved the holdout without matching stability across validation periods.',
    },
    {
        date: 'April 30', title: 'Correct the presentation before it overstated the work', source: 'Poster Presentation Script · user correction after a Codex review',
        quote: 'This is still the proposed framework. We are not done',
        context: 'I took a ChatGPT presentation script through Codex against the source material, then returned with corrections. I explicitly noted that parts of the poster were a proposed framework.',
        changed: 'The revised script separated designed methods from completed experiments. The same distinction matters here: optional models, tuning ideas, and planned SHAP plots are not completed accomplishments.',
    },
    {
        date: 'May 28–29', title: 'Turn the follow-up into explicit gates', source: 'Event-Level Stock Prediction · ChatGPT plan; Define branch contract · Codex execution',
        quote: 'This will be a new branch. Give me a comprehensive milestone based sequence I can act on. I will be using this chat as a QA for any help',
        context: 'I asked ChatGPT for the next branch plan and carried its milestones into Codex. The later rebuild used a 21-day primary horizon, with 10- and 63-day checks, and kept validation ahead of model comparisons.',
        changed: 'Codex implemented the modules, tests, and reports. Its ablation used a fixed logistic learner to isolate feature changes. The saved results were weaker than the course result; they remain a separate experiment below.',
    },
];
