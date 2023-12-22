import { Head, Link as Link$1 } from "@inertiajs/vue3";
import { Link } from "@inertiajs/inertia-vue3";
import { resolveComponent, mergeProps, useSSRContext, unref, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import Editor from "@tinymce/tinymce-vue";
const _sfc_main$2 = {
  components: {
    Link
  },
  props: {
    links: Array
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  if ($props.links.length > 3) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" }, _attrs))}><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><!--[-->`);
    ssrRenderList($props.links, (link, k) => {
      _push(ssrRenderComponent(_component_Link, {
        href: link.url,
        key: k,
        disabled: link.url === null,
        class: [{ "text-blue-500 font-bold": link.active, "bg-gray-100": link.url === null }, "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"]
      }, null, _parent));
    });
    _push(`<!--]--></nav></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const TinyMce_vue_vue_type_style_index_0_scoped_c8907c0e_lang = "";
const _sfc_main$1 = {
  __name: "TinyMce",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ id: "sample" }, _attrs))} data-v-c8907c0e>`);
      _push(ssrRenderComponent(unref(Editor), {
        "api-key": "vjzso0063ao69ljqslspz1yfj7jiyvxdcv0e4xz6ettwt3iv",
        init: {
          toolbar_mode: "sliding",
          plugins: "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" }
          ]
        },
        "initial-value": "Welcome to TinyMCE!"
      }, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/TinyMce.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TinyMce = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c8907c0e"]]);
const _sfc_main = {
  components: {
    Head,
    Link: Link$1,
    Pagination,
    TinyMce
  },
  created() {
    console.log(this.news);
  },
  props: {
    title: String,
    news: Object
  },
  methods: {
    destroy(id) {
      if (confirm("Вы уверенны?")) {
        this.$inertia.delete(this.route("users.destroy", id));
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_Link = resolveComponent("Link");
  const _component_Pagination = resolveComponent("Pagination");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Head, { title: $props.title }, null, _parent));
  _push(`<header class="bg-white shadow mb-10"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate($props.title)}</h1></div></header>`);
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("users.create"),
    class: "text-indigo-600 hover:text-indigo-900 my-5 block"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Добавить пользователя `);
      } else {
        return [
          createTextVNode(" Добавить пользователя ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex flex-col"><div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">`);
  if ($props.news.total > 0) {
    _push(`<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Image </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Name </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Date </th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Действия</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    ssrRenderList($props.news.data, (nw) => {
      _push(`<tr><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(nw.path)}</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(nw.title)}</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(nw.date)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-3">`);
      _push(ssrRenderComponent(_component_Link, {
        class: "text-indigo-600 hover:text-indigo-900",
        href: _ctx.route("users.edit", nw.id)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Редактировать`);
          } else {
            return [
              createTextVNode("Редактировать")
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`<a class="text-red-600 hover:text-red-900 cursor-pointer">Удалить</a></td></tr>`);
    });
    _push(`<!--]--></tbody></table>`);
    _push(ssrRenderComponent(_component_Pagination, {
      links: $props.news.links
    }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div class="text-center font-bold text-xl"> Пользователей пока нет </div>`);
  }
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Index as default
};
//# sourceMappingURL=Index-bab6c948.js.map
