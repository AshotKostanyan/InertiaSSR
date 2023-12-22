import { withCtx, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { L as Layout } from "./Layout-66a79a19.js";
import { Head } from "@inertiajs/inertia-vue3";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Layout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: __props.title }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>${ssrInterpolate(__props.title)}</p>`);
          } else {
            return [
              createVNode(unref(Head), { title: __props.title }, null, 8, ["title"]),
              createVNode("p", null, toDisplayString(__props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=About-04aabe4d.js.map
