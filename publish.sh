BASE_DIR=$1
TMP_DIR=/tmp/blog_build
rm -rf dist .astro node_modules/.astro && \
    mkdir -p /tmp/blog_build && \
    obsidian-export --publish-only --ignore-file "${BASE_DIR}/.export-ignore" "${BASE_DIR}" "${TMP_DIR}" && \
    cp -r "${BASE_DIR}/projects" "${TMP_DIR}" && \
    CONTENT_PATH_BASE="${TMP_DIR}" pnpm build && \
    rm -rf "${TMP_DIR}"
