from typing import AsyncIterator
from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.__dev_only.db.get import get_all

# from src.lib.etc import wrap_async
from src.decorators.err import ErrAPI
from src.lib.logger import clg

# from src.lib.s3.ce import get_cost
from src.lib.s3.get import gen_list_assets
from src.middleware.cors import CorsMDW
from src.middleware.form_data_parser import FormDataParser
from src.middleware.json_logger import LoggerJSON
from src.middleware.wrap_api import WrapAPI
from src.routes.index import api
from .middleware.query_parser import ParserQuery
from src.conf.env import env_var
from fastapi.middleware.cors import CORSMiddleware
from .constants.api import whitelist


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    clg(ttl=f"🚀 server running on {env_var.port}...")

    await get_all()
    await gen_list_assets()

    print("⬜ whitelist ⬜".center(13 + 6, " ").center(13 + 10 * 3, "—"))
    print(whitelist)

    if not whitelist:
        raise ErrAPI(msg="☢️ missing whitelist var", status=500)

    yield

    clg(ttl="💣 server shutting down")


app = FastAPI(lifespan=lifespan)

# wrap_async(get_cost)

app.add_middleware(LoggerJSON)
app.add_middleware(ParserQuery)
app.add_middleware(FormDataParser)
app.add_middleware(WrapAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=whitelist,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(CorsMDW, whitelist=whitelist)

app.include_router(router=api)
