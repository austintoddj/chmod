import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import {
  PERM_LABELS,
  PERM_LETTERS,
  PERMS,
  PRESETS,
  ROLE_LABELS,
  ROLES,
  STRENGTH,
  bitsToOctal,
  bitsToSymbolic,
  chmodCommand,
  defaultBits,
  emptySpecial,
  humanReadable,
  octalToBits,
  permissionStrength,
  type Bits,
  type Perm,
  type Role,
  type SpecialBits
} from './permissions'
import './style.css'

// ── State ──────────────────────────────────────────────────────────────────

type AppState = {
  bits: Bits
  special: SpecialBits
  filename: string
  showSpecial: boolean
  copied: boolean
  octalDraft: string | null
}

const state: AppState = {
  bits: defaultBits(),
  special: emptySpecial(),
  filename: 'filename',
  showSpecial: false,
  copied: false,
  octalDraft: null
}

let copyTimer: ReturnType<typeof setTimeout> | null = null
let eventsBound = false

// ── Render (initial mount only) ────────────────────────────────────────────

function render(): void {
  const octal = bitsToOctal(state.bits, state.special)
  const symbolic = bitsToSymbolic(state.bits, state.special)
  const strength = permissionStrength(state.bits)
  const strengthMeta = STRENGTH[strength]
  const readable = humanReadable(octal)
  const octalDisplay = state.octalDraft !== null ? state.octalDraft : octal
  const activePreset = PRESETS.find(p => p.octal === octal)?.octal ?? null

  const app = document.querySelector('#app')
  if (!app) return

  app.innerHTML = `
    <div class="page">
      <header class="hero">
        <p class="eyebrow">A Unix permissions calculator</p>
        <h1 class="title">What. The. Chmod.</h1>
        <p class="lede">
          Toggle bits, type an octal, or grab a preset — then copy the command and get on with your life.
        </p>
      </header>

      <main class="panel" aria-label="Permission calculator">
        <section class="matrix" aria-label="Permission matrix">
          <div class="matrix-grid" role="table" aria-label="User, group, and other permissions">
            <div class="matrix-corner" role="columnheader"></div>
            ${ROLES.map(
              role => `
              <div class="matrix-role" role="columnheader" title="${ROLE_LABELS[role].hint}">
                <span class="role-title">${ROLE_LABELS[role].title}</span>
                <span class="role-hint">${ROLE_LABELS[role].hint}</span>
              </div>
            `
            ).join('')}

            ${PERMS.map(
              perm => `
              <div class="matrix-perm" role="rowheader" title="${PERM_LABELS[perm].hint}">
                <span class="perm-letter">${PERM_LABELS[perm].short}</span>
                <span class="perm-title">${PERM_LABELS[perm].title}</span>
              </div>
              ${ROLES.map(role => {
                const on = state.bits[role][perm]
                const id = `${role}-${perm}`
                return `
                  <button
                    type="button"
                    id="${id}"
                    class="bit ${on ? 'is-on' : ''}"
                    role="checkbox"
                    aria-checked="${on}"
                    aria-label="${ROLE_LABELS[role].title} ${PERM_LABELS[perm].title}"
                    data-role="${role}"
                    data-perm="${perm}"
                  >
                    <span class="bit-glyph" aria-hidden="true">${on ? PERM_LETTERS[perm] : '–'}</span>
                  </button>
                `
              }).join('')}
            `
            ).join('')}
          </div>
        </section>

        <section class="outputs" aria-label="Permission results">
          <div>
            <label class="field-label" for="octal-input">Numeric mode</label>
            <div class="octal-row">
              <span class="octal-prefix" aria-hidden="true">0</span>
              <input
                id="octal-input"
                class="octal-input"
                type="text"
                inputmode="numeric"
                pattern="[0-7]{3,4}"
                maxlength="4"
                size="4"
                spellcheck="false"
                autocomplete="off"
                value="${escapeAttr(octalDisplay)}"
                aria-describedby="octal-help"
              />
            </div>
            <p id="octal-help" class="field-help">Type 3–4 octal digits (0–7) to set permissions.</p>
          </div>

          <div class="output-secondary">
            <div class="stat">
              <span class="stat-label">Symbolic</span>
              <code class="stat-value mono">${symbolic}</code>
            </div>
            <div class="stat">
              <span class="stat-label">Strength</span>
              <span class="strength strength-${strength}" title="${escapeAttr(strengthMeta.detail)}">
                <span class="strength-dot" aria-hidden="true"></span>
                ${strengthMeta.label}
              </span>
            </div>
          </div>

          <p class="human mono-soft">${escapeHtml(readable)}</p>

          <div class="command-block">
            <div class="command-meta">
              <span class="stat-label">Command</span>
              <label class="filename-label" for="filename-input">
                <span class="filename-label-text">Target file</span>
                <input
                  id="filename-input"
                  class="filename-input"
                  type="text"
                  value="${escapeAttr(state.filename)}"
                  placeholder="filename"
                  spellcheck="false"
                  autocomplete="off"
                  aria-label="Target filename for the chmod command"
                />
              </label>
            </div>
            <div class="command-row">
              <code class="command mono">
                <span class="prompt" aria-hidden="true">~$</span>
                <span class="cmd">chmod</span>
                <span class="cmd-mode">${escapeHtml(octal)}</span>
                <span class="cmd-file">${escapeHtml(state.filename || 'filename')}</span>
              </code>
              <button type="button" class="copy-btn ${state.copied ? 'is-copied' : ''}" id="copy-btn" aria-label="Copy chmod command">
                ${state.copied ? copyCheckIcon() : copyIcon()}
                <span>${state.copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </section>

        <section class="presets" aria-label="Common permission presets">
          <div class="section-head">
            <h2 class="section-title">Presets</h2>
          </div>
          <div class="preset-list" role="list">
            ${PRESETS.map(
              p => `
              <button
                type="button"
                class="preset ${activePreset === p.octal ? 'is-active' : ''}"
                data-preset="${p.octal}"
                role="listitem"
                title="${escapeAttr(p.desc)}"
              >
                <span class="preset-octal mono">${p.label}</span>
                <span class="preset-desc">${p.desc}</span>
              </button>
            `
            ).join('')}
          </div>
        </section>

        <section class="special">
          <button type="button" class="special-toggle" id="special-toggle" aria-expanded="${state.showSpecial}">
            <span>Special bits</span>
            <span class="special-chevron ${state.showSpecial ? 'is-open' : ''}" aria-hidden="true">${chevronIcon()}</span>
          </button>
          <div class="special-panel ${state.showSpecial ? 'is-open' : ''}" ${state.showSpecial ? '' : 'hidden'}>
            <div class="special-bits">
              ${specialBit('setuid', 'Setuid', '4', 'Run as the file owner (s on user execute)')}
              ${specialBit('setgid', 'Setgid', '2', 'Run as the file group (s on group execute)')}
              ${specialBit('sticky', 'Sticky', '1', 'Only owner can delete in dir (t on other execute)')}
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>
          <a class="footer-mark" href="https://whatthechmod.vercel.app/">whatthechmod.vercel.app</a>
          <span class="footer-sep" aria-hidden="true">·</span>
          <span>Permissions for humans</span>
        </p>
        <p class="footer-credit">
          by
          <a href="https://toddaustin.co" rel="author noopener noreferrer">toddaustin.co</a>
        </p>
      </footer>
    </div>
  `

  bindEvents()
}

