import Editor from "@tinymce/tinymce-vue";
import { Link, useForm } from "@inertiajs/vue3";
import { mergeProps, useSSRContext, resolveComponent, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const PictureInput_vue_vue_type_style_index_0_scoped_0d2ec02f_lang = "";
const _sfc_main$1 = {
  name: "picture-input",
  props: {
    width: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    height: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    margin: {
      type: [String, Number],
      default: 0
    },
    accept: {
      type: String,
      default: "image/*"
    },
    capture: {
      type: String,
      default: null
    },
    size: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    name: {
      type: String,
      default: null
    },
    id: {
      type: [String, Number],
      default: null
    },
    buttonClass: {
      type: String,
      default: "btn btn-primary button"
    },
    removeButtonClass: {
      type: String,
      default: "btn btn-secondary button secondary"
    },
    aspectButtonClass: {
      type: String,
      default: "btn btn-secondary button secondary"
    },
    prefill: {
      // check for File API existence, do not fail with server side rendering
      type: typeof File === "undefined" || typeof Blob === "undefined" ? [String] : [String, File, Blob],
      default: ""
    },
    prefillOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    crop: {
      type: Boolean,
      default: true
    },
    radius: {
      type: [String, Number],
      default: 0
    },
    removable: {
      type: Boolean,
      default: false
    },
    hideChangeButton: {
      type: Boolean,
      default: false
    },
    autoToggleAspectRatio: {
      type: Boolean,
      default: false
    },
    toggleAspectRatio: {
      type: Boolean,
      default: false
    },
    changeOnClick: {
      type: Boolean,
      default: true
    },
    plain: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1e4
    },
    alertOnError: {
      type: Boolean,
      default: true
    },
    customStrings: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    prefill() {
      if (this.prefill) {
        this.preloadImage(this.prefill, this.prefillOptions);
      } else {
        this.removeImage();
      }
    }
  },
  data() {
    return {
      imageSelected: false,
      previewHeight: 0,
      previewWidth: 0,
      draggingOver: false,
      canvasWidth: 0,
      canvasHeight: 0,
      strings: {
        upload: "<p>Your device does not support file uploading.</p>",
        drag: "Drag an image or <br>click here to select a file",
        tap: "Tap here to select a photo <br>from your gallery",
        change: "Change Photo",
        aspect: "Landscape/Portrait",
        remove: "Remove Photo",
        select: "Select a Photo",
        selected: "<p>Photo successfully selected!</p>",
        fileSize: "The file size exceeds the limit",
        fileType: "This file type is not supported."
      }
    };
  },
  mounted() {
    this.updateStrings();
    if (this.prefill) {
      this.preloadImage(this.prefill, this.prefillOptions);
    }
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    });
    if (this.supportsPreview) {
      this.pixelRatio = Math.round(window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI);
      const canvas = this.$refs.previewCanvas;
      if (canvas.getContext) {
        this.context = canvas.getContext("2d");
        this.context.scale(this.pixelRatio, this.pixelRatio);
      }
    }
    if (this.accept !== "image/*") {
      this.fileTypes = this.accept.split(",");
      this.fileTypes = this.fileTypes.map((s) => s.trim());
    }
    this.canvasWidth = this.width != Number.MAX_SAFE_INTEGER ? this.width : this.$refs.container.clientWidth;
    this.canvasHeight = this.height != Number.MAX_SAFE_INTEGER ? this.height : this.canvasWidth;
    this.previewWidth = this.canvasWidth;
    this.previewHeight = this.canvasHeight;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    updateStrings() {
      for (let s in this.customStrings) {
        if (s in this.strings && typeof this.customStrings[s] === "string") {
          this.strings[s] = this.customStrings[s];
        }
      }
    },
    onClick() {
      if (!this.imageSelected) {
        this.selectImage();
        return;
      }
      if (this.changeOnClick) {
        this.selectImage();
      }
      this.$emit("click");
    },
    onResize() {
      if (this.resizeCanvas() && this.imageObject) {
        this.drawImage(this.imageObject);
      }
    },
    onDragEnter() {
      if (!this.supportsDragAndDrop) {
        return;
      }
      this.draggingOver = true;
    },
    onDragLeave() {
      if (!this.supportsDragAndDrop) {
        return;
      }
      this.draggingOver = false;
    },
    onFileDrop(e) {
      this.onDragLeave();
      this.$refs.fileInput.files = e.target.files || e.dataTransfer.files;
      this.onFileChange(e);
    },
    onFileChange(e, prefill) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (files[0].size <= 0 || files[0].size > this.size * 1024 * 1024) {
        this.$emit("error", {
          type: "fileSize",
          fileSize: files[0].size,
          fileType: files[0].type,
          fileName: files[0].name,
          message: this.strings.fileSize + " (" + this.size + "MB)"
        });
        if (this.alertOnError) {
          alert(this.strings.fileSize + " (" + this.size + "MB)");
        }
        return;
      }
      if (files[0].name === this.fileName && files[0].size === this.fileSize && this.fileModified === files[0].lastModified) {
        return;
      }
      this.file = files[0];
      this.fileName = files[0].name;
      this.fileSize = files[0].size;
      this.fileModified = files[0].lastModified;
      this.fileType = files[0].type.split(";")[0];
      if (this.accept === "image/*") {
        if (this.fileType.substr(0, 6) !== "image/") {
          return;
        }
      } else {
        if (this.fileTypes.indexOf(this.fileType) === -1) {
          this.$emit("error", {
            type: "fileType",
            fileSize: this.fileSize,
            fileType: this.fileType,
            fileName: this.fileName,
            message: this.strings.fileType
          });
          if (this.alertOnError) {
            alert(this.strings.fileType);
          }
          return;
        }
      }
      this.imageSelected = true;
      this.image = "";
      if (this.supportsPreview) {
        this.loadImage(files[0], prefill || false);
      } else {
        if (prefill) {
          this.$emit("prefill");
        } else {
          this.$emit("change", this.image);
        }
      }
    },
    loadImage(file, prefill) {
      this.getEXIFOrientation(file, (orientation) => {
        this.setOrientation(orientation);
        let reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          this.imageObject = new Image();
          this.imageObject.onload = () => {
            if (this.autoToggleAspectRatio) {
              let canvasOrientation = this.getOrientation(this.canvasWidth, this.canvasHeight);
              let imageOrientation = this.getOrientation(this.imageObject.width, this.imageObject.height);
              if (canvasOrientation !== imageOrientation) {
                this.rotateCanvas();
              }
            }
            this.drawImage(this.imageObject);
          };
          this.imageObject.src = this.image;
        };
        reader.readAsDataURL(file);
      });
    },
    drawImage(image) {
      this.imageWidth = image.width;
      this.imageHeight = image.height;
      this.imageRatio = image.width / image.height;
      let offsetX = 0;
      let offsetY = 0;
      let scaledWidth = this.previewWidth;
      let scaledHeight = this.previewHeight;
      const previewRatio = this.previewWidth / this.previewHeight;
      if (this.crop) {
        if (this.imageRatio >= previewRatio) {
          scaledWidth = scaledHeight * this.imageRatio;
          offsetX = (this.previewWidth - scaledWidth) / 2;
        } else {
          scaledHeight = scaledWidth / this.imageRatio;
          offsetY = (this.previewHeight - scaledHeight) / 2;
        }
      } else {
        if (this.imageRatio >= previewRatio) {
          scaledHeight = scaledWidth / this.imageRatio;
          offsetY = (this.previewHeight - scaledHeight) / 2;
        } else {
          scaledWidth = scaledHeight * this.imageRatio;
          offsetX = (this.previewWidth - scaledWidth) / 2;
        }
      }
      const canvas = this.$refs.previewCanvas;
      canvas.style.background = "none";
      canvas.width = this.previewWidth * this.pixelRatio;
      canvas.height = this.previewHeight * this.pixelRatio;
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      if (this.rotate && typeof this.imageObject.style.imageOrientation === "undefined") {
        this.context.translate(offsetX * this.pixelRatio, offsetY * this.pixelRatio);
        this.context.translate(scaledWidth / 2 * this.pixelRatio, scaledHeight / 2 * this.pixelRatio);
        this.context.rotate(this.rotate);
        offsetX = -scaledWidth / 2;
        offsetY = -scaledHeight / 2;
      }
      this.context.drawImage(
        image,
        offsetX * this.pixelRatio,
        offsetY * this.pixelRatio,
        scaledWidth * this.pixelRatio,
        scaledHeight * this.pixelRatio
      );
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    removeImage() {
      this.$refs.fileInput.value = "";
      this.$refs.fileInput.type = "";
      this.$refs.fileInput.type = "file";
      this.fileName = "";
      this.fileType = "";
      this.fileSize = 0;
      this.fileModified = 0;
      this.imageSelected = false;
      this.image = "";
      this.file = null;
      this.imageObject = null;
      this.$refs.previewCanvas.style.backgroundColor = "rgba(200,200,200,.25)";
      this.$refs.previewCanvas.width = this.previewWidth * this.pixelRatio;
      this.$emit("remove");
    },
    rotateImage() {
      this.rotateCanvas();
      if (this.imageObject) {
        this.drawImage(this.imageObject);
      }
      let newOrientation = this.getOrientation(this.canvasWidth, this.canvasHeight);
      this.$emit("aspectratiochange", newOrientation);
    },
    resizeCanvas() {
      let previewRatio = this.canvasWidth / this.canvasHeight;
      let newWidth = this.$refs.container.clientWidth;
      if (!newWidth)
        return false;
      if (!this.toggleAspectRatio && !this.autoToggleAspectRatio && newWidth === this.containerWidth) {
        return false;
      }
      this.containerWidth = newWidth;
      this.previewWidth = Math.min(this.containerWidth - this.margin * 2, this.canvasWidth);
      this.previewHeight = this.previewWidth / previewRatio;
      return true;
    },
    getOrientation(width, height) {
      let orientation = "square";
      if (width > height) {
        orientation = "landscape";
      } else if (width < height) {
        orientation = "portrait";
      }
      return orientation;
    },
    switchCanvasOrientation() {
      const canvasWidth = this.canvasWidth;
      const canvasHeight = this.canvasHeight;
      this.canvasWidth = canvasHeight;
      this.canvasHeight = canvasWidth;
    },
    rotateCanvas() {
      this.switchCanvasOrientation();
      this.resizeCanvas();
    },
    setOrientation(orientation) {
      this.rotate = false;
      if (orientation === 8) {
        this.rotate = -Math.PI / 2;
      } else if (orientation === 6) {
        this.rotate = Math.PI / 2;
      } else if (orientation === 3) {
        this.rotate = -Math.PI;
      }
    },
    getEXIFOrientation(file, callback) {
      var reader = new FileReader();
      reader.onload = (e) => {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 65496) {
          return callback(-2);
        }
        var length = view.byteLength;
        var offset = 2;
        while (offset < length) {
          var marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 65505) {
            if (view.getUint32(offset += 2, false) !== 1165519206) {
              return callback(-1);
            }
            var little = view.getUint16(offset += 6, false) === 18761;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;
            for (var i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) === 274) {
                return callback(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 65280) !== 65280) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        return callback(-1);
      };
      reader.readAsArrayBuffer(file.slice(0, 65536));
    },
    preloadImage(source, options) {
      let File2 = window.File;
      try {
        new File2([], "");
      } catch (e) {
        File2 = class File extends Blob {
          constructor(chunks, filename, opts = {}) {
            super(chunks, opts);
            this.lastModifiedDate = /* @__PURE__ */ new Date();
            this.lastModified = +this.lastModifiedDate;
            this.name = filename;
          }
        };
      }
      options = Object.assign({}, options);
      if (typeof source === "object") {
        this.imageSelected = true;
        this.image = "";
        if (this.supportsPreview) {
          this.loadImage(source, true);
        } else {
          this.$emit("prefill");
        }
        return;
      }
      if (source.indexOf("data:") === -1) {
        if (source.indexOf("?") !== -1) {
          source += "&_=" + (/* @__PURE__ */ new Date()).getTime();
        } else {
          source += "?_=" + (/* @__PURE__ */ new Date()).getTime();
        }
      }
      let headers = new Headers();
      headers.append("Accept", "image/*");
      fetch(source, {
        method: "GET",
        mode: "cors",
        headers
      }).then((response) => {
        return response.blob();
      }).then((imageBlob) => {
        let e = { target: { files: [] } };
        const fileName = options.fileName || source.split("/").slice(-1)[0];
        let mediaType = options.mediaType || imageBlob.type || "image/" + (options.fileType || fileName.split("?")[0].split(".").slice(-1)[0].split("?")[0]);
        mediaType = mediaType.replace("jpg", "jpeg");
        mediaType = mediaType.replace("image/svg", "image/svg+xml");
        if (mediaType === "image/svg") {
          mediaType = "image/svg+xml";
        }
        e.target.files[0] = new File2([imageBlob], fileName, { type: mediaType });
        this.onFileChange(e, true);
      }).catch((err) => {
        this.$emit("error", {
          type: "failedPrefill",
          message: "Failed loading prefill image: " + err
        });
        if (this.alertOnError) {
          alert("Failed loading prefill image: " + err);
        }
      });
    }
  },
  computed: {
    supportsUpload() {
      if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
      }
      const el = document.createElement("input");
      el.type = "file";
      return !el.disabled;
    },
    supportsPreview() {
      return window.FileReader && !!window.CanvasRenderingContext2D;
    },
    supportsDragAndDrop() {
      const div = document.createElement("div");
      return ("draggable" in div || "ondragstart" in div && "ondrop" in div) && !("ontouchstart" in window || navigator.msMaxTouchPoints);
    },
    computedClasses() {
      const classObject = {};
      classObject["dragging-over"] = this.draggingOver;
      return classObject;
    },
    fontSize() {
      return Math.min(0.04 * this.previewWidth, 21) + "px";
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "container",
    id: "picture-input",
    class: "picture-input"
  }, _attrs))} data-v-0d2ec02f>`);
  if (!$options.supportsUpload) {
    _push(`<div data-v-0d2ec02f>${$data.strings.upload}</div>`);
  } else if ($options.supportsPreview) {
    _push(`<div data-v-0d2ec02f><div class="preview-container" style="${ssrRenderStyle({ maxWidth: $data.previewWidth + "px", height: $data.previewHeight + "px", borderRadius: $props.radius + "%" })}" data-v-0d2ec02f><canvas tabindex="0" class="${ssrRenderClass([$options.computedClasses, "picture-preview"])}" style="${ssrRenderStyle({ height: $data.previewHeight + "px", zIndex: parseInt($props.zIndex) + 1 })}" data-v-0d2ec02f></canvas>`);
    if (!$data.imageSelected && !$props.plain) {
      _push(`<div class="picture-inner" style="${ssrRenderStyle({ top: -$data.previewHeight + "px", marginBottom: -$data.previewHeight + "px", fontSize: $options.fontSize, borderRadius: $props.radius + "%", zIndex: parseInt($props.zIndex) + 2 })}" data-v-0d2ec02f>`);
      if ($options.supportsDragAndDrop) {
        _push(`<span class="picture-inner-text" data-v-0d2ec02f>${$data.strings.drag}</span>`);
      } else {
        _push(`<span class="picture-inner-text" data-v-0d2ec02f>${$data.strings.tap}</span>`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
    if ($data.imageSelected && !$props.hideChangeButton) {
      _push(`<button class="${ssrRenderClass($props.buttonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.change)}</button>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.imageSelected && $props.removable) {
      _push(`<button class="${ssrRenderClass($props.removeButtonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.remove)}</button>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.imageSelected && $props.toggleAspectRatio && $props.width !== $props.height) {
      _push(`<button class="${ssrRenderClass($props.aspectButtonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.aspect)}</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<div data-v-0d2ec02f>`);
    if (!$data.imageSelected) {
      _push(`<button class="${ssrRenderClass($props.buttonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.select)}</button>`);
    } else {
      _push(`<div data-v-0d2ec02f><div data-v-0d2ec02f>${$data.strings.selected}</div>`);
      if (!$props.hideChangeButton) {
        _push(`<button class="${ssrRenderClass($props.buttonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.change)}</button>`);
      } else {
        _push(`<!---->`);
      }
      if ($props.removable) {
        _push(`<button class="${ssrRenderClass($props.removeButtonClass)}" type="button" data-v-0d2ec02f>${ssrInterpolate($data.strings.remove)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    }
    _push(`</div>`);
  }
  _push(`<input type="file"${ssrRenderAttr("name", $props.name)}${ssrRenderAttr("id", $props.id)}${ssrRenderAttr("accept", $props.accept)}${ssrRenderAttr("capture", $props.capture)} data-v-0d2ec02f></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/vue-picture-input/PictureInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PictureInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-0d2ec02f"]]);
const _sfc_main = {
  components: {
    Link,
    PictureInput,
    Editor
  },
  setup() {
    const form = useForm({
      name: null,
      email: null,
      password: null
    });
    function store() {
      form.post(route("users.store"));
    }
    return { form, store };
  },
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_picture_input = resolveComponent("picture-input");
  const _component_Editor = resolveComponent("Editor");
  _push(`<div${ssrRenderAttrs(_attrs)}><header class="bg-white shadow mb-10"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900"> Добавить пользователя </h1></div></header>`);
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
  _push(`<form><div class="shadow overflow-hidden sm:rounded-md"><div class="px-4 py-5 bg-white sm:p-6"><div class="grid grid-cols-6 gap-6"><div class="col-span-6"><label class="block text-sm font-medium text-gray-700">Image</label>`);
  _push(ssrRenderComponent(_component_picture_input, {
    ref: "pictureInput",
    width: "400",
    height: "400",
    margin: "16",
    accept: "image/jpeg,image/png",
    size: "10",
    "button-class": "btn",
    "custom-strings": {
      upload: "<h1>Bummer!</h1>",
      drag: "Drag a 😺 GIF or GTFO"
    },
    onChange: $options.onChange
  }, null, _parent));
  if ($setup.form.errors.name) {
    _push(`<div class="text-red-500 mt-2">${ssrInterpolate($setup.form.errors.name)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="col-span-6"><label class="block text-sm font-medium text-gray-700">Title</label><input class="${ssrRenderClass([{ "border-red-500": $setup.form.errors.email }, "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"])}"${ssrRenderAttr("value", $setup.form.email)} type="text">`);
  if ($setup.form.errors.email) {
    _push(`<div class="text-red-500 mt-2">${ssrInterpolate($setup.form.errors.email)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="col-span-6"><label class="block text-sm font-medium text-gray-700">Description</label><main id="sample">`);
  _push(ssrRenderComponent(_component_Editor, {
    "api-key": "vjzso0063ao69ljqslspz1yfj7jiyvxdcv0e4xz6ettwt3iv",
    init: {
      toolbar_mode: "sliding",
      plugins: "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
      toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      tinycomments_mode: "embedded",
      tinycomments_author: "Author name",
      mergetags_list: [
        { value: "", title: "form.title to do" },
        { value: "Email", title: "Email" }
      ]
    },
    "initial-value": "{{ form.content }}"
  }, null, _parent));
  _push(`</main>`);
  if ($setup.form.errors.password) {
    _push(`<div class="text-red-500 mt-2">${ssrInterpolate($setup.form.errors.password)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div><div class="px-4 py-3 bg-gray-50 text-right sm:px-6"><button type="submit" onclick="route(&#39;users.store&#39;)" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Добавить </button></div></div></form></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Create as default
};
//# sourceMappingURL=Create-b9f01080.js.map
