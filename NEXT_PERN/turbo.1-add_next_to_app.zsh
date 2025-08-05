add_next_to_app(){

 rm -rf apps/client/

 yarn dlx create-next-app@latest apps/client \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --no-turbo \
  --bundler webpack \
  --src-dir \
  --import-alias="@/*" \
  --no-interactive

  yarn workspace client add @emotion/react @emotion/styled @hookform/resolvers @reduxjs/toolkit axios dompurify lucide-react framer-motion mime-types react-icons react-redux uuid zod react-hook-form
  yarn workspace client add -D tsx @types/node sass @types/mime-types

  rm -rf apps/client/public/{*,.*}(N) apps/client/src/app/favicon.ico \
    apps/client/src/app/globals.css

  copy_content /home/ninja/.config/zsh/aliases/NEXT_PERN/src/client/root apps/client/
  copy_content /home/ninja/.config/zsh/aliases/NEXT_PERN/src/client/src apps/client/src/
}
