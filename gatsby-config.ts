import path from "path";

import config from "./content/config.json";
import * as types from "./internal/gatsby/types";

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

export default {
  pathPrefix: config.pathPrefix,
  trailingSlash: "always",
  siteMetadata: {
    url: config.url,
    menu: config.menu,
    title: config.title,
    author: config.author,
    subtitle: config.subtitle,
    copyright: config.copyright,
    postsLimit: config.postsLimit,
    disqusShortname: config.disqusShortname,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve("content"),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: {
                site: {
                  siteMetadata: {
                    url: string;
                  };
                };
                allMarkdownRemark: {
                  edges: Array<types.Edge>;
                };
              };
            }) =>
              allMarkdownRemark.edges.map(({ node }) => ({
                ...node.frontmatter,
                date: node?.frontmatter?.date,
                description: node?.frontmatter?.description,
                url:
                  site.siteMetadata.url +
                  (node.frontmatter?.slug || node.fields?.slug),
                guid:
                  site.siteMetadata.url +
                  (node.frontmatter?.slug || node.fields?.slug),
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `{
                allMarkdownRemark(
                  limit: 1000
                  sort: {frontmatter: {date: DESC}}
                  filter: {frontmatter: {template: {eq: "post"}, draft: {ne: true}}}
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        date
                        title
                        slug
                        description
                      }
                    }
                  }
                }
              }`,
            output: "/rss.xml",
            title: config.title,
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // gatsby-remark-relative-images must go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              // [Optional] The root of "media_folder" in your config.yml
              // Defaults to "static"
              staticFolderName: "static",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              withWebp: true,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin-bottom: 1.0725rem" },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    "gatsby-plugin-netlify-cms",
    // {
    //   resolve: "gatsby-plugin-google-gtag",
    //   options: {
    //     trackingIds: [config.googleAnalyticsId],
    //     pluginConfig: {
    //       head: true,
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.title,
        theme_color: "hsl(31, 92%, 62%)",
        background_color: "hsl(0, 0%, 100%)",
        icon: "content/icon.png",
        display: "standalone",
        start_url: "/",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|[^:]static\/)/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "StaleWhileRevalidate",
            },
          ],
        },
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.BLOG_S3_BUCKET,
        acl: null,
        protocol: "https",
        hostname: process.env.BLOG_HOSTNAME,
      },
    },
  ],
};
