import fs from 'fs/promises'
import { createClient } from '@supabase/supabase-js'

async function loadEnv(path = '.env.local') {
  try {
    const txt = await fs.readFile(path, 'utf8')
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
      if (!m) continue
      const [, k, vRaw] = m
      const v = vRaw.replace(/^"|"$/g, '')
      process.env[k] = v
    }
    console.log(`Loaded env from ${path}`)
  } catch (err) {
    console.log(`No env file at ${path}, using environment variables if present.`)
  }
}

async function main() {
  await loadEnv()
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || ''
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || ''

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment values.')
    process.exit(2)
  }

  console.log('Checking Supabase REST endpoint...')
  try {
    const url = new URL('/rest/v1/', SUPABASE_URL).toString()
    const res = await fetch(url, { method: 'GET', headers: { apikey: SUPABASE_ANON_KEY } })
    console.log('REST endpoint response:', res.status, res.statusText)
    const text = await res.text()
    console.log('Response body (first 1k chars):', text.slice(0, 1000))
  } catch (err) {
    console.error('REST check failed:', err.message)
  }

  console.log('\nChecking via supabase-js client (sample .from call)...')
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data, error, status } = await supabase.from('nonexistent_table_for_checking').select('*').limit(1)
    console.log('Client query status:', status)
    if (error) console.log('Client query error:', error.message)
    else console.log('Client query data:', data)
  } catch (err) {
    console.error('Client check failed:', err.message)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
