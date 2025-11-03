rm -rf dist .astro node_modules/.astro && \
    mkdir -p /tmp/blog_build && obsidian-export --publish-only --ignore-file ~/vaults/nichijou/.export-ignore ~/vaults/nichijou /tmp/blog_build && \
    CONTENT_PATH_BASE=/tmp/blog_build pnpm build && \
    rm -rf /tmp/blog_build
