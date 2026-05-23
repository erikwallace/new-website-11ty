# Notes

A personal website built with Eleventy and hosted on Netlify.

## Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Templating**: Nunjucks
- **Build Tool**: Gulp (image processing)
- **Image Processing**: Sharp (WebP conversion and resizing)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### Running the Development Server

To start the Eleventy development server with live reload:
```bash
npm start
```

The site will be available at `http://localhost:8080` with automatic file changes.

### Building for Production

To build the static site for production:
```bash
npm run build
```

The generated site will be output to the `public/` directory.

## Image Processing with Gulp

This project uses Gulp to automatically process and optimize images for the website.

### How Image Processing Works

1. **Source Location**: Place original images (JPG, JPEG, PNG) in `src/assets/img/batch/`
2. **Processing**: Gulp converts them to WebP format and resizes them to 600px wide
3. **Output**: Processed images are saved to `src/assets/img/covers/`
4. **Passthrough**: These images are then copied to `public/assets/img/` during the Eleventy build

### Running Image Processing

Process all new images in the batch folder:
```bash
npm run images
```

Or run Gulp directly:
```bash
gulp
gulp images
```

### Image Processing Details

- **Input formats**: JPG, JPEG, PNG (case-insensitive)
- **Output format**: WebP (quality: 70)
- **Dimensions**: Resized to 600px width, maintaining aspect ratio
- **Enlargement**: Images smaller than 600px are not enlarged
- **Duplicate Prevention**: Already-processed images are skipped automatically

### Processing Examples

```bash
# Add new images to process
cp ~/Downloads/photo.jpg src/assets/img/batch/
npm run images

# Or use gulp directly
npx gulp images
```

## Build Process

### Full Build Workflow

1. **Prepare images** (if needed):
   ```bash
   npm run images
   ```

2. **Build the site**:
   ```bash
   npm run build
   ```

3. **The build process**:
   - Eleventy reads source files from `src/`
   - Images are copied from `src/assets/img/covers/` (processed by Gulp)
   - CSS is copied from `src/style.css`
   - Static content is generated in `public/`

### Development Flow

For day-to-day development:
```bash
# Terminal 1: Start Eleventy dev server
npm start

# Terminal 2: Process images as needed (one-off)
npm run images
```

## Project Structure

- `src/` - Source files (templates, markdown content)
  - `_data/` - Data files for templates
  - `_includes/` - Layout templates and partials
  - `assets/img/batch/` - Original images to be processed (input)
  - `assets/img/covers/` - Processed WebP images (Gulp output)
  - `assets/` - Other static assets
  - `blog/` - Blog posts in markdown
  - `books/` - Books tracking pages
  - `style.css` - Main stylesheet
- `public/` - Generated static site (Eleventy output)
- `gulpfile.js` - Gulp configuration for image processing
- `.eleventy.js` - Eleventy configuration

## Available npm Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build site for production
- `npm run images` - Process images in batch folder with Gulp

## License

See LICENSE file for details.


