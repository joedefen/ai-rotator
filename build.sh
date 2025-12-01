#!/usr/bin/env bash
set -e

echo "=== AI Rotator Build Script ==="

# -----------------------------
# 1. Ensure Ubuntu packages exist
# -----------------------------
echo ">>> Installing base packages..."
sudo apt update -y
sudo apt install -y curl

# -----------------------------
# 2. Ensure Node.js >= 18
# -----------------------------
NEED_NODE_VERSION=18

if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node -v | sed 's/v//; s/\..*//')
    echo ">>> Detected Node.js major version: $NODE_VERSION"
else
    NODE_VERSION=0
    echo ">>> Node.js not found"
fi

if [ "$NODE_VERSION" -lt "$NEED_NODE_VERSION" ]; then
    echo ">>> Installing Node.js 20.x (satisfies VS Code extension requirements)..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo ">>> Node.js version OK"
fi

# -----------------------------
# 3. Ensure vsce is installed
# -----------------------------
if command -v vsce >/dev/null 2>&1; then
    echo ">>> vsce already installed"
else
    echo ">>> Installing vsce..."
    sudo npm install -g @vscode/vsce
fi

# -----------------------------
# 4. Install Node deps for the extension
# -----------------------------
echo ">>> Running npm install..."
npm install

# -----------------------------
# 5. Package the extension
# -----------------------------
echo ">>> Packaging the VS Code extension..."
vsce package --allow-missing-repository


# -----------------------------
# 6. Done
# -----------------------------
echo "=== Build complete ==="
echo "Generated file:"
ls -1 *.vsix