function specialBit(
  key: keyof SpecialBits,
  label: string,
  value: string,
  hint: string
): string {
  const on = state.special[key]
  return `
    <button
      type="button"
      class="special-bit ${on ? 'is-on' : ''}"
      data-special="${key}"
      role="checkbox"
      aria-checked="${on}"
      title="${escapeAttr(hint)}"
    >
      <span class="special-value mono">${value}</span>
      <span class="special-label">${label}</span>
      <span class="special-hint">${hint}</span>
    </button>
  `
}

// ── Events (bound once; DOM is updated in place after that) ────────────────

function bindEvents(): void {
  if (eventsBound) return
  eventsBound = true

  const app = document.querySelector('#app')
  if (!app) return

  app.addEventListener('click', e => {
    const target = e.target
    if (!(target instanceof Element)) return

    const bit = target.closest('.bit')
    if (bit instanceof HTMLElement && app.contains(bit)) {
      const role = bit.dataset.role as Role | undefined
      const perm = bit.dataset.perm as Perm | undefined
      if (!role || !perm) return
      state.bits[role][perm] = !state.bits[role][perm]
      state.octalDraft = null
      updateUI()
      return
    }

    const special = target.closest('[data-special]')
    if (special instanceof HTMLElement && app.contains(special)) {
      const key = special.dataset.special as keyof SpecialBits | undefined
      if (!key) return
      state.special[key] = !state.special[key]
      state.octalDraft = null
      updateUI()
      return
    }

    const preset = target.closest('[data-preset]')
    if (preset instanceof HTMLElement && app.contains(preset)) {
      const mode = preset.dataset.preset
      if (!mode) return
      const parsed = octalToBits(mode)
      if (!parsed) return
      state.bits = parsed.bits
      state.special = parsed.special
      state.octalDraft = null
      updateUI()
      return
    }

    const specialToggle = target.closest('#special-toggle')
    if (specialToggle && app.contains(specialToggle)) {
      state.showSpecial = !state.showSpecial
      updateSpecialPanel()
      return
    }

    const copyBtn = target.closest('#copy-btn')
    if (copyBtn && app.contains(copyBtn)) {
      void copyCommand()
    }
  })

  app.addEventListener('input', e => {
    const target = e.target
    if (!(target instanceof HTMLInputElement)) return

    if (target.id === 'octal-input') {
      const raw = target.value.replace(/[^0-7]/g, '').slice(0, 4)
      state.octalDraft = raw
      target.value = raw

      if (raw.length === 3 || raw.length === 4) {
        const parsed = octalToBits(raw)
        if (parsed) {
          state.bits = parsed.bits
          state.special = parsed.special
        }
      }
      updateUI({ preserveOctalDraft: true })
      return
    }

    if (target.id === 'filename-input') {
      state.filename = target.value || 'filename'
      updateCommandOnly()
    }
  })

  // Select all on focus so click/tab → type replaces the default target.
  app.addEventListener('focusin', e => {
    const target = e.target
    if (target instanceof HTMLInputElement && target.id === 'filename-input') {
      target.select()
    }
  })

  app.addEventListener(
    'blur',
    e => {
      const target = e.target
      if (!(target instanceof HTMLInputElement)) return

      if (target.id === 'octal-input') {
        state.octalDraft = null
        updateUI()
        return
      }

      if (target.id === 'filename-input') {
        if (!state.filename.trim()) {
          state.filename = 'filename'
          target.value = state.filename
        }
        updateCommandOnly()
      }
    },
    true
  )

  app.addEventListener('keydown', e => {
    if (!(e instanceof KeyboardEvent)) return
    const target = e.target
    if (
      target instanceof HTMLInputElement &&
      target.id === 'octal-input' &&
      e.key === 'Enter'
    ) {
      target.blur()
    }
  })
}

