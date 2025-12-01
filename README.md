# AI Rotator

A minimal VS Code extension that places a **selector in the status bar**.  
Selecting a provider enables its extension and disables all others.

Perfect for users who rotate between AI tools and want a clean workspace.

## Status Bar

Shows the current provider; e.g., `AI: Claude`

Click it → choose a different provider.

## Supported Providers (editable in extension.js)

- Claude (`anthropic.claude-code`)
- GitHub Copilot (`GitHub.copilot`)
- Gemini (`googlecloudtools.vscode-gemini`)
- GPT-Mini (`gencay.vscode-chatgpt`)
- Ollama (`mrcrowl.ollama`)

## Command

- **AI Rotator: Select Provider**

## Build
Run `./build.sh` to build the `.vsix` package.

## Install
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Run **Extensions: Install from VSIX...**
4. Select `ai-rotator-1.0.0.vsix`

## Customize

Edit `AI_EXTENSIONS` in `extension.js` to add/remove AI providers.

