'use client';

import { useState } from 'react';
import { courseResults, rebuildResults, type ResultRow } from './evidence';

type Metric = 'holdout' | 'cv' | 'worst' | 'loss';
const metrics: { key: Metric; label: string }[] = [
    { key: 'holdout', label: 'Holdout AUROC' },
    { key: 'cv', label: 'Mean CV AUROC' },
    { key: 'worst', label: 'Worst-fold AUROC' },
    { key: 'loss', label: 'Holdout log loss' },
];

export default function ResultsExplorer() {
    const [run, setRun] = useState<'course' | 'rebuild'>('course');
    const [metric, setMetric] = useState<Metric>('holdout');
    const [selected, setSelected] = useState('D');
    const rows = run === 'course' ? courseResults : rebuildResults;
    const active: ResultRow = rows.find(row => row.id === selected) || rows[0];
    const metricLabel = metrics.find(item => item.key === metric)!.label;

    return (
        <div className="fp-explorer">
            <fieldset className="fp-run-picker">
                <legend className="fp-label">Choose an archived experiment</legend>
                <div className="fp-segmented">
                    <button type="button" aria-pressed={run === 'course'} onClick={() => { setRun('course'); setSelected('D'); }}>Course experiment</button>
                    <button type="button" aria-pressed={run === 'rebuild'} onClick={() => { setRun('rebuild'); setSelected('G'); }}>Later rebuild</button>
                </div>
            </fieldset>

            <div className="fp-run-context" aria-live="polite">
                <p className="fp-label">{run === 'course' ? 'Reported course ladder / 2024 holdout' : 'May 2026 rebuild / 21-day primary horizon'}</p>
                <p>{run === 'course'
                    ? '34 Consumer Staples tickers. The final preserved configuration specifies 63 trading days; the supplied report retains conflicting 21-day wording. Each rung reports its selected learner, so this is not a fixed-model ablation.'
                    : 'A separate 1,068-event rebuild with 721 CV predictions and 122 holdout rows per configuration. The feature ablation fixes L2 logistic regression for B–G. These scores are not directly comparable with the course ladder.'}</p>
            </div>

            <label className="fp-metric-picker">
                <span className="fp-label">Compare a metric</span>
                <select value={metric} onChange={event => setMetric(event.target.value as Metric)}>
                    {metrics.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
            </label>

            <figure aria-labelledby="fp-results-caption">
                <figcaption id="fp-results-caption" className="fp-chart-caption">
                    {metricLabel} <span>{metric === 'loss' ? 'Lower is better' : 'Higher is better · 0.50 is the no-information reference'}</span>
                </figcaption>
                <div className="fp-bars">
                    {rows.map(row => (
                        <button type="button" className="fp-bar-row" key={row.id} aria-pressed={active.id === row.id}
                            aria-label={`${row.name}: ${metricLabel} ${row[metric].toFixed(4)}. Show interpretation.`}
                            onClick={() => setSelected(row.id)}>
                            <span className="fp-bar-name"><span className="fp-rung">{row.id}</span>{row.name}</span>
                            <span className="fp-bar-track" aria-hidden="true">
                                <span className="fp-bar-fill" style={{ width: `${row[metric] * 100}%` }} />
                                {metric !== 'loss' && <span className="fp-chance-line" />}
                            </span>
                            <span className="fp-bar-value">{row[metric].toFixed(4)}</span>
                        </button>
                    ))}
                    <div className="fp-axis" aria-hidden="true"><span>0.00</span><span>0.50</span><span>1.00</span></div>
                </div>
            </figure>

            <div className="fp-result-detail" aria-live="polite" aria-atomic="true">
                <p className="fp-label">Configuration {active.id} / {active.model}</p>
                <h3>{active.name}</h3>
                <p>{active.note}</p>
            </div>

            <details className="fp-disclosure">
                <summary>Inspect the numbers and their source</summary>
                <div className="fp-detail-body">
                    <p>{run === 'course'
                        ? 'Transcribed from the supplied report, IV.A.2, Capital IQ Layered Sentiment Ladder. CV means cross-validation. AUROC measures ranking discrimination, not percentage accuracy. F1 depends on the classification threshold; log loss evaluates probability quality.'
                        : 'Transcribed from the saved ablation_report.md read during this review. The report is an archived diagnostic, not a new run. Original training data and predictions are not distributed with the public code archive.'}</p>
                    <div className="fp-table-scroll" role="region" aria-label="Archived model results" tabIndex={0}>
                        <table>
                            <caption>{run === 'course' ? 'Course experiment — reported selected-model results' : 'Later rebuild — 21-day feature ablation'}</caption>
                            <thead><tr><th scope="col">Configuration</th><th scope="col">Mean CV</th><th scope="col">Worst fold</th><th scope="col">Holdout</th><th scope="col">Log loss</th>{run === 'course' && <th scope="col">F1</th>}</tr></thead>
                            <tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.id} · {row.name}</th><td>{row.cv.toFixed(4)}</td><td>{row.worst.toFixed(4)}</td><td>{row.holdout.toFixed(4)}</td><td>{row.loss.toFixed(4)}</td>{run === 'course' && <td>{row.f1?.toFixed(4)}</td>}</tr>)}</tbody>
                        </table>
                    </div>
                    <a href="#fp-sources">Source and version notes →</a>
                </div>
            </details>
            <p className="fp-footnote">These controls explore saved results. They do not train a model or generate new predictions.</p>
        </div>
    );
}
