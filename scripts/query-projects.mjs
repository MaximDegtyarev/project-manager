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

  const table = 'projects'
  console.log(`Querying table: ${table} (limit 10)`)
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data, error, status } = await supabase.from(table).select('*').limit(10)
    console.log('Status:', status)
    if (error) {
      console.error('Error:', error)
      process.exit(1)
    }
    console.log('Returned rows (up to 10):')
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Query failed:', err.message)
    process.exit(1)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