async function copyCommand(): Promise<void> {
  const octal = bitsToOctal(state.bits, state.special)
  const text = chmodCommand(octal, state.filename)
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  state.copied = true
  updateCopyButton()
  if (copyTimer !== null) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    state.copied = false
    updateCopyButton()
  }, 1600)
}

// ── In-place DOM updates (no full re-render → no scroll/focus jump) ────────

/** Refresh all live permission UI from state without rebuilding the page. */
function updateUI({ preserveOctalDraft = false } = {}): void {
  const octal = bitsToOctal(state.bits, state.special)
  const symbolic = bitsToSymbolic(state.bits, state.special)
  const strength = permissionStrength(state.bits)
  const strengthMeta = STRENGTH[strength]
  const readable = humanReadable(octal)

  document.querySelectorAll<HTMLElement>('.bit').forEach(btn => {
    const role = btn.dataset.role as Role | undefined
    const perm = btn.dataset.perm as Perm | undefined
    if (!role || !perm) return
    const on = state.bits[role][perm]
    btn.classList.toggle('is-on', on)
    btn.setAttribute('aria-checked', String(on))
    const glyph = btn.querySelector('.bit-glyph')
    if (glyph) glyph.textContent = on ? PERM_LETTERS[perm] : '–'
  })

  document.querySelectorAll<HTMLElement>('[data-special]').forEach(btn => {
    const key = btn.dataset.special as keyof SpecialBits | undefined
    if (!key) return
    const on = state.special[key]
    btn.classList.toggle('is-on', on)
    btn.setAttribute('aria-checked', String(on))
  })

  if (!preserveOctalDraft) {
    const octalInput = document.querySelector<HTMLInputElement>('#octal-input')
    if (octalInput) octalInput.value = octal
  }

  const sym = document.querySelector('.stat-value')
  if (sym) sym.textContent = symbolic

  const strengthEl = document.querySelector('.strength')
  if (strengthEl) {
    strengthEl.className = `strength strength-${strength}`
    strengthEl.setAttribute('title', strengthMeta.detail)
    strengthEl.innerHTML = `<span class="strength-dot" aria-hidden="true"></span>${strengthMeta.label}`
  }

  const human = document.querySelector('.human')
  if (human) human.textContent = readable

  document.querySelectorAll<HTMLElement>('.preset').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.preset === octal)
  })

  updateCommandOnly()
}

function updateCommandOnly(): void {
  const octal = bitsToOctal(state.bits, state.special)
  const mode = document.querySelector('.cmd-mode')
  const file = document.querySelector('.cmd-file')
  if (mode) mode.textContent = octal
  if (file) file.textContent = state.filename || 'filename'
}

function updateSpecialPanel(): void {
  const toggle = document.querySelector('#special-toggle')
  const panel = document.querySelector<HTMLElement>('.special-panel')
  const chevron = document.querySelector('.special-chevron')
  if (toggle) toggle.setAttribute('aria-expanded', String(state.showSpecial))
  if (panel) {
    panel.classList.toggle('is-open', state.showSpecial)
    panel.hidden = !state.showSpecial
  }
  if (chevron) chevron.classList.toggle('is-open', state.showSpecial)
}

function updateCopyButton(): void {
  const btn = document.querySelector('#copy-btn')
  if (!btn) return
  btn.classList.toggle('is-copied', state.copied)
  btn.innerHTML = `
    ${state.copied ? copyCheckIcon() : copyIcon()}
    <span>${state.copied ? 'Copied' : 'Copy'}</span>
  `
}

// ── Helpers ────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeAttr(str: string): string {
  return escapeHtml(str).replaceAll("'", '&#39;')
}

function copyIcon(): string {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
}

function copyCheckIcon(): string {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
}

function chevronIcon(): string {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`
}

// Kick off when #app exists (skip during unit-test imports that don't mount).
if (document.querySelector('#app')) {
  // Vercel Web Analytics + Speed Insights (no-op off Vercel; dashboard after deploy)
  if (import.meta.env.MODE !== 'test') {
    inject()
    injectSpeedInsights()
  }
  render()
}
