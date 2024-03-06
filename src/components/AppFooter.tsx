import { version } from '../../package.json'

export const AppFooter = () => (
  <footer className="py-6">
    <p className="text-neutral-400 text-sm">
      Made with love by{' '}
      <a className="hover:underline text-neutral-600" href="#">
        Martijn
      </a>{' '}
      - {new Date().getFullYear()} &copy;
    </p>
    <p className="font-mono text-xs text-neutral-400">v{version}</p>
  </footer>
)
