# P1 execution checkpoint — October 26, 2026

The approved plan is implemented in six draft PRs for owner review. No PR has
been merged, no production site/service configuration has been changed, and P1
is not fully accepted: the human and live-environment gates below remain open.

| Work | Review PR | Verified evidence |
| --- | --- | --- |
| RAGOps architecture and claim alignment | [RAG_OPS #2](https://github.com/xmike04/RAG_OPS/pull/2) | Head 99e30869d3bf91b42d20aeef7980165793a3f14b; [CI 40390346369](https://github.com/xmike04/RAG_OPS/actions/runs/40390346369) passed |
| RAGOps service harness and full SciFact baseline | [RAG_OPS #3](https://github.com/xmike04/RAG_OPS/pull/3) | Head df271a5bf9adc8c610fa8ba19f18cedea6c7ee5e; [CI 40383317747](https://github.com/xmike04/RAG_OPS/actions/runs/40383317747) passed; measured source 6a07b41aadbb326eee7c9031a15923246103c2f7 |
| RAGOps mixed-query load and process resources | [RAG_OPS #4](https://github.com/xmike04/RAG_OPS/pull/4) | Stacked on #3; head 5549d6792a6f5f4c6126c41deb9f1e16ec5e9264; [CI 40390183060](https://github.com/xmike04/RAG_OPS/actions/runs/40390183060) passed; measured source fa5b6fae567d3863eb26af68bd908fc4c8c8f383 |
| SIMLYFE application CI and operations evidence | [SIMLYFE #11](https://github.com/xmike04/SIMLYFE/pull/11) | Head d70859b2a99261a92ac813314a1fa2274d13b170; [CI 40389607582](https://github.com/xmike04/SIMLYFE/actions/runs/40389607582) passed |
| Portfolio evidence register and navigation | [Portfolio #6](https://github.com/xmike04/xmike04.github.io/pull/6) | Previous head d6e882df63cb1f1551db7bf9b0d65aba5cd1717c passed CI 40384079797; final matrix/ledger text is checked by this PR's quality workflow |
| GitHub profile evidence navigation | [Profile #3](https://github.com/xmike04/xmike04/pull/3) | Documentation-only; immutable report/ledger links; no application test claim |

## Measured and verified

The serving study indexed all 5,183 documents / 5,887 chunks through real
FastAPI/worker/PostgreSQL/Redis ingestion, then evaluated 809 train and 300 test
queries once. Test Recall@10 was 0.4097, nDCG@10 0.3134, serial HTTP p95 23.76 ms,
with zero failed test requests. Official qrels, original-document mappings,
deduplicated rankings, provider metadata, source/data hashes, and every score
were checked from retained raw outputs. These are matching deterministic
providers, separate from offline MiniLM/Okapi BM25 and from answer quality.

The [mixed-query report](https://github.com/xmike04/RAG_OPS/blob/5549d6792a6f5f4c6126c41deb9f1e16ec5e9264/benchmarks/service/results/load/2026-10-26-local-40389341425/README.md)
uses the same 30 seeded training queries at concurrency 1/4/8: 300 measured
requests per condition, zero failures, p95 54.73/137.22/252.24 ms and successful
throughput 18.98/39.34/47.13 requests/s. It retains API/worker CPU ticks, RSS
endpoints, and a 47,177,728-byte global chunks-table-plus-index snapshot.
Five first-search observations have distinct continuous API identities and
counter proof: one after ingestion and four after restarts. DB/OS caches remain
warm. No cold-tail, paired cold penalty, peak RSS, learned inference, generation,
database/Redis CPU, billing, or production-capacity claim is made.

The initial load collection 40387499975 failed validation because locked FastAPI
0.143 exposes an unprefixed search-route metrics label. Direct integration
reproduced this; the parser now handles the observed labels and real HTTP checks
verify counter deltas. The failed collection remains retained and invalid.
Both collectors are now manual-only and read-only, with temporary artifact
publishers removed.

SIMLYFE's full CI passed 783 Vitest test cases /37 files, lint, build, docs, and
controlled desktop/mobile browser flows. Counts are cases, not assertions.
Mocks do not establish production authorization or provider behavior.
The README surfaces CI and current deployment evidence.

## Professional findings and independent review

- Serving lexical/vector queries are sequential through a shared AsyncSession.
  PostgreSQL ts_rank_cd is cover-density ranking; offline Okapi BM25 is separate.
- The ingestion worker hard-codes hash embeddings even when API query embedding
  settings select Sentence Transformers. The harness rejects that mismatch;
  no learned serving result is claimed before a tested fix and re-ingestion.
- Result cache and dollar-cost fields are placeholders, generator citation markers
  are not fully validated, API metrics are scraped but worker metrics are not
  exported, and configured reranker failure is not a general fail-open guarantee.
- Independent source review found no Critical issue. Response-provider provenance,
  reranker metadata, truncated HTTP failure accounting, NASA attribution, diagram
  edges, numeric accessible labels, restart validity, measurement-source provenance,
  and warmup traceability were corrected with appropriate tests.
- The final load head passed 67 backend and 49 cross-component tests, including
  independent raw checksum/count/quantile/CPU/PID-counter recomputation.
- The current RAGOps Pages workflow run 39512640946 built successfully at main
  6269fb009a9910a846fc1a55be3fa8ee57c1f88d but skipped deployment. Build success is
  not a hosted-demo claim. Screenshots/video remain the demonstrated entry points.

## Remaining acceptance gates

- **SIMLYFE live journey:** Vercel maps the canonical frontend to
  e8617bbae81814da480ea28fc028bf8e4872a439; Supabase management reports the project
  INACTIVE while generate-event is listed ACTIVE v14. The deployed function adds
  Android/browser origin parsing absent from that repository revision. Confirm
  intended availability/origin policy, then run a small authorized test-identity
  authentication/create/event/resolve/save/reload canary. No restore, origin
  change, or provider-spending test has been assumed.
- **NASA individual evidence:** confirm personal camera/gesture, ImGui/setup/
  calibration, Unity integration, and deployment contributions, plus permission
  for each proposed asset. The confirmed five-person UNT Lead Developer capstone
  role is preserved; public exhibit coverage does not prove module authorship.
- **Repository policy:** SIMLYFE main has no protection/rulesets. CI can report
  failure but cannot enforce merge blocking without an owner policy decision.
  License choice is also the owner's; no reuse rights were granted automatically.
- **Publication and navigation:** review/merge the concrete PRs, integrating
  RAG_OPS #3 before its stacked #4. Canonical sites/profile are not yet updated.
  Browser-dependent GitHub pins/About cleanup, visual production review, and
  post-publication public-link checks remain. No live RAG backend is required.
- **Security review boundary:** bounded tracked-file and deployed-function
  literal checks were performed; complete Git history/secret/security-alert
  auditing is not claimed. Owner dashboard checks remain necessary where tools
  cannot inspect alerts.

## Evidence decisions

Historical results remain intact and explicitly scoped. The single-query load
headline is superseded in draft presentation by the qualified mixed-query matrix.
No important improvement is inferred from unmatched configurations, ordered load
conditions, or tiny cold samples. Bootstrap tooling supports paired comparisons
when appropriate; no positive service-quality improvement is asserted here.
Unavailable costs/resources and current live behavior stay unmeasured rather
than being reported as zero or inferred from CI.
