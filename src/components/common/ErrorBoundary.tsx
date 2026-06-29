import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[CartRush] Unhandled render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-[var(--color-background)]">
          <p className="text-5xl">😵</p>
          <p className="font-bold text-[var(--color-text)] text-lg">Qualcosa è andato storto</p>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
            {this.state.error.message || 'Errore inaspettato'}
          </p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.href = '/' }}
            className="mt-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-sm font-medium"
          >
            Torna alla home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
