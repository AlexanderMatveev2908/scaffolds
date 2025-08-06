PFN_prepare_env(){
    export CI=1
    export YARN_ENABLE_IMMUTABLE_INSTALLS=0

    corepack enable && \
    corepack prepare yarn@4.9.1 --activate && \
    yarn set version berry && \
    echo "nodeLinker: node-modules" > .yarnrc.yml

    yarn init -y
    yarn add -D turbo concurrently tsx 

    jq '. + { "workspaces": ["apps/*"] }' package.json > tmp \
    && mv tmp package.json

    echo "✅ setup env"
}