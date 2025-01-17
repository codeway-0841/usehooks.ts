import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { graphql } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { PageTemplate, Post } from '~/models'
import SEO from '~/components/seo'
import MdxRenderer from '~/components/mdxRenderer'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  title: {
    margin: theme.spacing(3, 0),
    wordBreak: 'break-all',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(6, 0, 4),
    },
  },
  subtitle: {
    margin: theme.spacing(4, 0, 2),
    wordBreak: 'break-all',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  meta: {
    flexGrow: 1,
    textAlign: 'center',
    margin: theme.spacing(6, 0),
  },
  metaValue: {
    fontFamily: 'Fira Code, monospace',
  },
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    id: string
    hookId: string
    demoId: string
  }
  data: {
    post: Post
    hook?: {
      body: string
    }
    demo?: {
      body: string
    }
  }
}

function PostTemplate({ location, data }: PostTemplateProps) {
  const classes = useStyles()
  const { post, hook, demo } = data
  const { body, excerpt, frontmatter } = post
  const title = `${frontmatter.title}()`
  const date = formatDistanceToNow(new Date(frontmatter.date), {
    addSuffix: true,
  })

  return (
    <Container className={classes.root} maxWidth="md">
      <SEO title={title} description={excerpt} location={location} />

      <Typography variant="h2" component="h1" className={classes.title}>
        {title}
      </Typography>

      <MdxRenderer body={body} />

      {hook && (
        <>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            The Hook
          </Typography>
          <MdxRenderer body={hook.body} />
        </>
      )}

      {demo && (
        <>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            Usage
          </Typography>
          <MdxRenderer body={demo.body} />
        </>
      )}

      <Box className={classes.meta}>
        <Grid container alignItems="center" alignContent="center" spacing={3}>
          <Grid item xs={12} md>
            <Typography variant="body1" align="center">
              Created:
              <br />
              {date}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!, $hookId: String!, $demoId: String!) {
    post: mdx(id: { eq: $id }) {
      ...Post
    }
    hook: mdx(id: { eq: $hookId }) {
      body
    }
    demo: mdx(id: { eq: $demoId }) {
      body
    }
  }
`
