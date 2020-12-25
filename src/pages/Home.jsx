import NextWidget from '../widgets/Next'
import StatsWidget from '../widgets/Stats'

export default function Page() {
  return (
    <div className="HomePage">
      <NextWidget className="mt-5 mx-2" />
      <StatsWidget className="mt-5 mx-2" />
    </div>
  )
}
