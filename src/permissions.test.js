import { describe, expect, it } from 'vitest'
import {
  accessPhrase,
  bitsToOctal,
  bitsToSymbolic,
  chmodCommand,
  defaultBits,
  emptyBits,
  emptySpecial,
  humanReadable,
  octalToBits,
  permissionStrength,
  roleOctal
} from './permissions.js'

describe('roleOctal', () => {
  it('sums rwx bit values', () => {
    expect(roleOctal({ read: true, write: true, execute: true })).toBe(7)
    expect(roleOctal({ read: true, write: true, execute: false })).toBe(6)
    expect(roleOctal({ read: true, write: false, execute: true })).toBe(5)
    expect(roleOctal({ read: true, write: false, execute: false })).toBe(4)
    expect(roleOctal({ read: false, write: true, execute: true })).toBe(3)
    expect(roleOctal({ read: false, write: true, execute: false })).toBe(2)
    expect(roleOctal({ read: false, write: false, execute: true })).toBe(1)
    expect(roleOctal({ read: false, write: false, execute: false })).toBe(0)
  })
})

describe('bitsToOctal', () => {
  it('defaults to 755', () => {
    expect(bitsToOctal(defaultBits())).toBe('755')
  })

  it('encodes common modes', () => {
    const bits = emptyBits()
    bits.user = { read: true, write: true, execute: false }
    bits.group = { read: true, write: false, execute: false }
    bits.other = { read: true, write: false, execute: false }
    expect(bitsToOctal(bits)).toBe('644')
  })

  it('prefixes special bits when set', () => {
    expect(
      bitsToOctal(defaultBits(), {
        setuid: true,
        setgid: false,
        sticky: false
      })
    ).toBe('4755')

    expect(
      bitsToOctal(defaultBits(), {
        setuid: false,
        setgid: true,
        sticky: false
      })
    ).toBe('2755')

    expect(
      bitsToOctal(defaultBits(), {
        setuid: false,
        setgid: false,
        sticky: true
      })
    ).toBe('1755')

    expect(
      bitsToOctal(defaultBits(), {
        setuid: true,
        setgid: true,
        sticky: true
      })
    ).toBe('7755')
  })

  it('omits a leading zero when no special bits are set', () => {
    expect(bitsToOctal(defaultBits(), emptySpecial())).toBe('755')
  })
})

describe('octalToBits', () => {
  it('parses 3-digit modes', () => {
    const parsed = octalToBits('644')
    expect(parsed).not.toBeNull()
    expect(bitsToOctal(parsed.bits, parsed.special)).toBe('644')
    expect(parsed.special).toEqual(emptySpecial())
  })

  it('parses 4-digit modes with special bits', () => {
    const cases = ['4755', '2755', '1755', '6777', '1000', '0000']
    for (const mode of cases) {
      const parsed = octalToBits(mode)
      expect(parsed, mode).not.toBeNull()
      // 0000 special-less collapses to 000 (no leading special digit)
      const expected =
        mode[0] === '0'
          ? mode.slice(1)
          : bitsToOctal(parsed.bits, parsed.special)
      if (mode[0] !== '0') {
        expect(bitsToOctal(parsed.bits, parsed.special)).toBe(mode)
      } else {
        expect(bitsToOctal(parsed.bits, parsed.special)).toBe(expected)
      }
    }
  })

  it('strips non-digits', () => {
    expect(octalToBits('mode 7-5-5')).not.toBeNull()
    expect(bitsToOctal(octalToBits('mode 7-5-5').bits)).toBe('755')
  })

  it('rejects invalid input', () => {
    expect(octalToBits('')).toBeNull()
    expect(octalToBits('75')).toBeNull()
    expect(octalToBits('75a')).toBeNull()
    expect(octalToBits('888')).toBeNull()
    expect(octalToBits('12')).toBeNull()
    expect(octalToBits('12345')).toBeNull()
  })

  it('round-trips all single-role digits 0–7', () => {
    for (let u = 0; u <= 7; u++) {
      for (let g = 0; g <= 7; g++) {
        for (let o = 0; o <= 7; o++) {
          const mode = `${u}${g}${o}`
          const parsed = octalToBits(mode)
          expect(bitsToOctal(parsed.bits, parsed.special)).toBe(mode)
        }
      }
    }
  })
})

