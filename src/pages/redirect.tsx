import { useEffect } from 'react'
import PocketBase from 'pocketbase'
import { Navbar } from '@components/Navbar'

const client = new PocketBase('http://127.0.0.1:8090')

export default function RedirectPage() {
  useEffect(() => {
    async function authenticate() {
      try {
        const storage = localStorage.getItem('provider')

        if (null === storage) return
        console.log('Got storage...')

        const provider = JSON.parse(storage)
        const params = new URL(window.location.href).searchParams
        const code = params.get('code')

        if (null === code) return
        console.log('Got code, authenticating with code:', code)

        const data = await client.users.authViaOAuth2(
          provider.name,
          code,
          provider.codeVerifier,
          'http://127.0.0.1:3000/redirect'
        )
        console.log(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    authenticate()
  }, [])

  return (
    <div>
      <Navbar />
      <p>Authenticate and redirect...</p>
    </div>
  )
}
