import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('calculator UI', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div id="app"></div>'
    vi.resetModules()
    await import('./main')
  })

  it('renders the calculator shell', () => {
    expect(document.querySelector('.title')?.textContent).toContain(
      'What. The. Chmod.'
    )
    expect(
      document.querySelector<HTMLInputElement>('#octal-input')?.value
    ).toBe('755')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rwxr-xr-x'
    )
    expect(document.querySelector('.cmd-mode')?.textContent).toBe('755')
  })

  it('credits the footer design to georgetownweb.co', () => {
    const credit = document.querySelector('.footer-credit')
    const designLink = document.querySelector<HTMLAnchorElement>(
      '.footer-credit a[href="https://georgetownweb.co"]'
    )

    expect(credit?.textContent).toMatch(/Design by/)
    expect(designLink).toBeTruthy()
    expect(designLink?.textContent).toBe('georgetownweb.co')
    expect(designLink?.rel).toContain('noopener')
  })

  it('toggles a permission bit and updates the octal', () => {
    const otherWrite = document.querySelector<HTMLButtonElement>('#other-write')
    expect(otherWrite?.getAttribute('aria-checked')).toBe('false')

    otherWrite?.click()

    expect(
      document.querySelector<HTMLInputElement>('#octal-input')?.value
    ).toBe('757')
    expect(document.querySelector('.strength')?.textContent).toMatch(/Weak/i)
  })

  it('applies a preset', () => {
    const preset = document.querySelector<HTMLButtonElement>(
      '[data-preset="644"]'
    )
    expect(preset).toBeTruthy()
    preset?.click()

    expect(
      document.querySelector<HTMLInputElement>('#octal-input')?.value
    ).toBe('644')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rw-r--r--'
    )
    expect(preset?.classList.contains('is-active')).toBe(true)
  })

  it('accepts typed octal input', () => {
    const input = document.querySelector<HTMLInputElement>('#octal-input')
    expect(input).toBeTruthy()
    input!.value = '600'
    input!.dispatchEvent(new Event('input', { bubbles: true }))

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
    const fileInput =
      document.querySelector<HTMLInputElement>('#filename-input')
    expect(fileInput).toBeTruthy()
    fileInput!.value = 'deploy.sh'
    fileInput!.dispatchEvent(new Event('input', { bubbles: true }))

    expect(document.querySelector('.cmd-file')?.textContent).toBe('deploy.sh')
  })

  it('selects the full filename on focus for easy overwrite', () => {
    const fileInput =
      document.querySelector<HTMLInputElement>('#filename-input')
    expect(fileInput).toBeTruthy()
    const select = vi.spyOn(fileInput!, 'select')

    fileInput!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(select).toHaveBeenCalled()
    select.mockRestore()
  })

  it('reveals special bits and toggles setuid', () => {
    document.querySelector<HTMLButtonElement>('#special-toggle')?.click()
    const setuid = document.querySelector<HTMLButtonElement>(
      '[data-special="setuid"]'
    )
    expect(setuid).toBeTruthy()

    setuid?.click()
    expect(
      document.querySelector<HTMLInputElement>('#octal-input')?.value
    ).toBe('4755')
    expect(document.querySelector('.stat-value')?.textContent).toBe(
      '-rwsr-xr-x'
    )
  })

  it('copies the chmod command', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })

    document.querySelector<HTMLButtonElement>('#copy-btn')?.click()
    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('chmod 755 filename')
      expect(
        document.querySelector('#copy-btn')?.classList.contains('is-copied')
      ).toBe(true)
    })
  })

  it('falls back to execCommand when clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('denied'))
      }
    })
    const exec = vi.fn().mockReturnValue(true)
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: exec
    })

    document.querySelector<HTMLButtonElement>('#copy-btn')?.click()
    await vi.waitFor(() => {
      expect(exec).toHaveBeenCalledWith('copy')
      expect(
        document.querySelector('#copy-btn')?.classList.contains('is-copied')
      ).toBe(true)
    })
  })

  it('commits typed octal on blur and Enter', () => {
    const input = document.querySelector<HTMLInputElement>('#octal-input')
    expect(input).toBeTruthy()
    input!.value = '64'
    input!.dispatchEvent(new Event('input', { bubbles: true }))
    input!.dispatchEvent(new FocusEvent('blur', { bubbles: true }))

    expect(input!.value).toBe('755')

    input!.value = '600'
    input!.dispatchEvent(new Event('input', { bubbles: true }))
    input!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    expect(document.querySelector('.cmd-mode')?.textContent).toBe('600')
  })

  it('restores a whitespace-only filename on blur', () => {
    const fileInput =
      document.querySelector<HTMLInputElement>('#filename-input')
    expect(fileInput).toBeTruthy()
    // Whitespace is truthy on input, so state keeps it until blur trims.
    fileInput!.value = '   '
    fileInput!.dispatchEvent(new Event('input', { bubbles: true }))
    fileInput!.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
    expect(fileInput!.value).toBe('filename')
    expect(document.querySelector('.cmd-file')?.textContent).toBe('filename')
  })
})
