import Link from 'next/link'
import PocketBase from 'pocketbase'

const client = new PocketBase('http://127.0.0.1:8090')

export function Navbar() {
  function handleLogout() {
    client.authStore.clear()
    localStorage.removeItem('provider')
  }

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  )
}
