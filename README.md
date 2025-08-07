# 🧪 Scaffolds Repo

The scaffolds in this repository were originally created as personal helpers to avoid repetitive setup tasks — such as configuring apps, managing faster deployments, and wiring full-stack components together.

Because I work daily on Linux distributions like **Ubuntu** and **Manjaro**, the included scripts rely on **Unix/Linux-only tools**. Running them on environments like **PowerShell** will likely crash immediately unless you replace system-specific commands and libraries with Windows-compatible ones.

---

## 🗃️ Setup Directories

Before running any script, it's important to properly set up the source folders.  
Inside each scaffold (e.g., `NEXT_PERN` or `PFN`), you'll find a `src` folder that contains boilerplate files for:

- `tsconfig.json`
- Redux store setup
- Dockerfile
- And other common base config

Initially, I built the scaffolds using `EOF` blocks in Unix, but I later found it more efficient to just copy existing boilerplate code — since most of it can be reused across many projects.

---

### 📂 Expected Folder Structure

When you run:

```bash
pwd
```

The scripts expect the scaffold folders to be located at:

```bash
/home/ninja/.config/zsh/aliases/NEXT_PERN
```

or

```bash
/home/ninja/.config/zsh/aliases/PFN
```

Replace **ninja** with your own Linux username.

You can either place the scaffold in the expected path manually, or just copy it anywhere and use VS Code’s global search & replace:

1. Hit CTRL + SHIFT + F
2. Paste one of the paths above
3. Replace all occurrences in one go

### 🛠️ Shared Scripts

The `shared_scripts` folder contains utility functions that are used by both scaffolds.

Whenever you copy a scaffold (`NEXT_PERN` or `PFN`), make sure to also copy `shared_scripts` alongside it.  
These shared helpers are required for the scaffold-specific commands to work properly.

## Result Preview 📦

Each scaffold includes a **result/** folder so you can preview the final structure after running the setup.

You’ll find:

- Essential config files (e.g. `Dockerfile`, `tsconfig.json`, `pyproject.toml`)
- Preview output after installing dependencies or initializing the app

## ✨ Available Scaffolds

### 1. NEXT_PERN

A full-stack scaffold that uses **JavaScript** for both client and server:

- **Client:** [Next.js](https://nextjs.org/) • [Redux Toolkit](https://redux-toolkit.js.org/)
- **Server:** [Fastify](https://www.fastify.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)

---

### 2. PFN (PostgreSQL • FastAPI • Next.js)

A full-stack scaffold where the client is in **JavaScript** and the server is in **Python**:

- **Client:** [Next.js](https://nextjs.org/) • [Redux Toolkit](https://redux-toolkit.js.org/)
- **Server:** [FastAPI](https://fastapi.tiangolo.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)

---

Feel free to use, fork, or adapt them to build your own apps faster 🚀
