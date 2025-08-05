from pydantic import Field
from pydantic_settings import BaseSettings


class EnvVar(BaseSettings):
    # __ I pass also client env cause I copy paste them in every environment
    #  __ so I do not lost pieces during road

    app_name: str = Field(..., alias="APP_NAME")

    # __ client stuff
    next_public_env: str | None = Field(None, alias="NEXT_PUBLIC_ENV")
    next_public_back_url: str | None = Field(
        None, alias="NEXT_PUBLIC_BACK_URL"
    )
    next_public_back_url_dev: str | None = Field(
        None, alias="NEXT_PUBLIC_BACK_URL_DEV"
    )
    next_public_front_url: str | None = Field(
        None, alias="NEXT_PUBLIC_FRONT_URL"
    )
    next_public_front_url_dev: str | None = Field(
        None, alias="NEXT_PUBLIC_FRONT_URL_DEV"
    )

    # __ my real env
    py_env: str = Field(..., alias="PY_ENV")
    port: int = Field(..., alias="PORT")

    # __ communication client
    front_url: str | None = Field(None, alias="FRONT_URL")
    front_url_dev: str | None = Field(None, alias="FRONT_URL_DEV")

    #  __ AWS
    aws_access_key: str = Field(..., alias="AWS_ACCESS_KEY")
    aws_access_secret_key: str = Field(..., alias="AWS_ACCESS_SECRET_KEY")
    aws_region_name: str = Field(..., alias="AWS_REGION")
    aws_bucket_name: str = Field(..., alias="AWS_BUCKET_NAME")

    # __ database — currently using Supabase as host
    db_pwd: str = Field(..., alias="DB_PWD")
    db_url: str = Field(..., alias="DB_URL")

    # __ test only
    secret: str = Field(..., alias="SECRET")

    class Config:
        env_file = ".env"
        extra = "forbid"


env_var = EnvVar()  # type: ignore
