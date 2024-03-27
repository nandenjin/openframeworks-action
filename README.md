# openframeworks-action

GitHub Action for openFrameworks setup & build

```yaml
# Download openFrameworks
- uses: nandenjin/openframeworks-action@v1
  with:
    command: setup-of

# Checkout your repo under `apps`
- uses: actions/checkout@v4
  with:
    path: 'apps/myRepo'

# Setup your project with projectGenerator
- uses: nandenjin/openframeworks-action@v1
  with:
    command: projectgenerator
    project_root: 'apps/myRepo/myApp'

# Build your project
- uses: nandenjin/openframeworks-action@v1
  with:
    command: build
    project_root: 'apps/myRepo/myApp'
```

## Inputs

| Name                    | Description                                   | Example             | Default              | On `setup-of` | On `projectgenerator` | On `build`  |
| ----------------------- | --------------------------------------------- | ------------------- | -------------------- | ------------- | --------------------- | ----------- |
| `command`               | The command to run                            |                     |                      | 🔴 Required   | 🔴 Required           | 🔴 Required |
| `of_version`            | The version of openFrameworks to download     | `0.12.0`            | `0.12.0`             | 🟢 Optional   |                       |             |
| `of_path`               | The path to the openFrameworks root directory | `path/to/of_root`   | `.`                  | 🟢 Optional   | 🟢 Optional           | 🟢 Optional |
| `project_root`          | The path to the project root directory        | `apps/myRepo/myApp` |                      |               | 🔴 Required           | 🔴 Required |
| `project_generator_dir` | The path to the projectGenerator directory    | `projectGenerator`  | `./projectGenerator` |               | 🟢 Optional           |             |

## Example

```yaml
jobs:
  build:
    strategy:
      matrix:
        os: [windows-latest, macos-latest]
    runs-on: ${{ matrix.os }}

    steps:
      # Download openFrameworks
      - name: Setup openFrameworks
        uses: nandenjin/openframeworks-action@v1
        with:
          command: setup-of
          of_version: 0.12.0

      # Checkout your repo under `apps`
      - uses: actions/checkout@v4
        with:
          path: 'apps/myRepo'

      # Setup your project with projectGenerator
      - name: Generate project
        uses: nandenjin/openframeworks-action@v1
        with:
          command: projectgenerator
          project_root: 'apps/myRepo/myApp'

      # (Required for MSBuild on Windows)
      - name: Setup MSBuild
        uses: microsoft/setup-msbuild@v2
        if: startsWith(matrix.os, 'windows')

      # Build your project
      - name: Build
        uses: nandenjin/openframeworks-action@v1
        with:
          command: build
          project_root: 'apps/myRepo/myApp'
```
