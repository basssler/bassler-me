import { archiveRoot, decisions, quarterlyConfig } from './evidence';
import ResultsExplorer from './ResultsExplorer';
import './case-study.css';

function Source({ children = 'Source notes' }: { children?: React.ReactNode }) {
    return <a className="fp-source-link" href="#fp-sources">{children} ↗</a>;
}

export default function FinancialPredictionCaseStudy() {
    return (
        <article className="fp-case-study" aria-label="Financial prediction case study">
            <div className="fp-project-meta">
                <div><span className="fp-label">Team</span><p>Max Bassler &amp; Daniel Draper</p></div>
                <div><span className="fp-label">Context</span><p>INEG 41403 · Spring 2026</p></div>
                <div><span className="fp-label">Tools</span><p>Python · scikit-learn · XGBoost · FinBERT</p></div>
            </div>

            <section className="fp-section" aria-labelledby="fp-question">
                <p className="fp-eyebrow">01 / The question</p>
                <h2 id="fp-question">Does financial text add information the numbers miss?</h2>
                <p>We investigated whether sentiment from financial text improved stock-direction prediction beyond financial statements and market behavior. The useful question was whether another data source actually added predictive value, once we tested it on future observations.</p>
                <p>We worked with 34 Consumer Staples tickers, using SEC fundamentals, adjusted price and volume data, SEC filing text, and Capital IQ Key Developments. Keeping the universe within one sector made the comparison more controlled, but limited what we could say about the rest of the market. <Source>Report, III.A</Source></p>
                <div className="fp-takeaway">
                    <p className="fp-label">The result in context</p>
                    <p className="fp-takeaway-text">The strongest reported sentiment configuration reached <strong>0.6038 holdout AUROC</strong>. Its mean cross-validation AUROC was <strong>0.4989</strong>.</p>
                    <p>That gap is the point of this case study. The result was worth investigating, but one better year did not establish a dependable signal.</p>
                </div>
            </section>

            <nav className="fp-jump-links" aria-label="Case study sections">
                <a href="#fp-approach">Approach</a><a href="#fp-decisions">Decisions with AI</a><a href="#fp-results">Explore results</a><a href="#fp-report">Original report</a>
            </nav>

            <section className="fp-section" id="fp-approach" aria-labelledby="fp-approach-title">
                <p className="fp-eyebrow">02 / Building the experiment</p>
                <h2 id="fp-approach-title">Three layers. Three different reasons a prediction might improve.</h2>
                <p>The pipeline added feature groups in stages. That gave us a way to compare accounting information, market context, and text sentiment instead of treating the final model as one unexplained score.</p>
                <div className="fp-layers">
                    <details className="fp-layer" open>
                        <summary><span className="fp-layer-number">01</span><span>Financial fundamentals<small>What does the company&apos;s financial position look like?</small></span></summary>
                        <div className="fp-detail-body"><p>SEC 10-Q and 10-K data became liquidity, debt, profitability, growth, and cash-flow ratios. Unit inconsistencies, near-zero denominators, and mismatched accounting periods could make those features misleading before a model ever saw them.</p><p>The report records a fundamentals rebuild that reduced Universe V1 feature-ratio sanity flags from 2,966 to 63. Those are diagnostic flags, not a claim that every remaining value was correct. <Source>Report, III.C</Source></p></div>
                    </details>
                    <details className="fp-layer">
                        <summary><span className="fp-layer-number">02</span><span>Market behavior<small>What was happening before the prediction?</small></span></summary>
                        <div className="fp-detail-body"><p>Price and volume data supplied momentum, realized volatility, drawdown, abnormal volume, and relative-strength features. The timing rule mattered: a backward-looking feature must stop before the prediction date.</p><p>In the reported course ladder, adding market features increased mean CV AUROC from 0.4878 to 0.5304 but reduced holdout AUROC from 0.5501 to 0.5020. It was an addition to the feature set, not an automatic improvement. <Source>Report, IV.A.2</Source></p></div>
                    </details>
                    <details className="fp-layer">
                        <summary><span className="fp-layer-number">03</span><span>Financial text sentiment<small>Was the event&apos;s tone different from its peers?</small></span></summary>
                        <div className="fp-detail-body"><p>Pretrained FinBERT converted financial text into positive, negative, and neutral sentiment measurements. Those measurements and text counts became inputs to the downstream classifiers. Sector-relative sentiment subtracted the sector&apos;s contemporaneous average tone from a company&apos;s tone.</p><p>Capital IQ Key Developments supplied event text with better coverage than the sparse external-news windows we evaluated. The report lists 92.70% coverage for its 63-day 2024 holdout window. That is text availability, not predictive accuracy. This path used sentiment feature engineering; sector-specific FinBERT fine-tuning was a separate research idea. <Source>Report, III.C; project history</Source></p></div>
                    </details>
                </div>

                <details className="fp-disclosure fp-timing">
                    <summary>Why the dates mattered more than the model choice</summary>
                    <div className="fp-detail-body">
                        <p>A fiscal quarter ending does not mean its financial report was public that day. The event pipeline needed a public-availability date, a prediction date, features known before that prediction, and labels measured afterward.</p>
                        <ol className="fp-time-flow"><li><strong>Fiscal period ends</strong><span>The quarter is over; the filing may not be available yet.</span></li><li><strong>Filing becomes public</strong><span>Its information can enter the availability calculation.</span></li><li><strong>Prediction date</strong><span>Use eligible prior features; respect filing time and the trading calendar.</span></li><li><strong>Future outcome window</strong><span>Measure the return being predicted, separately from the inputs.</span></li></ol>
                        <p>Validation used expanding chronological folds, purging of overlapping outcome windows, an embargo, and a separate 2024 holdout. Preprocessing also had to learn its imputation and scaling rules from training rows. These were design requirements and audited checks, not proof that every possible leakage risk had been eliminated. <Source>Report, II–III; rebuild code</Source></p>
                    </div>
                </details>
            </section>

            <section className="fp-section" id="fp-decisions" aria-labelledby="fp-decisions-title">
                <p className="fp-eyebrow">03 / Working with ChatGPT and Codex</p>
                <h2 id="fp-decisions-title">The questions and corrections that moved the project.</h2>
                <p>I used ChatGPT to understand the methods, compare options, and prepare bounded prompts. I took those prompts into Codex for implementation and brought results back for review. That helped me build beyond what I could have written independently, but it also meant I needed to check the advice against the actual work.</p>
                <p>These are excerpts from my project messages. The explanations below them are retrospective paraphrases, not reconstructed dialogue.</p>
                <ol className="fp-timeline">
                    {decisions.map((decision, index) => (
                        <li key={decision.title}>
                            <details>
                                <summary><span className="fp-timeline-date">{decision.date}<span>2026</span></span><span className="fp-timeline-title">{decision.title}</span><span className="fp-plus" aria-hidden="true">+</span></summary>
                                <div className="fp-timeline-body">
                                    <blockquote><p>“{decision.quote}”</p><cite>My message · {decision.source.split(' · ')[0]}</cite></blockquote>
                                    <p>{decision.context}</p>
                                    <h3>{index === 1 ? 'How the advice changed' : 'What followed'}</h3><p>{decision.changed}</p>
                                    <p className="fp-footnote">Evidence: {decision.source}.</p>
                                </div>
                            </details>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="fp-section" id="fp-results" aria-labelledby="fp-results-title">
                <p className="fp-eyebrow">04 / What the results support</p>
                <h2 id="fp-results-title">A better holdout score was only part of the answer.</h2>
                <p>Switch between metrics to see why the highest AUROC did not settle the question. Select a configuration for its interpretation, or inspect the full table. The later rebuild is included separately because it changed the experiment and produced a different result.</p>
                <ResultsExplorer />
                <div className="fp-reading">
                    <h3>How I would read the course result</h3>
                    <p>Sector-relative sentiment raised the reported 2024 holdout AUROC from 0.5020 to 0.6038 compared with core + market, a difference of 0.1018 AUROC. That is not a 10.18% accuracy improvement. The selected model also changed from XGBoost to logistic regression, which limits a feature-only interpretation.</p>
                    <p>The companion report synthesis records mixed pseudo-holdout years and a bootstrap AUC-delta interval of −0.0930 to 0.1307. The available synthesis does not establish that this is a confidence interval for the selected-rung difference above. It crosses zero, and the supplied original leaves its statistical-analysis section unfinished. I cannot claim a completed significance result. <Source>Report versions and stability evidence</Source></p>
                    <h3>What the follow-up did not confirm</h3>
                    <p>The later fixed-learner rebuild did not reproduce a strong 21-day full-stack result: holdout AUROC was 0.3412 against a naive 0.5000 reference. Its saved ranking diagnostic also put the full stack&apos;s highest-score decile at −0.0296 average excess return. These are archived diagnostics from a different setup, not an independent replication of the course experiment or an executable trading backtest. <Source>May 29 saved diagnostics</Source></p>
                </div>
            </section>

            <section className="fp-section" aria-labelledby="fp-roles-title">
                <p className="fp-eyebrow">05 / My role in the build</p>
                <h2 id="fp-roles-title">The architect and the manager.</h2>
                <p>Working with advanced AI changes where I can contribute. I can work at the level of the system: define the question, organize the pieces, and decide what needs to happen next. ChatGPT helped develop the approach, and Codex wrote and revised substantial code. My responsibility was to keep that work connected to the research question and the evidence.</p>
                <div className="fp-roles">
                    <div><h3>Architect: define the system</h3><p>The target, timing rules, and comparison determine what a model&apos;s score means. Correcting the prediction horizon changed the question the pipeline needed to answer. AI helped develop the design; I needed to understand enough of it to catch a mismatch and redirect the work.</p></div>
                    <div><h3>Manager: make the work reviewable</h3><p>I asked for bounded builds, brought results back into the research prompts, and checked whether the presentation matched what was finished. Breaking the project into stages gave me places to review the output, ask questions, and change direction before adding more complexity.</p></div>
                    <div><h3>Reviewer: decide what the evidence supports</h3><p>Producing a working pipeline and establishing a useful signal are different tasks. A higher holdout score still needed context: cross-validation, coverage, changing learners, and the prediction horizon. Directing the build also meant deciding which claims we could make from it.</p></div>
                </div>
                <div className="fp-learning">
                    <h3>What this means as AI becomes more capable</h3>
                    <p>The philosophy I take forward is that delegating implementation still requires understanding. I need enough understanding to specify the goal, question an answer, and recognize when the system is solving the wrong problem. AI can help with that understanding too, but I still have to make and defend the decisions.</p>
                    <p>If AI progresses toward superintelligence (SI), I see the architect and manager role becoming more important: choosing worthwhile problems, setting constraints, and deciding what counts as success. That is a direction for how I want to work. This project was practice with today&apos;s tools, where those responsibilities were already concrete.</p>
                </div>
                <details className="fp-disclosure">
                    <summary>Limits I would keep in a future version</summary>
                    <div className="fp-detail-body"><ul><li>One sector and a small company universe limit generalization.</li><li>Event-text coverage is uneven, and Capital IQ Key Developments is not all financial news.</li><li>Changing horizons, model selection, and preprocessing conventions complicate comparisons across archived runs.</li><li>A 2024 holdout that was repeatedly inspected during development cannot support an untouched-test claim for later decisions.</li><li>Optional models, statistical tests, and explainability plots must be distinguished from completed outputs.</li><li>Signal simulations omit costs and realistic execution mechanics. Neither report establishes deployable trading performance.</li></ul></div>
                </details>
            </section>

            <section className="fp-section fp-report" id="fp-report" aria-labelledby="fp-report-title">
                <p className="fp-eyebrow">06 / Read the original</p>
                <h2 id="fp-report-title">The project report.</h2>
                <p><em>Sentiment-Augmented Financial Prediction: A Data Mining Approach to Market Signal Extraction</em><br />Max Bassler &amp; Daniel Draper · dated May 8, 2026</p>
                <div className="fp-downloads">
                    <a className="fp-button fp-button-primary" href="/reports/data-mining-final-project-report.docx" download="Data Mining Final Project Report.docx">Download original DOCX <span aria-hidden="true">↓</span></a>
                    <a className="fp-button" href="/reports/data-mining-final-project-report.pdf" target="_blank" rel="noopener noreferrer">View report PDF <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
                </div>
                <p className="fp-footnote">Original report, unchanged. PDF copy provided for easy reading.</p>
            </section>

            <section className="fp-section fp-sources" id="fp-sources" aria-labelledby="fp-sources-title">
                <p className="fp-eyebrow">Evidence / Sources and version notes</p>
                <h2 id="fp-sources-title">What this page is based on.</h2>
                <details className="fp-disclosure">
                    <summary>Report evidence and the horizon discrepancy</summary>
                    <div className="fp-detail-body"><p>The original project report supports the research question, team attribution, data sources (III.A), ratio rebuild and coverage (III.C), and selected-model ladder (IV.A.2). A companion report synthesis supplies the additional stability discussion in section 9. Its prose is not treated as independently attributable writing by Max.</p><p>The supplied report describes a 21-day target. The <a href={quarterlyConfig} target="_blank" rel="noopener noreferrer">preserved final quarterly configuration (opens in a new tab)</a> and the April migration conversation identify a 63-day sector-relative sign target. The numbers are presented as reported archived results, with that discrepancy retained. The model-training data and original predictions have not been rerun for this website.</p><p>The original report&apos;s claims about a five-model cohort, Bayesian tuning, and planned statistical analyses exceed what its completed results establish. They are not presented here as verified accomplishments.</p></div>
                </details>
                <details className="fp-disclosure">
                    <summary>Conversation coverage and attribution</summary>
                    <div className="fp-detail-body"><p>The review retrieved actual messages from 37 conversations listed in the original Data Mining project, spanning March–May 2026, and the local Codex conversation <em>Define branch contract</em> covering the May 28–29 rebuild. The timeline identifies its specific conversations. Short quotations are Max&apos;s project messages; surrounding explanations are paraphrases. Pasted teammate correspondence and AI-generated prose were not treated as Max&apos;s original writing.</p><p>All seven available ChatGPT archive listing pages and the available Codex archive listing were checked; no clearly matching archived project title was found there. That does not prove no other history exists. Older messages or attachments not exposed by the available tools could not be verified, and summaries were used for discovery only.</p></div>
                </details>
                <details className="fp-disclosure">
                    <summary>Code, saved diagnostics, and reproduction limits</summary>
                    <div className="fp-detail-body"><p>The <a href={archiveRoot} target="_blank" rel="noopener noreferrer">public code archive (opens in a new tab)</a> matches the project&apos;s layered pipeline and preserves earlier branches under <code>variants/</code>. Its final root snapshot is the later rebuild, not the original course run. The <a href={`${archiveRoot}/blob/main/docs/branch-snapshots.json`} target="_blank" rel="noopener noreferrer">branch snapshot list (opens in a new tab)</a> identifies those versions.</p><p>The later results were transcribed from the local <code>ablation_report.md</code> and <code>signal_simulation_report.md</code> read during this review. The original local project folder subsequently became unavailable. The public archive intentionally excludes datasets, predictions, trained models, and generated outputs, so a fresh end-to-end reproduction was not available. The saved diagnostics support the displayed values; this website does not certify the original runs.</p><p>No raw Capital IQ exports, full transcripts, private chat links, credentials, or unrelated personal details are distributed with this page.</p></div>
                </details>
            </section>
        </article>
    );
}
