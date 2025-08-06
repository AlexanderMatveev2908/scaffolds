from pathlib import Path
from tomlkit import parse, dumps, document, table, inline_table

conf_p = Path("pyproject.toml")

# 1. Load or create the top‐level TOML document
if not conf_p.exists():
    print("📄 No pyproject.toml found, creating new one...")
    doc = document()
else:
    print("📄 Found existing pyproject.toml, updating...")
    doc = parse(conf_p.read_text())

# 2. [project]
project_table = doc.get("project")
if project_table is None:
    project_table = table()
    doc["project"] = project_table
project_table["requires-python"] = ">=3.12,<4.0"

# 3. [tool]
tool_table = doc.get("tool")
if tool_table is None:
    tool_table = table()
    doc["tool"] = tool_table

# 4. [tool.black]
black_table = tool_table.get("black")
if black_table is None:
    black_table = table()
    tool_table["black"] = black_table
black_table["line-length"] = black_table.get("line-length", 79)
black_table["target-version"] = black_table.get("target-version", ["py312"])

# 5. [tool.flake8]
flake8_table = tool_table.get("flake8")
if flake8_table is None:
    flake8_table = table()
    tool_table["flake8"] = flake8_table
flake8_table["ignore"] = flake8_table.get("ignore", ["E203"])
flake8_table["max-line-length"] = flake8_table.get("max-line-length", 79)

# 6. [tool.ruff]
ruff_table = tool_table.get("ruff")
if ruff_table is None:
    ruff_table = table()
    tool_table["ruff"] = ruff_table
ruff_table["ignore"] = ruff_table.get("ignore", ["E203"])
ruff_table["line-length"] = ruff_table.get("line-length", 79)

# 7. [tool.mypy]
mypy_table = tool_table.get("mypy")
if mypy_table is None:
    mypy_table = table()
    tool_table["mypy"] = mypy_table

mypy_defaults = {
    "python_version": "3.12",
    "mypy_path": ["src"],
    "ignore_missing_imports": True,
    "disallow_untyped_defs": True,
    "no_implicit_optional": True,
    "warn_unused_ignores": True,
    "show_error_codes": True,
    "plugins": ["sqlalchemy.ext.mypy.plugin"],
}

for key, default in mypy_defaults.items():
    if mypy_table.get(key) is None:
        mypy_table[key] = default

# 8. [tool.poetry] → inline array of tables for packages
poetry_table = tool_table.get("poetry")
if poetry_table is None:
    poetry_table = table()
    tool_table["poetry"] = poetry_table

# Only add if missing
if poetry_table.get("packages") is None:
    pkg = inline_table()
    pkg["include"] = "src"
    pkg["from"] = "."
    poetry_table["packages"] = [pkg]

# 9. Write it back out
conf_p.write_text(dumps(doc))
print("✅ updated pyproject.toml")
