import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('JSON-LD', () => {
  it('describes the public calculator', () => {
    const html = readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )
    expect(match).toBeTruthy()

    const data = JSON.parse(match?.[1] ?? '') as {
      '@type': string
      'name': string
      'url': string
      'applicationCategory': string
      'offers': { price: string; priceCurrency: string }
    }

    expect(data['@type']).toBe('WebApplication')
    expect(data.name).toBe('What. The. Chmod.')
    expect(data.url).toBe('https://whatthechmod.vercel.app/')
    expect(data.applicationCategory).toBe('DeveloperApplication')
    expect(data.offers.price).toBe('0')
    expect(data.offers.priceCurrency).toBe('USD')
  })
})
