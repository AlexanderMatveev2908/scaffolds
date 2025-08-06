PFN_remove_dir(){
    rm -rf $1/{*,.*,(.|..)}(N)
}

copy_content(){
    yes | cp -r $1/{*,.*,(.|..)}(N) $2
}
