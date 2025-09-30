rm -rf dist .astro node_modules/.astro && \
    mkdir ~/.cache/blog && obsidian-export --publish-only ~/vaults/nichijou ~/.cache/blog && \
    CONTENT_PATH_BASE=~/.cache/blog pnpm build && \
    rm -rf ~/.cache/blog
