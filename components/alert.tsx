import Container from './container'
import cn from 'classnames'

type Props = {
  alert?: boolean
}

const Alert = ({ alert }: Props): JSX.Element => {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': alert,
        'bg-accent-1 border-accent-2': !alert,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          }
        </div>
      </Container>
    </div>
  )
}

export default Alert
