// app/page.jsx
import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"
import { AuthLayout } from "../components/auth/auth-layout"
import { AuthForm } from "../components/auth/auth-form"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AuthLayout>
          <AuthForm />
        </AuthLayout>
      </main>
      <Footer />
    </div>
  )
}