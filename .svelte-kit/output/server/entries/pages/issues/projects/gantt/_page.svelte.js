import "clsx";
import { b as attr_class, g as bind_props, f as attr_style, s as stringify, a as ensure_array_like, h as head, c as store_get, u as unsubscribe_stores, l as spread_props } from "../../../../../chunks/index2.js";
import { T as getContext, S as setContext } from "../../../../../chunks/context.js";
import { w as writable } from "../../../../../chunks/index.js";
import { uid, locale, getDuodecade, dateToString, setEnv } from "@svar-ui/lib-dom";
import { en } from "@svar-ui/core-locales";
import { env } from "@svar-ui/lib-svelte";
import { en as en$2 } from "@svar-ui/gantt-locales";
import { EventBusRouter } from "@svar-ui/lib-state";
import { normalizeDates, grid, defaultTaskTypes, defaultColumns, DataStore as DataStore$1 } from "@svar-ui/gantt-store";
import { getRenderValue, getValue, isCommunity, getPrintCellStyle, getPrintFilterValue, getHeaderFooterPrintColumns, getPrintColumns, DataStore } from "@svar-ui/grid-store";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { en as en$1 } from "@svar-ui/grid-locales";
import { a as attr, c as clsx } from "../../../../../chunks/attributes.js";
import { h as html, o as onDestroy, I as Icon$1 } from "../../../../../chunks/Icon.js";
import { format } from "date-fns";
function TextArea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      id = uid(),
      placeholder = "",
      title = "",
      disabled = false,
      error = false,
      readonly = false,
      onchange
    } = $$props;
    $$renderer2.push(`<textarea${attr_class("wx-textarea svelte-1293639", void 0, { "wx-error": error })}${attr("id", id)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)}${attr("readonly", readonly, true)}${attr("title", title)}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea>`);
    bind_props($$props, { value });
  });
}
function Button$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      type = "",
      css = "",
      icon = "",
      disabled = false,
      title = "",
      text = "",
      children,
      onclick
    } = $$props;
    let buttonCss = (() => {
      let cssType = type ? type.split(" ").filter((a) => a !== "").map((x) => "wx-" + x).join(" ") : "";
      return css + (css ? " " : "") + cssType;
    })();
    $$renderer2.push(`<button${attr("title", title)}${attr_class(`wx-button ${buttonCss}`, "svelte-1gdo8eb", { "wx-icon": icon && !children })}${attr("disabled", disabled, true)}>`);
    if (icon) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i${attr_class(clsx(icon), "svelte-1gdo8eb")}></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`${escape_html(text)}`);
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = uid(),
      label = "",
      inputValue = "",
      value = false,
      style = "",
      disabled = false,
      onchange
    } = $$props;
    $$renderer2.push(`<div${attr_style(style)} class="wx-checkbox svelte-1em60wg"><input type="checkbox"${attr("id", id)}${attr("disabled", disabled, true)}${attr("checked", value, true)}${attr("value", inputValue)} class="svelte-1em60wg"/> <label${attr("for", id)} class="svelte-1em60wg"><span class="svelte-1em60wg"></span> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="svelte-1em60wg">${escape_html(label)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label></div>`);
    bind_props($$props, { value });
  });
}
function Dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      position = "bottom",
      align = "start",
      width = "100%",
      children
    } = $$props;
    $$renderer2.push(`<div${attr_class(`wx-dropdown ${stringify(`wx-${position}-${align}`)}`, "svelte-x4xo5c")}${attr_style(`width:${stringify(width)}`)}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function defaultLocale() {
  return locale(en);
}
function SuggestDropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { items = [], children, onselect, onready } = $$props;
    (getContext("wx-i18n") || defaultLocale()).getGroup("core");
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Text$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      id = uid(),
      readonly = false,
      focus = false,
      select = false,
      type = "text",
      placeholder = "",
      disabled = false,
      error = false,
      inputStyle = "",
      title = "",
      css = "",
      icon = "",
      clear = false,
      onchange
    } = $$props;
    let cssString = icon && css.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + css : css;
    let hasLeftIcon = icon && css.indexOf("wx-icon-left") !== -1;
    $$renderer2.push(`<div${attr_class(`wx-text ${stringify(cssString)}`, "svelte-1uul0pm", {
      "wx-error": error,
      "wx-disabled": disabled,
      "wx-clear": clear
    })}>`);
    if (type == "password") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="password"${attr_style(inputStyle)}${attr("title", title)} class="svelte-1uul0pm"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (type == "number") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="number"${attr_style(inputStyle)}${attr("title", title)} class="svelte-1uul0pm"/>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)}${attr("title", title)}${attr_style(inputStyle)} class="svelte-1uul0pm"/>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (clear && !disabled && value) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i class="wx-icon wxi-close svelte-1uul0pm"></i> `);
      if (hasLeftIcon) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-1uul0pm")}></i>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (icon) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-1uul0pm")}></i>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { calendar, formats } = getContext("wx-i18n").getRaw();
    let { date, type, part } = $$props;
    const year = date.getFullYear();
    const label = (() => {
      switch (type) {
        case "month":
          return dateToString(formats.monthYearFormat, calendar)(date);
        case "year":
          return dateToString(formats.yearFormat, calendar)(date);
        case "duodecade": {
          const { start, end } = getDuodecade(year);
          const yearFormat = dateToString(formats.yearFormat, calendar);
          return `${yearFormat(new Date(start, 0, 1))} - ${yearFormat(new Date(end, 11, 31))}`;
        }
      }
    })();
    $$renderer2.push(`<div class="wx-header svelte-4lsrsp">`);
    if (part != "right") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i class="wx-pager wxi-angle-left svelte-4lsrsp"></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="wx-spacer svelte-4lsrsp"></span>`);
    }
    $$renderer2.push(`<!--]-->  <span class="wx-label svelte-4lsrsp">${escape_html(label)}</span> `);
    if (part != "left") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i class="wx-pager wxi-angle-right svelte-4lsrsp"></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="wx-spacer svelte-4lsrsp"></span>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Button($$renderer, $$props) {
  let { onclick, children } = $$props;
  $$renderer.push(`<button class="svelte-2s2nwk">`);
  children?.($$renderer);
  $$renderer.push(`<!----></button>`);
}
function Month($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value,
      current = void 0,
      part = "",
      markers = null,
      oncancel,
      onchange
    } = $$props;
    const locale2 = (getContext("wx-i18n") || defaultLocale()).getRaw().calendar;
    const weekStart = (locale2.weekStart || 7) % 7;
    const weekdays = locale2.dayShort.slice(weekStart).concat(locale2.dayShort.slice(0, weekStart));
    const dv = (d, dm, dd) => new Date(d.getFullYear(), d.getMonth() + (dm || 0), d.getDate() + (dd || 0));
    let ranges = part !== "normal";
    function isWeekEnd(date2) {
      const d = date2.getDay();
      return d === 0 || d === 6;
    }
    function getStart() {
      const start = dv(current, 0, 1 - current.getDate());
      start.setDate(start.getDate() - (start.getDay() - (weekStart - 7)) % 7);
      return start;
    }
    function getEnd() {
      const end = dv(current, 1, -current.getDate());
      end.setDate(end.getDate() + (6 - end.getDay() + weekStart) % 7);
      return end;
    }
    const date = (() => {
      if (part == "normal") return [value ? dv(value).valueOf() : 0];
      return value ? [
        value.start ? dv(value.start).valueOf() : 0,
        value.end ? dv(value.end).valueOf() : 0
      ] : [0, 0];
    })();
    const days = (() => {
      const start = getStart();
      const end = getEnd();
      const curMonth = current.getMonth();
      let days2 = [];
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const day = {
          day: d.getDate(),
          in: d.getMonth() === curMonth,
          date: d.valueOf()
        };
        let css = "";
        css += !day.in ? " wx-inactive" : "";
        css += date.indexOf(day.date) > -1 ? " wx-selected" : "";
        if (ranges) {
          const s = day.date == date[0];
          const e = day.date == date[1];
          if (s && !e) css += " wx-left";
          else if (e && !s) css += " wx-right";
          if (day.date > date[0] && day.date < date[1]) css += " wx-inrange";
        }
        css += isWeekEnd(d) ? " wx-weekend" : "";
        if (markers) {
          const mark = markers(d);
          if (mark) css += " " + mark;
        }
        days2.push({ ...day, css });
      }
      return days2;
    })();
    $$renderer2.push(`<div><div class="wx-weekdays svelte-16msgyq"><!--[-->`);
    const each_array = ensure_array_like(weekdays);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let day = each_array[$$index];
      $$renderer2.push(`<div class="wx-weekday svelte-16msgyq">${escape_html(day)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="wx-days svelte-16msgyq"><!--[-->`);
    const each_array_1 = ensure_array_like(days);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let day = each_array_1[$$index_1];
      $$renderer2.push(`<div${attr_class(`wx-day ${stringify(day.css)}`, "svelte-16msgyq", { "wx-out": !day.in })}${attr("data-id", day.date)}>${escape_html(day.day)}</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { current });
  });
}
function Year($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      current = void 0,
      part,
      oncancel,
      onchange,
      onshift
    } = $$props;
    const locale2 = getContext("wx-i18n").getRaw().calendar;
    const months = locale2.monthShort;
    const monthNum = (() => current.getMonth())();
    function done() {
      const date = new Date(getPartValue(value, part) || current);
      date.setMonth(current.getMonth());
      date.setFullYear(current.getFullYear());
      onchange && onchange(date);
    }
    $$renderer2.push(`<div class="wx-months svelte-9himwl"><!--[-->`);
    const each_array = ensure_array_like(months);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let month = each_array[i];
      $$renderer2.push(`<div${attr_class("wx-month svelte-9himwl", void 0, { "wx-current": monthNum === i })}${attr("data-id", i)}>${escape_html(month)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="wx-buttons svelte-9himwl">`);
    Button($$renderer2, {
      onclick: done,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(locale2.done)}`);
      }
    });
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { value, current });
  });
}
function Duodecade($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const _ = getContext("wx-i18n").getRaw().calendar;
    let {
      value = void 0,
      current = void 0,
      oncancel,
      onchange,
      onshift,
      part
    } = $$props;
    const year = current.getFullYear();
    const years = (() => {
      const { start, end } = getDuodecade(year);
      const years2 = [];
      for (let y = start; y <= end; ++y) {
        years2.push(y);
      }
      return years2;
    })();
    function done() {
      const date = new Date(getPartValue(value, part) || current);
      date.setFullYear(current.getFullYear());
      onchange && onchange(date);
    }
    $$renderer2.push(`<div class="wx-years svelte-8yi4l4"><!--[-->`);
    const each_array = ensure_array_like(years);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let y = each_array[i];
      $$renderer2.push(`<div${attr_class("wx-year svelte-8yi4l4", void 0, {
        "wx-current": year == y,
        "wx-prev-decade": i === 0,
        "wx-next-decade": i === 11
      })}${attr("data-id", y)}>${escape_html(y)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="wx-buttons svelte-8yi4l4">`);
    Button($$renderer2, {
      onclick: done,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(_.done)}`);
      }
    });
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { value, current });
  });
}
const configs = {
  month: {
    component: Month,
    next: nextMonth,
    prev: prevMonth
  },
  year: {
    component: Year,
    next: nextYear,
    prev: prevYear
  },
  duodecade: {
    component: Duodecade,
    next: nextDuodecade,
    prev: prevDuodecade
  }
};
function prevMonth(current) {
  current = new Date(current);
  current.setMonth(current.getMonth() - 1);
  return current;
}
function nextMonth(current) {
  current = new Date(current);
  current.setMonth(current.getMonth() + 1);
  return current;
}
function prevYear(current) {
  current = new Date(current);
  current.setFullYear(current.getFullYear() - 1);
  return current;
}
function nextYear(current) {
  current = new Date(current);
  current.setFullYear(current.getFullYear() + 1);
  return current;
}
function prevDuodecade(current) {
  current = new Date(current);
  current.setFullYear(current.getFullYear() - 10);
  return current;
}
function nextDuodecade(current) {
  current = new Date(current);
  current.setFullYear(current.getFullYear() + 10);
  return current;
}
function getPartValue(value, part) {
  let date;
  if (part === "normal") date = value;
  else {
    const { start, end } = value;
    if (part === "left") date = start;
    else if (part == "right") date = end;
    else date = start ? end : start;
  }
  return date;
}
function Panel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const _ = getContext("wx-i18n").getGroup("calendar");
    let {
      value,
      current = void 0,
      part = "normal",
      markers = null,
      buttons = ["clear", "today"],
      onshift: shift,
      onchange: change
    } = $$props;
    let type = "month";
    let buttonList = (() => {
      if (Array.isArray(buttons)) return buttons;
      return buttons ? ["clear", "today"] : [];
    })();
    function selectDate(ev, date) {
      ev.preventDefault();
      change && change({ value: date });
    }
    function oncancel() {
      if (type === "duodecade") type = "year";
      else if (type === "year") type = "month";
    }
    function onshift(ev) {
      const { diff } = ev;
      if (diff === 0) {
        if (type === "month") type = "year";
        else if (type === "year") type = "duodecade";
        return;
      }
      if (diff) {
        const obj = configs[type];
        current = diff > 0 ? obj.next(current) : obj.prev(current);
      }
      shift && shift();
    }
    function onchange(value2) {
      type = "month";
      change && change({ select: true, value: value2 });
    }
    function getButtonValue(btn) {
      if (btn === "done") return -1;
      if (btn === "clear") return null;
      if (btn === "today") return /* @__PURE__ */ new Date();
    }
    const SvelteComponent = configs[type].component;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(`wx-calendar ${stringify(part !== "normal" && part !== "both" ? "wx-part" : "")}`, "svelte-msimvu")}><div class="wx-wrap svelte-msimvu">`);
      Header($$renderer3, { date: current, part, type });
      $$renderer3.push(`<!----> <div><!---->`);
      SvelteComponent($$renderer3, {
        value,
        part,
        markers,
        onchange,
        oncancel,
        onshift,
        get current() {
          return current;
        },
        set current($$value) {
          current = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      if (type === "month" && buttonList.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="wx-buttons svelte-msimvu"><!--[-->`);
        const each_array = ensure_array_like(buttonList);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let btn = each_array[$$index];
          $$renderer3.push(`<div class="wx-button-item svelte-msimvu">`);
          Button($$renderer3, {
            onclick: (e) => selectDate(e, getButtonValue(btn)),
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(_(btn))}`);
            }
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { current });
  });
}
function Locale($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { words = null, optional = false, children } = $$props;
    let l = getContext("wx-i18n");
    if (!l || words !== null) {
      if (!l) {
        l = locale(en);
      }
      l = l.extend(words, optional);
      setContext("wx-i18n", l);
    }
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
function Calendar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      current = void 0,
      markers = null,
      buttons = ["clear", "today"],
      onchange
    } = $$props;
    function fixCurrent(force) {
      if (!current || force) current = value ? new Date(value) : /* @__PURE__ */ new Date();
      current.setDate(1);
    }
    fixCurrent(value);
    function change(v) {
      const x = v.value;
      if (x) {
        value = new Date(x);
        fixCurrent(true);
      } else {
        value = null;
      }
      onchange && onchange({ value });
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Locale($$renderer3, {
        children: ($$renderer4) => {
          Panel($$renderer4, {
            value,
            markers,
            buttons,
            onchange: change,
            get current() {
              return current;
            },
            set current($$value) {
              current = $$value;
              $$settled = false;
            }
          });
        }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, current });
  });
}
function RichSelect($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      options = [],
      textOptions = null,
      placeholder = "",
      disabled = false,
      error = false,
      title = "",
      textField = "label",
      clear = false,
      children: kids,
      onchange
    } = $$props;
    let navigate;
    function ready(ev) {
      navigate = ev.navigate;
      ev.keydown;
    }
    let selected = value || value === 0 ? (textOptions || options).find((a) => a.id === value) : null;
    function select({ id }) {
      if (id || id === 0) {
        value = id;
        navigate(null);
        onchange && onchange({ value });
      }
    }
    $$renderer2.push(`<div${attr_class("wx-richselect svelte-e7wnft", void 0, {
      "wx-error": error,
      "wx-disabled": disabled,
      "wx-nowrap": !kids
    })}${attr("title", title)} tabindex="0"><div class="wx-label svelte-e7wnft">`);
    if (selected) {
      $$renderer2.push("<!--[-->");
      if (kids) {
        $$renderer2.push("<!--[-->");
        kids($$renderer2, selected);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(selected[textField])}`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (placeholder) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="wx-placeholder svelte-e7wnft">${escape_html(placeholder)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(` `);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (clear && !disabled && value) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i class="wx-icon wxi-close svelte-e7wnft"></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<i class="wx-icon wxi-angle-down svelte-e7wnft"></i>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (!disabled) {
      $$renderer2.push("<!--[-->");
      {
        let children = function($$renderer3, { option }) {
          if (kids) {
            $$renderer3.push("<!--[-->");
            kids($$renderer3, option);
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`${escape_html(option[textField])}`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        SuggestDropdown($$renderer2, {
          items: options,
          onready: ready,
          onselect: select,
          children
        });
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
function Field($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      label = "",
      position = "",
      width = "",
      error = false,
      type = "",
      required = false,
      children
    } = $$props;
    let id = uid();
    $$renderer2.push(`<div${attr_class(`wx-field wx-${stringify(position)}`, "svelte-u2ug1v", { "wx-error": error, "wx-required": required })}${attr_style(width ? `width: ${width}` : "")}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", id)} class="svelte-u2ug1v">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`wx-field-control wx-${stringify(type)}`, "svelte-u2ug1v")}>`);
    children?.($$renderer2, { id });
    $$renderer2.push(`<!----></div></div>`);
  });
}
function FontOpenSans($$renderer) {
  $$renderer.push(`${html(`<style>
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff') format('woff');
}
  </style>`)}`);
}
function Willow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { fonts = true, children } = $$props;
    setContext("wx-theme", "willow");
    head($$renderer2, ($$renderer3) => {
      if (fonts) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""/> `);
        FontOpenSans($$renderer3);
        $$renderer3.push(`<!----> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    if (children) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="wx-willow-theme" style="height:100%">`);
      children($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
setEnv(env);
function TimeScale($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { highlightTime } = $$props;
    const api = getContext("gantt-store");
    const { _scales: scales, scrollLeft } = api.getReactiveState();
    $$renderer2.push(`<div class="wx-scale svelte-1gfkr4f"${attr_style(`width:${stringify(store_get($$store_subs ??= {}, "$scales", scales).width)}px;left:${stringify(-store_get($$store_subs ??= {}, "$scrollLeft", scrollLeft))}px`)}><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$scales", scales).rows);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let row = each_array[$$index_1];
      $$renderer2.push(`<div class="wx-row svelte-1gfkr4f"${attr_style(`height:${stringify(row.height)}px`)}><!--[-->`);
      const each_array_1 = ensure_array_like(row.cells);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let cell = each_array_1[$$index];
        $$renderer2.push(`<div${attr_class(`wx-cell ${stringify(cell.css)} ${stringify(highlightTime ? highlightTime(cell.date, cell.unit) : "")}`, "svelte-1gfkr4f")}${attr_style(`width:${stringify(cell.width)}px`)}>${escape_html(cell.value)}</div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function getStyle(width, flexgrow, fixed, left, right, height) {
  const w = width ? `width:${width}px;` : "";
  const mw = width ? `min-width:${width}px;` : "";
  const fl = flexgrow ? `flex-grow:${flexgrow};` : "";
  const h = height ? `height:${height}px;` : "";
  let fx = "";
  if (fixed) {
    if (fixed.left) fx = `position:sticky;left:${left}px;`;
    if (fixed.right) fx = `position:sticky;right:${right}px;`;
  }
  return `${mw}${w}${h}${fl}${fx}`;
}
function getCssName(column, cell, columnStyle) {
  let css = "";
  if (column.fixed) {
    for (const pos in column.fixed) {
      css += column.fixed[pos] === -1 ? "wx-shadow " : "wx-fixed ";
    }
  }
  css += cell.rowspan > 1 ? "wx-rowspan " : "";
  css += cell.colspan > 1 ? "wx-colspan " : "";
  css += cell.vertical ? "wx-vertical " : "";
  css += columnStyle ? columnStyle(column) + " " : "";
  return css;
}
function Cell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      row,
      column,
      cellStyle = null,
      columnStyle = null,
      children,
      reorder,
      focusable
    } = $$props;
    let style = getStyle(column.width, column.flexgrow, column.fixed, column.left, column.right), css = buildCellCss(columnStyle, cellStyle);
    const api = getContext("grid-store");
    const { focusCell } = api.getReactiveState();
    const isDraggable = typeof column.draggable === "function" ? column.draggable(row, column) !== false : column.draggable;
    function buildCellCss(columnStyle2, cellStyle2) {
      let css2 = "wx-cell";
      css2 += column.fixed ? " " + (column.fixed === -1 ? "wx-shadow" : "wx-fixed") : "";
      css2 += columnStyle2 ? " " + columnStyle2(column) : "";
      css2 += cellStyle2 ? " " + cellStyle2(row, column) : "";
      css2 += column.treetoggle ? " wx-tree-cell" : "";
      return css2;
    }
    onDestroy(() => {
      if (focusable && store_get($$store_subs ??= {}, "$focusCell", focusCell)) {
        api.exec("focus-cell", { eventSource: "destroy" });
        focusable = false;
      }
    });
    $$renderer2.push(`<div${attr_class(clsx(css), "svelte-16nunsy", {
      "wx-shadow": column.fixed && column.fixed.left === -1 || column.fixed.right === -1,
      "wx-fixed-right": column.fixed && column.fixed.right
    })}${attr_style(style)}${attr("data-row-id", row.id)}${attr("data-col-id", column.id)}${attr("tabindex", focusable ? "0" : "-1")} role="gridcell"${attr("aria-colindex", column._colindex)}${attr("aria-readonly", !column.editor ? true : void 0)}>`);
    if (reorder && column.draggable) {
      $$renderer2.push("<!--[-->");
      if (isDraggable) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<i draggable-data="true" class="wx-draggable wxi-drag svelte-16nunsy"></i>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<i class="wx-draggable-stub svelte-16nunsy"></i>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (column.treetoggle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_style(`margin-left:${stringify(row.$level * 28)}px;`)}></span> `);
      if (row.$count) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<i data-action="toggle-row"${attr_class(`wx-table-tree-toggle wxi-menu-${stringify(row.open !== false ? "down" : "right")}`, "svelte-16nunsy")}></i>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (column.cell) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      column.cell($$renderer2, {
        api,
        row,
        column,
        onaction: ({ action, data }) => api.exec(action, data)
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(getRenderValue(row, column))}`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Text_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { filter, column, action, filterValue } = $$props;
    function filterRows({ value }) {
      action({ value, key: column.id });
    }
    Text$1($$renderer2, spread_props([
      filter.config ?? {},
      { value: filterValue, onchange: filterRows }
    ]));
  });
}
function Richselect$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { filter, column, action, filterValue } = $$props;
    const api = getContext("grid-store");
    const { flatData: data } = api.getReactiveState();
    let options = filter?.config?.options || column.options || getOptions(store_get($$store_subs ??= {}, "$data", data));
    let template = filter?.config?.template;
    function getOptions() {
      const options2 = [];
      store_get($$store_subs ??= {}, "$data", data).forEach((d) => {
        const value = getValue(d, column);
        if (!options2.includes(value)) options2.push(value);
      });
      return options2.map((opt) => ({ id: opt, label: opt }));
    }
    function filterRows({ value }) {
      action({ value, key: column.id });
    }
    $$renderer2.push(`<div style="width:100%;">`);
    {
      let children = function($$renderer3, option) {
        if (template) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`${escape_html(template(option))}`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`${escape_html(option.label)}`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      RichSelect($$renderer2, spread_props([
        { placeholder: "", clear: true },
        filter.config ?? {},
        {
          options,
          value: filterValue,
          onchange: filterRows,
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
const filters = {
  text: Text_1,
  richselect: Richselect$1
};
function Filter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { filter, column } = $$props;
    const api = getContext("grid-store");
    const { filterValues } = api.getReactiveState();
    function filterRows(data) {
      api.exec("filter-rows", data);
    }
    const SvelteComponent = filters[filter.type];
    $$renderer2.push(`<!---->`);
    SvelteComponent($$renderer2, {
      filter,
      column,
      action: filterRows,
      filterValue: store_get($$store_subs ??= {}, "$filterValues", filterValues)[column.id]
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function HeaderCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      cell,
      column,
      row,
      lastRow,
      sortRow,
      columnStyle,
      bodyHeight,
      hasSplit
    } = $$props;
    const api = getContext("grid-store");
    const { sortMarks } = api.getReactiveState();
    let sortMark = store_get($$store_subs ??= {}, "$sortMarks", sortMarks)[column.id];
    let isCollapsed = cell.collapsed && column.collapsed;
    let overlay = isCollapsed && !hasSplit && cell.collapsible !== "header";
    let collapsedTextStyle = overlay ? `top:-${bodyHeight / 2}px;position:absolute;` : "";
    let style = getStyle(cell.width, cell.flexgrow, column.fixed, column.left, cell.right ?? column.right, cell.height + (isCollapsed && overlay ? bodyHeight : 0));
    const css = getCssName(column, cell, columnStyle);
    function getCell() {
      return Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell"));
    }
    if (isCollapsed) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")} wx-collapsed`, "svelte-i0lrhp")}${attr_style(style)} role="button"${attr("aria-label", `Expand column ${cell.text || ""}`)}${attr("aria-expanded", !cell.collapsed)} tabindex="0"${attr("data-header-id", column.id)}><div class="wx-text svelte-i0lrhp"${attr_style(collapsedTextStyle)}>${escape_html(cell.text || "")}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")}`, "svelte-i0lrhp", {
        "wx-filter": cell.filter,
        "wx-fixed-right": column.fixed && column.fixed.right
      })}${attr_style(style)}${attr("data-header-id", column.id)}${attr("tabindex", !cell._hidden && column.sort && !cell.filter ? "0" : void 0)} role="columnheader"${attr("aria-colindex", cell._colindex)}${attr("aria-colspan", cell.colspan > 1 ? cell.colspan : void 0)}${attr("aria-rowspan", cell.rowspan > 1 ? cell.rowspan : void 0)}${attr("aria-sort", !sortMark?.order || cell.filter ? "none" : sortMark?.order === "asc" ? "ascending" : "descending")}>`);
      if (cell.collapsible) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="wx-collapse svelte-i0lrhp" role="button"${attr("aria-label", cell.collapsed ? "Expand column" : "Collapse column")}${attr("aria-expanded", !cell.collapsed)} tabindex="0"><i${attr_class(`wxi-angle-${stringify(cell.collapsed ? "down" : "right")}`, "svelte-i0lrhp")}></i></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (cell.cell) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!---->`);
        cell.cell($$renderer2, {
          api,
          cell: getCell(),
          column,
          row,
          onaction: ({ action, data }) => api.exec(action, data)
        });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (cell.filter) {
          $$renderer2.push("<!--[-->");
          Filter($$renderer2, { filter: cell.filter, column });
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="wx-text svelte-i0lrhp">${escape_html(cell.text || "")}</div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (column.resize && lastRow && !cell._hidden) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="wx-grip svelte-i0lrhp" role="presentation" aria-label="Resize column"><div class="svelte-i0lrhp"></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (sortRow) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="wx-sort svelte-i0lrhp">`);
        if (sortMark) {
          $$renderer2.push("<!--[-->");
          if (typeof sortMark.index !== "undefined") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="wx-order svelte-i0lrhp">${escape_html(sortMark.index + 1)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <i${attr_class(`wxi-arrow-${stringify(sortMark.order === "asc" ? "up" : "down")}`, "svelte-i0lrhp")}></i>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function FooterCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const api = getContext("grid-store");
    let { cell, column, row, columnStyle } = $$props;
    let style = getStyle(cell.width, cell.flexgrow, column.fixed, column.left, cell.right ?? column.right, cell.height);
    let css = getCssName(column, cell, columnStyle);
    function getCell() {
      return Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell"));
    }
    $$renderer2.push(`<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")}`, "svelte-1bigdvr", { "wx-fixed-right": column.fixed && column.fixed.right })}${attr_style(style)}>`);
    if (!column.collapsed && !cell.collapsed) {
      $$renderer2.push("<!--[-->");
      if (cell.cell) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!---->`);
        cell.cell($$renderer2, {
          api,
          cell: getCell(),
          column,
          row,
          onaction: ({ action, data }) => api.exec(action, data)
        });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="wx-text svelte-1bigdvr">${escape_html(cell.text || "")}</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function HeaderFooter$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      deltaLeft,
      contentWidth,
      columns,
      type = "header",
      columnStyle,
      bodyHeight
    } = $$props;
    const api = getContext("grid-store");
    const { _sizes: sizes, split } = api.getReactiveState();
    let rowHeights = store_get($$store_subs ??= {}, "$sizes", sizes)[`${type}RowHeights`];
    let renderedHeader = (() => {
      let res = [];
      if (columns.length) {
        const rowsCount = columns[0][type].length;
        for (let ri = 0; ri < rowsCount; ri++) {
          let inSpan = 0;
          res.push([]);
          columns.forEach((col, ci) => {
            const cell = { ...col[type][ri] };
            if (!inSpan) {
              res[ri].push(cell);
            }
            if (cell.colspan > 1) {
              inSpan = cell.colspan - 1;
              if (!isCommunity()) {
                if (col.right) {
                  let right = col.right;
                  for (let i = 1; i < cell.colspan; i++) {
                    right -= columns[ci + i].width;
                  }
                  cell.right = right;
                }
              }
            } else if (inSpan) inSpan--;
          });
        }
      }
      return res;
    })();
    const hasSplit = store_get($$store_subs ??= {}, "$split", split)?.left || store_get($$store_subs ??= {}, "$split", split)?.right;
    function getColumn(id) {
      return columns.find((c) => c.id === id);
    }
    function isLast(cell, ind) {
      if (cell.rowspan) ind += cell.rowspan - 1;
      return ind === renderedHeader.length - 1;
    }
    function isSort(cell, ind, column) {
      if (!column.sort) return false;
      for (let i = renderedHeader.length - 1; i >= 0; i--) {
        const cell2 = column.header[i];
        if (!cell2.filter && !cell2._hidden) return ind === i;
      }
      return isLast(cell, ind);
    }
    $$renderer2.push(`<div${attr_class(`wx-${type}`, "svelte-10yip7c")}${attr_style(`padding-left:${stringify(deltaLeft)}px;width:${stringify(contentWidth)}px;`)} role="rowgroup"><!--[-->`);
    const each_array = ensure_array_like(renderedHeader);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let row = each_array[i];
      $$renderer2.push(`<div${attr_class(clsx(type === "header" ? "wx-h-row" : "wx-f-row"))}${attr_style(`height:${stringify(rowHeights[i])}px; display: flex`)} role="row"><!--[-->`);
      const each_array_1 = ensure_array_like(row);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let cell = each_array_1[$$index];
        const column = getColumn(cell.id);
        if (type === "header") {
          $$renderer2.push("<!--[-->");
          HeaderCell($$renderer2, {
            cell,
            columnStyle,
            column,
            row: i,
            lastRow: isLast(cell, i),
            bodyHeight,
            sortRow: isSort(cell, i, column),
            hasSplit
          });
        } else {
          $$renderer2.push("<!--[!-->");
          FooterCell($$renderer2, { cell, columnStyle, column: getColumn(cell.id), row: i });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Overlay($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { overlay } = $$props;
    const api = getContext("grid-store");
    function isComponent(prop) {
      return typeof prop === "function";
    }
    $$renderer2.push(`<div class="wx-overlay svelte-1uud3pa">`);
    if (isComponent(overlay)) {
      $$renderer2.push("<!--[-->");
      const SvelteComponent = overlay;
      $$renderer2.push(`<!---->`);
      SvelteComponent($$renderer2, { onaction: ({ action, data }) => api.exec(action, data) });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`${escape_html(overlay)}`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Text($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { actions, editor } = $$props;
    let value = editor.value || "";
    $$renderer2.push(`<input class="wx-text svelte-1uw7a81" type="text"${attr("value", value)}/>`);
  });
}
function Combo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { actions, editor, onaction } = $$props;
    let tmp = editor, value = tmp.value, text = tmp.renderedValue, filterOptions = tmp.options;
    let tmp_1 = editor?.config || {}, template = tmp_1.template, cell = tmp_1.cell;
    let index = filterOptions.findIndex((a) => a.id === value);
    function updateValue({ id }) {
      actions.updateValue(id);
      actions.save();
    }
    let navigate;
    function ready(ev) {
      navigate = ev.navigate;
      ev.keydown;
      navigate(index);
    }
    $$renderer2.push(`<input class="wx-input svelte-65hrri"${attr("value", text)}/> `);
    {
      let children = function($$renderer3, { option }) {
        if (template) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`${escape_html(template(option))}`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (cell) {
            $$renderer3.push("<!--[-->");
            const SvelteComponent_1 = cell;
            $$renderer3.push(`<!---->`);
            SvelteComponent_1($$renderer3, { data: option, onaction });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`${escape_html(option.label)}`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      SuggestDropdown($$renderer2, {
        items: filterOptions,
        onready: ready,
        onselect: updateValue,
        children
      });
    }
    $$renderer2.push(`<!---->`);
  });
}
function Datepicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { actions, editor, onaction } = $$props;
    let value = editor.value || /* @__PURE__ */ new Date();
    let template = editor.config?.template;
    let cell = editor.config?.cell;
    function updateValue({ value: value2 }) {
      actions.updateValue(value2);
      actions.save();
    }
    $$renderer2.push(`<div class="wx-value svelte-x6i98q" tabindex="0">`);
    if (template) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${escape_html(template(value))}`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (cell) {
        $$renderer2.push("<!--[-->");
        const SvelteComponent = cell;
        $$renderer2.push(`<!---->`);
        SvelteComponent($$renderer2, { data: editor.value, onaction });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="wx-text svelte-x6i98q">${escape_html(editor.renderedValue)}</span>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    Dropdown($$renderer2, {
      width: "auto",
      children: ($$renderer3) => {
        Calendar($$renderer3, {
          value,
          onchange: updateValue,
          buttons: editor.config?.buttons
        });
      }
    });
    $$renderer2.push(`<!---->`);
  });
}
function Richselect($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { actions, editor, onaction } = $$props;
    let data = editor.options.find((opt) => opt.id === editor.value);
    let tmp = editor, value = tmp.value, options = tmp.options;
    let tmp_1 = editor?.config || {}, template = tmp_1.template, cell = tmp_1.cell;
    let index = options.findIndex((a) => a.id === value);
    function updateValue({ id }) {
      actions.updateValue(id);
      actions.save();
    }
    let navigate;
    function ready(ev) {
      navigate = ev.navigate;
      ev.keydown;
      navigate(index);
    }
    $$renderer2.push(`<div class="wx-value svelte-3ipghm" tabindex="0">`);
    if (template) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${escape_html(template(data))}`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (cell) {
        $$renderer2.push("<!--[-->");
        const SvelteComponent = cell;
        $$renderer2.push(`<!---->`);
        SvelteComponent($$renderer2, { data, onaction });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="wx-text svelte-3ipghm">${escape_html(editor.renderedValue)}</span>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      let children = function($$renderer3, { option }) {
        if (template) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`${escape_html(template(option))}`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (cell) {
            $$renderer3.push("<!--[-->");
            const SvelteComponent_1 = cell;
            $$renderer3.push(`<!---->`);
            SvelteComponent_1($$renderer3, { data: option, onaction });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`${escape_html(option.label)}`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      SuggestDropdown($$renderer2, {
        items: options,
        onready: ready,
        onselect: updateValue,
        children
      });
    }
    $$renderer2.push(`<!---->`);
  });
}
const editors = {
  text: Text,
  combo: Combo,
  datepicker: Datepicker,
  richselect: Richselect
};
function Editor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { column, row } = $$props;
    const api = getContext("grid-store");
    const { editor } = api.getReactiveState();
    function save(ignoreFocus) {
      const cell = ignoreFocus ? null : {
        row: store_get($$store_subs ??= {}, "$editor", editor).id,
        column: store_get($$store_subs ??= {}, "$editor", editor).column
      };
      closeEditor(false, cell);
    }
    function cancel() {
      closeEditor(true, {
        row: store_get($$store_subs ??= {}, "$editor", editor).id,
        column: store_get($$store_subs ??= {}, "$editor", editor).column
      });
    }
    function updateValue(value) {
      api.exec("editor", { value });
    }
    function closeEditor(ignore, cell) {
      api.exec("close-editor", { ignore });
      if (cell) {
        api.exec("focus-cell", { ...cell, eventSource: "click" });
      }
    }
    let style = getStyle(column.width, column.flexgrow, column.fixed, column.left, column.right);
    const SvelteComponent = (() => {
      let editor2 = column.editor;
      if (typeof editor2 === "function") editor2 = editor2(row, column);
      let type = typeof editor2 === "string" ? editor2 : editor2.type;
      return editors[type];
    })();
    $$renderer2.push(`<div class="wx-cell wx-editor svelte-18cc9rz"${attr_style(style)}${attr("role", typeof row.$parent !== "undefined" ? "gridcell" : "cell")}${attr("aria-readonly", typeof row.$parent !== "undefined" ? column.editor ? false : true : void 0)} tabindex="-1"><!---->`);
    SvelteComponent($$renderer2, {
      editor: store_get($$store_subs ??= {}, "$editor", editor),
      actions: { save, cancel, updateValue },
      onaction: ({ action, data }) => api.exec(action, data)
    });
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function HeaderFooter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { columns, type, columnStyle } = $$props;
    const api = getContext("grid-store");
    const { filterValues, _columns, _sizes: sizes } = api.getState();
    function getColumnCss(column) {
      return columnStyle ? " " + columnStyle(column) : "";
    }
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(columns);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let row = each_array[i];
      $$renderer2.push(`<tr><!--[-->`);
      const each_array_1 = ensure_array_like(row);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let cell = each_array_1[$$index];
        const column = _columns.find((c) => c.id == cell.id);
        $$renderer2.push(`<th${attr_style(getPrintCellStyle(cell, sizes.columnWidth))}${attr_class(`wx-print-cell-${stringify(type)} ${stringify(getColumnCss(column))}`, void 0, {
          "wx-print-cell-filter": cell.filter,
          "wx-vertical": cell.vertical
        })}${attr("rowspan", cell.rowspan)}${attr("colspan", cell.colspan)}>`);
        if (cell.cell) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<!---->`);
          cell.cell($$renderer2, {
            api,
            cell: Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell")),
            column,
            row: i
          });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (cell.filter) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="wx-print-filter">${escape_html(getPrintFilterValue(filterValues, _columns, cell))}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="wx-text">${escape_html(cell.text ?? "")}</div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></th>`);
      }
      $$renderer2.push(`<!--]--></tr>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Grid$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      columns,
      rowStyle,
      columnStyle,
      cellStyle,
      header,
      footer,
      reorder
    } = $$props;
    const api = getContext("grid-store");
    const { flatData: data, _sizes: sizes } = api.getState();
    const headerColumns = header && getHeaderFooterPrintColumns(columns, "header", sizes.headerRowHeights);
    const footerColumns = footer && getHeaderFooterPrintColumns(columns, "footer", sizes.footerRowHeights);
    function buildCellCss(row, column) {
      let css = "";
      css += columnStyle ? " " + columnStyle(column) : "";
      css += cellStyle ? " " + cellStyle(row, column) : "";
      return css;
    }
    function isDraggableIcon(row, column) {
      return typeof column.draggable === "function" ? column.draggable(row, column) !== false : column.draggable;
    }
    $$renderer2.push(`<table${attr_class("wx-print-grid svelte-cv008e", void 0, { "wx-flex-columns": columns.some((c) => c.flexgrow) })}>`);
    if (header) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<thead>`);
      HeaderFooter($$renderer2, { columns: headerColumns, type: "header", columnStyle });
      $$renderer2.push(`<!----></thead>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><tbody><!--[-->`);
    const each_array = ensure_array_like(data);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let row = each_array[$$index_1];
      $$renderer2.push(`<tr${attr_class("wx-row" + (rowStyle ? " " + rowStyle(row) : ""), "svelte-cv008e")}><!--[-->`);
      const each_array_1 = ensure_array_like(columns);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let column = each_array_1[$$index];
        if (!column.collapsed) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<td${attr_class(`wx-print-cell wx-cell ${stringify(buildCellCss(row, column))}`, "svelte-cv008e")}${attr_style(getPrintCellStyle(column, sizes.columnWidth))}>`);
          if (reorder && column.draggable) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="wx-print-draggable">`);
            if (isDraggableIcon(row, column)) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<i class="wxi-drag"></i>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (column.treetoggle) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span${attr_style(`margin-left:${stringify(row.$level * 28)}px;`)}></span> `);
            if (row.$count) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<i${attr_class(`wx-print-grid-tree-toggle wxi-menu-${stringify(row.open !== false ? "down" : "right")}`)}></i>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (column.cell) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<!---->`);
            column.cell($$renderer2, { api, row, column });
            $$renderer2.push(`<!---->`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span>${escape_html(getRenderValue(row, column))}</span>`);
          }
          $$renderer2.push(`<!--]--></td>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody>`);
    if (footer) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tfoot>`);
      HeaderFooter($$renderer2, { columns: footerColumns, type: "footer", columnStyle });
      $$renderer2.push(`<!----></tfoot>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></table>`);
  });
}
function Print($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { config, $$slots, $$events, ...restProps } = $$props;
    const api = getContext("grid-store");
    const { _skin: skin, _columns: columns } = api.getState();
    let grids = getPrintColumns(columns, config);
    $$renderer2.push(`<div${attr_class(`wx-${stringify(skin)}-theme wx-print-container`)}><!--[-->`);
    const each_array = ensure_array_like(grids);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cols = each_array[$$index];
      $$renderer2.push(`<div class="wx-print-grid-wrapper">`);
      Grid$1($$renderer2, spread_props([{ columns: cols }, restProps]));
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Layout$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      header,
      footer,
      overlay,
      multiselect,
      reorder,
      rowStyle,
      columnStyle,
      cellStyle,
      autoRowHeight,
      clientWidth,
      clientHeight
    } = $$props;
    const api = getContext("grid-store");
    const {
      dynamic,
      _columns,
      flatData: data,
      split,
      _sizes,
      selectedRows,
      select,
      editor,
      scroll,
      tree,
      focusCell,
      _print,
      undo
    } = api.getReactiveState();
    let SCROLLSIZE = 0;
    let scrollLeft = 0, scrollTop = 0;
    const hasAny = (() => {
      return store_get($$store_subs ??= {}, "$_columns", _columns).some((col) => !col.hidden && col.flexgrow);
    })();
    const defaultRowHeight = store_get($$store_subs ??= {}, "$_sizes", _sizes).rowHeight;
    let dragItem = null, dragNode = null;
    const fullHeight = (() => {
      const count = store_get($$store_subs ??= {}, "$dynamic", dynamic) ? store_get($$store_subs ??= {}, "$dynamic", dynamic).rowCount : store_get($$store_subs ??= {}, "$data", data).length;
      const base = count * defaultRowHeight;
      if (autoRowHeight) {
        return renderedHeight + renderRows.d + (count - renderEnd) * defaultRowHeight;
      } else {
        return base;
      }
    })();
    const fullWidth = store_get($$store_subs ??= {}, "$_columns", _columns).reduce(
      (acc, col) => {
        if (!col.hidden) {
          acc += col.width;
        }
        return acc;
      },
      0
    );
    const leftColumns = (() => {
      let columns = [];
      let width = 0;
      if (store_get($$store_subs ??= {}, "$split", split).left) {
        columns = store_get($$store_subs ??= {}, "$_columns", _columns).slice(0, store_get($$store_subs ??= {}, "$split", split).left).filter((c) => !c.hidden).map((a) => ({ ...a }));
        columns.forEach((a) => {
          a.fixed = { left: 1 };
          a.left = width;
          width += a.width;
        });
        if (columns.length) columns[columns.length - 1].fixed = { left: -1 };
      }
      return { columns, width };
    })();
    const rightColumns = (() => {
      let columns = [];
      let width = 0;
      if (store_get($$store_subs ??= {}, "$split", split).right) {
        columns = store_get($$store_subs ??= {}, "$_columns", _columns).slice(store_get($$store_subs ??= {}, "$split", split).right * -1).filter((c) => !c.hidden).map((a) => ({ ...a }));
        for (let i = columns.length - 1; i >= 0; i--) {
          const col = columns[i];
          col.fixed = { right: 1 };
          col.right = width;
          width += col.width;
        }
        if (columns.length) columns[0].fixed = { right: -1 };
      }
      return { columns, width };
    })();
    const centerColumns = (() => {
      const center = store_get($$store_subs ??= {}, "$_columns", _columns).slice(store_get($$store_subs ??= {}, "$split", split).left, store_get($$store_subs ??= {}, "$_columns", _columns).length - (store_get($$store_subs ??= {}, "$split", split).right ?? 0)).filter((c) => !c.hidden);
      center.forEach((a) => {
        a.fixed = 0;
      });
      return center;
    })();
    const EXTRACOLUMNS = 1;
    const renderColumns = (() => {
      let data2, header2, footer2;
      const left = scrollLeft;
      const right = scrollLeft + clientWidth;
      let start = 0;
      let end = 0;
      let sum = 0;
      let d = 0;
      centerColumns.forEach((col, index) => {
        if (left > sum) {
          start = index;
          d = sum;
        }
        sum = sum + col.width;
        if (right > sum) end = index + EXTRACOLUMNS;
      });
      const rightSpanDelta = { header: 0, footer: 0 };
      for (let i = end; i >= start; i--) {
        ["header", "footer"].forEach((key) => {
          if (centerColumns[i]) centerColumns[i][key].forEach((hCell) => {
            const colspan = hCell.colspan;
            if (colspan && colspan > 1) {
              const diff = colspan - (end - i + 1);
              if (diff > 0) {
                rightSpanDelta[key] = Math.max(rightSpanDelta[key], diff);
              }
            }
          });
        });
      }
      const headerPos = getHeaderPosition(start, d, "header");
      const footerPos = getHeaderPosition(start, d, "footer");
      const dh = headerPos.delta;
      const csH = headerPos.index;
      const df = footerPos.delta;
      const csF = footerPos.index;
      if (hasAny && fullWidth > clientWidth) {
        data2 = header2 = footer2 = [
          ...leftColumns.columns,
          ...centerColumns,
          ...rightColumns.columns
        ];
      } else {
        data2 = [
          ...leftColumns.columns,
          ...centerColumns.slice(start, end + 1),
          ...rightColumns.columns
        ];
        header2 = [
          ...leftColumns.columns,
          ...centerColumns.slice(csH, end + rightSpanDelta.header + 1),
          ...rightColumns.columns
        ];
        footer2 = [
          ...leftColumns.columns,
          ...centerColumns.slice(csF, end + rightSpanDelta.footer + 1),
          ...rightColumns.columns
        ];
      }
      return { data: data2, header: header2, footer: footer2, d, df, dh };
    })();
    const contentWidth = hasAny && fullWidth <= clientWidth ? clientWidth - (hasVScroll ? SCROLLSIZE : 0) : fullWidth;
    const headerHeight = header ? store_get($$store_subs ??= {}, "$_sizes", _sizes).headerHeight : 0;
    const footerHeight = footer ? store_get($$store_subs ??= {}, "$_sizes", _sizes).footerHeight : 0;
    const hasVScroll = clientWidth && clientHeight ? fullHeight + headerHeight + footerHeight >= clientHeight - (fullWidth >= clientWidth ? SCROLLSIZE : 0) : false;
    const hasHScroll = clientWidth && clientHeight ? fullWidth >= clientWidth : false;
    const globalWidth = hasAny && fullWidth <= clientWidth ? clientWidth : contentWidth < clientWidth ? fullWidth + (hasVScroll ? SCROLLSIZE : 0) : -1;
    const visibleRowsHeight = clientHeight - headerHeight - footerHeight - (hasHScroll ? SCROLLSIZE : 0);
    const visibleRows = Math.ceil(visibleRowsHeight / defaultRowHeight) + 1;
    const EXTRAROWS = 2;
    const renderRows = (() => {
      let start = 0, deltaTop = 0;
      if (autoRowHeight) {
        let st = scrollTop;
        while (st > 0) {
          st -= rowHeights[start] || defaultRowHeight;
          start++;
        }
        deltaTop = scrollTop - st;
        for (let i = Math.max(0, start - EXTRAROWS - 1); i < start; i++) deltaTop -= rowHeights[start - i] || defaultRowHeight;
        start = Math.max(0, start - EXTRAROWS);
      } else {
        start = Math.floor(scrollTop / defaultRowHeight);
        start = Math.max(0, start - EXTRAROWS);
        deltaTop = start * defaultRowHeight;
      }
      const end = Math.min(
        store_get($$store_subs ??= {}, "$dynamic", dynamic) ? store_get($$store_subs ??= {}, "$dynamic", dynamic).rowCount : store_get($$store_subs ??= {}, "$data", data).length,
        start + visibleRows + EXTRAROWS
      );
      return { d: deltaTop, start, end };
    })();
    const dataRows = (() => {
      if (store_get($$store_subs ??= {}, "$dynamic", dynamic)) return store_get($$store_subs ??= {}, "$data", data);
      else {
        return store_get($$store_subs ??= {}, "$data", data).slice(renderRows.start, renderRows.end);
      }
    })();
    store_get($$store_subs ??= {}, "$selectedRows", selectedRows).filter((s) => dataRows.some((r) => r.id === s));
    let renderEnd = void 0;
    ({
      sense: autoRowHeight && dragNode ? dragNode.offsetHeight : Math.max(store_get($$store_subs ??= {}, "$_sizes", _sizes).rowHeight, 40)
    });
    function getHeaderPosition(start, deltaLeft, type) {
      let delta = deltaLeft;
      let index = start;
      if (centerColumns.length) {
        let spanStartInd = centerColumns.length;
        for (let i = start; i >= 0; i--) {
          const colHeader = centerColumns[i][type];
          colHeader.forEach((h) => {
            if (h.colspan > 1 && i > start - h.colspan && i < spanStartInd) {
              spanStartInd = i;
            }
          });
        }
        if (spanStartInd !== centerColumns.length && spanStartInd < start) {
          for (let i = spanStartInd; i < start; i++) {
            delta -= centerColumns[i].width;
          }
          index = spanStartInd;
        }
      }
      return { index, delta };
    }
    const style = globalWidth > 0 ? `width:${globalWidth}px;` : "";
    let rowHeights = [];
    let renderedHeight = 0;
    let focus = void 0;
    $$renderer2.push(`<div${attr_class(`wx-grid ${""}`, "svelte-i5amn0")}${attr_style(`--header-height:${stringify(headerHeight)}px; --footer-height:${stringify(footerHeight)}px;--split-left-width:${stringify(leftColumns.width)}px; --split-right-width:${stringify(rightColumns.width)}px;`)}><div class="wx-table-box svelte-i5amn0"${attr_style(style)}${attr("role", store_get($$store_subs ??= {}, "$tree", tree) ? "treegrid" : "grid")}${attr("aria-colcount", renderColumns.data.length)}${attr("aria-rowcount", dataRows.length)}${attr("aria-multiselectable", store_get($$store_subs ??= {}, "$tree", tree) && multiselect ? true : void 0)}><div class="wx-scroll svelte-i5amn0"${attr_style(`overflow-x:${stringify(hasHScroll ? "scroll" : "hidden")};overflow-y:${stringify(hasVScroll ? "scroll" : "hidden")};`)}>`);
    if (header) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="wx-header-wrapper svelte-i5amn0">`);
      HeaderFooter$1($$renderer2, {
        contentWidth,
        deltaLeft: renderColumns.dh,
        columns: renderColumns.header,
        columnStyle,
        bodyHeight: visibleRowsHeight - +footer
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="wx-body svelte-i5amn0"${attr_style(`width:${stringify(contentWidth)}px;height:${stringify(fullHeight)}px;`)}>`);
    if (overlay) {
      $$renderer2.push("<!--[-->");
      Overlay($$renderer2, { overlay });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="wx-data svelte-i5amn0"${attr_style(`padding-top:${stringify(renderRows.d)}px;padding-left:${stringify(renderColumns.d)}px;`)}><!--[-->`);
    const each_array = ensure_array_like(dataRows);
    for (let rIndex = 0, $$length = each_array.length; rIndex < $$length; rIndex++) {
      let row = each_array[rIndex];
      $$renderer2.push(`<div${attr_class("wx-row" + (rowStyle ? " " + rowStyle(row) : ""), "svelte-i5amn0", {
        "wx-autoheight": autoRowHeight,
        "wx-selected": store_get($$store_subs ??= {}, "$selectedRows", selectedRows).indexOf(row.id) !== -1,
        "wx-inactive": dragItem === row.id
      })}${attr("data-id", row.id)}${attr("data-context-id", row.id)}${attr_style(`${autoRowHeight ? "min-height" : "height"}:${defaultRowHeight}px;`)} role="row"${attr("aria-rowindex", rIndex)}${attr("aria-expanded", row.open)}${attr("aria-level", store_get($$store_subs ??= {}, "$tree", tree) ? row.$level + 1 : void 0)}${attr("aria-selected", store_get($$store_subs ??= {}, "$tree", tree) ? store_get($$store_subs ??= {}, "$selectedRows", selectedRows).indexOf(row.id) !== -1 : void 0)} tabindex="-1"><!--[-->`);
      const each_array_1 = ensure_array_like(renderColumns.data);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let column = each_array_1[$$index];
        if (column.collapsed) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="wx-cell wx-collapsed svelte-i5amn0"></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (store_get($$store_subs ??= {}, "$editor", editor)?.id === row.id && store_get($$store_subs ??= {}, "$editor", editor).column == column.id) {
            $$renderer2.push("<!--[-->");
            Editor($$renderer2, { row, column });
          } else {
            $$renderer2.push("<!--[!-->");
            Cell($$renderer2, {
              row,
              column,
              columnStyle,
              cellStyle,
              reorder,
              focusable: focus?.row === row.id && focus?.column == column.id
            });
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (footer && store_get($$store_subs ??= {}, "$data", data).length) {
      $$renderer2.push("<!--[-->");
      HeaderFooter$1($$renderer2, {
        type: "footer",
        contentWidth,
        deltaLeft: renderColumns.df,
        columns: renderColumns.footer,
        columnStyle
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    if (store_get($$store_subs ??= {}, "$_print", _print)) {
      $$renderer2.push("<!--[-->");
      Print($$renderer2, {
        config: store_get($$store_subs ??= {}, "$_print", _print),
        rowStyle,
        columnStyle,
        cellStyle,
        header,
        footer,
        reorder
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Grid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      data = [],
      columns = [],
      rowStyle = null,
      columnStyle = null,
      cellStyle = null,
      selectedRows = [],
      select = true,
      multiselect = false,
      header = true,
      footer = false,
      dynamic = null,
      overlay = null,
      reorder = false,
      onreorder = null,
      autoRowHeight = false,
      sizes = {},
      split = { left: 0 },
      tree = false,
      autoConfig = false,
      init = null,
      responsive = null,
      sortMarks = {},
      undo = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let clientWidth = 0;
    let clientHeight = 0;
    const dataStore = new DataStore(writable);
    let firstInRoute = dataStore.in;
    const dash = /-/g;
    let lastInRoute = new EventBusRouter((a, b) => {
      const name = "on" + a.replace(dash, "");
      if (restProps[name]) {
        restProps[name](b);
      }
    });
    firstInRoute.setNext(lastInRoute);
    const getState = dataStore.getState.bind(dataStore), getReactiveState = dataStore.getReactive.bind(dataStore), getStores = () => ({ data: dataStore }), exec = firstInRoute.exec, setNext = (ev) => lastInRoute = lastInRoute.setNext(ev), intercept = firstInRoute.intercept.bind(firstInRoute), on = firstInRoute.on.bind(firstInRoute), detach = firstInRoute.detach.bind(firstInRoute), getRow = (id) => dataStore.getRow(id), getColumn = (id) => dataStore.getColumn(id);
    const api = {
      exec,
      setNext,
      intercept,
      on,
      detach,
      getRow,
      getColumn,
      getState,
      getReactiveState,
      getStores
    };
    setContext("grid-store", {
      getState: dataStore.getState.bind(dataStore),
      getReactiveState: dataStore.getReactive.bind(dataStore),
      exec: firstInRoute.exec.bind(firstInRoute),
      getRow: dataStore.getRow.bind(dataStore),
      getRowIndex: dataStore.getRowIndex.bind(dataStore)
    });
    const finalColumns = (() => {
      if (autoConfig && !columns.length && data.length) {
        const test = data[0];
        const autoCols = [];
        for (let key in test) {
          if (key !== "id" && key[0] !== "$") {
            let col = { id: key, header: key[0].toUpperCase() + key.slice(1) };
            if (typeof autoConfig === "object") {
              col = { ...col, ...autoConfig };
            }
            autoCols.push(col);
          }
        }
        return autoCols;
      }
      return columns;
    })();
    const finalSizes = sizes;
    const isReorderAvailable = (() => {
      let available = !tree;
      if (!isCommunity()) available = true;
      return available ? reorder : false;
    })();
    let _skin = getContext("wx-theme");
    let init_once = true;
    const reinitStore = () => {
      dataStore.init({
        data,
        columns: finalColumns,
        split,
        sizes: finalSizes,
        selectedRows,
        dynamic,
        tree,
        sortMarks,
        select,
        undo,
        _skin
      });
      if (init_once && init) {
        init(api);
        init_once = false;
      }
    };
    reinitStore();
    Locale($$renderer2, {
      words: en$1,
      optional: true,
      children: ($$renderer3) => {
        Layout$1($$renderer3, {
          header,
          footer,
          overlay,
          rowStyle,
          columnStyle,
          cellStyle,
          reorder: isReorderAvailable,
          multiselect,
          autoRowHeight,
          clientWidth,
          clientHeight
        });
      }
    });
    bind_props($$props, {
      getState,
      getReactiveState,
      getStores,
      exec,
      setNext,
      intercept,
      on,
      detach,
      getRow,
      getColumn
    });
  });
}
setEnv(env);
function TextCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { row, column } = $$props;
    function getStyle2(row2, col) {
      return `justify-content:${col.align};padding-left: ${(row2.$level - 1) * 20}px`;
    }
    $$renderer2.push(`<div class="wx-content svelte-ko0kne"${attr_style(getStyle2(row, column))}>`);
    if (row.data || row.lazy) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i${attr_class(`wx-toggle-icon wxi-menu-${stringify(row.open ? "down" : "right")}`, "svelte-ko0kne")} data-action="open-task"></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<i class="wx-toggle-placeholder svelte-ko0kne"></i>`);
    }
    $$renderer2.push(`<!--]--> <div class="wx-text svelte-ko0kne">`);
    if (column._cell) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      column._cell($$renderer2, { row, column });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`${escape_html(row.text)}`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function ActionCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { column, cell } = $$props;
    const action = column.id;
    if (cell || column.id == "add-task") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_style(`text-align:${stringify(column.align)}`)}><i class="wx-action-icon wxi-plus svelte-pkrxv5"${attr("data-action", action)}></i></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Grid_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      readonly,
      compactMode,
      width = 0,
      columnWidth,
      display = "all",
      tableAPI = void 0
    } = $$props;
    const _ = getContext("wx-i18n").getGroup("gantt");
    const api = getContext("gantt-store");
    const {
      scrollTop,
      cellHeight,
      _scrollTask: scrollTask,
      _selected: selected,
      area,
      _tasks: rTasks,
      _scales: scales,
      columns,
      _sort: sort,
      durationUnit
    } = api.getReactiveState();
    function execAction(id, action) {
      if (action == "add-task") {
        api.exec(action, {
          target: id,
          task: { text: _("New Task") },
          mode: "child",
          show: true
        });
      } else if (action == "open-task") {
        const task = tasks.find((a) => a.id === id);
        if (task.data || task.lazy) api.exec(action, { id, mode: !task.open });
      }
    }
    let gridWidth = 0;
    let table = void 0;
    let tableContainer = void 0;
    function handleHotkey(ev) {
      const { key, isInput } = ev;
      if (!isInput && (key === "arrowup" || key === "arrowdown")) {
        ev.eventSource = "grid";
        api.exec("hotkey", ev);
        return false;
      } else if (key === "enter") {
        const focusCell = tableAPI.getState().focusCell;
        if (focusCell) {
          const { row, column } = focusCell;
          if (column === "add-task") {
            execAction(row, "add-task");
          } else if (column === "text") {
            execAction(row, "open-task");
          }
        }
      }
    }
    function init(tapi) {
      tableAPI = tapi;
      tapi.intercept("hotkey", handleHotkey);
      tapi.intercept("scroll", () => false);
      tapi.intercept("select-row", () => false);
      tapi.intercept("sort-rows", (e) => {
        const { key, add } = e;
        let keySort = store_get($$store_subs ??= {}, "$sort", sort) ? store_get($$store_subs ??= {}, "$sort", sort).find((s) => s.key === key) : null;
        let order = "asc";
        if (keySort) order = !keySort || keySort.order === "asc" ? "desc" : "asc";
        api.exec("sort-tasks", { key, order, add });
        return false;
      });
      tapi.on("resize-column", () => {
        setColumnWidth(true);
      });
      tapi.on("hide-column", (ev) => {
        if (!ev.mode) adjustColumns();
        setColumnWidth();
      });
      tapi.intercept("update-cell", (e) => {
        const { id, column, value } = e;
        const task = tasks.find((t) => t.id === id);
        if (task) {
          const update = { ...task };
          let v = value;
          if (v && !isNaN(v) && !(v instanceof Date)) v *= 1;
          update[column] = v;
          normalizeDates(update, store_get($$store_subs ??= {}, "$durationUnit", durationUnit), true, column);
          api.exec("update-task", { id, task: update });
        }
        return false;
      });
    }
    store_get($$store_subs ??= {}, "$area", area).from;
    const headerHeight = store_get($$store_subs ??= {}, "$scales", scales).height;
    const scrollX = !compactMode && display !== "grid" ? columnWidth > width : columnWidth > gridWidth;
    const basis = display === "all" ? `${width}px` : display === "grid" ? "calc(100% - 4px)" : cols.find((c) => c.id === "add-task") ? "50px" : "0";
    const tableStyle = scrollX && display === "all" ? `width:${columnWidth}px;` : display === "grid" ? scrollX ? `width:${columnWidth}px;` : `width:100%;` : ``;
    const sel = store_get($$store_subs ??= {}, "$selected", selected).map((o) => o.id);
    const tasks = store_get($$store_subs ??= {}, "$rTasks", rTasks).slice(store_get($$store_subs ??= {}, "$area", area).start, store_get($$store_subs ??= {}, "$area", area).end);
    const allTasks = tasks;
    function checkFlex() {
      return cols.some((c) => c.flexgrow && !c.hidden);
    }
    const hasFlexCol = (() => {
      return checkFlex();
    })();
    function setColumnWidth(resized) {
      if (!checkFlex()) {
        const newColumnWidth = fitColumns.reduce(
          (acc, col) => {
            if (resized && col.$width) col.$width = col.width;
            return acc + (col.hidden ? 0 : col.width);
          },
          0
        );
        if (newColumnWidth !== columnWidth) columnWidth = newColumnWidth;
      }
    }
    function adjustColumns() {
      const flexCols = cols.filter((c) => c.flexgrow && !c.hidden);
      if (flexCols.length === 1) cols.forEach((c) => {
        if (c.$width && !c.flexgrow && !c.hidden) c.width = c.$width;
      });
    }
    const cols = (() => {
      let cols2 = store_get($$store_subs ??= {}, "$columns", columns).map((col) => {
        col = { ...col };
        const header = col.header;
        if (typeof header === "object") {
          const text = header.text && _(header.text);
          col.header = { ...header, text };
        } else col.header = _(header);
        return col;
      });
      const ti = cols2.findIndex((c) => c.id === "text");
      const ai = cols2.findIndex((c) => c.id === "add-task");
      if (ti !== -1) {
        if (cols2[ti].cell) cols2[ti]._cell = cols2[ti].cell;
        cols2[ti].cell = TextCell;
      }
      if (ai !== -1) {
        cols2[ai].cell = cols2[ai].cell || ActionCell;
        const header = cols2[ai].header;
        if (typeof header !== "object") cols2[ai].header = { text: header };
        cols2[ai].header.cell = header.cell || ActionCell;
        if (readonly) {
          cols2.splice(ai, 1);
        } else {
          if (compactMode) {
            const [actionCol] = cols2.splice(ai, 1);
            cols2.unshift(actionCol);
          }
        }
      }
      if (cols2.length > 0) cols2[cols2.length - 1].resize = false;
      return cols2;
    })();
    let sortMarks = (() => {
      if (allTasks && store_get($$store_subs ??= {}, "$sort", sort)?.length) {
        const marks = {};
        store_get($$store_subs ??= {}, "$sort", sort).forEach(({ key, order }, index) => {
          marks[key] = {
            order,
            ...store_get($$store_subs ??= {}, "$sort", sort).length > 1 && { index }
          };
        });
        return marks;
      }
      return {};
    })();
    const fitColumns = (() => {
      let filteredColumns = display === "chart" ? cols.filter((c) => c.id === "add-task") : cols;
      const containerWidth = display === "all" ? width : gridWidth;
      if (!hasFlexCol) {
        let baseColumnWidth = columnWidth;
        let forceReset = false;
        if (cols.some((c) => c.$width)) {
          let actualWidth = 0;
          baseColumnWidth = cols.reduce(
            (acc, col) => {
              if (!col.hidden) {
                actualWidth += col.width;
                acc += col.$width || col.width;
              }
              return acc;
            },
            0
          );
          if (actualWidth > baseColumnWidth && baseColumnWidth > containerWidth) forceReset = true;
        }
        if (forceReset || baseColumnWidth < containerWidth) {
          let k = 1;
          if (!forceReset) k = (containerWidth - 50) / (baseColumnWidth - 50 || 1);
          return filteredColumns.map((c) => {
            if (c.id !== "add-task" && !c.hidden) {
              if (!c.$width) c.$width = c.width;
              c.width = c.$width * k;
            }
            return c;
          });
        }
      }
      return filteredColumns;
    })();
    function setScrollOffset() {
      tableContainer.scrollTop = 0;
    }
    new ResizeObserver(() => {
      setScrollOffset();
    });
    scrollTask.subscribe((value) => {
      if (!value) return;
      const { id } = value;
      const focusCell = tableAPI.getState().focusCell;
      if (focusCell && focusCell.row !== id && table) ;
    });
    $$renderer2.push(`<div class="wx-table-container svelte-1br6jrf"${attr_style(`flex: 0 0 ${stringify(basis)};`)}><div${attr_style(tableStyle)} class="wx-table svelte-1br6jrf">`);
    Grid($$renderer2, {
      init,
      sizes: {
        rowHeight: store_get($$store_subs ??= {}, "$cellHeight", cellHeight),
        headerHeight: headerHeight - 1
      },
      rowStyle: (row) => row.$reorder ? "wx-reorder-task" : "",
      columnStyle: (col) => `wx-text-${col.align} ${col.id === "add-task" ? "wx-action" : ""}`,
      data: allTasks,
      columns: fitColumns,
      selectedRows: [...sel],
      sortMarks
    });
    $$renderer2.push(`<!----></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { display, tableAPI });
  });
}
function CellGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { borders = "" } = $$props;
    const api = getContext("gantt-store");
    const { cellWidth, cellHeight } = api.getReactiveState();
    let color = "#e4e4e4";
    $$renderer2.push(`<div${attr_style(`width:100%; height:100%; background:url(${stringify(grid(store_get($$store_subs ??= {}, "$cellWidth", cellWidth), store_get($$store_subs ??= {}, "$cellHeight", cellHeight), color, borders))}); position: absolute;`)}></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Bars($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { readonly, taskTemplate } = $$props;
    const api = getContext("gantt-store");
    const {
      _tasks: rTasks,
      _links: rLinks,
      area,
      _scales: scales,
      taskTypes,
      baselines,
      _selected: selected,
      _scrollTask: scrollTask
    } = api.getReactiveState();
    let tasks = store_get($$store_subs ??= {}, "$rTasks", rTasks).slice(store_get($$store_subs ??= {}, "$area", area).start, store_get($$store_subs ??= {}, "$area", area).end).map((a) => ({ ...a }));
    store_get($$store_subs ??= {}, "$scales", scales).lengthUnitWidth;
    let linkFrom = void 0;
    let touched = void 0;
    function taskStyle(task) {
      return `left:${task.$x}px;top:${task.$y}px;width:${task.$w}px;height:${task.$h}px;`;
    }
    function baselineStyle(task) {
      return `left:${task.$x_base}px;top:${task.$y_base}px;width:${task.$w_base}px;height:${task.$h_base}px;`;
    }
    function taskTypeCss(type) {
      let css = store_get($$store_subs ??= {}, "$taskTypes", taskTypes).some((t) => type === t.id) ? type : "task";
      if (css !== "task" && css !== "milestone" && css !== "summary") css = `task ${css}`;
      return css;
    }
    function forward(ev) {
      api.exec(ev.action, ev.data);
    }
    let container = void 0;
    const hasFocus = store_get($$store_subs ??= {}, "$selected", selected).length && container;
    const focused = hasFocus;
    scrollTask.subscribe((value) => {
    });
    $$renderer2.push(`<div class="wx-bars svelte-s05ouj"${attr_style(`line-height: ${stringify(tasks.length ? tasks[0].$h : 0)}px`)}><!--[-->`);
    const each_array = ensure_array_like(tasks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let task = each_array[$$index];
      if (!task.$skip) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`wx-bar wx-${stringify(taskTypeCss(task.type))}`, "svelte-s05ouj", {
          "wx-touch": touched,
          "wx-selected": linkFrom,
          "wx-reorder-task": task.$reorder
        })}${attr_style(taskStyle(task))}${attr("data-tooltip-id", task.id)}${attr("data-id", task.id)}${attr("tabindex", focused === task.id ? "0" : "-1")}>`);
        if (!readonly) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div${attr_class("wx-link wx-left svelte-s05ouj", void 0, {
            "wx-visible": linkFrom,
            "wx-target": !linkFrom,
            "wx-selected": linkFrom
          })}><div class="wx-inner svelte-s05ouj"></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (task.type !== "milestone") {
          $$renderer2.push("<!--[-->");
          if (task.progress) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="wx-progress-wrapper svelte-s05ouj"><div class="wx-progress-percent svelte-s05ouj"${attr_style(`width:${stringify(task.progress)}%`)}></div></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (!readonly) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="wx-progress-marker svelte-s05ouj"${attr_style(`left:calc(${stringify(task.progress)}% - 10px);`)}>${escape_html(task.progress)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (taskTemplate) {
            $$renderer2.push("<!--[-->");
            const SvelteComponent = taskTemplate;
            $$renderer2.push(`<!---->`);
            SvelteComponent($$renderer2, { data: task, api, onaction: forward });
            $$renderer2.push(`<!---->`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="wx-content svelte-s05ouj">${escape_html(task.text || "")}</div>`);
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="wx-content svelte-s05ouj"></div> `);
          if (taskTemplate) {
            $$renderer2.push("<!--[-->");
            const SvelteComponent_1 = taskTemplate;
            $$renderer2.push(`<!---->`);
            SvelteComponent_1($$renderer2, { data: task, api, onaction: forward });
            $$renderer2.push(`<!---->`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="wx-text-out svelte-s05ouj">${escape_html(task.text)}</div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> `);
        if (!readonly) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div${attr_class("wx-link wx-right svelte-s05ouj", void 0, {
            "wx-visible": linkFrom,
            "wx-target": !linkFrom,
            "wx-selected": linkFrom
          })}><div class="wx-inner svelte-s05ouj"></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (store_get($$store_subs ??= {}, "$baselines", baselines) && !task.$skip_baseline) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class("wx-baseline svelte-s05ouj", void 0, { "wx-milestone": task.type === "milestone" })}${attr_style(baselineStyle(task))}></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Links($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const api = getContext("gantt-store");
    const links = api.getReactiveState()._links;
    $$renderer2.push(`<svg class="wx-links svelte-11h8y6i"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$links", links));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<polyline class="wx-line svelte-11h8y6i"${attr("points", link.$p)}></polyline>`);
    }
    $$renderer2.push(`<!--]--></svg>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Chart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      readonly,
      fullWidth,
      fullHeight,
      taskTemplate,
      cellBorders,
      highlightTime
    } = $$props;
    const api = getContext("gantt-store");
    const {
      _selected: selected,
      scrollLeft: rScrollLeft,
      scrollTop: rScrollTop,
      cellWidth,
      cellHeight,
      _scales: scales,
      zoom,
      context,
      _markers: markers,
      _scrollTask: rScrollTask
    } = api.getReactiveState();
    let scrollLeft = void 0;
    let chartHeight = void 0;
    let chart = void 0;
    rScrollLeft.subscribe((value) => scrollLeft = value);
    rScrollTop.subscribe((value) => value);
    const selectStyle = (() => {
      const t = [];
      if (store_get($$store_subs ??= {}, "$selected", selected).length && store_get($$store_subs ??= {}, "$cellHeight", cellHeight)) {
        store_get($$store_subs ??= {}, "$selected", selected).forEach((obj) => {
          t.push([
            `height: ${store_get($$store_subs ??= {}, "$cellHeight", cellHeight)}px;top: ${obj.$y - 3}px`
          ]);
        });
      }
      return t;
    })();
    const chartGridHeight = Math.max(chartHeight, fullHeight);
    function showTask(value) {
      if (store_get($$store_subs ??= {}, "$context", context) || !value) return;
      const { id, mode } = value;
      if (mode.toString().indexOf("x") < 0) return;
      const { clientWidth } = chart;
      const task = api.getTask(id);
      if (task.$x + task.$w < scrollLeft) {
        scrollLeft = task.$x - store_get($$store_subs ??= {}, "$cellWidth", cellWidth);
      } else if (task.$x >= clientWidth + scrollLeft) {
        const width = clientWidth < task.$w ? store_get($$store_subs ??= {}, "$cellWidth", cellWidth) : task.$w;
        scrollLeft = task.$x - clientWidth + width;
      }
    }
    rScrollTask.subscribe((value) => showTask(value));
    function getHoliday(cell) {
      const style = highlightTime(cell.date, cell.unit);
      if (style) return { css: style, width: cell.width };
      return null;
    }
    const holidays = (() => {
      return (store_get($$store_subs ??= {}, "$scales", scales).minUnit === "hour" || store_get($$store_subs ??= {}, "$scales", scales).minUnit === "day") && highlightTime ? store_get($$store_subs ??= {}, "$scales", scales).rows[store_get($$store_subs ??= {}, "$scales", scales).rows.length - 1].cells.map(getHoliday) : null;
    })();
    $$renderer2.push(`<div class="wx-chart svelte-1k3mrll" tabindex="-1">`);
    if (store_get($$store_subs ??= {}, "$markers", markers).length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="wx-markers svelte-1k3mrll"${attr_style(`height:${stringify(chartGridHeight)}px;`)}><!--[-->`);
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$markers", markers));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let marker = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`wx-marker ${stringify(marker.css || "wx-default")}`, "svelte-1k3mrll")}${attr_style(`left:${stringify(marker.left)}px`)}><div class="wx-content svelte-1k3mrll">${escape_html(marker.text)}</div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="wx-area svelte-1k3mrll"${attr_style(`width:${stringify(fullWidth)}px;height:${stringify(chartGridHeight)}px`)}>`);
    if (holidays) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="wx-gantt-holidays svelte-1k3mrll" style="height:100%;"><!--[-->`);
      const each_array_1 = ensure_array_like(holidays);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let holiday = each_array_1[i];
        if (holiday) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div${attr_class(clsx(holiday.css), "svelte-1k3mrll")}${attr_style(`width: ${stringify(holiday.width)}px; left:${stringify(i * holiday.width)}px`)}></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    CellGrid($$renderer2, { borders: cellBorders });
    $$renderer2.push(`<!----> `);
    if (store_get($$store_subs ??= {}, "$selected", selected).length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$selected", selected));
      for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
        let obj = each_array_2[index];
        if (obj.$y) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="wx-selected svelte-1k3mrll"${attr("data-id", obj.id)}${attr_style(selectStyle[index])}></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Links($$renderer2);
    $$renderer2.push(`<!----> `);
    Bars($$renderer2, { readonly, taskTemplate });
    $$renderer2.push(`<!----></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Resizer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      position = "after",
      size = 4,
      dir = "x",
      value = 0,
      minValue = 0,
      maxValue = 0,
      onmove,
      display = "all",
      compactMode
    } = $$props;
    function getBox(value2) {
      let offset = 0;
      if (position == "center") offset = size / 2;
      else if (position == "before") offset = size;
      const box = {
        size: [size + "px", "auto"],
        p: [value2 - offset + "px", "0px"],
        p2: ["auto", "0px"]
      };
      if (dir != "x") for (let name in box) box[name] = box[name].reverse();
      return box;
    }
    let active = false;
    const b = getBox(value);
    const cursor = display !== "all" ? "auto" : dir == "x" ? "ew-resize" : "ns-resize";
    $$renderer2.push(`<div${attr_class(`wx-resizer wx-resizer-${stringify(dir)} wx-resizer-display-${stringify(display)}`, "svelte-dmdpua", { "wx-resizer-active": active })}${attr_style(`width:${stringify(b.size[0])}; height: ${stringify(b.size[1])}; cursor:${stringify(cursor)};`)}><div class="wx-button-expand-box svelte-dmdpua"><div class="wx-button-expand-content wx-button-expand-left svelte-dmdpua"><i class="wxi-menu-left svelte-dmdpua"></i></div> <div class="wx-button-expand-content wx-button-expand-right svelte-dmdpua"><i class="wxi-menu-right svelte-dmdpua"></i></div></div> <div class="wx-resizer-line"></div></div>`);
    bind_props($$props, { value, display });
  });
}
function Layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      taskTemplate,
      readonly,
      cellBorders,
      highlightTime,
      tableAPI = void 0
    } = $$props;
    const api = getContext("gantt-store");
    const {
      _tasks: rTasks,
      _scales: rScales,
      cellHeight: rCellHeight,
      columns: rColumns,
      scrollTop,
      _scrollTask: rScrollTask
    } = api.getReactiveState();
    let compactMode = false;
    let gridWidth = 0;
    let ganttWidth = void 0;
    let ganttHeight = void 0;
    let innerWidth = void 0;
    let display = "all";
    const gridColumnWidth = (() => {
      let w;
      if (store_get($$store_subs ??= {}, "$rColumns", rColumns).every((c) => c.width && !c.flexgrow)) {
        w = store_get($$store_subs ??= {}, "$rColumns", rColumns).reduce((acc, c) => acc + parseInt(c.width), 0);
      } else {
        {
          w = 440;
        }
      }
      return w;
    })();
    const scrollSize = ganttWidth - innerWidth;
    const fullWidth = store_get($$store_subs ??= {}, "$rScales", rScales).width;
    const fullHeight = store_get($$store_subs ??= {}, "$rTasks", rTasks).length * store_get($$store_subs ??= {}, "$rCellHeight", rCellHeight);
    const scrollHeight = store_get($$store_subs ??= {}, "$rScales", rScales).height + fullHeight + scrollSize;
    function scrollToTask(value) {
      return;
    }
    rScrollTask.subscribe(scrollToTask);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="wx-gantt svelte-1xvkgdq"><div class="wx-pseudo-rows svelte-1xvkgdq"${attr_style(`height:${stringify(scrollHeight)}px;width:100%;`)}><div class="wx-stuck svelte-1xvkgdq"${attr_style(`height:${stringify(ganttHeight)}px;width:${stringify(innerWidth)}px;`)}><div tabindex="0" class="wx-layout svelte-1xvkgdq">`);
      if (store_get($$store_subs ??= {}, "$rColumns", rColumns).length) {
        $$renderer3.push("<!--[-->");
        Grid_1($$renderer3, {
          compactMode,
          columnWidth: gridColumnWidth,
          width: gridWidth,
          readonly,
          fullHeight,
          get display() {
            return display;
          },
          set display($$value) {
            display = $$value;
            $$settled = false;
          },
          get tableAPI() {
            return tableAPI;
          },
          set tableAPI($$value) {
            tableAPI = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        Resizer($$renderer3, {
          compactMode,
          minValue: "50",
          maxValue: "800",
          get value() {
            return gridWidth;
          },
          set value($$value) {
            gridWidth = $$value;
            $$settled = false;
          },
          get display() {
            return display;
          },
          set display($$value) {
            display = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="wx-content svelte-1xvkgdq">`);
      TimeScale($$renderer3, { highlightTime });
      $$renderer3.push(`<!----> `);
      Chart($$renderer3, {
        readonly,
        fullWidth,
        fullHeight,
        taskTemplate,
        cellBorders,
        highlightTime
      });
      $$renderer3.push(`<!----></div></div></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { tableAPI });
  });
}
function Gantt($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      taskTemplate = null,
      markers = [],
      taskTypes = defaultTaskTypes,
      tasks = [],
      selected = [],
      activeTask = null,
      links = [],
      scales = [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "day", step: 1, format: "d" }
      ],
      columns = defaultColumns,
      start = null,
      end = null,
      lengthUnit = "day",
      durationUnit = "day",
      cellWidth = 100,
      cellHeight = 38,
      scaleHeight = 36,
      readonly = false,
      cellBorders = "full",
      zoom = false,
      baselines = false,
      highlightTime = null,
      init = null,
      autoScale = true,
      unscheduledTasks = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const dataStore = new DataStore$1(writable);
    let firstInRoute = dataStore.in;
    const dash = /-/g;
    let lastInRoute = new EventBusRouter((a, b) => {
      const name = "on" + a.replace(dash, "");
      if (restProps[name]) {
        restProps[name](b);
      }
    });
    firstInRoute.setNext(lastInRoute);
    let tableAPI = void 0;
    const getState = dataStore.getState.bind(dataStore), getReactiveState = dataStore.getReactive.bind(dataStore), getStores = () => ({ data: dataStore }), exec = firstInRoute.exec, setNext = (ev) => lastInRoute = lastInRoute.setNext(ev), intercept = firstInRoute.intercept.bind(firstInRoute), on = firstInRoute.on.bind(firstInRoute), detach = firstInRoute.detach.bind(firstInRoute), getTask = (id) => dataStore.getTask(id), serialize = () => dataStore.serialize(), getTable = (waitRender) => waitRender ? new Promise((res) => setTimeout(() => res(tableAPI), 1)) : tableAPI;
    const api = {
      getState,
      getReactiveState,
      getStores,
      exec,
      setNext,
      intercept,
      on,
      detach,
      getTable,
      getTask,
      serialize
    };
    setContext("gantt-store", {
      getReactiveState: dataStore.getReactive.bind(dataStore),
      exec: firstInRoute.exec.bind(firstInRoute),
      getTask: dataStore.getTask.bind(dataStore)
    });
    let init_once = true;
    const reinitStore = () => {
      dataStore.init({
        tasks,
        links,
        start,
        columns,
        end,
        lengthUnit,
        cellWidth,
        cellHeight,
        scaleHeight,
        scales,
        taskTypes,
        zoom,
        selected,
        activeTask,
        baselines,
        autoScale,
        unscheduledTasks,
        markers,
        durationUnit
      });
      if (init_once && init) {
        init(api);
        init_once = false;
      }
    };
    reinitStore();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Locale($$renderer3, {
        words: en$2,
        optional: true,
        children: ($$renderer4) => {
          Layout($$renderer4, {
            taskTemplate,
            readonly,
            cellBorders,
            highlightTime,
            get tableAPI() {
              return tableAPI;
            },
            set tableAPI($$value) {
              tableAPI = $$value;
              $$settled = false;
            }
          });
        }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, {
      getState,
      getReactiveState,
      getStores,
      exec,
      setNext,
      intercept,
      on,
      detach,
      getTask,
      serialize,
      getTable
    });
  });
}
function IconButton($$renderer, $$props) {
  let { appearance = "primary", icon = "" } = $$props;
  $$renderer.push(`<button${attr_class(`wx-button ${stringify(appearance)}`, "svelte-aofjyk")}>`);
  if (icon) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<i${attr_class(`wx-button-icon ${stringify(icon)}`, "svelte-aofjyk")}></i>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></button>`);
}
function Fullscreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div tabindex="0" class="wx-fullscreen svelte-sywovx">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----> <div class="wx-fullscreen-icon svelte-sywovx">`);
    IconButton($$renderer2, {
      appearance: "transparent",
      icon: `wxi-${stringify("expand")}`
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}
const handlers$1 = {};
function registerToolbarItem(type, handler) {
  handlers$1[type] = handler;
}
function Separator($$renderer, $$props) {
  let { menu = false } = $$props;
  $$renderer.push(`<div${attr_class(`wx-separator${stringify(menu ? "-menu" : "")}`, "svelte-1r0dt0v")}> </div>`);
}
function Spacer($$renderer) {
  $$renderer.push(`<div class="wx-spacer svelte-i5gjts"></div>`);
}
function Button_1($$renderer, $$props) {
  let { icon, text = "", css, type, disabled, menu, onclick } = $$props;
  if (menu) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="wx-item svelte-1s3wiw0"><i${attr_class(`${stringify(icon || "wxi-empty")} ${stringify(css || "")}`, "svelte-1s3wiw0")}></i> ${escape_html(text)}</div>`);
  } else {
    $$renderer.push("<!--[!-->");
    Button$1($$renderer, { icon, type, css, text, disabled, onclick });
  }
  $$renderer.push(`<!--]-->`);
}
function Label($$renderer, $$props) {
  const { text, value, children } = $$props;
  if (children) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="wx-label svelte-hf53ue">`);
    children($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div class="wx-label svelte-hf53ue">${escape_html(value || text)}</div>`);
  }
  $$renderer.push(`<!--]-->`);
}
function Icon($$renderer, $$props) {
  let { icon, text, css, type, disabled, menu, onclick } = $$props;
  if (menu) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="wx-item svelte-1ajar0v">`);
    if (icon) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<i${attr_class(`${stringify(icon)} ${stringify(css)}`, "svelte-1ajar0v")}></i>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> ${escape_html(text)}</div>`);
  } else {
    $$renderer.push("<!--[!-->");
    Button$1($$renderer, { icon, type, css, title: text, disabled, onclick });
  }
  $$renderer.push(`<!--]-->`);
}
function Item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { id = "", text = "", css = "", icon = "", onclick } = $$props;
    $$renderer2.push(`<div${attr_class(`wx-label ${stringify(css)}`, "svelte-v98dh1")}>`);
    if (icon) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<i${attr_class(clsx(icon), "svelte-v98dh1")}></i>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> ${escape_html(text)}</div>`);
  });
}
registerToolbarItem("button", Button_1);
registerToolbarItem("separator", Separator);
registerToolbarItem("spacer", Spacer);
registerToolbarItem("label", Label);
registerToolbarItem("item", Item);
registerToolbarItem("icon", Icon);
const handlers = {};
function registerEditorItem(type, handler) {
  handlers[type] = handler;
}
function ReadOnly($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const _ = getContext("wx-i18n").getGroup("editor");
    let { value, options, label } = $$props;
    let text = (() => {
      let text2 = value;
      if (typeof value === "boolean") {
        text2 = value ? _("Yes") : _("No");
      }
      if (options) {
        const option = options.find((o) => o.id === value);
        if (option) {
          text2 = option.label;
        }
      }
      return text2;
    })();
    if (text || text === 0) {
      $$renderer2.push("<!--[-->");
      Field($$renderer2, {
        label,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(text)}`);
        }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Section($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { key, label, activeSection, onclick } = $$props;
    $$renderer2.push(`<div${attr_class("wx-section svelte-80lbjp", void 0, { "wx-section-active": activeSection })}><h3>${escape_html(label)}</h3> <i${attr_class(`wxi-angle-${activeSection ? "down" : "right"} wx-icon`, "svelte-80lbjp")}></i></div>`);
  });
}
registerEditorItem("text", Text$1);
registerEditorItem("textarea", TextArea);
registerEditorItem("checkbox", Checkbox);
registerEditorItem("readonly", ReadOnly);
registerEditorItem("section", Section);
setEnv(env);
function Tooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { content: Content, children } = $$props;
    let tooltipData = null;
    let pos = {};
    $$renderer2.push(`<div class="wx-tooltip-area svelte-v4t2go">`);
    if (pos && (pos.text || Content)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="wx-gantt-tooltip"${attr_style(`top:${stringify(pos.top)}px;left:${stringify(pos.left)}px`)}>`);
      if (Content) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!---->`);
        Content($$renderer2, { data: tooltipData });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (pos.text) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="wx-gantt-tooltip-text svelte-v4t2go">${escape_html(pos.text)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Willow_1($$renderer, $$props) {
  let { fonts = true, children } = $$props;
  if (children) {
    $$renderer.push("<!--[-->");
    Willow($$renderer, {
      fonts,
      children: ($$renderer2) => {
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      }
    });
  } else {
    $$renderer.push("<!--[!-->");
    Willow($$renderer, { fonts });
  }
  $$renderer.push(`<!--]-->`);
}
function GanttTooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const mask = "yyyy.MM.dd";
    if (data) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="data svelte-h03cyr"><div class="text svelte-h03cyr"><span class="caption svelte-h03cyr">${escape_html(data.type)}:</span> ${escape_html(data.text)}</div> <div class="text svelte-h03cyr"><span class="caption svelte-h03cyr">start:</span> ${escape_html(format(data.start, mask))}</div> `);
      if (data.end) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text svelte-h03cyr"><span class="caption svelte-h03cyr">end:</span> ${escape_html(format(data.end, mask))}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}
const ganttData = {
  tasks: [
    // Top-level summary
    {
      id: 1,
      text: "Website Redesign",
      start: new Date(2024, 5, 1),
      end: new Date(2024, 7, 1),
      duration: 62,
      progress: 0,
      parent: 0,
      type: "summary"
    },
    // Sub-summary under Website Redesign
    {
      id: 2,
      text: "Planning Phase",
      start: new Date(2024, 5, 1),
      end: new Date(2024, 5, 15),
      duration: 15,
      progress: 0,
      parent: 1,
      type: "summary"
    },
    // Tasks under Planning Phase
    {
      id: 3,
      text: "Requirements Gathering",
      start: new Date(2024, 5, 1),
      end: new Date(2024, 5, 5),
      duration: 5,
      progress: 1,
      parent: 2,
      type: "task"
    },
    {
      id: 4,
      text: "Stakeholder Interviews",
      start: new Date(2024, 5, 6),
      end: new Date(2024, 5, 10),
      duration: 5,
      progress: 0.5,
      parent: 2,
      type: "task"
    },
    {
      id: 5,
      text: "Milestone: Planning Complete",
      start: new Date(2024, 5, 15),
      end: new Date(2024, 5, 15),
      duration: 0,
      progress: 1,
      parent: 2,
      type: "milestone"
    },
    // Sub-summary under Website Redesign
    {
      id: 6,
      text: "Design Phase",
      start: new Date(2024, 5, 16),
      end: new Date(2024, 6, 10),
      duration: 25,
      progress: 0,
      parent: 1,
      type: "summary"
    },
    // Tasks under Design Phase
    {
      id: 7,
      text: "Wireframing",
      start: new Date(2024, 5, 16),
      end: new Date(2024, 5, 25),
      duration: 10,
      progress: 0.7,
      parent: 6,
      type: "task"
    },
    {
      id: 8,
      text: "UI Design",
      start: new Date(2024, 5, 26),
      end: new Date(2024, 6, 5),
      duration: 10,
      progress: 0.3,
      parent: 6,
      type: "task"
    },
    {
      id: 9,
      text: "Milestone: Design Approved",
      start: new Date(2024, 6, 10),
      end: new Date(2024, 6, 10),
      duration: 0,
      progress: 0,
      parent: 6,
      type: "milestone"
    },
    // Standalone task (not under summary)
    {
      id: 10,
      text: "Kickoff Meeting",
      start: new Date(2024, 4, 28),
      end: new Date(2024, 4, 28),
      duration: 0,
      progress: 1,
      parent: 0,
      type: "milestone"
    },
    // Nested summary (sub-summary under Design Phase)
    {
      id: 11,
      text: "Prototype Review",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 6, 5),
      duration: 5,
      progress: 0,
      parent: 6,
      type: "summary"
    },
    {
      id: 12,
      text: "Internal Review",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 6, 3),
      duration: 3,
      progress: 0.2,
      parent: 11,
      type: "task"
    },
    {
      id: 13,
      text: "Client Feedback",
      start: new Date(2024, 6, 4),
      end: new Date(2024, 6, 5),
      duration: 2,
      progress: 0,
      parent: 11,
      type: "task"
    },
    // Development Phase
    {
      id: 14,
      text: "Development Phase",
      start: new Date(2024, 6, 11),
      end: new Date(2024, 7, 1),
      duration: 21,
      progress: 0,
      parent: 1,
      type: "summary"
    },
    {
      id: 15,
      text: "Frontend Implementation",
      start: new Date(2024, 6, 11),
      end: new Date(2024, 6, 20),
      duration: 10,
      progress: 0.4,
      parent: 14,
      type: "task"
    },
    {
      id: 16,
      text: "Backend Integration",
      start: new Date(2024, 6, 21),
      end: new Date(2024, 6, 28),
      duration: 8,
      progress: 0.1,
      parent: 14,
      type: "task"
    },
    {
      id: 17,
      text: "Milestone: Dev Complete",
      start: new Date(2024, 7, 1),
      end: new Date(2024, 7, 1),
      duration: 0,
      progress: 0,
      parent: 14,
      type: "milestone"
    },
    // After Planning Phase
    {
      id: 18,
      text: "Milestone: Planning Sign-off",
      start: new Date(2024, 5, 16),
      end: new Date(2024, 5, 16),
      duration: 0,
      progress: 0,
      parent: 1,
      type: "milestone"
    },
    // After Design Phase
    {
      id: 19,
      text: "Milestone: Design Handover",
      start: new Date(2024, 6, 11),
      end: new Date(2024, 6, 11),
      duration: 0,
      progress: 0,
      parent: 1,
      type: "milestone"
    },
    // After Prototype Review
    {
      id: 20,
      text: "Milestone: Prototype Accepted",
      start: new Date(2024, 6, 6),
      end: new Date(2024, 6, 6),
      duration: 0,
      progress: 0,
      parent: 6,
      type: "milestone"
    },
    // After Development Phase
    {
      id: 21,
      text: "Milestone: Go-Live",
      start: new Date(2024, 7, 2),
      end: new Date(2024, 7, 2),
      duration: 0,
      progress: 0,
      parent: 1,
      type: "milestone"
    },
    // --- New top-level project ---
    {
      id: 100,
      text: "Mobile App Launch",
      start: new Date(2024, 5, 10),
      end: new Date(2024, 8, 1),
      duration: 83,
      progress: 0,
      parent: 0,
      type: "summary"
    },
    {
      id: 101,
      text: "App Planning",
      start: new Date(2024, 5, 10),
      end: new Date(2024, 5, 20),
      duration: 11,
      progress: 0.5,
      parent: 100,
      type: "task"
    },
    {
      id: 102,
      text: "App Development",
      start: new Date(2024, 5, 21),
      end: new Date(2024, 7, 15),
      duration: 56,
      progress: 0.2,
      parent: 100,
      type: "task"
    },
    {
      id: 103,
      text: "Milestone: Beta Release",
      start: new Date(2024, 7, 16),
      end: new Date(2024, 7, 16),
      duration: 0,
      progress: 0,
      parent: 100,
      type: "milestone"
    },
    {
      id: 104,
      text: "Marketing Campaign",
      start: new Date(2024, 7, 17),
      end: new Date(2024, 7, 31),
      duration: 15,
      progress: 0,
      parent: 100,
      type: "task"
    },
    {
      id: 105,
      text: "Milestone: App Launch",
      start: new Date(2024, 8, 1),
      end: new Date(2024, 8, 1),
      duration: 0,
      progress: 0,
      parent: 100,
      type: "milestone"
    }
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "e2e" },
    { id: 2, source: 4, target: 5, type: "e2e" },
    { id: 3, source: 7, target: 8, type: "e2e" },
    { id: 4, source: 8, target: 9, type: "e2e" },
    { id: 5, source: 12, target: 13, type: "e2e" },
    { id: 6, source: 1, target: 2, type: "e2e" },
    { id: 7, source: 2, target: 6, type: "e2e" },
    { id: 8, source: 6, target: 11, type: "e2e" },
    { id: 9, source: 14, target: 15, type: "e2e" },
    { id: 10, source: 15, target: 16, type: "e2e" },
    { id: 11, source: 16, target: 17, type: "e2e" },
    { id: 12, source: 5, target: 18, type: "e2e" },
    { id: 13, source: 9, target: 19, type: "e2e" },
    { id: 14, source: 13, target: 20, type: "e2e" },
    { id: 15, source: 17, target: 21, type: "e2e" },
    { id: 16, source: 101, target: 102, type: "e2e" },
    // App Planning -> App Development
    { id: 17, source: 102, target: 103, type: "e2e" },
    // App Development -> Beta Release
    { id: 18, source: 103, target: 104, type: "e2e" },
    // Beta Release -> Marketing Campaign
    { id: 19, source: 104, target: 105, type: "e2e" }
    // Marketing Campaign -> App Launch
  ],
  scales: [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" }
  ]
};
function GanttPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tasks = ganttData.tasks;
    let links = ganttData.links;
    let scales = ganttData.scales;
    let task = null;
    let store;
    let api;
    let cellWidth = 30;
    function dayDiff(next, prev) {
      const d = (next - prev) / 1e3 / 60 / 60 / 24;
      return Math.ceil(Math.abs(d));
    }
    function getSummaryProgress(id) {
      const [totalProgress, totalDuration] = collectProgressFromKids(id);
      const res = totalProgress / totalDuration;
      return isNaN(res) ? 0 : Math.round(res);
    }
    function collectProgressFromKids(id) {
      let totalProgress = 0, totalDuration = 0;
      const kids = api.getTask(id).data;
      kids?.forEach((kid) => {
        let duration = 0;
        if (kid.type !== "milestone" && kid.type !== "summary") {
          duration = kid.duration || dayDiff(kid.end, kid.start);
          totalDuration += duration;
          totalProgress += duration * kid.progress;
        }
        const [p, d] = collectProgressFromKids(kid.id);
        totalProgress += p;
        totalDuration += d;
      });
      return [totalProgress, totalDuration];
    }
    function recalcSummaryProgress(id, self) {
      const { tasks: tasks2 } = api.getState();
      const task2 = api.getTask(id);
      if (task2.type != "milestone") {
        const summary = self && task2.type === "summary" ? id : tasks2.getSummaryId(id);
        if (summary) {
          const progress = getSummaryProgress(summary);
          api.exec("update-task", { id: summary, task: { progress } });
        }
      }
    }
    function init(apiInstance) {
      api = apiInstance;
      store = apiInstance.getState().tasks;
      apiInstance.intercept("show-editor", (data) => {
        task = store.byId(data.id);
        return false;
      });
      api.getState().tasks.forEach((task2) => {
        recalcSummaryProgress(task2.id, true);
      });
      api.on("add-task", ({ id }) => {
        recalcSummaryProgress(id);
      });
      api.on("update-task", ({ id }) => {
        recalcSummaryProgress(id);
      });
      api.on("delete-task", ({ source }) => {
        recalcSummaryProgress(source, true);
      });
      api.on("copy-task", ({ id }) => {
        recalcSummaryProgress(id);
      });
      api.on("move-task", ({ id, source, inProgress }) => {
        if (inProgress) return;
        if (api.getTask(id).parent != source) recalcSummaryProgress(source, true);
        recalcSummaryProgress(id);
      });
    }
    const zoomConfig = {
      level: 3,
      levels: [
        {
          minCellWidth: 200,
          maxCellWidth: 400,
          scales: [{ unit: "year", step: 1, format: "yyyy" }]
        },
        {
          minCellWidth: 150,
          maxCellWidth: 400,
          scales: [
            { unit: "year", step: 1, format: "yyyy" },
            { unit: "quarter", step: 1, format: "QQQQ" }
          ]
        },
        {
          minCellWidth: 250,
          maxCellWidth: 350,
          scales: [
            { unit: "quarter", step: 1, format: "QQQQ" },
            { unit: "month", step: 1, format: "MMMM yyy" }
          ]
        },
        {
          minCellWidth: 100,
          scales: [
            { unit: "month", step: 1, format: "MMMM yyy" },
            { unit: "week", step: 1, format: "'week' w" }
          ]
        },
        {
          maxCellWidth: 200,
          scales: [
            { unit: "month", step: 1, format: "MMMM yyy" },
            { unit: "day", step: 1, format: "d" }
          ]
        },
        {
          minCellWidth: 25,
          maxCellWidth: 100,
          scales: [
            { unit: "day", step: 1, format: "MMM d" },
            {
              unit: "hour",
              step: 6,
              format: (a, b) => `${format(a, "HH:mm")} - ${format(b, "HH:mm")}`
            }
          ]
        },
        {
          maxCellWidth: 120,
          scales: [
            { unit: "day", step: 1, format: "MMM d" },
            { unit: "hour", step: 1, format: "HH:mm" }
          ]
        }
      ]
    };
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50 mb-6"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon$1($$renderer2, {
      icon: "heroicons:calendar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">Gantt Chart</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">Visualize your project timeline and tasks interactively.</p></div></div></div> <div class="bg-base-100 rounded-2xl shadow-md border border-base-300/50 p-4">`);
    Willow_1($$renderer2, {
      children: ($$renderer3) => {
        Fullscreen($$renderer3, {
          children: ($$renderer4) => {
            Tooltip($$renderer4, {
              content: GanttTooltip,
              children: ($$renderer5) => {
                Gantt($$renderer5, { tasks, links, scales, init, cellWidth, zoom: zoomConfig });
              }
            });
          }
        });
      }
    });
    $$renderer2.push(`<!----> `);
    if (task) {
      $$renderer2.push("<!--[-->");
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer) {
  GanttPage($$renderer);
}
export {
  _page as default
};
