import type { Meta, StoryObj } from '@storybook/vue3';
import OpenToolTip from '@open-design/components/tooltip';

const meta = {
  title: '组件/Tooltip',
  component: OpenToolTip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '基于 Popper.js 的定位气泡提示。支持 `hover` / `click` 触发、浅深色主题、十二个方位，以及默认插槽（触发器）与 `content` 插槽（气泡内容）。'
      }
    }
  },
  argTypes: {
    effect: {
      control: 'inline-radio',
      options: ['light', 'dark']
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ]
    },
    trigger: {
      control: 'inline-radio',
      options: ['hover', 'click']
    },
    content: { control: 'text' },
    rawContent: { control: 'boolean' },
    manual: { control: 'boolean' }
  },
  render: (args) => ({
    components: { OpenToolTip },
    setup() {
      return { args };
    },
    template: `
      <OpenToolTip
        v-bind="args"
      >
        <button type="button" style="padding: 8px 16px; cursor: pointer;">触发区域</button>
      </OpenToolTip>
    `
  })
} satisfies Meta<typeof OpenToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 默认悬停展示，浅色气泡 */
export const 默认: Story = {
  args: {
    content: '这是一段提示文案',
    effect: 'light',
    placement: 'top',
    trigger: 'hover'
  }
};

/** 深色主题气泡 */
export const 深色效果: Story = {
  args: {
    content: '深色 Tooltip',
    effect: 'dark',
    placement: 'bottom',
    trigger: 'hover'
  }
};

/** 点击触发，再次点击或点击外部关闭 */
export const 点击触发: Story = {
  args: {
    content: '点击后显示，点外部关闭',
    effect: 'light',
    placement: 'top',
    trigger: 'click'
  }
};

/** 使用 content 插槽自定义内容 */
export const 自定义内容插槽: Story = {
  render: (args) => ({
    components: { OpenToolTip },
    setup() {
      return { args };
    },
    template: `
      <OpenToolTip v-bind="args">
        <button type="button" style="padding: 8px 16px; cursor: pointer;">悬停查看插槽</button>
        <template #content>
          <div style="max-width: 220px;">
            <strong>标题</strong>
            <p style="margin: 8px 0 0; font-size: 12px;">插槽内可放入任意结构，不仅限于纯文本。</p>
          </div>
        </template>
      </OpenToolTip>
    `
  }),
  args: {
    effect: 'light',
    placement: 'right',
    trigger: 'hover',
    content: ''
  }
};

/** `rawContent` 为 true 时，`content` 按 HTML 渲染（注意 XSS 风险，仅信任内容时使用） */
export const HTML内容: Story = {
  args: {
    content: '支持 <strong>加粗</strong> 与 <em>斜体</em>',
    rawContent: true,
    effect: 'light',
    placement: 'top',
    trigger: 'hover'
  }
};

/** 常见方位示意（固定文案，便于对照 placement） */
export const 方位示意: Story = {
  render: () => ({
    components: { OpenToolTip },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; max-width: 520px; justify-content: center;">
        <OpenToolTip content="top" placement="top" effect="light">
          <button type="button" style="padding: 6px 12px;">top</button>
        </OpenToolTip>
        <OpenToolTip content="bottom" placement="bottom" effect="light">
          <button type="button" style="padding: 6px 12px;">bottom</button>
        </OpenToolTip>
        <OpenToolTip content="left" placement="left" effect="light">
          <button type="button" style="padding: 6px 12px;">left</button>
        </OpenToolTip>
        <OpenToolTip content="right" placement="right" effect="light">
          <button type="button" style="padding: 6px 12px;">right</button>
        </OpenToolTip>
      </div>
    `
  })
};
