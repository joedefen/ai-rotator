const vscode = require("vscode");

// You can edit this list any time.
// KEY = label shown in menu
// VALUE = official extension identifier
const AI_EXTENSIONS = {
  "Claude": "anthropic.claude-code",
  "GitHub Copilot": "GitHub.copilot",
  "Gemini": "googlecloudtools.vscode-gemini",
  "GPT-Mini": "gencay.vscode-chatgpt",
  "Ollama": "mrcrowl.ollama"
};

let statusBarItem;

async function activate(context) {
  // Create the status bar item
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    10
  );
  statusBarItem.command = "airotator.selectProvider";
  context.subscriptions.push(statusBarItem);

  // Detect which provider is active
  const active = detectActiveProvider();
  updateStatusBar(active);

  // Register the select-provider command
  const disposable = vscode.commands.registerCommand(
    "airotator.selectProvider",
    async () => {
      const provider = await vscode.window.showQuickPick(
        Object.keys(AI_EXTENSIONS),
        { placeHolder: "Select the AI provider to enable" }
      );
      if (!provider) return;

      await rotateTo(provider);
      updateStatusBar(provider);

      vscode.window.showInformationMessage(`AI Rotator: ${provider} enabled`);
    }
  );

  context.subscriptions.push(disposable);

  statusBarItem.show();
}

function updateStatusBar(provider) {
  if (!provider) {
    statusBarItem.text = "AI: None";
  } else {
    statusBarItem.text = `AI: ${provider}`;
  }
}

function detectActiveProvider() {
  for (const [label, extId] of Object.entries(AI_EXTENSIONS)) {
    const ext = vscode.extensions.getExtension(extId);
    if (ext && ext.isActive) {
      return label;
    }
  }
  return null;
}

async function rotateTo(provider) {
  const targetExt = AI_EXTENSIONS[provider];

  // Disable all others
  for (const [label, extId] of Object.entries(AI_EXTENSIONS)) {
    if (extId !== targetExt) {
      try {
        await vscode.commands.executeCommand(
          "workbench.extensions.disableExtension",
          extId
        );
      } catch {}
    }
  }

  // Enable chosen one
  await vscode.commands.executeCommand(
    "workbench.extensions.enableExtension",
    targetExt
  );
}

function deactivate() {}

module.exports = { activate, deactivate };

