import { AuthLayout } from '@pages/layouts/AuthLayout'

const Dashboard: React.FC = () => {
  return (
    <div className="align-center-row gap-2 my-5">
      <p>Welcome to Dashboard</p>
    </div>
  )
}

export default AuthLayout(Dashboard)
