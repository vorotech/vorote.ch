# Define build argument for Node.js version
ARG NODE_VERSION=18

# Use Node.js base image (compatible with project requirement)
FROM mcr.microsoft.com/devcontainers/javascript-node:$NODE_VERSION

# Set working directory
WORKDIR /workspace

# Install Gatsby CLI globally for convenience
RUN npm install -g gatsby-cli

# Install commitlint globally for convenience
RUN npm install -g @commitlint/cli

# Set correct user
USER node
