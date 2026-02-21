import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://nykdqlqpmgdyqumstbfu.supabase.co'
// Row Level Security needs to be enabled to use the securly use expose the supabase Anon key
const supabaseKey = 'sb_publishable_vxTqoYcbOJJzFP8tnaV5yA_P9QGcK4V'

// CREATE CLIENT
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
