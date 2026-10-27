# Public claim-to-evidence ledger

Software results are self-produced, artifact-backed evidence unless stated otherwise, not independent audits. Team coverage does not establish individual authorship. Owner-attested credentials lack public verification links. Review dates describe an evidence check, not a new benchmark run. The audit flags incomplete entries and dates older than 90 days; optional network checks establish reachability only.

## ragops-retrieval
- Wording: In an offline 5,183-document, 300-query SciFact experiment, RRF achieved 0.8059 Recall@10 and 0.6816 nDCG@10.
- Verification: artifact-backed
- Source: [Retained report](https://github.com/xmike04/RAG_OPS/blob/6269fb009a9910a846fc1a55be3fa8ee57c1f88d/benchmarks/retrieval/results/scifact/160ce708a7858938/report.md), [Configuration and hashes](https://github.com/xmike04/RAG_OPS/blob/6269fb009a9910a846fc1a55be3fa8ee57c1f88d/benchmarks/retrieval/results/scifact/160ce708a7858938/run_config.json)
- Revision: Measured source 6f0c62ab639b22bc0643fc739e15b3c8c35bd054; artifact retained at 6269fb009a9910a846fc1a55be3fa8ee57c1f88d; run 160ce708a7858938.
- Scope: Canonical Okapi BM25, normalized MiniLM vectors, RRF k=60; official SciFact test labels; CPU run with model/data/environment configuration retained.
- Limits: Does not call FastAPI/PostgreSQL or measure generation. PostgreSQL serves ts_rank_cd, not BM25. The experimental cross-encoder reduced held-out quality and remains a negative result.
- Checked: 2026-10-26

## ragops-load
- Wording: A controlled local /v1/search run completed 9,234 requests with 24.56 ms p50 and 31.75 ms p95.
- Verification: historical
- Source: [HTTP summary and environment](https://github.com/xmike04/RAG_OPS/blob/6269fb009a9910a846fc1a55be3fa8ee57c1f88d/benchmarks/load/results/summary.json)
- Revision: Measured source 14d6c5e9246356c8f4037d4f46d592ddbb8b0c4b; artifact retained at 6269fb009a9910a846fc1a55be3fa8ee57c1f88d; measured 2026-10-08.
- Scope: 30 seconds; concurrency 8; one repeated query; 10 warm-ups; deterministic providers; local Compose; 5 visible vCPUs and 33 GiB RAM.
- Limits: No generation, learned inference, varied-query/cold-state study, process resource samples, or retained corpus/chunk counts. Not a production SLO. Cost/cache placeholders are not measurements.
- Checked: 2026-10-26

## simlyfe-tests
- Wording: CI passed 789 Vitest test cases across 38 files, plus desktop/mobile browser smoke, on October 26, 2026.
- Verification: artifact-backed
- Source: [Application quality run](https://github.com/xmike04/SIMLYFE/actions/runs/40444810716), [Tested PR head](https://github.com/xmike04/SIMLYFE/commit/154e581082482e640224e6d27d7f11dc2f39dac8)
- Revision: PR head 154e581082482e640224e6d27d7f11dc2f39dac8; workflow run 40444810716; compatible function source 220b580b5f6c404b59186e366b4bc9aafd486547.
- Scope: Node 22 and locked dependencies; lint, full Vitest suite, production build, docs, desktop/mobile Playwright. Counts test cases, not expect assertions.
- Limits: Controlled Firebase/event responses do not prove live JWT validation, deployed Firestore authorization, production connectivity, or model quality. Main has no required checks yet. Historical larger test counts are separate reported milestones.
- Checked: 2026-10-26

## simlyfe-production
- Wording: A separately approved October 26, 2026 Guest canary generated an event, resolved a choice and restored age 2, the selected outcome and 95% happiness after same-browser reload.
- Verification: artifact-backed
- Source: [Successful canary receipt](https://github.com/xmike04/SIMLYFE/blob/bf5a2389dce49cb73e83ae5741917ac9f5da3f56/docs/evidence/production-nano-canary-2026-10-26.json), [Current journey and limits](https://github.com/xmike04/SIMLYFE/blob/bf5a2389dce49cb73e83ae5741917ac9f5da3f56/docs/operations.md#october-26-2026-replacement-key-canary), [Deployment access checks](https://github.com/xmike04/SIMLYFE/blob/bf5a2389dce49cb73e83ae5741917ac9f5da3f56/docs/evidence/openai-nano-deployment-2026-10-27.json), [Earlier failed canary](https://github.com/xmike04/SIMLYFE/blob/bf5a2389dce49cb73e83ae5741917ac9f5da3f56/docs/evidence/production-canary-2026-10-26.json), [Public frontend](https://simlyfe.vercel.app)
- Revision: Active function v17; source 220b580b5f6c404b59186e366b4bc9aafd486547, both deployed files matched, bundle SHA-256 948ed7c6b9ddb8fdb117330f1135731cc23d73e759e8ade420fd42d730283f98. Current frontend commit mapping remains unverified; observed module /assets/index-CWUz-w8k.js.
- Scope: One new approved request on synthetic Guest life P1 Canary Oct26 in Quick mode, no retries, at 10:52 p.m. CDT. A two-choice event was displayed; the selected comforting choice added history and raised happiness 90% to 95%. Reload returned that same life at age 2 with the outcome intact. The quota RPC returned 200. Separate v16 probes passed web/native preflights and missing-auth/unlisted-origin rejection before any provider call.
- Limits: One infancy event is not a reliability, latency, broad-quality or cost benchmark. Actual API-reported model, request metadata, tokens and billing were not independently visible; gpt-5-nano is owner-reported configuration and the matching source default. Function-edge rows were unavailable in the bounded reads. Same-browser reload does not independently prove cloud write acknowledgment, cross-device recovery, current native-device gameplay, frontend commit attribution or deployed Firestore rules. The earlier failed request and its unresolved specific cause remain historical evidence.
- Checked: 2026-10-26

## nasa-role
- Wording: Lead Developer for the five-person UNT senior capstone with NASA PACE/UMD collaboration, Fall 2024–May 2025; co-designed fuzzy-logic gestures, built the ImGui hardware-setup interface, and connected/oversaw Unity integration.
- Verification: user-attested
- Source: Owner confirmed leadership/dates on 2026-10-25 and personal component scope on 2026-10-26. Private implementation inspection corroborates fuzzy pose/motion scoring, the ImGui setup flow, and an OSC bridge into Unity; protected source and private-repository links are not published.
- Revision: Academic project Fall 2024–May 2025. Inspected private snapshot dated February 11, 2025; not a claim about a final deployed release.
- Scope: Shared gesture-design credit; ImGui hardware/software prerequisite and camera-configuration interface; Unity integration connection/oversight; team leadership. Deployment was outside Michael’s role.
- Limits: Code presence does not independently prove individual authorship. No sole ownership of every gesture/camera/rendering/transport module, calibration algorithm, on-site deployment, accuracy, latency, or setup-time improvement is claimed. Owner authorized use of suitable project-organization assets; the linked organization repositories are inaccessible through this connection and inspected images were mostly Git LFS references. The original high-level diagram is used; no protected code or third-party image is republished.
- Checked: 2026-10-26

## nasa-exhibit
- Wording: WAVE: From Space to Ocean premiered at the Kennedy Center in March 2025 as a collaborative public exhibit.
- Verification: artifact-backed
- Source: [NASA PACE exhibit page](https://pace.oceansciences.org/wave_space_to_ocean.htm), [UMD exhibit coverage](https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa)
- Revision: March 2025 public milestone; external articles do not have a software commit.
- Scope: Independent coverage of the exhibit, venue, NASA/UMD/UNT collaboration; both pages fetched successfully on this review date.
- Limits: Does not independently establish Michael’s individual component authorship, employment, technical performance, or redistribution rights.
- Checked: 2026-10-26

## mr-cooper
- Wording: Product Analyst Intern on Mr. Cooper Group’s AI/ML team in 2025.
- Verification: user-attested
- Source: Owner-supplied employment history; employer verification and proprietary work are not published.
- Revision: 2025 role; not ongoing employment or a public software-release claim.
- Scope: AI product evaluation, user validation, feature evaluation, and cross-functional delivery as described by the owner.
- Limits: No public employer verification or approved proprietary artifacts supplied. No fabricated impact percentage, private customer data, or production SLA.
- Checked: 2026-10-26

## aws-certification
- Wording: AWS Certified Machine Learning — Specialty, owner-confirmed.
- Verification: user-attested
- Source: Owner confirmation on 2026-10-25; no public credential URL or ID supplied.
- Revision: Personal credential, not a software revision.
- Scope: Certification ownership as confirmed by the owner.
- Limits: Issue/expiry dates and current validity not independently verified. No official product page or fabricated badge substituted for holder verification.
- Checked: 2026-10-26

## gcp-certification
- Wording: Google Cloud Certified Professional Cloud Architect, owner-confirmed.
- Verification: user-attested
- Source: Owner confirmation on 2026-10-25; no public credential URL or ID supplied.
- Revision: Personal credential, not a software revision.
- Scope: Certification ownership as confirmed by the owner.
- Limits: Issue/expiry dates and current validity not independently verified. No badge or verification URL fabricated.
- Checked: 2026-10-26

## education
- Wording: UNT B.S. Computer Science completed May 2025; M.S. Artificial Intelligence estimated Summer 2027.
- Verification: user-attested
- Source: Owner confirmed graduation and graduate completion estimate on 2026-10-25; no transcript published.
- Revision: Personal academic facts and a forward-looking estimate.
- Scope: Degree names, completed undergraduate date, and estimated graduate completion.
- Limits: Summer 2027 is an estimate, not a completed degree. Institutional records are not independently verified here. No undergraduate GPA published.
- Checked: 2026-10-26

## ragops-serving
- Wording: On the deterministic serving path, 5,183 documents produced 5,887 chunks; 300 held-out queries achieved 0.4097 Recall@10 and 0.3134 nDCG@10, with 23.76 ms p95 serial HTTP search latency.
- Verification: artifact-backed
- Source: [Qualified serving report and raw evidence](https://github.com/xmike04/RAG_OPS/blob/df271a5bf9adc8c610fa8ba19f18cedea6c7ee5e/benchmarks/service/results/scifact/2026-10-26-local-40380993127/README.md), [Collection run](https://github.com/xmike04/RAG_OPS/actions/runs/40380993127), [Independent artifact/qrel recomputation](https://github.com/xmike04/RAG_OPS/actions/runs/40382526181)
- Revision: Measured source 6a07b41aadbb326eee7c9031a15923246103c2f7; retained report df271a5bf9adc8c610fa8ba19f18cedea6c7ee5e.
- Scope: Matching feature-hash-384 embeddings, PostgreSQL cover-density lexical ranking, RRF k=60, candidate cap 100, top_k 100 chunks, rerank false, concurrency 1. Train ran before test. Four visible logical CPUs; Python 3.12.15, PostgreSQL 16.15, pgvector 0.8.7. Exact configuration, source/data hashes, index definitions, mappings, and per-query outputs are retained.
- Limits: Returned test windows held 90–100 unique documents. Excludes generation, a varied-query concurrency/cold-state study, process CPU/RSS, and billing. Effective query plans/database overrides were not captured. Offline and serving configurations differ in several components; the quality gap is not a controlled causal ablation or a production SLA.
- Checked: 2026-10-26

## ragops-mixed-load
- Wording: A controlled 30-query local-provider matrix completed 300 requests each at concurrency 1, 4, and 8 with no measured failures; p95 was 54.73 / 137.22 / 252.24 ms.
- Verification: artifact-backed
- Source: [Qualified matrix and raw evidence](https://github.com/xmike04/RAG_OPS/blob/5549d6792a6f5f4c6126c41deb9f1e16ec5e9264/benchmarks/service/results/load/2026-10-26-local-40389341425/README.md), [Collection run](https://github.com/xmike04/RAG_OPS/actions/runs/40389341425), [Raw-artifact validation CI](https://github.com/xmike04/RAG_OPS/actions/runs/40390183060)
- Revision: Measured application/harness fa5b6fae567d3863eb26af68bd908fc4c8c8f383; retained report 5549d6792a6f5f4c6126c41deb9f1e16ec5e9264; collection 40389341425.
- Scope: 5,183 documents / 5,887 chunks; seed 0, 30 training queries round-robin; 30 separate warmups per condition; matching feature-hash-384, top 100 chunks, candidate cap 100, no reranking/generation. Five first-search observations use distinct API identities, one after ingestion and four after API restarts with ready dependencies and retained DB/OS caches. Four visible logical CPUs; exact runtime, source/data hashes, API/worker CPU ticks and RSS endpoints, request outcomes, and index definitions retained.
- Limits: Closed-loop throughput is not an arrival-rate/capacity SLA. One ordered collection per concurrency does not establish a causal/statistically stable scaling effect. Five different first queries do not support a cold-tail percentile or paired cold penalty. RSS endpoints are not peak memory; worker CPU was observed while idle after ingestion. Database/Redis CPU, query plans, billing, learned inference, generation, and production reliability were not measured. The rejected first collection remains separate and invalid.
- Checked: 2026-10-26
