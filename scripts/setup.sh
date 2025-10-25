#!/bin/bash

echo "🚀 Based Guestbook Setup Script"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  Please edit .env and add:"
    echo "   - NEXT_PUBLIC_PROJECT_ID (from https://cloud.reown.com)"
    echo "   - PRIVATE_KEY (for contract deployment)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile contracts
echo "🔨 Compiling smart contracts..."
npm run compile

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your Reown Project ID"
echo "2. Deploy contract: npm run deploy:testnet"
echo "3. Add contract address to .env"
echo "4. Run app: npm run dev"
echo ""
echo "📖 See QUICKSTART.md for detailed instructions"
