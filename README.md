# SoundTube - YouTube IPA Subtitles

A Chrome extension that transforms YouTube subtitles into IPA (International Phonetic Alphabet) to help users learn English pronunciation while watching videos.

## Features

- Automatically detects YouTube subtitles
- Converts English text to IPA notation in real-time
- Displays IPA text below original subtitles
- Works with both auto-generated and manual subtitles
- Draggable IPA subtitle position
- Toggle IPA display with a single click

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory in the project folder

## Development

To work on the extension:

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development build with watch mode:

   ```bash
   pnpm run dev
   ```

3. Make your changes

4. Build for production:

   ```bash
   pnpm run build
   ```

5. Reload the extension in Chrome to see updates

## Project Structure

```
soundtube/
├── src/                    # Source files
│   ├── content.ts         # Main content script
│   └── icons/            # Extension icons
├── dist/                   # Built extension files
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## Usage

1. Go to any YouTube video with English subtitles
2. Enable subtitles (CC button)
3. Click the IPA icon in the YouTube player controls
4. The IPA transcription will appear below the original subtitles
5. Drag the IPA subtitles to adjust their position

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