describe('bitsToSymbolic', () => {
  it('renders default 755 as -rwxr-xr-x', () => {
    expect(bitsToSymbolic(defaultBits())).toBe('-rwxr-xr-x')
  })

  it('renders no access as ----------', () => {
    expect(bitsToSymbolic(emptyBits())).toBe('----------')
  })

  it('uses s/S for setuid and setgid', () => {
    expect(
      bitsToSymbolic(defaultBits(), {
        setuid: true,
        setgid: false,
        sticky: false
      })
    ).toBe('-rwsr-xr-x')

    const noExec = emptyBits()
    noExec.user.read = true
    expect(
      bitsToSymbolic(noExec, {
        setuid: true,
        setgid: false,
        sticky: false
      })
    ).toBe('-r-S------')
  })

  it('uses t/T for sticky', () => {
    expect(
      bitsToSymbolic(defaultBits(), {
        setuid: false,
        setgid: false,
        sticky: true
      })
    ).toBe('-rwxr-xr-t')

    const noOtherExec = octalToBits('754').bits
    expect(
      bitsToSymbolic(noOtherExec, {
        setuid: false,
        setgid: false,
        sticky: true
      })
    ).toBe('-rwxr-xr-T')
  })
})

describe('accessPhrase / humanReadable', () => {
  it('covers each digit phrase', () => {
    expect(accessPhrase('owner', 0)).toBe('owner has no access')
    expect(accessPhrase('owner', 1)).toBe('owner can execute')
    expect(accessPhrase('owner', 2)).toBe('owner can write')
    expect(accessPhrase('owner', 3)).toBe('owner can write and execute')
    expect(accessPhrase('owner', 4)).toBe('owner can read')
    expect(accessPhrase('owner', 5)).toBe('owner can read and execute')
    expect(accessPhrase('owner', 6)).toBe('owner can read and write')
    expect(accessPhrase('owner', 7)).toBe('owner can read, write, and execute')
  })

  it('describes 755 in plain language', () => {
    expect(humanReadable('755')).toBe(
      'The owner can read, write, and execute, the group can read and execute, and everyone else can read and execute.'
    )
  })

  it('uses the base digits of a 4-digit mode', () => {
    expect(humanReadable('4755')).toBe(humanReadable('755'))
  })

  it('handles invalid modes', () => {
    expect(humanReadable('7')).toBe('Enter a valid permission mode.')
  })
})

describe('permissionStrength', () => {
  it('is strong when only owner can write', () => {
    expect(permissionStrength(defaultBits())).toBe('strong')
    expect(permissionStrength(octalToBits('644').bits)).toBe('strong')
    expect(permissionStrength(octalToBits('600').bits)).toBe('strong')
  })

  it('is moderate when the group can write', () => {
    expect(permissionStrength(octalToBits('664').bits)).toBe('moderate')
    expect(permissionStrength(octalToBits('775').bits)).toBe('moderate')
  })

  it('is weak when others can write', () => {
    expect(permissionStrength(octalToBits('666').bits)).toBe('weak')
    expect(permissionStrength(octalToBits('777').bits)).toBe('weak')
  })

  it('prioritizes other-write over group-write', () => {
    expect(permissionStrength(octalToBits('662').bits)).toBe('weak')
  })
})

describe('chmodCommand', () => {
  it('builds a copy-ready command', () => {
    expect(chmodCommand('755', 'script.sh')).toBe('chmod 755 script.sh')
  })

  it('falls back to filename when blank', () => {
    expect(chmodCommand('644', '   ')).toBe('chmod 644 filename')
    expect(chmodCommand('644')).toBe('chmod 644 filename')
  })
})
