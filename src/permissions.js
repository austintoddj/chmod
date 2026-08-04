/** Permission bit values (Unix rwx). Internal to this module. */
const PERM_VALUES = {
  read: 4,
  write: 2,
  execute: 1
}

export const PERM_LETTERS = {
  read: 'r',
  write: 'w',
  execute: 'x'
}

export const ROLES = ['user', 'group', 'other']
export const PERMS = ['read', 'write', 'execute']

export const ROLE_LABELS = {
  user: { title: 'User', hint: 'The owner of the file' },
  group: { title: 'Group', hint: 'Users in the file’s group' },
  other: { title: 'Other', hint: 'Everyone else' }
}

export const PERM_LABELS = {
  read: {
    title: 'Read',
    short: 'r',
    hint: 'View file contents or list a directory'
  },
  write: {
    title: 'Write',
    short: 'w',
    hint: 'Modify the file or create/delete in a directory'
  },
  execute: {
    title: 'Execute',
    short: 'x',
    hint: 'Run as a program or enter a directory'
  }
}

export const PRESETS = [
  { octal: '644', label: '644', desc: 'Typical file' },
  { octal: '664', label: '664', desc: 'Shared file' },
  { octal: '600', label: '600', desc: 'Private file' },
  { octal: '755', label: '755', desc: 'Executable' },
  { octal: '750', label: '750', desc: 'Group binary' },
  { octal: '700', label: '700', desc: 'Private bin' },
  { octal: '777', label: '777', desc: 'Wide open' },
  { octal: '000', label: '000', desc: 'No access' }
]

export const STRENGTH = {
  strong: {
    label: 'Strong',
    detail: 'Only the owner can write — a solid default for most files.'
  },
  moderate: {
    label: 'Moderate',
    detail:
      'The group can write. Fine for shared work, risky on multi-user systems.'
  },
  weak: {
    label: 'Weak',
    detail:
      'Anyone can write. Usually a mistake outside throwaway scratch dirs.'
  }
}

/**
 * @returns {{ user: RoleBits, group: RoleBits, other: RoleBits }}
 * @typedef {{ read: boolean, write: boolean, execute: boolean }} RoleBits
 * @typedef {{ setuid: boolean, setgid: boolean, sticky: boolean }} SpecialBits
 */
export function emptyBits() {
  return {
    user: { read: false, write: false, execute: false },
    group: { read: false, write: false, execute: false },
    other: { read: false, write: false, execute: false }
  }
}

/** Default mode: 755 (rwxr-xr-x). */
export function defaultBits() {
  return {
    user: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    other: { read: true, write: false, execute: true }
  }
}

/** @returns {SpecialBits} */
export function emptySpecial() {
  return { setuid: false, setgid: false, sticky: false }
}

/** @param {RoleBits} role */
export function roleOctal(role) {
  return (
    (role.read ? PERM_VALUES.read : 0) +
    (role.write ? PERM_VALUES.write : 0) +
    (role.execute ? PERM_VALUES.execute : 0)
  )
}

/**
 * @param {{ user: RoleBits, group: RoleBits, other: RoleBits }} bits
 * @param {SpecialBits} [special]
 * @returns {string}
 */
export function bitsToOctal(bits, special = emptySpecial()) {
  const base =
    String(roleOctal(bits.user)) +
    String(roleOctal(bits.group)) +
    String(roleOctal(bits.other))

  const specialVal =
    (special.setuid ? 4 : 0) +
    (special.setgid ? 2 : 0) +
    (special.sticky ? 1 : 0)

  return specialVal > 0 ? String(specialVal) + base : base
}

/**
 * @param {string | number} octal
 * @returns {{ bits: ReturnType<typeof emptyBits>, special: SpecialBits } | null}
 */
export function octalToBits(octal) {
  const cleaned = String(octal).replace(/\D/g, '')
  if (!cleaned) return null

  let special = emptySpecial()
  let digits = cleaned

  if (digits.length === 4) {
    const s = parseInt(digits[0], 10)
    if (Number.isNaN(s) || s > 7) return null
    special = {
      setuid: Boolean(s & 4),
      setgid: Boolean(s & 2),
      sticky: Boolean(s & 1)
    }
    digits = digits.slice(1)
  }

  if (digits.length !== 3) return null
  if (![...digits].every(d => d >= '0' && d <= '7')) return null

  const parseRole = n => ({
    read: Boolean(n & 4),
    write: Boolean(n & 2),
    execute: Boolean(n & 1)
  })

  return {
    bits: {
      user: parseRole(parseInt(digits[0], 10)),
      group: parseRole(parseInt(digits[1], 10)),
      other: parseRole(parseInt(digits[2], 10))
    },
    special
  }
}

/**
 * @param {{ user: RoleBits, group: RoleBits, other: RoleBits }} bits
 * @param {SpecialBits} [special]
 * @returns {string}
 */
export function bitsToSymbolic(bits, special = emptySpecial()) {
  const letter = (role, perm, specialLetter) => {
    if (!role[perm]) {
      if (perm === 'execute' && specialLetter)
        return specialLetter.toUpperCase()
      return '-'
    }
    if (perm === 'execute' && specialLetter) return specialLetter
    return PERM_LETTERS[perm]
  }

  const user =
    letter(bits.user, 'read') +
    letter(bits.user, 'write') +
    letter(bits.user, 'execute', special.setuid ? 's' : null)

  const group =
    letter(bits.group, 'read') +
    letter(bits.group, 'write') +
    letter(bits.group, 'execute', special.setgid ? 's' : null)

  const other =
    letter(bits.other, 'read') +
    letter(bits.other, 'write') +
    letter(bits.other, 'execute', special.sticky ? 't' : null)

  return `-${user}${group}${other}`
}

/**
 * @param {string} entity
 * @param {string | number} digit
 * @returns {string}
 */
export function accessPhrase(entity, digit) {
  switch (String(digit)) {
    case '1':
      return `${entity} can execute`
    case '2':
      return `${entity} can write`
    case '3':
      return `${entity} can write and execute`
    case '4':
      return `${entity} can read`
    case '5':
      return `${entity} can read and execute`
    case '6':
      return `${entity} can read and write`
    case '7':
      return `${entity} can read, write, and execute`
    default:
      return `${entity} has no access`
  }
}

/**
 * @param {string | number} octal
 * @returns {string}
 */
export function humanReadable(octal) {
  const digits = String(octal).replace(/\D/g, '')
  const base = digits.length === 4 ? digits.slice(1) : digits
  if (base.length !== 3) return 'Enter a valid permission mode.'

  return (
    `The ${accessPhrase('owner', base[0])}, the ${accessPhrase('group', base[1])}, ` +
    `and ${accessPhrase('everyone else', base[2])}.`
  )
}

/**
 * @param {{ user: RoleBits, group: RoleBits, other: RoleBits }} bits
 * @returns {'strong' | 'moderate' | 'weak'}
 */
export function permissionStrength(bits) {
  if (bits.other.write) return 'weak'
  if (bits.group.write) return 'moderate'
  return 'strong'
}

/**
 * Build a ready-to-run chmod command string.
 * @param {string} octal
 * @param {string} [filename]
 * @returns {string}
 */
export function chmodCommand(octal, filename = 'filename') {
  const target = filename.trim() || 'filename'
  return `chmod ${octal} ${target}`
}
