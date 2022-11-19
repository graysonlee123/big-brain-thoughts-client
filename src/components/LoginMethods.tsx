import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

interface LoginMethodsProps {
  client: any
}

export function LoginMethods({ client }: LoginMethodsProps) {
  const [providers, setProviders] = useState<any[]>([])

  useEffect(() => {
    async function getAuthMethods() {
      const env = window ? 'client' : 'server'

      try {
        console.log('Loading providers...')
        const methods = await client.users.listAuthMethods({
          $cancelKey: env,
        })
        console.log('Loaded providers.')
        const providers = methods.authProviders

        setProviders(providers)
      } catch (error) {
        setProviders([])
        if (error.isAbort) {
          console.warn(
            'Getting auth providers was cancelled, most likely due to PocketBook auto-cancellation:',
            error
          )
        } else {
          console.error('Error getting auth providers:', error)
        }
      }
    }

    getAuthMethods()

    return function () {
      console.log('Cleanup')
      client.cancelAllRequests()
    }
  }, [client.users])

  function handleClick(provider: any) {
    localStorage.setItem('provider', JSON.stringify(provider))
  }

  return (
    <div>
      {providers ? (
        providers.map((provider) => (
          <Fragment key={provider.state}>
            <div>
              <p>{provider.name}</p>
              <Link
                href={provider.authUrl + 'http://127.0.0.1:3000/redirect'}
                onClick={() => handleClick(provider)}
              >
                Login
              </Link>
            </div>
          </Fragment>
        ))
      ) : (
        <p>Loading login methods...</p>
      )}
    </div>
  )
}
