# How To Add New Themes

This document outlines the process for adding new themes to the application.

1.  **Find and Copy Theme Code:**

    - Go to [TweakCN Theme Editor](https://tweakcn.com/editor/theme) to find a suitable theme.
    - Once a theme is selected, click on the "Code" button.
    - Copy the CSS code for both the light and dark modes. These will typically be under `:root {}` (for light mode) and `.dark {}` (for dark mode).

2.  **Create New CSS File:**

    - Navigate to the `src/styles/themes/` directory.
    - Create a new CSS file. The name of the file should be based on the theme name from TweakCN (e.g., `my-new-theme.css`).

3.  **Adapt CSS Selectors:**

    - Open the newly created CSS file.
    - Modify the selectors:
      - Change `:root {}` to `html.theme-name-light {}` (e.g., `html.my-new-theme-light {}`).
      - Change `.dark {}` to `html.theme-name-dark {}` (e.g., `html.my-new-theme-dark {}`).
    - Refer to `src/styles/themes/modern-minimal.css` for an example of how the selectors should be structured.

4.  **Import CSS into Globals:**

    - Open `src/styles/globals.css`.
    - Add an import statement for your new theme's CSS file under the "Themes" section. For example:
      ```css
      @import "./themes/my-new-theme.css";
      ```

5.  **Create TypeScript Theme Definition:**

    - Navigate to `src/modules/user/config/themes/`.
    - Create a new TypeScript file, mirroring the name of your CSS file (e.g., `my-new-theme.ts`).
    - In this file, define the light and dark versions of your theme. You only need to include the properties specified in the `Theme` type in `src/modules/user/config/themes/index.ts`. These properties are:
      - `background`
      - `foreground`
      - `card`
      - `primary`
      - `secondary`
      - `muted`
      - `mutedForeground`
      - `accent`
      - `accentForeground`
      - `destructive`
      - `border`
      - `input`
      - `fontSans`
      - `radius`
    - Create exports for the light and dark theme objects (e.g., `myNewThemeLight` and `myNewThemeDark`).
    - Refer to `src/modules/user/config/themes/modern-minimal.ts` as an example.

6.  **Integrate into Theme Configuration:**
    - Open `src/modules/user/config/themes/index.ts`.
    - **Import:** Add an import statement for your new TypeScript theme objects at the top of the file. For example:
      ```typescript
      import { myNewThemeLight, myNewThemeDark } from "./my-new-theme";
      ```
    - **Update `ThemeKey` Type:** Add your new theme's light and dark variations to the `ThemeKey` type. For example:
      ```typescript
      export type ThemeKey =
        // ... existing themes
        "my-new-theme-light" | "my-new-theme-dark";
      ```
    - **Update `allThemes` Object:** Add your new theme objects to the `allThemes` constant. For example:
      ```typescript
      export const allThemes: Record<ThemeKey, Theme> = {
        // ... existing themes
        "my-new-theme-light": myNewThemeLight,
        "my-new-theme-dark": myNewThemeDark,
      };
      ```

This provides a general overview of the process. Ensure all paths and naming conventions are consistent with the existing themes.
