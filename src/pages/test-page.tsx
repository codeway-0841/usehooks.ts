import React from 'react'
import { navigate } from 'gatsby'

import Container from '@material-ui/core/Container'

import SEO from '~/components/seo'
import Hero from '~/components/hero'
import { PageTemplate } from '~/models'

/**
 * I use this page for testing my hooks,
 * it does not appear in production.
 *
 * The hook is implemented in the "Component" comp,
 * and called below in the "TestPage" page.
 */

// Usage
function Component() {
  return <div>Example</div>
}

function TestPage({ location }: PageTemplate) {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    navigate('/')
  }

  return (
    <>
      <SEO title="Tests page" location={location} />

      <Hero
        title="Tests page"
        description="I use this page for testing my hooks, it does not appear in production."
      />

      <Container maxWidth="md">
        <Component />
      </Container>
    </>
  )
}

export default TestPage
