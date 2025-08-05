add_essential_to_shared(){
jq '. + { type: "module", exports: { "./*": "./dist/*" } }' \
  packages/shared/package.json > tmp && \
  mv tmp packages/shared/package.json

mkdir -p packages/shared/src
copy_content /home/ninja/.config/zsh/aliases/NEXT_PERN/src/shared/root packages/shared/
copy_content /home/ninja/.config/zsh/aliases/NEXT_PERN/src/shared/src packages/shared/src/

yarn workspace @shared/first add uuid zod
yarn workspace @shared/first add -D tsx typescript
}
