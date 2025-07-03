### User Authorization
Muss auf jeder Seite, die geschützt werden soll, eingebaut werden.

```ts
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const supabase = await createClient()

const { data, error } = await supabase.auth.getUser()
if (error || !data?.user) {
    redirect('/login')
}
```