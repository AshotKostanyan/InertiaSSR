import Editor from "@tinymce/tinymce-vue";
import { Link, useForm } from "@inertiajs/vue3";
import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Edit_vue_vue_type_style_index_0_scoped_c02ee40f_lang = "";
const _sfc_main = {
  components: {
    Link,
    Editor
  },
  props: {
    new: Object
  },
  setup(props) {
    const form = useForm({
      title: props.new[0].title,
      content: props.new[0].content,
      image: props.new[0].image
    });
    function update() {
      form.put(route("users.update", props.user.id));
    }
    return { form, update };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_Editor = resolveComponent("Editor");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-c02ee40f><header class="bg-white shadow mb-10" data-v-c02ee40f><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-v-c02ee40f><h1 class="text-3xl font-bold text-gray-900" data-v-c02ee40f> Редактирование пользователя </h1></div></header>`);
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("users.index"),
    class: "text-indigo-600 hover:text-indigo-900 my-5 block"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Вернуться назад `);
      } else {
        return [
          createTextVNode(" Вернуться назад ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<form data-v-c02ee40f><div class="shadow overflow-hidden sm:rounded-md" data-v-c02ee40f><div class="px-4 py-5 bg-white sm:p-6" data-v-c02ee40f><div class="grid grid-cols-6 gap-6" data-v-c02ee40f><div class="col-span-6" data-v-c02ee40f><label class="block text-sm font-medium text-gray-700" data-v-c02ee40f>Image</label><input class="${ssrRenderClass([{ "border-red-500": $setup.form.errors.name }, "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"])}"${ssrRenderAttr("value", $setup.form.title)} type="text" data-v-c02ee40f>`);
  if ($setup.form.errors.name) {
    _push(`<div class="text-red-500 mt-2" data-v-c02ee40f>${ssrInterpolate($setup.form.errors.name)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="col-span-6" data-v-c02ee40f><label class="block text-sm font-medium text-gray-700" data-v-c02ee40f>E-mail</label><input class="${ssrRenderClass([{ "border-red-500": $setup.form.errors.email }, "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"])}"${ssrRenderAttr("value", $setup.form.content)} type="email" data-v-c02ee40f>`);
  if ($setup.form.errors.email) {
    _push(`<div class="text-red-500 mt-2" data-v-c02ee40f>${ssrInterpolate($setup.form.errors.email)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><main id="sample" data-v-c02ee40f>`);
  _push(ssrRenderComponent(_component_Editor, {
    "api-key": "vjzso0063ao69ljqslspz1yfj7jiyvxdcv0e4xz6ettwt3iv",
    init: {
      toolbar_mode: "sliding",
      plugins: "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
      toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      tinycomments_mode: "embedded",
      tinycomments_author: "Author name",
      mergetags_list: [
        { value: "iuiuuiuiuiu", title: "form.title to do" },
        { value: "Email", title: "Email" }
      ]
    },
    "initial-value": "{{ form.content }}"
  }, null, _parent));
  _push(`</main></div></div><div class="px-4 py-3 bg-gray-50 text-right sm:px-6" data-v-c02ee40f><button${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-c02ee40f> Обновить </button></div>`);
  if ($setup.form.isDirty) {
    _push(`<div class="text-green-500 p-10" data-v-c02ee40f> Что-то изменилось, не забудьте сохранить форму </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></form></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c02ee40f"]]);
export {
  Edit as default
};
//# sourceMappingURL=Edit-7df585e1.js.map
