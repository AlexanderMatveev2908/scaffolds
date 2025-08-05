PFN_py_app(){
    mkdir -p apps/server/src && cd apps/server

    local proj_name 
    proj_name="${PWD##*/}"

    poetry init --name "$proj_name" --no-interaction --python ">=3.12,<4.0"

    poetry add --group dev mypy pyright watchfiles black ruff tomlkit 'sqlalchemy[mypy]' types-aiofiles &&
    poetry add attrs httpx python-dotenv fastapi 'uvicorn[standard]' gunicorn pydantic sqlmodel python-multipart aiofiles regex pydantic-settings 'sqlalchemy[asyncio]' asyncpg alembic psycopg2-binary aioboto3 types-aiobotocore-s3

    copy_content /home/ninja/.config/zsh/aliases/PFN/src/server/src src/ && \
    copy_content /home/ninja/.config/zsh/aliases/PFN/src/server/root ./

    poetry run python gen_toml.py

    cd ../../

    echo "✅ python setup"
}