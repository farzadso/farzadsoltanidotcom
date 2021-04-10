import Container from './container'
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28">
          <h4 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Find me
          </h4>
          <div className="mt-4">
            <h4>
              Looking for a job? Have an enquiry?
              <br/>
              Send me an email:
            </h4>
            <div className="mt-2">
              <a
                href="mailto:farzad.au@gmail.com"
                className="mt-28 font-bold hover:underline"
              >
                farzad.au@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-4">
            <SocialIcon url="https://twitter.com/farzadso" className="mr-2" style={{ height: 40, width: 40 }} />
            <SocialIcon url="https://www.linkedin.com/in/farzad-soltani" style={{ height: 40, width: 40 }} />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
