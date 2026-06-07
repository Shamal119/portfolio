import { render, screen } from '@testing-library/react'
import { beforeAll, describe, it, expect, vi } from 'vitest'
import App from '../../App'

beforeAll(() => {
  // Mock IntersectionObserver
  class MockObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  global.IntersectionObserver = MockObserver

  // Mock matchMedia
  // @ts-ignore
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

describe('HomePage', () => {
  it('renders hero heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /building aithat works/i })).toBeTruthy()
  })
})
