import { b as attr_class, l as bind_props, s as stringify, c as store_get, k as attributes, a as ensure_array_like, d as attr, u as unsubscribe_stores } from "./index2.js";
import { o as onDestroy, t as tick, I as Icon } from "./Icon.js";
import "dequal";
import { d as derived, g as get, w as writable, r as readable } from "./index.js";
import "clsx";
import { getLocalTimeZone, CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { nanoid } from "nanoid/non-secure";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { createFocusTrap } from "focus-trap";
import { Chart, registerables } from "chart.js";
import { c as chartColors, s as sampleData } from "./charts.js";
import { k as fallback } from "./utils.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
function chunk(arr, size2) {
  const result = [];
  for (let i = 0; i < arr.length; i += size2) {
    result.push(arr.slice(i, i + size2));
  }
  return result;
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function portalAttr(portal) {
  if (portal !== null) {
    return "";
  }
  return void 0;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix2) {
  const name2 = (part) => part ? `${prefix2}-${part}` : prefix2;
  const attribute = (part) => `data-melt-${prefix2}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix2}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isShadowRoot(element) {
  return element instanceof ShadowRoot;
}
function isElement(element) {
  return element instanceof Element;
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isNull(value) {
  return value === null;
}
function isNumberString(value) {
  if (isNaN(parseInt(value)))
    return false;
  return true;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function isAttachedToDocument(element) {
  if (!isHTMLElement(element))
    return false;
  const rootNode = element.getRootNode();
  if (rootNode === document)
    return true;
  if (isShadowRoot(rootNode)) {
    return rootNode.ownerDocument === document;
  }
  return false;
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get2 = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get2());
      }));
    });
    subscriber(get2());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get: get2,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  ENTER: "Enter",
  ESCAPE: "Escape",
  SPACE: " ",
  TAB: "Tab",
  A: "a",
  P: "p"
};
function debounce(fn, wait = 500) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    const later = () => fn(...args);
    timeout = setTimeout(later, wait);
  };
  debounced.destroy = () => clearTimeout(timeout);
  return debounced;
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function effect(stores, fn, opts = {}) {
  const { skipFirstRun } = opts;
  let isFirstRun = true;
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    if (isFirstRun && skipFirstRun) {
      isFirstRun = false;
    } else {
      cb = fn(stores2);
    }
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
function toReadableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    if (isReadable(value)) {
      result[propertyKey] = withGet(value);
    } else {
      result[propertyKey] = withGet(readable(value));
    }
  });
  return result;
}
const defaults$6 = {
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0),
  checked: void 0
};
function createHiddenInput(props) {
  const withDefaults = {
    ...defaults$6,
    ...removeUndefined(props)
  };
  const { name: elName } = createElHelpers(withDefaults.prefix);
  const { value, name: name2, disabled, required, type, checked } = toReadableStores(omit(withDefaults, "prefix"));
  const nameStore = name2;
  const actualChecked = withGet.derived([checked, type], ([$checked, $type]) => {
    if ($type === "checkbox") {
      return $checked === "indeterminate" ? false : $checked;
    }
    return void 0;
  });
  const hiddenInput = makeElement(elName("hidden-input"), {
    stores: [value, nameStore, disabled, required, type, actualChecked],
    returned: ([$value, $name, $disabled, $required, $type, $checked]) => {
      return {
        name: $name,
        value: $value?.toString(),
        "aria-hidden": "true",
        hidden: true,
        disabled: $disabled,
        required: $required,
        tabIndex: -1,
        type: $type,
        checked: $checked,
        style: styleToString({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(value.subscribe((newValue) => {
        if (type.get() === "checkbox") {
          return;
        }
        node.value = newValue;
        node.dispatchEvent(new Event("change", { bubbles: true }));
      }), actualChecked.subscribe(() => {
        if (type.get() !== "checkbox") {
          return;
        }
        node.dispatchEvent(new Event("change", { bubbles: true }));
      }));
      return {
        destroy: unsub
      };
    }
  });
  return hiddenInput;
}
const layers$2 = /* @__PURE__ */ new Map();
const useEscapeKeydown = ((node, config = {}) => {
  let unsub = noop;
  function update(config2 = {}) {
    unsub();
    const options = { behaviorType: "close", ...config2 };
    const behaviorType = isReadable(options.behaviorType) ? options.behaviorType : withGet(readable(options.behaviorType));
    layers$2.set(node, behaviorType);
    const onKeyDown = (e) => {
      if (e.key !== kbd.ESCAPE || !isResponsibleEscapeLayer(node))
        return;
      const target = e.target;
      if (!isHTMLElement(target))
        return;
      e.preventDefault();
      if (shouldIgnoreEvent(e, options.ignore))
        return;
      if (shouldInvokeResponsibleLayerHandler(behaviorType.get())) {
        options.handler?.(e);
      }
    };
    unsub = executeCallbacks(addEventListener(document, "keydown", onKeyDown, { passive: false }), effect(behaviorType, ($behaviorType) => {
      if ($behaviorType === "close" || $behaviorType === "defer-otherwise-close" && [...layers$2.keys()][0] === node) {
        node.dataset.escapee = "";
      } else {
        delete node.dataset.escapee;
      }
    }), behaviorType.destroy || noop);
  }
  update(config);
  return {
    update,
    destroy() {
      layers$2.delete(node);
      delete node.dataset.escapee;
      unsub();
    }
  };
});
const isResponsibleEscapeLayer = (node) => {
  const layersArr = [...layers$2];
  const topMostLayer = layersArr.findLast(([_, behaviorType]) => {
    const $behaviorType = behaviorType.get();
    return $behaviorType === "close" || $behaviorType === "ignore";
  });
  if (topMostLayer)
    return topMostLayer[0] === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === node;
};
const shouldIgnoreEvent = (e, ignore) => {
  if (!ignore)
    return false;
  if (isFunction(ignore) && ignore(e))
    return true;
  if (Array.isArray(ignore) && ignore.some((ignoreEl) => e.target === ignoreEl)) {
    return true;
  }
  return false;
};
const shouldInvokeResponsibleLayerHandler = (behaviorType) => {
  return behaviorType === "close" || behaviorType === "defer-otherwise-close";
};
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function isVirtualElement(element) {
  return isObject(element) && "getBoundingClientRect" in element;
}
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null) {
    return {
      destroy: noop
    };
  }
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding,
      ...isObject(options.flip) && options.flip
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (!isVirtualElement(reference) && !isAttachedToDocument(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const useFocusTrap = ((node, config = {}) => {
  let unsub = noop;
  const update = (config2) => {
    unsub();
    const trap = createFocusTrap(node, {
      returnFocusOnDeactivate: false,
      allowOutsideClick: true,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      ...config2
    });
    unsub = trap.deactivate;
    trap.activate();
  };
  update(config);
  return { destroy: unsub, update };
});
const useModal = ((node, config) => {
  let unsubInteractOutside = noop;
  function update(config2) {
    unsubInteractOutside();
    const { onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    function closeModal() {
      onClose?.();
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      e.stopImmediatePropagation();
    }
    function onInteractOutside(e) {
      if (!shouldCloseOnInteractOutside?.(e))
        return;
      e.stopImmediatePropagation();
      closeModal();
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: closeOnInteractOutside
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubInteractOutside();
    }
  };
});
const layers$1 = /* @__PURE__ */ new Set();
const usePreventTextSelectionOverflow = ((node, config = {}) => {
  layers$1.add(node);
  let unsubEvents = noop;
  let unsubSelectionLock = noop;
  const documentObj = getOwnerDocument(node);
  let isPointerDownInside = false;
  const update = (config2) => {
    unsubEvents();
    resetSelectionLock();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : withGet(readable(options.enabled));
    const onPointerDown = (e) => {
      const target = e.target;
      if (!isHighestLayer$1(node) || !isHTMLElement(target) || !enabled.get())
        return;
      isPointerDownInside = isOrContainsTarget(node, target);
      if (isPointerDownInside) {
        unsubSelectionLock = preventTextSelectionOverflow(node);
      }
    };
    unsubEvents = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", resetSelectionLock, true));
  };
  const resetSelectionLock = () => {
    unsubSelectionLock();
    unsubSelectionLock = noop;
    isPointerDownInside = false;
  };
  update(config);
  return {
    destroy() {
      layers$1.delete(node);
      unsubEvents();
      resetSelectionLock();
    },
    update
  };
});
const preventTextSelectionOverflow = (node) => {
  const body = document.body;
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
};
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
const setUserSelect = (node, value) => {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
};
const isHighestLayer$1 = (node) => [...layers$1].at(-1) === node;
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body",
  preventTextSelectionOverflow: {}
};
const usePopper = ((popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    callbacks.push(useFocusTrap(popperElement, {
      fallbackFocus: popperElement,
      ...opts.focusTrap
    }).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  if (opts.preventTextSelectionOverflow !== null) {
    callbacks.push(usePreventTextSelectionOverflow(popperElement).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
});
const usePortal = ((el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget = "body") {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
});
const layers = /* @__PURE__ */ new Set();
const useInteractOutside = ((node, config = {}) => {
  let unsubEvents = noop;
  let unsubPointerDown = noop;
  let unsubPointerUp = noop;
  let unsubResetInterceptedEvents = noop;
  layers.add(node);
  const documentObj = getOwnerDocument(node);
  let isPointerDown = false;
  let isPointerDownInside = false;
  const interceptedEvents = {
    pointerdown: false,
    pointerup: false,
    mousedown: false,
    mouseup: false,
    touchstart: false,
    touchend: false,
    click: false
  };
  const resetInterceptedEvents = () => {
    for (const eventType in interceptedEvents) {
      interceptedEvents[eventType] = false;
    }
  };
  const isAnyEventIntercepted = () => {
    for (const isIntercepted of Object.values(interceptedEvents)) {
      if (isIntercepted)
        return true;
    }
    return false;
  };
  const setupCapturePhaseHandlerAndMarkAsIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = true;
      handler?.(e);
    }, true);
  };
  const setupBubblePhaseHandlerAndMarkAsNotIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = false;
      const computedData = {};
      if (isHTMLElement(e.target) && isShadowRoot(e.target.shadowRoot)) {
        computedData.shadowTarget = e.composedPath()[0];
      }
      handler?.(e, computedData);
    });
  };
  function update(config2) {
    unsubEvents();
    unsubPointerDown();
    unsubPointerUp();
    unsubResetInterceptedEvents();
    resetInterceptedEvents();
    const { onInteractOutside, onInteractOutsideStart, enabled } = { enabled: true, ...config2 };
    if (!enabled)
      return;
    let wasTopLayerInPointerDownCapture = false;
    const onPointerDownDebounced = debounce((e, computedEventData) => {
      if (!wasTopLayerInPointerDownCapture || isAnyEventIntercepted())
        return;
      if (onInteractOutside && isValidEvent(e, node))
        onInteractOutsideStart?.(e);
      const target = computedEventData?.shadowTarget ? computedEventData.shadowTarget : e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }, 10);
    unsubPointerDown = onPointerDownDebounced.destroy;
    const onPointerUpDebounced = debounce((e) => {
      if (wasTopLayerInPointerDownCapture && !isAnyEventIntercepted() && shouldTriggerInteractOutside(e)) {
        onInteractOutside?.(e);
      }
      resetPointerState();
    }, 10);
    unsubPointerUp = onPointerUpDebounced.destroy;
    const resetInterceptedEventsDebounced = debounce(resetInterceptedEvents, 20);
    unsubResetInterceptedEvents = resetInterceptedEventsDebounced.destroy;
    const markTopLayerInPointerDown = () => {
      wasTopLayerInPointerDownCapture = isHighestLayer(node);
    };
    unsubEvents = executeCallbacks(
      /** Capture Events For Interaction Start */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerdown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mousedown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchstart", markTopLayerInPointerDown),
      /**
       * Intercepted events are reset only at the end of an interaction, allowing
       * interception at the start while still capturing the entire interaction.
       * Additionally, intercepted events are reset in the capture phase with `resetInterceptedEventsDebounced`,
       * accommodating events not invoked in the bubbling phase due to user interception.
       */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mouseup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchend", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("click", resetInterceptedEventsDebounced),
      /** Bubbling Events For Interaction Start */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerdown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mousedown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchstart", onPointerDownDebounced),
      /**
       * To effectively detect an end of an interaction, we must monitor all relevant events,
       * not just `click` events. This is because on touch devices, actions like pressing,
       * moving the finger, and lifting it off the screen may not trigger a `click` event,
       * but should still invoke `onPointerUp` to properly handle the interaction.
       */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mouseup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchend", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("click", onPointerUpDebounced)
    );
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubEvents();
      unsubPointerDown();
      unsubPointerUp();
      unsubResetInterceptedEvents();
      layers.delete(node);
    }
  };
});
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isHighestLayer(node) {
  return Array.from(layers).at(-1) === node;
}
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function isBeforeOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) <= 0;
}
function isAfterOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) >= 0;
}
function isBetweenInclusive(date, start, end) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled) {
  if (isUnavailable === void 0 && isDisabled === void 0) {
    return true;
  }
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store, defaultValue) {
  const { set, update, subscribe, get: get2 } = withGet(store);
  function add(duration) {
    update((d) => {
      return d.add(duration);
    });
  }
  function nextPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update((d) => {
      return d.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update((d) => {
        return d.set(fields, disambiguation);
      });
      return;
    }
    update((d) => {
      return d.set(fields);
    });
  }
  function reset() {
    update(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe,
      update,
      get: get2
    };
  }
  return {
    get: get2,
    set,
    update,
    subscribe,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
const supportedLocales = [
  "ach",
  "af",
  "am",
  "an",
  "ar",
  "ast",
  "az",
  "be",
  "bg",
  "bn",
  "br",
  "bs",
  "ca",
  "cak",
  "ckb",
  "cs",
  "cy",
  "da",
  "de",
  "dsb",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "he",
  "hr",
  "hsb",
  "hu",
  "ia",
  "id",
  "it",
  "ja",
  "ka",
  "kk",
  "kn",
  "ko",
  "lb",
  "lo",
  "lt",
  "lv",
  "meh",
  "ml",
  "ms",
  "nl",
  "nn",
  "no",
  "oc",
  "pl",
  "pt",
  "rm",
  "ro",
  "ru",
  "sc",
  "scn",
  "sk",
  "sl",
  "sr",
  "sv",
  "szl",
  "tg",
  "th",
  "tr",
  "uk",
  "zh-CN",
  "zh-TW"
];
const placeholderFields = ["year", "month", "day"];
const placeholders = {
  ach: { year: "mwaka", month: "dwe", day: "nino" },
  af: { year: "jjjj", month: "mm", day: "dd" },
  am: { year: "ዓዓዓዓ", month: "ሚሜ", day: "ቀቀ" },
  an: { year: "aaaa", month: "mm", day: "dd" },
  ar: { year: "سنة", month: "شهر", day: "يوم" },
  ast: { year: "aaaa", month: "mm", day: "dd" },
  az: { year: "iiii", month: "aa", day: "gg" },
  be: { year: "гггг", month: "мм", day: "дд" },
  bg: { year: "гггг", month: "мм", day: "дд" },
  bn: { year: "yyyy", month: "মিমি", day: "dd" },
  br: { year: "bbbb", month: "mm", day: "dd" },
  bs: { year: "gggg", month: "mm", day: "dd" },
  ca: { year: "aaaa", month: "mm", day: "dd" },
  cak: { year: "jjjj", month: "ii", day: "q'q'" },
  ckb: { year: "ساڵ", month: "مانگ", day: "ڕۆژ" },
  cs: { year: "rrrr", month: "mm", day: "dd" },
  cy: { year: "bbbb", month: "mm", day: "dd" },
  da: { year: "åååå", month: "mm", day: "dd" },
  de: { year: "jjjj", month: "mm", day: "tt" },
  dsb: { year: "llll", month: "mm", day: "źź" },
  el: { year: "εεεε", month: "μμ", day: "ηη" },
  en: { year: "yyyy", month: "mm", day: "dd" },
  eo: { year: "jjjj", month: "mm", day: "tt" },
  es: { year: "aaaa", month: "mm", day: "dd" },
  et: { year: "aaaa", month: "kk", day: "pp" },
  eu: { year: "uuuu", month: "hh", day: "ee" },
  fa: { year: "سال", month: "ماه", day: "روز" },
  ff: { year: "hhhh", month: "ll", day: "ññ" },
  fi: { year: "vvvv", month: "kk", day: "pp" },
  fr: { year: "aaaa", month: "mm", day: "jj" },
  fy: { year: "jjjj", month: "mm", day: "dd" },
  ga: { year: "bbbb", month: "mm", day: "ll" },
  gd: { year: "bbbb", month: "mm", day: "ll" },
  gl: { year: "aaaa", month: "mm", day: "dd" },
  he: { year: "שנה", month: "חודש", day: "יום" },
  hr: { year: "gggg", month: "mm", day: "dd" },
  hsb: { year: "llll", month: "mm", day: "dd" },
  hu: { year: "éééé", month: "hh", day: "nn" },
  ia: { year: "aaaa", month: "mm", day: "dd" },
  id: { year: "tttt", month: "bb", day: "hh" },
  it: { year: "aaaa", month: "mm", day: "gg" },
  ja: { year: " 年 ", month: "月", day: "日" },
  ka: { year: "წწწწ", month: "თთ", day: "რრ" },
  kk: { year: "жжжж", month: "аа", day: "кк" },
  kn: { year: "ವವವವ", month: "ಮಿಮೀ", day: "ದಿದಿ" },
  ko: { year: "연도", month: "월", day: "일" },
  lb: { year: "jjjj", month: "mm", day: "dd" },
  lo: { year: "ປປປປ", month: "ດດ", day: "ວວ" },
  lt: { year: "mmmm", month: "mm", day: "dd" },
  lv: { year: "gggg", month: "mm", day: "dd" },
  meh: { year: "aaaa", month: "mm", day: "dd" },
  ml: { year: "വർഷം", month: "മാസം", day: "തീയതി" },
  ms: { year: "tttt", month: "mm", day: "hh" },
  nl: { year: "jjjj", month: "mm", day: "dd" },
  nn: { year: "åååå", month: "mm", day: "dd" },
  no: { year: "åååå", month: "mm", day: "dd" },
  oc: { year: "aaaa", month: "mm", day: "jj" },
  pl: { year: "rrrr", month: "mm", day: "dd" },
  pt: { year: "aaaa", month: "mm", day: "dd" },
  rm: { year: "oooo", month: "mm", day: "dd" },
  ro: { year: "aaaa", month: "ll", day: "zz" },
  ru: { year: "гггг", month: "мм", day: "дд" },
  sc: { year: "aaaa", month: "mm", day: "dd" },
  scn: { year: "aaaa", month: "mm", day: "jj" },
  sk: { year: "rrrr", month: "mm", day: "dd" },
  sl: { year: "llll", month: "mm", day: "dd" },
  sr: { year: "гггг", month: "мм", day: "дд" },
  sv: { year: "åååå", month: "mm", day: "dd" },
  szl: { year: "rrrr", month: "mm", day: "dd" },
  tg: { year: "сссс", month: "мм", day: "рр" },
  th: { year: "ปปปป", month: "ดด", day: "วว" },
  tr: { year: "yyyy", month: "aa", day: "gg" },
  uk: { year: "рррр", month: "мм", day: "дд" },
  "zh-CN": { year: "年", month: "月", day: "日" },
  "zh-TW": { year: "年", month: "月", day: "日" }
};
function getPlaceholderObj(locale) {
  if (!isSupportedLocale(locale)) {
    const localeLanguage = getLocaleLanguage(locale);
    if (!isSupportedLocale(localeLanguage)) {
      return placeholders.en;
    } else {
      return placeholders[localeLanguage];
    }
  } else {
    return placeholders[locale];
  }
}
function getPlaceholder(field, value, locale) {
  if (isPlaceholderField(field)) {
    return getPlaceholderObj(locale)[field];
  }
  if (isDefaultField(field)) {
    return value;
  }
  if (isTimeField(field)) {
    return "––";
  }
  return "";
}
function isSupportedLocale(locale) {
  return supportedLocales.includes(locale);
}
function isPlaceholderField(field) {
  return placeholderFields.includes(field);
}
function isTimeField(field) {
  return field === "hour" || field === "minute" || field === "second";
}
function isDefaultField(field) {
  return field === "era" || field === "dayPeriod";
}
function getLocaleLanguage(locale) {
  if (Intl.Locale) {
    return new Intl.Locale(locale).language;
  }
  return locale.split("-")[0];
}
function initAnnouncer() {
  if (!isBrowser)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
const DATE_SEGMENT_PARTS = ["day", "month", "year"];
const TIME_SEGMENT_PARTS = ["hour", "minute", "second", "dayPeriod"];
const NON_EDITABLE_SEGMENT_PARTS = ["literal", "timeZoneName"];
const EDITABLE_SEGMENT_PARTS = [...DATE_SEGMENT_PARTS, ...TIME_SEGMENT_PARTS];
const ALL_SEGMENT_PARTS = [
  ...EDITABLE_SEGMENT_PARTS,
  ...NON_EDITABLE_SEGMENT_PARTS
];
function initializeSegmentValues(granularity) {
  const calendarDateTimeGranularities = ["hour", "minute", "second"];
  const initialParts = EDITABLE_SEGMENT_PARTS.map((part) => {
    if (part === "dayPeriod") {
      return [part, "AM"];
    }
    return [part, null];
  }).filter(([key]) => {
    if (key === "literal" || key === null)
      return false;
    if (granularity === "day") {
      return !calendarDateTimeGranularities.includes(key);
    } else {
      return true;
    }
  });
  return Object.fromEntries(initialParts);
}
function createContentObj(props) {
  const { segmentValues, formatter, locale, dateRef } = props;
  const content = Object.keys(segmentValues).reduce((obj, part) => {
    if (!isSegmentPart(part))
      return obj;
    if ("hour" in segmentValues && part === "dayPeriod") {
      const value = segmentValues[part];
      if (!isNull(value)) {
        obj[part] = value;
      } else {
        obj[part] = getPlaceholder(part, "AM", locale);
      }
    } else {
      obj[part] = getPartContent(part);
    }
    return obj;
  }, {});
  function getPartContent(part) {
    if ("hour" in segmentValues) {
      const value = segmentValues[part];
      if (!isNull(value)) {
        return formatter.part(dateRef.set({ [part]: value }), part, {
          hourCycle: props.hourCycle === 24 ? "h24" : void 0
        });
      } else {
        return getPlaceholder(part, "", locale);
      }
    } else {
      if (isDateSegmentPart(part)) {
        const value = segmentValues[part];
        if (!isNull(value)) {
          return formatter.part(dateRef.set({ [part]: value }), part);
        } else {
          return getPlaceholder(part, "", locale);
        }
      }
      return "";
    }
  }
  return content;
}
function createContentArr(props) {
  const { granularity, dateRef, formatter, contentObj, hideTimeZone, hourCycle } = props;
  const parts = formatter.toParts(dateRef, getOptsByGranularity(granularity, hourCycle));
  const segmentContentArr = parts.map((part) => {
    const defaultParts = ["literal", "dayPeriod", "timeZoneName", null];
    if (defaultParts.includes(part.type) || !isSegmentPart(part.type)) {
      return {
        part: part.type,
        value: part.value
      };
    }
    return {
      part: part.type,
      value: contentObj[part.type]
    };
  }).filter((segment) => {
    if (isNull(segment.part) || isNull(segment.value))
      return false;
    if (segment.part === "timeZoneName" && (!isZonedDateTime(dateRef) || hideTimeZone)) {
      return false;
    }
    return true;
  });
  return segmentContentArr;
}
function createContent(props) {
  const contentObj = createContentObj(props);
  const contentArr = createContentArr({
    contentObj,
    ...props
  });
  return {
    obj: contentObj,
    arr: contentArr
  };
}
function getOptsByGranularity(granularity, hourCycle) {
  const opts = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hourCycle: hourCycle === 24 ? "h24" : void 0,
    hour12: hourCycle === 24 ? false : void 0
  };
  if (granularity === "day") {
    delete opts.second;
    delete opts.hour;
    delete opts.minute;
    delete opts.timeZoneName;
  }
  if (granularity === "hour") {
    delete opts.minute;
  }
  if (granularity === "minute") {
    delete opts.second;
  }
  return opts;
}
function initSegmentStates() {
  return EDITABLE_SEGMENT_PARTS.reduce((acc, key) => {
    acc[key] = {
      lastKeyZero: false,
      hasLeftFocus: true,
      hasTouched: false
    };
    return acc;
  }, {});
}
function isDateSegmentPart(part) {
  return DATE_SEGMENT_PARTS.includes(part);
}
function isSegmentPart(part) {
  return EDITABLE_SEGMENT_PARTS.includes(part);
}
function isAnySegmentPart(part) {
  return ALL_SEGMENT_PARTS.includes(part);
}
function getUsedSegments(id) {
  if (!isBrowser)
    return [];
  const usedSegments = getSegments(id).map((el) => el.dataset.segment).filter((part) => {
    return EDITABLE_SEGMENT_PARTS.includes(part);
  });
  return usedSegments;
}
function getValueFromSegments(props) {
  const { segmentObj, id, dateRef } = props;
  const usedSegments = getUsedSegments(id);
  let date = dateRef;
  usedSegments.forEach((part) => {
    if ("hour" in segmentObj) {
      const value = segmentObj[part];
      if (isNull(value))
        return;
      date = date.set({ [part]: segmentObj[part] });
      return;
    } else if (isDateSegmentPart(part)) {
      const value = segmentObj[part];
      if (isNull(value))
        return;
      date = date.set({ [part]: segmentObj[part] });
      return;
    }
  });
  return date;
}
function areAllSegmentsFilled(segmentValues, id) {
  const usedSegments = getUsedSegments(id);
  return usedSegments.every((part) => {
    if ("hour" in segmentValues) {
      return segmentValues[part] !== null;
    } else if (isDateSegmentPart(part)) {
      return segmentValues[part] !== null;
    }
  });
}
function getPartFromNode(node) {
  const part = node.dataset.segment;
  if (!isAnySegmentPart(part))
    return null;
  return part;
}
function isDateAndTimeSegmentObj(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.entries(obj).every(([key, value]) => {
    const validKey = TIME_SEGMENT_PARTS.includes(key) || DATE_SEGMENT_PARTS.includes(key);
    const validValue = key === "dayPeriod" ? value === "AM" || value === "PM" || value === null : typeof value === "number" || value === null;
    return validKey && validValue;
  });
}
function inferGranularity(value, granularity) {
  if (granularity) {
    return granularity;
  }
  if (hasTime(value)) {
    return "minute";
  }
  return "day";
}
function isAcceptableSegmentKey(key) {
  const acceptableSegmentKeys = [
    kbd.ENTER,
    kbd.ARROW_UP,
    kbd.ARROW_DOWN,
    kbd.ARROW_LEFT,
    kbd.ARROW_RIGHT,
    kbd.BACKSPACE,
    kbd.SPACE
  ];
  if (acceptableSegmentKeys.includes(key))
    return true;
  if (isNumberString(key))
    return true;
  return false;
}
function syncSegmentValues(props) {
  const { value, updatingDayPeriod, segmentValues, formatter } = props;
  const dateValues = DATE_SEGMENT_PARTS.map((part) => {
    return [part, value[part]];
  });
  if ("hour" in value) {
    const timeValues = TIME_SEGMENT_PARTS.map((part) => {
      if (part === "dayPeriod") {
        const $updatingDayPeriod = get(updatingDayPeriod);
        if ($updatingDayPeriod) {
          return [part, $updatingDayPeriod];
        } else {
          return [part, formatter.dayPeriod(toDate(value))];
        }
      }
      return [part, value[part]];
    });
    const mergedSegmentValues = [...dateValues, ...timeValues];
    segmentValues.set(Object.fromEntries(mergedSegmentValues));
    updatingDayPeriod.set(null);
    return;
  }
  segmentValues.set(Object.fromEntries(dateValues));
}
function isFirstSegment(id, fieldId) {
  if (!isBrowser)
    return false;
  const segments = getSegments(fieldId);
  return segments.length ? segments[0].id === id : false;
}
function setDescription(id, formatter, value) {
  if (!isBrowser)
    return;
  const valueString = formatter.selectedDate(value);
  const el = document.getElementById(id);
  if (!el) {
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      display: "none"
    });
    div.id = id;
    div.innerText = `Selected Date: ${valueString}`;
    document.body.appendChild(div);
  } else {
    el.innerText = `Selected Date: ${valueString}`;
  }
}
function removeDescriptionElement$1(id) {
  if (!isBrowser)
    return;
  const el = document.getElementById(id);
  if (!el)
    return;
  document.body.removeChild(el);
}
function handleSegmentNavigation(e, fieldId) {
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentTarget))
    return;
  const { prev, next } = getPrevNextSegments(currentTarget, fieldId);
  if (e.key === kbd.ARROW_LEFT) {
    if (!prev)
      return;
    prev.focus();
  } else if (e.key === kbd.ARROW_RIGHT) {
    if (!next)
      return;
    next.focus();
  }
}
function getNextSegment(node, segments) {
  const index = segments.indexOf(node);
  if (index === segments.length - 1 || index === -1)
    return null;
  const nextIndex = index + 1;
  const nextSegment = segments[nextIndex];
  return nextSegment;
}
function getPrevSegment(node, segments) {
  const index = segments.indexOf(node);
  if (index === 0 || index === -1)
    return null;
  const prevIndex = index - 1;
  const prevSegment = segments[prevIndex];
  return prevSegment;
}
function getPrevNextSegments(node, fieldId) {
  const segments = getSegments(fieldId);
  if (!segments.length) {
    return {
      next: null,
      prev: null
    };
  }
  return {
    next: getNextSegment(node, segments),
    prev: getPrevSegment(node, segments)
  };
}
function moveToNextSegment(e, fieldId) {
  const node = e.currentTarget;
  if (!isHTMLElement(node))
    return;
  const { next } = getPrevNextSegments(node, fieldId);
  if (!next)
    return;
  next.focus();
}
function isSegmentNavigationKey(key) {
  if (key === kbd.ARROW_RIGHT || key === kbd.ARROW_LEFT)
    return true;
  return false;
}
function getSegments(id) {
  const inputContainer = document.getElementById(id);
  if (!isHTMLElement(inputContainer))
    return [];
  const segments = Array.from(inputContainer.querySelectorAll("[data-segment]")).filter((el) => {
    if (!isHTMLElement(el))
      return false;
    const segment = el.dataset.segment;
    if (segment === "trigger")
      return true;
    if (!isAnySegmentPart(segment) || segment === "literal")
      return false;
    return true;
  });
  return segments;
}
function getFirstSegment(id) {
  const segments = getSegments(id);
  return segments[0];
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = endOfMonth(dateObj);
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get(placeholder)));
}
const defaults$5 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const defaults$4 = {
  isDateUnavailable: void 0,
  value: void 0,
  hourCycle: void 0,
  locale: "en",
  granularity: void 0,
  hideTimeZone: false,
  disabled: false,
  readonly: false,
  readonlySegments: void 0,
  name: void 0,
  required: false,
  minValue: void 0,
  maxValue: void 0
};
const prefix = "dateField";
const { name: name$3 } = createElHelpers(prefix);
const dateFieldIdParts = [
  "field",
  "label",
  "description",
  "validation",
  "day",
  "month",
  "year",
  "hour",
  "minute",
  "second",
  "dayPeriod",
  "timeZoneName"
];
function createDateField(props) {
  const withDefaults = { ...defaults$4, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "placeholder", "ids"));
  const { locale, granularity, hourCycle, hideTimeZone, isDateUnavailable, disabled, readonly, readonlySegments, name: nameStore, required, minValue, maxValue } = options;
  const defaultDate = getDefaultDate({
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity,
    defaultValue: withDefaults.defaultValue
  });
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const isInvalid = derived([value, isDateUnavailable, minValue, maxValue], ([$value, $isDateUnavailable, $minValue, $maxValue]) => {
    if (!$value)
      return false;
    if ($isDateUnavailable?.($value))
      return true;
    if ($minValue && isBefore($value, $minValue))
      return true;
    if ($maxValue && isBefore($maxValue, $value))
      return true;
    return false;
  });
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const inferredGranularity = withGet.derived([placeholder, granularity], ([$placeholder, $granularity]) => {
    if ($granularity) {
      return $granularity;
    } else {
      return inferGranularity($placeholder, $granularity);
    }
  });
  const formatter = createFormatter(locale.get());
  const initialSegments = initializeSegmentValues(inferredGranularity.get());
  const segmentValues = withGet.writable(structuredClone(initialSegments));
  let announcer = getAnnouncer();
  const updatingDayPeriod = writable(null);
  const readonlySegmentsSet = withGet(derived(readonlySegments, ($readonlySegments) => new Set($readonlySegments)));
  const ids = toWritableStores({ ...generateIds(dateFieldIdParts), ...withDefaults.ids });
  const idValues = derived([
    ids.field,
    ids.label,
    ids.description,
    ids.validation,
    ids.day,
    ids.month,
    ids.year,
    ids.hour,
    ids.minute,
    ids.second,
    ids.dayPeriod,
    ids.timeZoneName
  ], ([$fieldId, $labelId, $descriptionId, $validationId, $dayId, $monthId, $yearId, $hourId, $minuteId, $secondId, $dayPeriodId, $timeZoneNameId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId,
      day: $dayId,
      month: $monthId,
      year: $yearId,
      hour: $hourId,
      minute: $minuteId,
      second: $secondId,
      dayPeriod: $dayPeriodId,
      timeZoneName: $timeZoneNameId
    };
  });
  const defaultSegmentAttrs = {
    role: "spinbutton",
    contenteditable: true,
    tabindex: 0,
    spellcheck: false,
    inputmode: "numeric",
    autocorrect: "off",
    enterkeyhint: "next",
    style: styleToString({
      "caret-color": "transparent"
    })
  };
  const states = initSegmentStates();
  const allSegmentContent = derived([segmentValues, locale, inferredGranularity, hideTimeZone, hourCycle], ([$segmentValues, $locale, $inferredGranularity, $hideTimeZone, $hourCycle]) => {
    return createContent({
      segmentValues: $segmentValues,
      formatter,
      locale: $locale,
      granularity: $inferredGranularity,
      dateRef: placeholder.get(),
      hideTimeZone: $hideTimeZone,
      hourCycle: $hourCycle
    });
  });
  const segmentContents = derived(allSegmentContent, ($allSegmentContent) => $allSegmentContent.arr);
  const segmentContentsObj = derived(allSegmentContent, ($allSegmentContent) => $allSegmentContent.obj);
  const label = makeElement(name$3("label"), {
    stores: [isInvalid, disabled, ids.label],
    returned: ([$isInvalid, $disabled, $labelId]) => {
      return {
        id: $labelId,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const firstSegment = getFirstSegment(ids.field.get());
        if (!firstSegment)
          return;
        sleep(1).then(() => firstSegment.focus());
      }), addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const validation = makeElement(name$3("validation"), {
    stores: [isInvalid, ids.validation],
    returned: ([$isInvalid, $validationId]) => {
      const validStyle = styleToString({
        display: "none"
      });
      return {
        id: $validationId,
        "data-invalid": $isInvalid ? "" : void 0,
        style: $isInvalid ? void 0 : validStyle
      };
    }
  });
  const hiddenInput = createHiddenInput({
    prefix,
    value: derived(value, ($value) => $value?.toString() ?? ""),
    name: nameStore,
    disabled,
    required
  });
  const fieldIdDeps = derived([ids.field, ids.label, ids.description, ids.label], ([$fieldId, $labelId, $descriptionId, $validationId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId
    };
  });
  const field = makeElement(name$3("field"), {
    stores: [value, isInvalid, disabled, readonly, fieldIdDeps],
    returned: ([$value, $isInvalid, $disabled, $readonly, $ids]) => {
      const describedBy = $value ? `${$ids.description}${$isInvalid ? ` ${$ids.validation}` : ""}` : `${$ids.description}`;
      return {
        role: "group",
        id: $ids.field,
        "aria-labelledby": $ids.label,
        "aria-describedby": describedBy,
        "aria-disabled": $disabled ? "true" : void 0,
        "aria-readonly": $readonly ? "true" : void 0,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    // even if we don't need the element we need to specify it
    // or TS will complain when svelte tries to pass it
    action: (_node) => {
      announcer = getAnnouncer();
      return {
        destroy() {
          removeDescriptionElement$1(ids.description.get());
        }
      };
    }
  });
  const segmentBuilders = {
    day: {
      attrs: daySegmentAttrs,
      action: daySegmentAction
    },
    month: {
      attrs: monthSegmentAttrs,
      action: monthSegmentAction
    },
    year: {
      attrs: yearSegmentAttrs,
      action: yearSegmentAction
    },
    hour: {
      attrs: hourSegmentAttrs,
      action: hourSegmentAction
    },
    minute: {
      attrs: minuteSegmentAttrs,
      action: minuteSegmentAction
    },
    second: {
      attrs: secondSegmentAttrs,
      action: secondSegmentAction
    },
    dayPeriod: {
      attrs: dayPeriodSegmentAttrs,
      action: dayPeriodSegmentAction
    },
    literal: {
      attrs: literalSegmentAttrs,
      action: literalSegmentAction
    },
    timeZoneName: {
      attrs: timeZoneSegmentAttrs,
      action: timeZoneSegmentAction
    }
  };
  const segment = makeElement(name$3("segment"), {
    stores: [
      segmentValues,
      hourCycle,
      placeholder,
      value,
      isInvalid,
      disabled,
      readonly,
      readonlySegmentsSet,
      idValues,
      locale
    ],
    returned: ([$segmentValues, $hourCycle, $placeholder, $value, $isInvalid, $disabled, $readonly, $readonlySegmentsSet, $idValues, _]) => {
      const props2 = {
        segmentValues: $segmentValues,
        hourCycle: $hourCycle,
        placeholder: $placeholder,
        ids: $idValues
      };
      return (part) => {
        const inReadonlySegments = $readonlySegmentsSet.has(part);
        const defaultAttrs = {
          ...getSegmentAttrs(part, props2),
          "aria-invalid": $isInvalid ? "true" : void 0,
          "aria-disabled": $disabled ? "true" : void 0,
          "aria-readonly": $readonly || inReadonlySegments ? "true" : void 0,
          "data-invalid": $isInvalid ? "" : void 0,
          "data-disabled": $disabled ? "" : void 0,
          "data-segment": `${part}`
        };
        if (part === "literal") {
          return defaultAttrs;
        }
        const id = $idValues[part];
        const hasDescription = isFirstSegment(id, $idValues.field) || $value;
        const describedBy = hasDescription ? `${hasDescription} ${$isInvalid ? $idValues.validation : ""}` : void 0;
        return {
          ...defaultAttrs,
          id: $idValues[part],
          "aria-labelledby": getLabelledBy(part),
          contenteditable: $readonly || inReadonlySegments || $disabled ? false : true,
          "aria-describedby": describedBy,
          tabindex: $disabled ? void 0 : 0
        };
      };
    },
    action: (node) => getSegmentAction(node)
  });
  function updateSegment(part, cb) {
    if (disabled.get() || readonly.get() || readonlySegmentsSet.get().has(part))
      return;
    segmentValues.update((prev) => {
      const dateRef = placeholder.get();
      if (isDateAndTimeSegmentObj(prev)) {
        const pVal = prev[part];
        const castCb = cb;
        if (part === "month") {
          const next2 = castCb(pVal);
          if (part === "month" && next2 !== null && prev.day !== null) {
            const date = dateRef.set({ month: next2 });
            const daysInMonth = getDaysInMonth(toDate(date));
            if (prev.day > daysInMonth) {
              prev.day = daysInMonth;
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        } else if (part === "dayPeriod") {
          const next2 = castCb(pVal);
          updatingDayPeriod.set(next2);
          const date = placeholder.get();
          if ("hour" in date) {
            const trueHour = date.hour;
            if (next2 === "AM") {
              if (trueHour >= 12) {
                prev.hour = trueHour - 12;
              }
            } else if (next2 === "PM") {
              if (trueHour < 12) {
                prev.hour = trueHour + 12;
              }
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        } else if (part === "hour") {
          const next2 = castCb(pVal);
          if (next2 !== null && prev.dayPeriod !== null) {
            const dayPeriod = formatter.dayPeriod(toDate(dateRef.set({ hour: next2 })));
            if (dayPeriod === "AM" || dayPeriod === "PM") {
              prev.dayPeriod = dayPeriod;
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        }
        const next = castCb(pVal);
        return {
          ...prev,
          [part]: next
        };
      } else if (isDateSegmentPart(part)) {
        const pVal = prev[part];
        const castCb = cb;
        const next = castCb(pVal);
        if (part === "month" && next !== null && prev.day !== null) {
          const date = dateRef.set({ month: next });
          const daysInMonth = getDaysInMonth(toDate(date));
          if (prev.day > daysInMonth) {
            prev.day = daysInMonth;
          }
        }
        return {
          ...prev,
          [part]: next
        };
      }
      return prev;
    });
    const $segmentValues = segmentValues.get();
    const $fieldId = ids.field.get();
    if (areAllSegmentsFilled($segmentValues, $fieldId)) {
      value.set(getValueFromSegments({
        segmentObj: $segmentValues,
        id: $fieldId,
        dateRef: placeholder.get()
      }));
      updatingDayPeriod.set(null);
    } else {
      value.set(void 0);
      segmentValues.set($segmentValues);
    }
  }
  function handleSegmentKeydown(e, part) {
    const $disabled = disabled.get();
    if (e.key !== kbd.TAB) {
      e.preventDefault();
    }
    if ($disabled)
      return;
    const segmentKeydownHandlers = {
      day: handleDaySegmentKeydown,
      month: handleMonthSegmentKeydown,
      year: handleYearSegmentKeydown,
      hour: handleHourSegmentKeydown,
      minute: handleMinuteSegmentKeydown,
      second: handleSecondSegmentKeydown,
      dayPeriod: handleDayPeriodSegmentKeydown,
      timeZoneName: handleTimeZoneSegmentKeydown
    };
    segmentKeydownHandlers[part](e);
  }
  function handleSegmentClick(e) {
    const $disabled = disabled.get();
    if ($disabled) {
      e.preventDefault();
      return;
    }
  }
  function daySegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.day === null;
    const date = segmentValues2.day ? placeholder2.set({ day: segmentValues2.day }) : placeholder2;
    const valueNow = date.day;
    const valueMin = 1;
    const valueMax = getDaysInMonth(toDate(date));
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.day,
      "aria-label": `day,`,
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function daySegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "day")), addMeltEventListener(node, "focusout", () => states.day.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleDaySegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    const $segmentMonthValue = segmentValues.get().month;
    const $placeholder = placeholder.get();
    const daysInMonth = $segmentMonthValue ? getDaysInMonth($placeholder.set({ month: $segmentMonthValue })) : getDaysInMonth($placeholder);
    if (e.key === kbd.ARROW_UP) {
      updateSegment("day", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.day;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ day: prev }).cycle("day", 1).day;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("day", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.day;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ day: prev }).cycle("day", -1).day;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("day", (prev) => {
        const max = daysInMonth;
        const maxStart = Math.floor(max / 10);
        if (states.day.hasLeftFocus) {
          prev = null;
          states.day.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.day.lastKeyZero = true;
            return null;
          }
          if (states.day.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.day.lastKeyZero = false;
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart || total > max) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      const currentTarget = e.currentTarget;
      if (!isHTMLElement(currentTarget))
        return;
      updateSegment("day", (prev) => {
        if (prev === null)
          return null;
        const str = prev.toString();
        if (str.length === 1)
          return null;
        return parseInt(str.slice(0, -1));
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function monthSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.month === null;
    const date = segmentValues2.month ? placeholder2.set({ month: segmentValues2.month }) : placeholder2;
    const valueNow = date.month;
    const valueMin = 1;
    const valueMax = 12;
    const valueText = isEmpty ? "Empty" : `${valueNow} - ${formatter.fullMonth(toDate(date))}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.month,
      "aria-label": "month, ",
      contenteditable: true,
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function monthSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "month")), addMeltEventListener(node, "focusout", () => states.month.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleMonthSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    const $placeholder = placeholder.get();
    function getMonthAnnouncement(month) {
      return `${month} - ${formatter.fullMonth(toDate($placeholder.set({ month })))}`;
    }
    const max = 12;
    states.month.hasTouched = true;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("month", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.month;
          announcer.announce(getMonthAnnouncement(next2));
          return next2;
        }
        const next = $placeholder.set({ month: prev }).cycle("month", 1);
        announcer.announce(getMonthAnnouncement(next.month));
        return next.month;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("month", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.month;
          announcer.announce(getMonthAnnouncement(next2));
          return next2;
        }
        const next = $placeholder.set({ month: prev }).cycle("month", -1).month;
        announcer.announce(getMonthAnnouncement(next));
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("month", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.month.hasLeftFocus) {
          prev = null;
          states.month.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.month.lastKeyZero = true;
            announcer.announce(null);
            return null;
          }
          if (states.month.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.month.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.month.hasLeftFocus = false;
      updateSegment("month", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(getMonthAnnouncement(next));
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function yearSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.year === null;
    const date = segmentValues2.year ? placeholder2.set({ year: segmentValues2.year }) : placeholder2;
    const valueMin = 1;
    const valueMax = 9999;
    const valueNow = date.year;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.year,
      "aria-label": "year, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function yearSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "year")), addMeltEventListener(node, "focusout", () => states.year.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleYearSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    states.year.hasTouched = true;
    const $placeholder = placeholder.get();
    if (e.key === kbd.ARROW_UP) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.year;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ year: prev }).cycle("year", 1).year;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.year;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ year: prev }).cycle("year", -1).year;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      let moveToNext = false;
      const num = parseInt(e.key);
      updateSegment("year", (prev) => {
        if (states.year.hasLeftFocus) {
          prev = null;
          states.year.hasLeftFocus = false;
        }
        if (prev === null) {
          announcer.announce(num);
          return num;
        }
        const str = prev.toString() + num.toString();
        if (str.length > 4) {
          announcer.announce(num);
          return num;
        }
        if (str.length === 4) {
          moveToNext = true;
        }
        const int = parseInt(str);
        announcer.announce(int);
        return int;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function hourSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, hourCycle: hourCycle2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("hour" in segmentValues2) || !("hour" in placeholder2))
      return {};
    const isEmpty = segmentValues2.hour === null;
    const date = segmentValues2.hour ? placeholder2.set({ hour: segmentValues2.hour }) : placeholder2;
    const valueMin = hourCycle2 === 12 ? 1 : 0;
    const valueMax = hourCycle2 === 12 ? 12 : 23;
    const valueNow = date.hour;
    const valueText = isEmpty ? "Empty" : `${valueNow} ${segmentValues2.dayPeriod ?? ""}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.hour,
      "aria-label": "hour, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function hourSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "hour")), addMeltEventListener(node, "focusout", () => states.hour.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleHourSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key) || !("hour" in dateRef)) {
      return;
    }
    states.hour.hasTouched = true;
    const $hourCycle = hourCycle.get();
    if (e.key === kbd.ARROW_UP) {
      updateSegment("hour", (prev) => {
        if (prev === null) {
          const next2 = dateRef.cycle("hour", 1, { hourCycle: $hourCycle }).hour;
          announcer.announce(next2);
          return next2;
        }
        const next = dateRef.set({ hour: prev }).cycle("hour", 1, { hourCycle: $hourCycle }).hour;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("hour", (prev) => {
        if (prev === null) {
          const next2 = dateRef.cycle("hour", -1, { hourCycle: $hourCycle }).hour;
          announcer.announce(next2);
          return next2;
        }
        const next = dateRef.set({ hour: prev }).cycle("hour", -1, { hourCycle: $hourCycle }).hour;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("hour", (prev) => {
        const maxStart = Math.floor(24 / 10);
        if (states.hour.hasLeftFocus) {
          prev = null;
          states.hour.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.hour.lastKeyZero = true;
            announcer.announce(null);
            return null;
          }
          if (states.hour.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.hour.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > 24) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.hour.hasLeftFocus = false;
      updateSegment("hour", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function minuteSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("minute" in segmentValues2) || !("minute" in placeholder2))
      return {};
    const isEmpty = segmentValues2.minute === null;
    const date = segmentValues2.minute ? placeholder2.set({ minute: segmentValues2.minute }) : placeholder2;
    const valueNow = date.minute;
    const valueMin = 0;
    const valueMax = 59;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.minute,
      "aria-label": "minute, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function minuteSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "minute")), addMeltEventListener(node, "focusout", () => states.minute.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleMinuteSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key) || !("minute" in dateRef)) {
      return;
    }
    states.minute.hasTouched = true;
    const min = 0;
    const max = 59;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce(min);
          return min;
        }
        const next = dateRef.set({ minute: prev }).cycle("minute", 1).minute;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce(max);
          return max;
        }
        const next = dateRef.set({ minute: prev }).cycle("minute", -1).minute;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("minute", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.minute.hasLeftFocus) {
          prev = null;
          states.minute.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.minute.lastKeyZero = true;
            announcer.announce(null);
            return 0;
          }
          if (states.minute.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.minute.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.minute.hasLeftFocus = false;
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce("Empty");
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce("Empty");
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function secondSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("second" in segmentValues2) || !("second" in placeholder2))
      return {};
    const isEmpty = segmentValues2.second === null;
    const date = segmentValues2.second ? placeholder2.set({ second: segmentValues2.second }) : placeholder2;
    const valueNow = date.second;
    const valueMin = 0;
    const valueMax = 59;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.second,
      "aria-label": "second, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function secondSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "second")), addMeltEventListener(node, "focusout", () => states.second.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleSecondSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    states.second.hasTouched = true;
    const min = 0;
    const max = 59;
    if (!("second" in dateRef))
      return;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(min);
          return min;
        }
        const next = dateRef.set({ second: prev }).cycle("second", 1).second;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(max);
          return max;
        }
        const next = dateRef.set({ second: prev }).cycle("second", -1).second;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("second", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.second.hasLeftFocus) {
          prev = null;
          states.second.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.second.lastKeyZero = true;
            announcer.announce(null);
            return 0;
          }
          if (states.second.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.second.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.second.hasLeftFocus = false;
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function dayPeriodSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, ids: ids2 } = props2;
    if (!("dayPeriod" in segmentValues2))
      return {};
    const valueMin = 0;
    const valueMax = 12;
    const valueNow = segmentValues2.dayPeriod ?? 0;
    const valueText = segmentValues2.dayPeriod ?? "AM";
    return {
      ...defaultSegmentAttrs,
      inputmode: "text",
      id: ids2.dayPeriod,
      "aria-label": "AM/PM",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function dayPeriodSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "dayPeriod")), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleDayPeriodSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key) && e.key !== kbd.A && e.key !== kbd.P) {
      return;
    }
    if (e.key === kbd.ARROW_UP || e.key === kbd.ARROW_DOWN) {
      updateSegment("dayPeriod", (prev) => {
        if (prev === "AM") {
          const next2 = "PM";
          announcer.announce(next2);
          return next2;
        }
        const next = "AM";
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.BACKSPACE) {
      states.second.hasLeftFocus = false;
      updateSegment("dayPeriod", () => {
        const next = "AM";
        announcer.announce(next);
        return "AM";
      });
    }
    if (e.key === "a") {
      updateSegment("dayPeriod", () => {
        const next = "AM";
        announcer.announce(next);
        return "AM";
      });
    }
    if (e.key === "p") {
      updateSegment("dayPeriod", () => {
        const next = "PM";
        announcer.announce(next);
        return "PM";
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, ids.field.get());
    }
  }
  function literalSegmentAttrs(_) {
    return {
      "aria-hidden": true,
      "data-segment": "literal"
    };
  }
  function literalSegmentAction(_) {
    return {
      destroy: noop
    };
  }
  function timeZoneSegmentAttrs(_) {
    return {
      role: "textbox",
      "aria-label": "timezone, ",
      "data-readonly": true,
      "data-segment": "timeZoneName",
      tabindex: 0,
      style: styleToString({
        "caret-color": "transparent"
      })
    };
  }
  function timeZoneSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "timeZoneName")), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleTimeZoneSegmentKeydown(e) {
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, ids.field.get());
    }
  }
  function getSegmentAttrs(part, props2) {
    return segmentBuilders[part]?.attrs(props2);
  }
  function getSegmentAction(node) {
    const part = getPartFromNode(node);
    if (!part) {
      throw new Error("No segment part found");
    }
    return segmentBuilders[part].action(node);
  }
  function getLabelledBy(part) {
    return `${ids[part].get()} ${ids.label.get()}`;
  }
  effect(locale, ($locale) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect(value, ($value) => {
    if ($value) {
      setDescription(ids.description.get(), formatter, $value);
    }
    if ($value && placeholder.get() !== $value) {
      placeholder.set($value);
    }
  });
  effect([value, locale], ([$value, _]) => {
    if ($value) {
      syncSegmentValues({
        value: $value,
        segmentValues,
        formatter,
        updatingDayPeriod
      });
    } else {
      segmentValues.set(structuredClone(initialSegments));
    }
  });
  const _isDateUnavailable = derived(isDateUnavailable, ($isDateUnavailable) => {
    return (date) => $isDateUnavailable?.(date);
  });
  return {
    elements: {
      field,
      segment,
      label,
      hiddenInput,
      validation
    },
    states: {
      value,
      segmentValues,
      segmentContents,
      segmentContentsObj,
      placeholder: placeholder.toWritable(),
      isInvalid
    },
    helpers: {
      isDateUnavailable: _isDateUnavailable
    },
    options,
    ids
  };
}
function pickerOpenFocus(defaultEl) {
  const el = document.querySelector("[data-melt-calendar-cell][data-focused]");
  if (isHTMLElement(el)) {
    return el;
  }
  if (isHTMLElement(defaultEl)) {
    return defaultEl;
  }
  return null;
}
({
  ...omit(defaults$5, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function removeDescriptionElement(id) {
  if (!isBrowser)
    return;
  const el = document.getElementById(id);
  if (!el)
    return;
  document.body.removeChild(el);
}
const defaults$3 = {
  isDateUnavailable: void 0,
  value: void 0,
  hourCycle: void 0,
  locale: "en",
  granularity: void 0,
  hideTimeZone: false,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  startName: void 0,
  endName: void 0,
  disabled: false,
  readonly: false,
  readonlySegments: void 0,
  minValue: void 0,
  maxValue: void 0
};
const { name: name$2 } = createElHelpers("dateField");
const rangeFieldIdParts = ["field", "label", "description", "validation"];
function createDateRangeField(props) {
  const withDefaults = { ...defaults$3, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "placeholder"));
  const generatedIds = generateIds(rangeFieldIdParts);
  const ids = toWritableStores({ ...generatedIds, ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity
  });
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const startValue = withGet.writable(value.get()?.start ?? withDefaults.defaultValue?.start);
  const endValue = withGet.writable(value.get()?.end ?? withDefaults.defaultValue?.end);
  const isCompleted = derived(value, ($value) => {
    return $value?.start && $value?.end;
  });
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const startField = createDateField({
    ...omit(withDefaults, "defaultValue", "onValueChange", "startName", "endName", "readonlySegments"),
    value: startValue,
    name: withDefaults.startName,
    readonlySegments: withDefaults.readonlySegments?.start,
    ids: {
      ...generatedIds,
      ...withDefaults.ids,
      ...withDefaults.startIds
    }
  });
  const endField = createDateField({
    ...omit(withDefaults, "defaultValue", "onValueChange", "endName", "startName", "readonlySegments"),
    value: endValue,
    name: withDefaults.endName,
    readonlySegments: withDefaults.readonlySegments?.end,
    ids: {
      ...generatedIds,
      ...withDefaults.ids,
      ...withDefaults.endIds
    }
  });
  const { elements: { segment: startSegment, hiddenInput: startHiddenInput }, states: { isInvalid: isStartInvalid, segmentContents: startSegmentContents, segmentValues: startSegmentValues }, options: { name: startName } } = startField;
  const { elements: { segment: endSegment, hiddenInput: endHiddenInput }, states: { isInvalid: isEndInvalid, segmentContents: endSegmentContents, segmentValues: endSegmentValues }, options: { name: endName } } = endField;
  const isInvalid = derived([value, isStartInvalid, isEndInvalid, options.isDateUnavailable], ([$value, $isStartInvalid, $isEndInvalid, $isDateUnavailable]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if (!$value?.start || !$value?.end) {
      return false;
    }
    if (!isBeforeOrSame($value?.start, $value?.end)) {
      return true;
    }
    if ($isDateUnavailable !== void 0) {
      const allValid = areAllDaysBetweenValid($value?.start, $value?.end, $isDateUnavailable, void 0);
      if (!allValid) {
        return true;
      }
    }
    return false;
  });
  const label = makeElement(name$2("label"), {
    stores: [isInvalid, options.disabled, ids.label],
    returned: ([$isInvalid, $disabled, $labelId]) => {
      return {
        id: $labelId,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const firstSegment = getFirstSegment(ids.field.get());
        if (!firstSegment)
          return;
        sleep(1).then(() => firstSegment.focus());
      }), addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const fieldIdDeps = derived([ids.field, ids.label, ids.description, ids.validation], ([$fieldId, $labelId, $descriptionId, $validationId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId
    };
  });
  const field = makeElement(name$2("field"), {
    stores: [isCompleted, isInvalid, fieldIdDeps],
    returned: ([$isCompleted, $isInvalid, $ids]) => {
      const describedBy = $isCompleted ? `${$ids.description}${$isInvalid ? ` ${$ids.validation}` : ""}` : `${$ids.description}`;
      return {
        role: "group",
        id: $ids.field,
        "aria-labelledby": $ids.label,
        "aria-describedby": describedBy,
        "data-invalid": $isInvalid ? "" : void 0
      };
    },
    action: () => {
      getAnnouncer();
      return {
        destroy() {
          removeDescriptionElement(ids.description.get());
        }
      };
    }
  });
  const validation = makeElement(name$2("validation"), {
    stores: [isInvalid, ids.validation],
    returned: ([$isInvalid, $validationId]) => {
      const validStyle = styleToString({
        display: "none"
      });
      return {
        id: $validationId,
        "data-invalid": $isInvalid ? "" : void 0,
        style: $isInvalid ? void 0 : validStyle
      };
    }
  });
  const segmentContents = derived([startSegmentContents, endSegmentContents], ([$startSegmentContents, $endSegmentContents]) => {
    return {
      start: $startSegmentContents,
      end: $endSegmentContents
    };
  });
  effect([value], ([$value]) => {
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = value.get();
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        return {
          start: $startValue,
          end: $endValue
        };
      });
    } else if ($value && $value?.start && $value?.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  effect([options.disabled], ([$disabled]) => {
    startField.options.disabled.set($disabled);
    endField.options.disabled.set($disabled);
  });
  effect([options.readonly], ([$readonly]) => {
    startField.options.readonly.set($readonly);
    endField.options.readonly.set($readonly);
  });
  effect([options.readonlySegments], ([$readonlySegments]) => {
    startField.options.readonlySegments.set($readonlySegments?.start);
    endField.options.readonlySegments.set($readonlySegments?.end);
  });
  effect([options.minValue], ([$minValue]) => {
    startField.options.minValue.set($minValue);
    endField.options.minValue.set($minValue);
  });
  effect([options.maxValue], ([$maxValue]) => {
    startField.options.maxValue.set($maxValue);
    endField.options.maxValue.set($maxValue);
  });
  effect([options.granularity], ([$granularity]) => {
    startField.options.granularity.set($granularity);
    endField.options.granularity.set($granularity);
  });
  effect([options.hideTimeZone], ([$hideTimeZone]) => {
    startField.options.hideTimeZone.set($hideTimeZone);
    endField.options.hideTimeZone.set($hideTimeZone);
  });
  effect([options.hourCycle], ([$hourCycle]) => {
    startField.options.hourCycle.set($hourCycle);
    endField.options.hourCycle.set($hourCycle);
  });
  effect([options.locale], ([$locale]) => {
    startField.options.locale.set($locale);
    endField.options.locale.set($locale);
  });
  return {
    elements: {
      field,
      label,
      startSegment,
      endSegment,
      startHiddenInput,
      endHiddenInput,
      validation
    },
    states: {
      value,
      placeholder: placeholder.toWritable(),
      segmentContents,
      endSegmentValues,
      startSegmentValues,
      isInvalid
    },
    options: {
      ...options,
      endName,
      startName
    },
    ids: {
      field: ids,
      start: startField.ids,
      end: endField.ids
    }
  };
}
const defaults$2 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  escapeBehavior: "close",
  closeOnOutsideClick: true,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  onOutsideClick: void 0
};
function createDateRangePicker(props) {
  const withDefaults = { ...defaults$2, ...props };
  const rangeField = createDateRangeField(withDefaults);
  const { states: { value, placeholder: rfPlaceholder } } = rangeField;
  const calendar = createRangeCalendar({
    ...omit(withDefaults, "onValueChange"),
    placeholder: rfPlaceholder,
    value,
    ids: withDefaults.calendarIds
  });
  const popover = createPopover({
    positioning: withDefaults.positioning,
    arrowSize: withDefaults.arrowSize,
    defaultOpen: withDefaults.defaultOpen,
    open: withDefaults.open,
    disableFocusTrap: withDefaults.disableFocusTrap,
    escapeBehavior: withDefaults.escapeBehavior,
    preventScroll: withDefaults.preventScroll,
    onOpenChange: withDefaults.onOpenChange,
    closeOnOutsideClick: withDefaults.closeOnOutsideClick,
    portal: withDefaults.portal,
    forceVisible: withDefaults.forceVisible,
    openFocus: pickerOpenFocus,
    onOutsideClick: withDefaults.onOutsideClick
  });
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { locale } = options;
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity
  });
  const formatter = createFormatter(locale.get());
  const placeholder = dateStore(rfPlaceholder, withDefaults.defaultPlaceholder ?? defaultDate);
  const trigger = makeElement("popover-trigger", {
    stores: [popover.elements.trigger, options.disabled],
    returned: ([$trigger, $disabled]) => {
      return {
        ...omit($trigger, "action"),
        "aria-label": "Open date picker",
        "data-segment": "trigger",
        disabled: $disabled ? true : void 0
      };
    },
    action: (node) => {
      const unsubKeydown = addMeltEventListener(node, "keydown", handleTriggerKeydown);
      const { destroy } = popover.elements.trigger(node);
      return {
        destroy() {
          destroy?.();
          unsubKeydown();
        }
      };
    }
  });
  effect([options.locale], ([$locale]) => {
    rangeField.options.locale.set($locale);
    calendar.options.locale.set($locale);
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([options.weekdayFormat], ([$weekdayFormat]) => {
    calendar.options.weekdayFormat.set($weekdayFormat);
  });
  effect([options.disabled], ([$disabled]) => {
    rangeField.options.disabled.set($disabled);
    calendar.options.disabled.set($disabled);
  });
  effect([options.readonly], ([$readonly]) => {
    rangeField.options.readonly.set($readonly);
    calendar.options.readonly.set($readonly);
  });
  effect([options.minValue], ([$minValue]) => {
    rangeField.options.minValue.set($minValue);
    calendar.options.minValue.set($minValue);
  });
  effect([options.maxValue], ([$maxValue]) => {
    rangeField.options.maxValue.set($maxValue);
    calendar.options.maxValue.set($maxValue);
  });
  effect([popover.states.open], ([$open]) => {
    if (!$open) {
      const $value = value.get();
      if ($value?.start) {
        placeholder.set($value.start);
      } else {
        placeholder.reset();
      }
    }
  });
  effect([options.onOutsideClick], ([$onOutsideClick]) => {
    popover.options.onOutsideClick.set($onOutsideClick);
  });
  const rangeFieldOptions = omit(rangeField.options, "locale", "disabled", "readonly", "minValue", "maxValue");
  const rangeCalendarOptions = omit(calendar.options, "locale", "disabled", "readonly", "minValue", "maxValue");
  function handleTriggerKeydown(e) {
    if (isSegmentNavigationKey(e.key)) {
      e.preventDefault();
      handleSegmentNavigation(e, rangeField.ids.field.field.get());
    }
  }
  return {
    elements: {
      ...calendar.elements,
      ...rangeField.elements,
      ...popover.elements,
      trigger
    },
    states: {
      ...rangeField.states,
      ...calendar.states,
      placeholder: placeholder.toWritable(),
      value,
      ...popover.states
    },
    helpers: {
      ...calendar.helpers
    },
    options: {
      ...rangeFieldOptions,
      ...rangeCalendarOptions,
      ...options,
      ...popover.options
    },
    ids: {
      rangeField: rangeField.ids,
      calendar: calendar.ids,
      popover: popover.ids
    }
  };
}
const defaults$1 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  escapeBehavior: "close",
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: "body",
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0,
  preventTextSelectionOverflow: true
};
const { name: name$1 } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults$1, ...args };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, escapeBehavior, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick, preventTextSelectionOverflow: preventTextSelectionOverflow2 } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  function handleClose() {
    open.set(false);
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = makeElement(name$1("content"), {
    stores: [isVisible, open, activeTrigger, portal, ids.content],
    returned: ([$isVisible, $open, $activeTrigger, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: $isVisible ? void 0 : styleToString({ display: "none" }),
        id: $contentId,
        "data-state": $open && $activeTrigger ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, activeTrigger, positioning, disableFocusTrap, closeOnOutsideClick, portal], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              focusTrap: $disableFocusTrap ? null : void 0,
              modal: {
                shouldCloseOnInteractOutside,
                onClose: handleClose,
                closeOnInteractOutside: $closeOnOutsideClick
              },
              escapeKeydown: { behaviorType: escapeBehavior },
              portal: getPortalDestination(node, $portal),
              preventTextSelectionOverflow: { enabled: preventTextSelectionOverflow2 }
            }
          }).destroy;
        });
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  async function toggleOpen() {
    open.update((prev) => !prev);
  }
  function shouldCloseOnInteractOutside(e) {
    onOutsideClick.get()?.(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return false;
    }
    return true;
  }
  const trigger = makeElement(name$1("trigger"), {
    stores: [isVisible, ids.content, ids.trigger],
    returned: ([$isVisible, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $isVisible ? "true" : "false",
        "data-state": stateAttr($isVisible),
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      activeTrigger.set(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "click", toggleOpen), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy() {
          activeTrigger.set(null);
          unsub();
        }
      };
    }
  });
  const overlay = makeElement(name$1("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubDerived = noop;
      let unsubPortal = noop;
      unsubDerived = effect([portal], ([$portal]) => {
        unsubPortal();
        if ($portal === null)
          return;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return;
        unsubPortal = usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubDerived();
          unsubPortal();
        }
      };
    }
  });
  const arrow2 = makeElement(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = makeElement(name$1("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser || !$open)
      return;
    const unsubs = [];
    if ($preventScroll) {
      unsubs.push(removeScroll());
    }
    handleFocus({ prop: openFocus.get(), defaultEl: $activeTrigger });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(open, ($open) => {
    if (!isBrowser || $open)
      return;
    const triggerEl = document.getElementById(ids.trigger.get());
    handleFocus({ prop: closeFocus.get(), defaultEl: triggerEl });
  }, { skipFirstRun: true });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close,
      overlay
    },
    states: {
      open
    },
    options
  };
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name } = createElHelpers("calendar");
const rangeCalendarIdParts = ["calendar", "accessibleHeading"];
function createRangeCalendar(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, disabled, readonly, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(rangeCalendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder
  });
  const formatter = createFormatter(locale.get());
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  if (!value.get()) {
    value.set(withDefaults.defaultValue);
  }
  const startValue = withGet(writable(value.get().start ?? withDefaults.defaultValue?.start));
  const endValue = withGet(writable(value.get().end ?? withDefaults.defaultValue?.end));
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const focusedValue = withGet(writable(null));
  const lastPressedDateValue = withGet(writable(null));
  const months = withGet(writable(createMonths({
    dateObj: placeholder.get(),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  })));
  const visibleMonths = withGet(derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  }));
  const isOutsideVisibleMonths = withGet(derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  }));
  const isDateDisabled = withGet(derived([options.isDateDisabled, minValue, maxValue], ([$isDateDisabled, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled?.(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      return false;
    };
  }));
  const isDateUnavailable = withGet(derived([options.isDateUnavailable], ([$isDateUnavailable]) => {
    return (date) => {
      if ($isDateUnavailable?.(date))
        return true;
      return false;
    };
  }));
  const isStartInvalid = derived([startValue, isDateUnavailable, isDateDisabled], ([$startValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$startValue)
      return false;
    return $isDateUnavailable($startValue) || $isDateDisabled($startValue);
  });
  const isEndInvalid = derived([endValue, isDateUnavailable, isDateDisabled], ([$endValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$endValue)
      return false;
    return $isDateUnavailable($endValue) || $isDateDisabled($endValue);
  });
  const isInvalid = derived([startValue, endValue, isEndInvalid, isStartInvalid], ([$startValue, $endValue, $isEndInvalid, $isStartInvalid]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if ($endValue && $startValue && isBefore($endValue, $startValue)) {
      return true;
    }
    return false;
  });
  const isNextButtonDisabled = withGet.derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = withGet.derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  let announcer = getAnnouncer();
  const headingValue = withGet.derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = toDate($months[0].value);
      return `${formatter.fullMonthAndYear(month)}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = withGet.derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = makeElement(name(), {
    stores: [fullCalendarLabel, isInvalid, ids.calendar, disabled, readonly],
    returned: ([$fullCalendarLabel, $isInvalid, $calendarId, $disabled, $readonly]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, fullCalendarLabel.get());
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = makeElement(name("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = makeElement(name("grid"), {
    stores: [readonly, disabled],
    returned: ([$readonly, $disabled]) => ({
      tabindex: -1,
      role: "grid",
      "aria-readonly": $readonly ? "true" : void 0,
      "aria-disabled": $disabled ? "true" : void 0,
      "data-readonly": $readonly ? "" : void 0,
      "data-disabled": $disabled ? "" : void 0
    })
  });
  const prevButton = makeElement(name("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = makeElement(name("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isSelectionStart = derived([startValue], ([$startValue]) => {
    return (date) => {
      if (!$startValue)
        return false;
      return isSameDay($startValue, date);
    };
  });
  const isSelectionEnd = derived([endValue], ([$endValue]) => {
    return (date) => {
      if (!$endValue)
        return false;
      return isSameDay($endValue, date);
    };
  });
  const isSelected = derived([startValue, endValue], ([$startValue, $endValue]) => {
    return (date) => {
      if ($startValue && isSameDay($startValue, date))
        return true;
      if ($endValue && isSameDay($endValue, date))
        return true;
      if ($endValue && $startValue) {
        return isBetweenInclusive(date, $startValue, $endValue);
      }
      return false;
    };
  });
  const highlightedRange = withGet.derived([startValue, endValue, focusedValue, isDateDisabled, isDateUnavailable], ([$startValue, $endValue, $focusedValue, $isDateDisabled, $isDateUnavailable]) => {
    if ($startValue && $endValue)
      return null;
    if (!$startValue || !$focusedValue)
      return null;
    const isStartBeforeFocused = isBefore($startValue, $focusedValue);
    const start = isStartBeforeFocused ? $startValue : $focusedValue;
    const end = isStartBeforeFocused ? $focusedValue : $startValue;
    if (isSameDay(start.add({ days: 1 }), end)) {
      return {
        start,
        end
      };
    }
    const isValid = areAllDaysBetweenValid(start, end, $isDateUnavailable, $isDateDisabled);
    if (isValid) {
      return {
        start,
        end
      };
    }
    return null;
  });
  const cell = makeElement(name("cell"), {
    stores: [
      isSelected,
      isSelectionEnd,
      isSelectionStart,
      highlightedRange,
      isDateDisabled,
      isDateUnavailable,
      placeholder,
      isOutsideVisibleMonths
    ],
    returned: ([$isSelected, $isSelectionEnd, $isSelectionStart, $highlightedRange, $isDateDisabled, $isDateUnavailable, $placeholder, $isOutsideVisibleMonths]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled(cellValue);
        const isUnavailable = $isDateUnavailable(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isSelectedDate = $isSelected(cellValue);
        const isSelectionStart2 = $isSelectionStart(cellValue);
        const isSelectionEnd2 = $isSelectionEnd(cellValue);
        const isHighlighted = $highlightedRange ? isBetweenInclusive(cellValue, $highlightedRange.start, $highlightedRange.end) : false;
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-selection-start": isSelectionStart2 ? true : void 0,
          "data-selection-end": isSelectionEnd2 ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          "data-highlighted": isHighlighted ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(e, parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "mouseenter", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "focusin", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder], ([$placeholder]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = visibleMonths.get();
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const $weekStartsOn = weekStartsOn.get();
    const $locale = locale.get();
    const $fixedWeeks = fixedWeeks.get();
    const $numberOfMonths = numberOfMonths.get();
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    const $placeholder = placeholder.get();
    if (!isBrowser || !$placeholder)
      return;
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(ids.accessibleHeading.get());
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([startValue], ([$startValue]) => {
    if ($startValue && placeholder.get() !== $startValue) {
      placeholder.set($startValue);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = ids.accessibleHeading.get();
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    if (month < 0 || month > 11)
      throw new Error("Month must be between 0 and 11");
    placeholder.setDate({ month });
  }
  function handleCellClick(e, date) {
    const $isDateDisabled = isDateDisabled.get();
    const $isDateUnavailable = isDateUnavailable.get();
    if ($isDateDisabled(date) || $isDateUnavailable(date))
      return;
    const $lastPressedDate = lastPressedDateValue.get();
    lastPressedDateValue.set(date);
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    const $highlightedRange = highlightedRange.get();
    if ($startValue && $highlightedRange === null) {
      if (isSameDay($startValue, date) && !preventDeselect.get() && !$endValue) {
        startValue.set(void 0);
        placeholder.set(date);
        announcer.announce("Selected date is now empty.", "polite");
        return;
      } else if (!$endValue) {
        e.preventDefault();
        if ($lastPressedDate && isSameDay($lastPressedDate, date)) {
          startValue.set(date);
          announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        }
        return;
      }
    }
    if ($startValue && $endValue && isSameDay($endValue, date) && !preventDeselect.get()) {
      startValue.set(void 0);
      endValue.set(void 0);
      placeholder.set(date);
      announcer.announce("Selected date is now empty.", "polite");
      return;
    }
    if (!$startValue) {
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if (!$endValue) {
      endValue.update(() => {
        announcer.announce(`Selected Dates: ${formatter.selectedDate($startValue, false)} to ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if ($endValue && $startValue) {
      endValue.set(void 0);
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(e, parseStringToDateValue(cellValue, placeholder.get()));
    }
  }
  function shiftFocus(node, add) {
    const $calendarId = ids.calendar.get();
    const candidateCells = getSelectableCells($calendarId);
    if (!candidateCells.length) {
      return;
    }
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (isPrevButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (isNextButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue], ([$isDateDisabled, $placeholder, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  effect([value], ([$value]) => {
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = value.get();
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        if (isBefore($endValue, $startValue)) {
          return {
            start: $endValue,
            end: $startValue
          };
        } else {
          return {
            start: $startValue,
            end: $endValue
          };
        }
      });
    } else if ($value && $value.start && $value.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      weekdays,
      headingValue,
      value,
      startValue,
      endValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateUnavailable,
      isSelectionStart,
      isSelectionEnd,
      isSelected
    },
    options,
    ids
  };
}
function AnalyticsChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Chart.register(...registerables);
    let type = fallback($$props["type"], "line");
    let metric = fallback($$props["metric"], "revenue");
    let period = fallback($$props["period"], "monthly");
    let height = fallback($$props["height"], "h-64");
    onDestroy(() => {
    });
    ({
      labels: sampleData[period].labels,
      datasets: [
        {
          label: metric.charAt(0).toUpperCase() + metric.slice(1),
          data: sampleData[period][metric] || sampleData[period].revenue,
          backgroundColor: chartColors.primary.blue.backgroundColor,
          borderColor: chartColors.primary.blue.borderColor,
          borderWidth: 2,
          fill: type === "line" ? false : true,
          tension: type === "line" ? 0.4 : 0,
          pointRadius: type === "line" ? 4 : 0,
          pointHoverRadius: type === "line" ? 6 : 0,
          borderRadius: type === "bar" ? 8 : 0,
          borderSkipped: type === "bar" ? false : true
        }
      ]
    });
    $$renderer2.push(`<div${attr_class(`w-full ${stringify(height)}`)}><canvas></canvas></div>`);
    bind_props($$props, { type, metric, period, height });
  });
}
function AnalyticsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let weekdaysArray, monthsArray, headingValueText, segmentContentsData, isDateDisabledFn, isDateUnavailableFn;
    let analyticsData = {
      overview: {
        totalRevenue: "$125,430",
        totalUsers: "45,231",
        conversionRate: "3.24%",
        avgSessionDuration: "2m 34s"
      },
      topProducts: [
        {
          name: store_get($$store_subs ??= {}, "$_", $format)("analytics.premium_plan"),
          sales: 1240,
          revenue: "$45,200"
        },
        {
          name: store_get($$store_subs ??= {}, "$_", $format)("analytics.basic_plan"),
          sales: 890,
          revenue: "$22,300"
        },
        {
          name: store_get($$store_subs ??= {}, "$_", $format)("analytics.enterprise"),
          sales: 320,
          revenue: "$58,900"
        }
      ],
      recentActivity: [
        {
          action: store_get($$store_subs ??= {}, "$_", $format)("analytics.new_user_registered"),
          time: "2 " + store_get($$store_subs ??= {}, "$_", $format)("analytics.min_ago"),
          type: "user"
        },
        {
          action: store_get($$store_subs ??= {}, "$_", $format)("analytics.payment_received"),
          time: "5 " + store_get($$store_subs ??= {}, "$_", $format)("analytics.min_ago"),
          type: "payment"
        },
        {
          action: store_get($$store_subs ??= {}, "$_", $format)("analytics.product_purchased"),
          time: "8 " + store_get($$store_subs ??= {}, "$_", $format)("analytics.min_ago"),
          type: "purchase"
        },
        {
          action: store_get($$store_subs ??= {}, "$_", $format)("analytics.support_ticket"),
          time: "12 " + store_get($$store_subs ??= {}, "$_", $format)("analytics.min_ago"),
          type: "support"
        }
      ]
    };
    let selectedMetric = "revenue";
    const iconColors = {
      "heroicons:currency-dollar": "from-emerald-500 to-teal-600",
      "heroicons:users": "from-blue-500 to-indigo-600",
      "heroicons:chart-bar": "from-purple-500 to-pink-600",
      "heroicons:clock": "from-orange-500 to-red-600"
    };
    const metricOptions = [
      {
        value: "revenue",
        label: store_get($$store_subs ??= {}, "$_", $format)("analytics.revenue")
      },
      {
        value: "users",
        label: store_get($$store_subs ??= {}, "$_", $format)("analytics.users")
      },
      {
        value: "conversions",
        label: store_get($$store_subs ??= {}, "$_", $format)("analytics.conversions")
      },
      {
        value: "engagement",
        label: store_get($$store_subs ??= {}, "$_", $format)("analytics.engagement")
      }
    ];
    const {
      elements: {
        calendar,
        cell,
        content,
        field,
        grid,
        heading,
        label,
        nextButton,
        prevButton,
        startSegment,
        endSegment,
        trigger
      },
      states: { months, headingValue, weekdays, segmentContents },
      helpers: { isDateDisabled, isDateUnavailable }
    } = createDateRangePicker();
    weekdaysArray = store_get($$store_subs ??= {}, "$weekdays", weekdays);
    monthsArray = store_get($$store_subs ??= {}, "$months", months);
    headingValueText = store_get($$store_subs ??= {}, "$headingValue", headingValue);
    segmentContentsData = store_get($$store_subs ??= {}, "$segmentContents", segmentContents);
    isDateDisabledFn = store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled);
    isDateUnavailableFn = store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable);
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:presentation-chart-line",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.title"))}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.description"))}</p></div> <div class="flex items-center space-x-4"><div class="relative"><span${attributes({
      ...store_get($$store_subs ??= {}, "$label", label),
      class: "sr-only"
    })}>Date Range</span> <div${attributes({
      ...store_get($$store_subs ??= {}, "$field", field),
      class: "flex items-center bg-base-100 border border-base-300 rounded-lg px-3 py-2 min-w-64 shadow-md hover:shadow-lg transition-shadow duration-200"
    })}><!--[-->`);
    const each_array = ensure_array_like(segmentContentsData.start);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let seg = each_array[$$index];
      const __MELTUI_BUILDER_0__ = store_get($$store_subs ??= {}, "$startSegment", startSegment)(seg.part);
      $$renderer2.push(`<div${attributes({
        ...__MELTUI_BUILDER_0__,
        class: "px-1 text-sm text-base-content"
      })}>${escape_html(seg.value)}</div>`);
    }
    $$renderer2.push(`<!--]--> <div aria-hidden="true" class="px-1 text-base-content/40">-</div> <!--[-->`);
    const each_array_1 = ensure_array_like(segmentContentsData.end);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let seg = each_array_1[$$index_1];
      const __MELTUI_BUILDER_1__ = store_get($$store_subs ??= {}, "$endSegment", endSegment)(seg.part);
      $$renderer2.push(`<div${attributes({
        ...__MELTUI_BUILDER_1__,
        class: "px-1 text-sm text-base-content"
      })}>${escape_html(seg.value)}</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="ml-2"><button${attributes({
      ...store_get($$store_subs ??= {}, "$trigger", trigger),
      class: "p-1 text-base-content/40 hover:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors duration-200"
    })}>`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></div></div> <div${attributes({
      ...store_get($$store_subs ??= {}, "$content", content),
      class: "absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50"
    })}><div${attributes({
      ...store_get($$store_subs ??= {}, "$calendar", calendar),
      class: "p-4"
    })}><header class="flex items-center justify-between mb-4"><button${attributes({
      ...store_get($$store_subs ??= {}, "$prevButton", prevButton),
      class: "p-2 text-base-content/40 hover:text-base-content/60 hover:bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
    })}>`);
    Icon($$renderer2, { icon: "heroicons:chevron-left", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button> <div${attributes({
      ...store_get($$store_subs ??= {}, "$heading", heading),
      class: "text-sm font-medium text-base-content"
    })}>${escape_html(headingValueText)}</div> <button${attributes({
      ...store_get($$store_subs ??= {}, "$nextButton", nextButton),
      class: "p-2 text-base-content/40 hover:text-base-content/60 hover:bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
    })}>`);
    Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></header> <!--[-->`);
    const each_array_2 = ensure_array_like(monthsArray);
    for (let $$index_5 = 0, $$length = each_array_2.length; $$index_5 < $$length; $$index_5++) {
      let month = each_array_2[$$index_5];
      $$renderer2.push(`<table${attributes({
        ...store_get($$store_subs ??= {}, "$grid", grid),
        class: "w-full"
      })}><thead aria-hidden="true"><tr><!--[-->`);
      const each_array_3 = ensure_array_like(weekdaysArray);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let day = each_array_3[$$index_2];
        $$renderer2.push(`<th class="text-xs font-medium text-base-content/60 py-2">${escape_html(day)}</th>`);
      }
      $$renderer2.push(`<!--]--></tr></thead><tbody><!--[-->`);
      const each_array_4 = ensure_array_like(month.weeks);
      for (let $$index_4 = 0, $$length2 = each_array_4.length; $$index_4 < $$length2; $$index_4++) {
        let days = each_array_4[$$index_4];
        $$renderer2.push(`<tr><!--[-->`);
        const each_array_5 = ensure_array_like(days);
        for (let $$index_3 = 0, $$length3 = each_array_5.length; $$index_3 < $$length3; $$index_3++) {
          let date = each_array_5[$$index_3];
          const __MELTUI_BUILDER_2__ = store_get($$store_subs ??= {}, "$cell", cell)(date, month.value);
          $$renderer2.push(`<td role="gridcell"${attr("aria-disabled", isDateDisabledFn(date) || isDateUnavailableFn(date))} class="p-1"><div${attributes({
            ...__MELTUI_BUILDER_2__,
            class: "w-8 h-8 flex items-center justify-center text-sm rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          })}>${escape_html(date.day)}</div></td>`);
        }
        $$renderer2.push(`<!--]--></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="relative export-menu"><button class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.export_report"))} `);
    Icon($$renderer2, { icon: "heroicons:chevron-down", class: "w-4 h-4 ml-1" });
    $$renderer2.push(`<!----></div></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-dollar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative flex items-center justify-between"><div><p class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.total_revenue"))}</p> <p class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(analyticsData.overview.totalRevenue)}</p> <p class="text-sm text-success">+12.5% ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.from_last_month"))}</p></div> <div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(iconColors["heroicons:currency-dollar"])} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:currency-dollar",
      class: "w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-full h-full text-primary" });
    $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative flex items-center justify-between"><div><p class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.total_users"))}</p> <p class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(analyticsData.overview.totalUsers)}</p> <p class="text-sm text-success">+8.2% ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.from_last_month"))}</p></div> <div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(iconColors["heroicons:users"])} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:users",
      class: "w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative flex items-center justify-between"><div><p class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.conversion_rate"))}</p> <p class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(analyticsData.overview.conversionRate)}</p> <p class="text-sm text-success">+2.1% ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.from_last_month"))}</p></div> <div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(iconColors["heroicons:chart-bar"])} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-full h-full text-accent" });
    $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative flex items-center justify-between"><div><p class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.avg_session"))}</p> <p class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(analyticsData.overview.avgSessionDuration)}</p> <p class="text-sm text-success">+15.3% ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.from_last_month"))}</p></div> <div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(iconColors["heroicons:clock"])} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:clock",
      class: "w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-base-content">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.revenue_trend"))}</h2> <div class="relative metric-selector"><button class="px-3 py-1 text-sm font-medium text-base-content/70 bg-base-200 border border-base-300 rounded-lg hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200">${escape_html(metricOptions.find((opt) => opt.value === selectedMetric)?.label || store_get($$store_subs ??= {}, "$_", $format)("analytics.revenue"))} `);
    Icon($$renderer2, { icon: "heroicons:chevron-down", class: "w-4 h-4 ml-1 inline" });
    $$renderer2.push(`<!----></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="h-64">`);
    AnalyticsChart($$renderer2, {
      type: "line",
      metric: selectedMetric,
      period: "monthly",
      height: "h-64"
    });
    $$renderer2.push(`<!----></div></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:cube",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <h2 class="text-lg font-semibold text-base-content mb-6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.top_products"))}</h2> <div class="space-y-4"><!--[-->`);
    const each_array_7 = ensure_array_like(analyticsData.topProducts);
    for (let index = 0, $$length = each_array_7.length; index < $$length; index++) {
      let product = each_array_7[index];
      $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-base-200/50 rounded-xl hover:bg-base-300/50 transition-all duration-200 group"><div class="flex items-center"><div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-blue/20 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow duration-200"><span class="text-sm font-medium text-primary group-hover:scale-110 transition-transform duration-200">#${escape_html(index + 1)}</span></div> <div><p class="font-medium text-base-content group-hover:text-primary transition-colors duration-200">${escape_html(product.name)}</p> <p class="text-sm text-base-content/60">${escape_html(product.sales)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.sales"))}</p></div></div> <div class="text-right"><p class="font-medium text-base-content group-hover:text-primary transition-colors duration-200">${escape_html(product.revenue)}</p> <p class="text-sm text-success">+12.5%</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="space-y-6"><div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-full h-full text-accent" });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-base-content">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.recent_activity"))}</h2> <button class="text-sm text-base-content/60 hover:text-base-content/80 transition-colors duration-200">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.view_all"))} →</button></div> <div class="space-y-4"><!--[-->`);
    const each_array_8 = ensure_array_like(analyticsData.recentActivity);
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let activity = each_array_8[$$index_8];
      $$renderer2.push(`<div class="flex items-center space-x-4 p-3 rounded-xl hover:bg-base-200/50 transition-all duration-200 group"><div class="flex-shrink-0">`);
      if (activity.type === "user") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
        Icon($$renderer2, {
          icon: "heroicons:user",
          class: "w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200"
        });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (activity.type === "payment") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-emerald/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
          Icon($$renderer2, {
            icon: "heroicons:credit-card",
            class: "w-5 h-5 text-success group-hover:scale-110 transition-transform duration-200"
          });
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (activity.type === "purchase") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-purple/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
            Icon($$renderer2, {
              icon: "heroicons:shopping-cart",
              class: "w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-200"
            });
            $$renderer2.push(`<!----></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (activity.type === "support") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-orange/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
              Icon($$renderer2, {
                icon: "heroicons:chat-bubble-left-right",
                class: "w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-200"
              });
              $$renderer2.push(`<!----></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0"><p class="text-sm font-medium text-base-content mb-0.5 group-hover:text-primary transition-colors duration-200">${escape_html(activity.action)}</p> <div class="flex items-center space-x-2">`);
      Icon($$renderer2, {
        icon: "heroicons:clock",
        class: "w-4 h-4 text-base-content/40"
      });
      $$renderer2.push(`<!----> <p class="text-xs text-base-content/60">${escape_html(activity.time)}</p></div></div> <div class="flex-shrink-0"><button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-full hover:bg-base-300 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:ellipsis-horizontal", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-base-content">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.quick_stats"))}</h2> <div class="flex items-center space-x-2 text-sm text-base-content/60">`);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.last_updated"))} 5m ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.ago"))}</span></div></div> <div class="grid grid-cols-1 gap-4"><div class="p-4 rounded-xl bg-base-200/50 hover:bg-base-300/50 transition-all duration-200 group"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-blue/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
    Icon($$renderer2, {
      icon: "heroicons:eye",
      class: "w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.page_views"))}</p> <div class="flex items-center space-x-2"><p class="text-lg font-semibold text-base-content group-hover:text-primary transition-colors duration-200">45.2K</p> <span class="flex items-center text-xs font-medium text-success">`);
    Icon($$renderer2, { icon: "heroicons:arrow-trending-up", class: "w-3 h-3 mr-1" });
    $$renderer2.push(`<!----> +5.2%</span></div></div></div> <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div> <div class="p-4 rounded-xl bg-base-200/50 hover:bg-base-300/50 transition-all duration-200 group"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-error/20 to-red/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-uturn-left",
      class: "w-5 h-5 text-error group-hover:scale-110 transition-transform duration-200"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.bounce_rate"))}</p> <div class="flex items-center space-x-2"><p class="text-lg font-semibold text-base-content group-hover:text-error transition-colors duration-200">32.1%</p> <span class="flex items-center text-xs font-medium text-error">`);
    Icon($$renderer2, { icon: "heroicons:arrow-trending-down", class: "w-3 h-3 mr-1" });
    $$renderer2.push(`<!----> -2.3%</span></div></div></div> <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div> <div class="p-4 rounded-xl bg-base-200/50 hover:bg-base-300/50 transition-all duration-200 group"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-success/20 to-emerald/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
    Icon($$renderer2, {
      icon: "heroicons:banknotes",
      class: "w-5 h-5 text-success group-hover:scale-110 transition-transform duration-200"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.avg_order_value"))}</p> <div class="flex items-center space-x-2"><p class="text-lg font-semibold text-base-content group-hover:text-success transition-colors duration-200">$89.50</p> <span class="flex items-center text-xs font-medium text-success">`);
    Icon($$renderer2, { icon: "heroicons:arrow-trending-up", class: "w-3 h-3 mr-1" });
    $$renderer2.push(`<!----> +8.1%</span></div></div></div> <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div> <div class="p-4 rounded-xl bg-base-200/50 hover:bg-base-300/50 transition-all duration-200 group"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-purple/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">`);
    Icon($$renderer2, {
      icon: "heroicons:user-circle",
      class: "w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-200"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.customer_lifetime_value"))}</p> <div class="flex items-center space-x-2"><p class="text-lg font-semibold text-base-content group-hover:text-secondary transition-colors duration-200">$1,245</p> <span class="flex items-center text-xs font-medium text-success">`);
    Icon($$renderer2, { icon: "heroicons:arrow-trending-up", class: "w-3 h-3 mr-1" });
    $$renderer2.push(`<!----> +12.3%</span></div></div></div> <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div></div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  AnalyticsPage as default
};
