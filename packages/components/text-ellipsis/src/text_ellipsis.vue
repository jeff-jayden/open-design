<script lang="tsx">
import { defineComponent, ref, toRefs } from 'vue';
import { ElTooltip } from 'element-plus';
import useTextOverflow from '@/hooks/useTextOverflow.js';
import { copyElText } from '@/utils/common';

export default defineComponent({
  name: 'text_ellipsis',
  props: {
    text: {
      type: String,
      required: true,
    },
    rows: {
      type: [Number, String],
      default: 1,
      validator: (v: number) => v >= 1,
    },
    watch: {
      type: Boolean,
    },
    copyable: {
      type: Boolean,
    },
    showCopy: {
      type: Boolean,
    },
    style: {
      type: String || Object,
    },
  },
  setup(props, { emit }) {
    const { text, rows } = toRefs(props);
    const textRef = ref<HTMLElement>();

    const { isTextOverflow } = useTextOverflow({
      textRef,
      text,
      rows,
      watchResize: props.watch,
    });

    const onTextClick = (type: 'text' | 'icon') => {
      if (
        (type === 'text' && props.copyable) ||
        (type === 'icon' && props.showCopy)
      ) {
        copyElText(`${props.text}`);
      }
    };

    return () => (
      <span class="text_ellipsis" style={props.style}>
        <ElTooltip
          placement="top"
          effect="light"
          disabled={!isTextOverflow.value}
        >
          {{
            content: () => (
              <div class="text_ellipsis_tooltip_content">{props.text}</div>
            ),
            default: () => (
              <span class="text_ellipsis_tooltip_default">
                <span
                  ref={textRef}
                  class={[
                    'text_ellipsis__text',
                    `text_ellipsis__${+props.rows > 1 ? 'multi' : 'single'}`,
                  ]}
                  onClick={() => onTextClick('text')}
                >
                  {props.text}
                </span>
              </span>
            ),
          }}
        </ElTooltip>
      </span>
    );
  },
});
</script>

<style lang="scss" scoped>
.text_ellipsis {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  width: 100%;

  &__text {
    display: inline-block;
    cursor: v-bind("isTextOverflow || isCopyable ? 'pointer' : 'inherit'");
  }

  :deep(.el-tooltip__trigger) {
    width: 100%;
    .text_ellipsis__single {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
  }
}
</style>

<style lang="stylus" scoped>
.text_ellipsis
  &__multi
    text-overflow ellipsis
    overflow hidden
    display -webkit-box
    word-break break-all
    -webkit-box-orient vertical
    -webkit-line-clamp v-bind('rows')
  &__tooltip-content
    max-width calc(320px - (16px * 2))
    max-height calc(340px - (16px * 2))
    overflow-y auto
  &__tooltip-default
    display inline-flex
    align-items center
    width 100%
    vertical-align middle
  &__copy-icon
    cursor pointer
    display inline-flex
    align-items center
    margin-left 5px
</style>
