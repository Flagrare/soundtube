# SoundTube - YouTube IPA Subtitles

A Chrome extension that transforms YouTube subtitles into IPA (International Phonetic Alphabet) to help users learn English pronunciation while watching videos.

## Features

- Automatically detects YouTube subtitles
- Converts English text to IPA notation in real-time
- Displays IPA text below original subtitles
- Works with both auto-generated and manual subtitles

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project directory

## Development

To work on the extension:

1. Run the development build:
   ```bash
   npm run dev
   ```
2. Make your changes
3. Reload the extension in Chrome to see updates

## Usage

1. Go to any YouTube video with English subtitles
2. Enable subtitles (CC button)
3. The IPA transcription will appear below the original subtitles

## License

MIT
