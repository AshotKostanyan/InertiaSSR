import { Link, useForm } from "@inertiajs/inertia-vue3";
import { ssrInterpolate, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useSSRContext, mergeProps } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main$1 = {
  components: {
    Link
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  if (_ctx.$page.props.message) {
    _push(`<p class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">${ssrInterpolate(_ctx.$page.props.message)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="container mx-auto"><div class="my-10">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/BlankLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BlankLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    Link,
    BlankLayout
  },
  layout: BlankLayout,
  setup() {
    const form = useForm({
      email: null,
      password: null
    });
    function login() {
      form.post(route("login"));
    }
    return { form, login };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-lg font-extrabold text-gray-900"> Войти </h2></div><form class="mt-8 space-y-6" action="#" method="POST"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email-address" class="sr-only">E-mail</label><input${ssrRenderAttr("value", $setup.form.email)} class="${ssrRenderClass([{ "border-red-500": $setup.form.errors.email }, "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"])}" id="email-address" name="email" type="email" autocomplete="email" required="" placeholder="E-mail"></div><div><label for="password" class="sr-only">Пароль</label><input${ssrRenderAttr("value", $setup.form.password)} class="${ssrRenderClass([{ "border-red-500": $setup.form.errors.email }, "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"])}" id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Пароль"></div></div>`);
  if ($setup.form.errors.email) {
    _push(`<div class="text-red-500">${ssrInterpolate($setup.form.errors.email)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div><button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}> Войти </button></div></form></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Login as default
};
//# sourceMappingURL=Login-079d7657.js.map
