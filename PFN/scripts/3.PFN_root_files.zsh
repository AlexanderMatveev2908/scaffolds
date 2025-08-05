PFN_root_files(){
    copy_content /home/ninja/.config/zsh/aliases/PFN/src/root ./

    jq '. + {
    "scripts": {
    "install_pkg":"turbo install_pkg --parallel",
    "dev": "turbo dev --parallel",
    "build": "turbo build --parallel",
    "start": "turbo run start --parallel",
    "check": "turbo check --parallel"
      }
    }' package.json > tmp && mv tmp package.json


    yarn install

    echo "✅ setup root"
}