from fastapi import FastAPI
import uvicorn

from contextlib import asynccontextmanager

class AbstractModel(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)
    

@asynccontextmanager
async def lifespan(_: FastAPI):
    AbstractModel.create_all()
    yield
    print("session ended")


app = FastAPI(
    title="NotesCube",
    lifespan=lifespan
)


@app.get("/home")
async def get_home():
    ...
    

if __name__ == "__main__":
    uvicorn.run("main:app", hosh="localhost", port=8080, reload=True)
