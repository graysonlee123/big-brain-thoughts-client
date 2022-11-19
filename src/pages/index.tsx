import { Navbar } from '@components/Navbar'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Link href="/login">Login</Link>
    </div>
  )
}
