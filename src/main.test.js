import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('calculator UI', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div id="app"></div>'
    vi.resetModules()
    await import('./main.js')
  })

  it('renders the calculator shell', () => {
    expect(document.querySelector('.title')?.textContent).toContain(
      'What. The. Chmod.'
    )
    expect(document.querySelector('#octal-input')?.value).toBe('755')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rwxr-xr-x'
    )
    expect(document.querySelector('.cmd-mode')?.textContent).toBe('755')
  })

  it('toggles a permission bit and updates the octal', () => {
    const otherWrite = document.querySelector('#other-write')
    expect(otherWrite?.getAttribute('aria-checked')).toBe('false')

    otherWrite.click()

    expect(document.querySelector('#octal-input')?.value).toBe('757')
    expect(document.querySelector('.strength')?.textContent).toMatch(/Weak/i)
  })

  it('applies a preset', () => {
    const preset = document.querySelector('[data-preset="644"]')
    expect(preset).toBeTruthy()
    preset.click()

    expect(document.querySelector('#octal-input')?.value).toBe('644')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rw-r--r--'
    )
    expect(preset.classList.contains('is-active')).toBe(true)
  })

  it('accepts typed octal input', () => {
    const input = document.querySelector('#octal-input')
    input.value = '600'
    input.dispatchEvent(new Event('input', { bubbles: true }))

    expect(document.querySelector('.cmd-mode')?.textContent).toBe('600')
    expect(
      document.querySelector('#user-read')?.classList.contains('is-on')
    ).toBe(true)
    expect(
      document.querySelector('#user-write')?.classList.contains('is-on')
    ).toBe(true)
    expect(
      document.querySelector('#user-execute')?.classList.contains('is-on')
    ).toBe(false)
    expect(
      document.querySelector('#group-read')?.classList.contains('is-on')
    ).toBe(false)
  })

  it('updates the command filename', () => {
    const fileInput = document.querySelector('#filename-input')
    fileInput.value = 'deploy.sh'
    fileInput.dispatchEvent(new Event('input', { bubbles: true }))

    expect(document.querySelector('.cmd-file')?.textContent).toBe('deploy.sh')
  })

  it('reveals special bits and toggles setuid', () => {
    document.querySelector('#special-toggle').click()
    const setuid = document.querySelector('[data-special="setuid"]')
    expect(setuid).toBeTruthy()

    setuid.click()
    expect(document.querySelector('#octal-input')?.value).toBe('4755')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rwsr-xr-x'
    )
  })
})
