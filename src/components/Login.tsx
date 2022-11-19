import PocketBase from 'pocketbase'
import { LoginMethods } from './LoginMethods'

const client = new PocketBase('http://127.0.0.1:8090')

export default function Login() {
  return <LoginMethods client={client} />
}
