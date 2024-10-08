import { themes } from '../MatxTheme/initThemes';
import layout1Settings from './Layout1/Layout1Settings';
import layout2Settings from './Layout2/Layout2Settings';

// UPDATE BELOW CODE
// DOC http://demos.ui-lib.com/matx-react-doc/layout.html
export const MatxLayoutSettings = {
    activeLayout: 'layout1', // layout1, layout2
    activeTheme: 'customTheme', // View all valid theme colors inside MatxTheme/themeColors.js
    perfectScrollbar: false,

    themes: themes,
    layout1Settings, // open Layout1/Layout1Settings.js
    layout2Settings, // open Layout1/Layout2Settings.js

    secondarySidebar: {
        show: false,
        open: false,
        theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
    },
    // Footer options
    footer: {
        show: false,
        fixed: false,
        theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
    },
};
