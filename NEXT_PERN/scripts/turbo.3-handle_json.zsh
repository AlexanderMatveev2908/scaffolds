append_dep() {
  local p="apps/${1}/package.json"
  [[ -f "$p" ]] || {
    echo "⚠️  $p does not exist. Skipping."
    return
  }



  jq '.dependencies["@shared/first"] = "*"' "$p" > "$p.tmp" \
    && mv "$p.tmp" "$p"
}

handle_json(){
  append_dep "client"
  append_dep "server"

  jq '.type = "module"' apps/server/package.json > temp.json && mv temp.json apps/server/package.json


  find . -name package.json -not -path '*/node_modules/*' -exec sh -c '
    for f; do
      jq ".license = \"UNLICENSED\"" "$f" > "$f.tmp" && mv "$f.tmp" "$f"
    done
  ' sh {} +

  jq '.scripts += {
  "setup-workspace": "yarn workspace @shared/first build",
    "dev": "concurrently -k --kill-others-on-fail -n \"📦 SHARED\",\"⚔️  SERVER\",\"🛠️  CLIENT\" -c magenta,green,blue   \"yarn workspace @shared/first dev\"   \"sleep 1 && yarn workspace server dev\"   \"sleep 2.5 && yarn workspace client dev\"",
    "build": "yarn workspace @shared/first build && yarn dlx prisma generate --schema=./apps/server/prisma/schema.prisma && turbo build --parallel",
    "start": "turbo run start",
    "check": "turbo check"
}' package.json > package.tmp.json && \
mv package.tmp.json package.json

jq '.scripts += { 
    "build": "tsc --build",
    "check": "tsc --noEmit",
    "dev": "tsc --watch",
    "start": "tsc --build"
 }' packages/shared/package.json > tmp && \
mv tmp packages/shared/package.json

jq '.scripts += {
    "dev": "nodemon --watch src --ext ts --exec tsx src/server.ts",
    "build": "tsc --build && tsc-alias -p tsconfig.json",
    "start": "node dist/server.js",
    "check": "tsc --noEmit"
}' apps/server/package.json > tmp && \
mv tmp apps/server/package.json

jq '.scripts += {
    "dev": "sass --watch src/styles/globals.scss src/styles/globals.css --no-source-map & next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "check": "next lint && tsc --noEmit",
}' apps/client/package.json > tmp && \
mv tmp apps/client/package.json

}
