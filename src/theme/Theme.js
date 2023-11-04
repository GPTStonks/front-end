import { createTheme } from '@mui/material/styles';

export const gruvboxTheme = createTheme({
  typography: {
    fontFamily: '"Fira Code", monospace',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fb4934', // red
    },
    secondary: {
      main: '#83a598', // green
    },
    error: {
      main: '#fb4934', // red
    },
    warning: {
      main: '#fe8019', // orange
    },
    info: {
      main: '#83a598', // green
    },
    success: {
      main: '#b8bb26', // yellow
    },
    background: {
      default: '#282828', // dark grey
      paper: '#3c3836', // lighter grey
    },
    text: {
      primary: '#ebdbb2', // beige
      secondary: '#d5c4a1', // dark beige
    },
  },
  scrollBar: {
    main: '#d5c4a1',
    width: '8px',
  },
  table: {
    headerBackground: '#504945',
  },
});

// OFFSETS, LAYOUT and Z-INDEX CONSTANTS

export const topFixedPercentage = '3.5%';
export const rightFixedPercentage = '2%';
export const bottomFixedPercentage = '3.5%';
export const leftFixedPercentage = '1.5%';
export const dashboardOffsetBotPercentage = '8.5%';
export const commandSearchOffsetRightPercentage = '7.5%';

export const chatbotZIndex = 1;
export const commandSearchZindex = 2;
export const fixedButtonsZIndex = 3;
