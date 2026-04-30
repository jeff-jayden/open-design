import type { Preview } from '@storybook/vue3';
import '../packages/styles/src/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered'
  }
};

export default preview;
