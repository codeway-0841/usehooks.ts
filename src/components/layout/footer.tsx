import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'

import { useSiteMetadata } from '~/hooks'
import { reduceLayoutWidth } from './styleUtils'

interface PropTypes {
  isSidebarOpened: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,

    ...reduceLayoutWidth(theme),
  },
}))

function Footer(props: PropTypes) {
  const classes = useStyles(props)
  const { author } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" align="center">
          Made with ❤️ by
          {` `}
          <Link
            href={`http://github.com/${author}`}
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            {author}
          </Link>
          <Hidden xsDown>
            , built using{' '}
            <Link
              href="https://www.typescriptlang.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Typescript
            </Link>{' '}
            and{' '}
            <Link
              href="https://www.gatsbyjs.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Gatsby
            </Link>{' '}
            and hosted on
            {` `}
            <Link
              href="https://www.netlify.com/"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </Link>
          </Hidden>
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
