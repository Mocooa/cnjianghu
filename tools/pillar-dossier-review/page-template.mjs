function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildReviewPageHtml(pillars) {
  const embeddedPillars = JSON.stringify(pillars);

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pillar Dossier Review</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f4efe7;
        --panel: rgba(255, 251, 245, 0.94);
        --panel-strong: #fffdf9;
        --ink: #1f2937;
        --muted: #6b7280;
        --line: #d9d2c8;
        --accent: #9f3a28;
        --accent-soft: #f6ddd6;
        --keep: #166534;
        --keep-bg: #dcfce7;
        --delete: #991b1b;
        --delete-bg: #fee2e2;
        --shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: "SF Pro Text", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(159, 58, 40, 0.08), transparent 28%),
          linear-gradient(180deg, #fbf8f2 0%, var(--bg) 100%);
      }

      .page {
        width: min(1440px, calc(100vw - 32px));
        margin: 24px auto 72px;
      }

      .shell {
        background: var(--panel);
        border: 1px solid rgba(217, 210, 200, 0.8);
        border-radius: 28px;
        box-shadow: var(--shadow);
        overflow: hidden;
      }

      .hero {
        padding: 28px 28px 22px;
        border-bottom: 1px solid var(--line);
        background:
          linear-gradient(135deg, rgba(159, 58, 40, 0.07), transparent 40%),
          linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.2));
      }

      .eyebrow {
        margin: 0 0 10px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--accent);
      }

      h1 {
        margin: 0;
        font-size: clamp(28px, 4vw, 42px);
        line-height: 1.05;
      }

      .subtitle {
        margin: 12px 0 0;
        max-width: 880px;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.6;
      }

      .toolbar {
        display: grid;
        gap: 16px;
        padding: 22px 28px;
        border-bottom: 1px solid var(--line);
        background: rgba(255, 253, 249, 0.92);
      }

      .toolbar-top {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
      }

      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .stat {
        min-width: 110px;
        padding: 12px 14px;
        border-radius: 16px;
        background: var(--panel-strong);
        border: 1px solid var(--line);
      }

      .stat-label {
        display: block;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--muted);
      }

      .stat-value {
        display: block;
        margin-top: 4px;
        font-size: 24px;
        font-weight: 700;
      }

      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      .search {
        min-width: min(100%, 360px);
        flex: 1 1 320px;
      }

      input[type="search"] {
        width: 100%;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid var(--line);
        background: var(--panel-strong);
        font: inherit;
      }

      .filters,
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      button {
        cursor: pointer;
        border: 1px solid var(--line);
        background: var(--panel-strong);
        color: var(--ink);
        border-radius: 999px;
        padding: 10px 14px;
        font: inherit;
      }

      button.active[data-filter="keep"],
      .decision-btn.keep.active {
        border-color: color-mix(in srgb, var(--keep) 38%, white);
        background: var(--keep-bg);
        color: var(--keep);
      }

      button.active[data-filter="delete"],
      .decision-btn.delete.active {
        border-color: color-mix(in srgb, var(--delete) 34%, white);
        background: var(--delete-bg);
        color: var(--delete);
      }

      button.active[data-filter="pending"] {
        border-color: color-mix(in srgb, var(--accent) 34%, white);
        background: var(--accent-soft);
        color: var(--accent);
      }

      .content {
        padding: 18px 20px 28px;
      }

      details.pillar {
        margin-top: 14px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.52);
        overflow: hidden;
      }

      details.pillar:first-child {
        margin-top: 0;
      }

      summary {
        list-style: none;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 16px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.36);
      }

      summary::-webkit-details-marker {
        display: none;
      }

      .pillar-title {
        font-size: 24px;
        font-weight: 700;
      }

      .pillar-zh {
        display: block;
        margin-top: 4px;
        color: var(--muted);
        font-size: 15px;
      }

      .pillar-role {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
      }

      .pillar-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .meta-chip {
        padding: 8px 10px;
        border-radius: 999px;
        background: var(--panel-strong);
        border: 1px solid var(--line);
        font-size: 13px;
        color: var(--muted);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
        padding: 4px 16px 16px;
      }

      .card {
        padding: 18px;
        border-radius: 18px;
        background: var(--panel-strong);
        border: 1px solid var(--line);
      }

      .card h3 {
        margin: 0;
        font-size: 20px;
        line-height: 1.2;
      }

      .card .zh {
        margin-top: 4px;
        color: var(--muted);
        font-size: 14px;
      }

      .card .slug {
        margin-top: 10px;
        font-size: 12px;
        color: var(--muted);
        letter-spacing: 0.04em;
      }

      .decision-row {
        display: flex;
        gap: 8px;
        margin-top: 14px;
      }

      .decision-btn {
        flex: 1;
        border-radius: 12px;
        padding: 11px 12px;
      }

      .field {
        margin-top: 14px;
      }

      .field label {
        display: block;
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: 600;
        color: var(--muted);
      }

      textarea {
        width: 100%;
        min-height: 88px;
        resize: vertical;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: #fffdfa;
        padding: 12px 14px;
        font: inherit;
        line-height: 1.45;
      }

      .empty {
        padding: 36px 22px 42px;
        color: var(--muted);
        text-align: center;
      }

      @media (max-width: 880px) {
        .page {
          width: min(100vw - 18px, 1440px);
          margin: 10px auto 48px;
        }

        .shell {
          border-radius: 20px;
        }

        .hero,
        .toolbar {
          padding-left: 18px;
          padding-right: 18px;
        }

        .content {
          padding: 14px 12px 22px;
        }

        .card-grid {
          grid-template-columns: 1fr;
          padding-left: 12px;
          padding-right: 12px;
        }

        summary {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="shell">
        <section class="hero">
          <p class="eyebrow">Pillar Dossier Review · 第一层母题审核</p>
          <h1>Pillar Dossier Review</h1>
          <p class="subtitle">
            Review only the first-layer dossier worlds. Use Keep or Delete, then leave notes and suggestions.
            Data is autosaved in localStorage so you can keep reviewing over multiple sessions.
          </p>
        </section>

        <section class="toolbar">
          <div class="toolbar-top">
            <div class="stats" id="stats"></div>
            <div class="actions">
              <button type="button" id="export-json">Export JSON</button>
              <button type="button" id="export-md">Export Markdown</button>
              <button type="button" id="reset-all">Reset</button>
            </div>
          </div>

          <div class="controls">
            <div class="search">
              <input type="search" id="search" placeholder="Search dossier title / 中文名 / slug" />
            </div>
            <div class="filters" id="filters">
              <button type="button" data-filter="all" class="active">All</button>
              <button type="button" data-filter="pending">Pending</button>
              <button type="button" data-filter="keep">Keep</button>
              <button type="button" data-filter="delete">Delete</button>
            </div>
          </div>
        </section>

        <main class="content" id="app"></main>
      </div>
    </div>

    <script>
      const PILLARS = ${embeddedPillars};
      const STORAGE_KEY = 'cnjianghu-pillar-dossier-review-v1';
      const app = document.getElementById('app');
      const stats = document.getElementById('stats');
      const searchInput = document.getElementById('search');
      const filters = document.getElementById('filters');

      let activeFilter = 'all';
      let searchValue = '';
      let reviews = loadReviews();

      function reviewKey(pillarSlug, dossierSlug) {
        return pillarSlug + ':' + dossierSlug;
      }

      function createInitialReviews() {
        const initial = {};
        for (const pillar of PILLARS) {
          for (const dossier of pillar.dossiers) {
            initial[reviewKey(pillar.slug, dossier.slug)] = {
              decision: '',
              note: '',
              suggestion: '',
            };
          }
        }
        return initial;
      }

      function loadReviews() {
        const initial = createInitialReviews();
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return initial;
          const parsed = JSON.parse(raw);
          return Object.assign(initial, parsed);
        } catch {
          return initial;
        }
      }

      function saveReviews() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      }

      function summarize() {
        let keep = 0;
        let remove = 0;
        let total = 0;

        for (const pillar of PILLARS) {
          for (const dossier of pillar.dossiers) {
            total += 1;
            const decision = reviews[reviewKey(pillar.slug, dossier.slug)]?.decision;
            if (decision === 'keep') keep += 1;
            if (decision === 'delete') remove += 1;
          }
        }

        return {
          total,
          keep,
          delete: remove,
          pending: total - keep - remove,
        };
      }

      function matchesFilter(record) {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return !record.decision;
        return record.decision === activeFilter;
      }

      function matchesSearch(dossier) {
        if (!searchValue) return true;
        const haystack = [dossier.title, dossier.zh, dossier.slug].join(' ').toLowerCase();
        return haystack.includes(searchValue);
      }

      function escapeHtml(value) {
        return value
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }

      function renderStats() {
        const summary = summarize();
        stats.innerHTML = [
          ['Total', summary.total],
          ['Keep', summary.keep],
          ['Delete', summary.delete],
          ['Pending', summary.pending],
        ].map(([label, value]) => {
          return '<div class="stat"><span class="stat-label">' + label + '</span><span class="stat-value">' + value + '</span></div>';
        }).join('');
      }

      function render() {
        renderStats();

        const sections = PILLARS.map((pillar) => {
          const filtered = pillar.dossiers.filter((dossier) => {
            const record = reviews[reviewKey(pillar.slug, dossier.slug)];
            return matchesFilter(record) && matchesSearch(dossier);
          });

          if (!filtered.length) {
            return '';
          }

          const pillarStats = filtered.reduce((acc, dossier) => {
            const decision = reviews[reviewKey(pillar.slug, dossier.slug)]?.decision;
            acc.total += 1;
            if (decision === 'keep') acc.keep += 1;
            if (decision === 'delete') acc.delete += 1;
            return acc;
          }, { total: 0, keep: 0, delete: 0 });

          const cards = filtered.map((dossier) => {
            const key = reviewKey(pillar.slug, dossier.slug);
            const record = reviews[key];

            return \`
              <article class="card">
                <h3>\${escapeHtml(dossier.title)}</h3>
                <div class="zh">\${escapeHtml(dossier.zh)}</div>
                <div class="slug">\${escapeHtml(key)}</div>

                <div class="decision-row">
                  <button
                    type="button"
                    class="decision-btn keep \${record.decision === 'keep' ? 'active' : ''}"
                    data-action="decision"
                    data-key="\${escapeHtml(key)}"
                    data-value="keep"
                  >保留 · Keep</button>
                  <button
                    type="button"
                    class="decision-btn delete \${record.decision === 'delete' ? 'active' : ''}"
                    data-action="decision"
                    data-key="\${escapeHtml(key)}"
                    data-value="delete"
                  >删除 · Delete</button>
                </div>

                <div class="field">
                  <label for="note-\${escapeHtml(key)}">备注</label>
                  <textarea id="note-\${escapeHtml(key)}" data-action="text" data-field="note" data-key="\${escapeHtml(key)}" placeholder="为什么保留 / 删除？">\${escapeHtml(record.note)}</textarea>
                </div>

                <div class="field">
                  <label for="suggestion-\${escapeHtml(key)}">建议</label>
                  <textarea id="suggestion-\${escapeHtml(key)}" data-action="text" data-field="suggestion" data-key="\${escapeHtml(key)}" placeholder="后续可合并、改名、缩小、延后等建议">\${escapeHtml(record.suggestion)}</textarea>
                </div>
              </article>
            \`;
          }).join('');

          return \`
            <details class="pillar" open>
              <summary>
                <div>
                  <div class="pillar-title">\${escapeHtml(pillar.title)}</div>
                  <span class="pillar-zh">\${escapeHtml(pillar.zh)}</span>
                  <div class="pillar-role">\${escapeHtml(pillar.role)}</div>
                </div>
                <div class="pillar-meta">
                  <span class="meta-chip">Visible \${pillarStats.total}</span>
                  <span class="meta-chip">Keep \${pillarStats.keep}</span>
                  <span class="meta-chip">Delete \${pillarStats.delete}</span>
                </div>
              </summary>
              <div class="card-grid">\${cards}</div>
            </details>
          \`;
        }).filter(Boolean).join('');

        app.innerHTML = sections || '<div class="empty">No dossiers match the current search/filter.</div>';
      }

      function buildMarkdown() {
        const lines = ['# Pillar Dossier Review', ''];
        for (const pillar of PILLARS) {
          lines.push('## ' + pillar.title + ' | ' + pillar.zh);
          lines.push('');
          for (const dossier of pillar.dossiers) {
            const record = reviews[reviewKey(pillar.slug, dossier.slug)];
            if (!record.decision) continue;
            lines.push('- ' + dossier.title + ' | ' + dossier.zh + ' — ' + record.decision);
            if (record.note) lines.push('  Note: ' + record.note);
            if (record.suggestion) lines.push('  Suggestion: ' + record.suggestion);
          }
          lines.push('');
        }
        return lines.join('\\n').trim() + '\\n';
      }

      function download(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 500);
      }

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        if (target.matches('[data-action="decision"]')) {
          const key = target.dataset.key;
          const value = target.dataset.value;
          const current = reviews[key].decision;
          reviews[key].decision = current === value ? '' : value;
          saveReviews();
          render();
        }

        if (target.id === 'export-json') {
          download('pillar-dossier-review.json', JSON.stringify(reviews, null, 2), 'application/json');
        }

        if (target.id === 'export-md') {
          download('pillar-dossier-review.md', buildMarkdown(), 'text/markdown');
        }

        if (target.id === 'reset-all') {
          if (confirm('Reset all review decisions, notes, and suggestions?')) {
            reviews = createInitialReviews();
            saveReviews();
            render();
          }
        }

        if (target.dataset.filter) {
          activeFilter = target.dataset.filter;
          [...filters.querySelectorAll('button')].forEach((button) => {
            button.classList.toggle('active', button.dataset.filter === activeFilter);
          });
          render();
        }
      });

      document.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        if (target === searchInput) {
          searchValue = target.value.trim().toLowerCase();
          render();
        }

        if (target.matches('[data-action="text"]')) {
          const key = target.dataset.key;
          const field = target.dataset.field;
          reviews[key][field] = target.value;
          saveReviews();
          renderStats();
        }
      });

      render();
    </script>
  </body>
</html>`;
}
