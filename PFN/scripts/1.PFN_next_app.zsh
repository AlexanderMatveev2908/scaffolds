PFN_next_app(){

    mkdir -p apps/client

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

  PFN_remove_dir apps/client/public
  PFN_remove_dir apps/client/src

  copy_content /home/ninja/.config/zsh/aliases/PFN/src/client/root apps/client/
  copy_content /home/ninja/.config/zsh/aliases/PFN/src/client/src apps/client/src/
  cp -r /home/ninja/.config/zsh/aliases/PFN/src/client/favicon.svg apps/client/public/


  local f
  f=apps/client/package.json

  jq '. + {
  "scripts": {
    "install_pkg": "yarn install",
    "dev":   "sass --watch src/styles/globals.scss src/styles/globals.css --no-source-map & next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint":  "next lint",
    "check": "next lint && tsc --noEmit"
    }
  }' "$f" > tmp && mv tmp "$f"


  echo "✅ setup next app"
}