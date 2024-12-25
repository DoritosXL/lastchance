# Emoji Cover Grid Generator

This project allows you to create, edit, and download custom emoji grids with a user-selected background color. The app is responsive and supports both desktop and mobile views, ensuring seamless functionality across devices.

---

## Features

### 1. Emoji Grid Creation
- Generate a 4x3 grid of random emojis from popular categories like `people`, `foods`, and `smileys`.
- Edit individual grid slots by selecting or deleting emojis.
- Clear all emojis or regenerate a new grid.

### 2. Custom Backgrounds
- Choose a background color using the integrated `TwitterPicker` color picker.
- Dynamic naming of downloaded images based on the background color and content of the grid:
  - `CLB.png`: Default file name.
  - `DONDA.png`: Empty grid (black background).

### 3. Download Functionality
- Download the grid as a PNG file.
- Emojis and grid layout are preserved in the downloaded image.
- The grid is spaced evenly and dynamically adapts to the selected design.

### 4. Responsive Design
- Optimized for both desktop and mobile views.
- Buttons, grids, and pickers shrink or grow appropriately based on screen size.

### 5. Theme Switching
- Toggle between light and dark themes.
- Smooth transition animations when switching themes.

---

## How It Works

1. **Emoji Data**:
   - Uses `@emoji-mart/data` to fetch and display emojis.
   - Only emojis with native representations are included.

2. **Grid Management**:
   - Each grid slot can hold one emoji.
   - Users can edit or clear slots individually or in bulk.

3. **Canvas Drawing**:
   - The grid is rendered on a hidden canvas during download.
   - Emojis and background color are drawn dynamically.

4. **File Naming Logic**:
   - Grid content and background color determine the downloaded file name.

---

## Getting Started

### Prerequisites
- Node.js (16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DoritosXL/lastchance
   ```

2. Navigate to the project directory:
   ```bash
   cd lastchance
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## File Structure

```plaintext
src/
  components/
    Button.tsx          # A Button
    CoverGrid.tsx       # Main emoji grid component
    Popover.tsx         # Custom popover for emoji selection
    ClbLogo.tsx         # Logo component
    GithubLogoSVG.tsx   # GitHub logo component
    useTheme.ts         # Custom hook for theme switching

  pages/
    index.tsx           # Main entry point of the app

  styles/
    globals.css         # Global TailwindCSS styles
```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## License
This project is licensed under the MIT License.

