export default function Login() {
  return (
    <div className="container-responsive py-12 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
        <input type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
        <button className="w-full rounded-md bg-red-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-red-600">Sign In</button>
      </form>
    </div>
  )
}
