import { createRenderer } from "vue";
import SomeComponent from "./SomeComponent.vue";

class Elem {
  constructor(public id: string) {}
  props: Record<string, unknown> = {};
  parent: string | null = null;
  children: string[] = [];
  text: string = "";
}
const em: Record<string, Elem> = {
  __root__: new Elem("__root__"),
};
const { createApp } = createRenderer<Elem, Elem>({
  patchProp: function (
    el: Elem,
    key: string,
    _prevValue: unknown,
    nextValue: unknown
  ): void {
    if (nextValue === "") {
      nextValue = true;
    }
    el.props[key] = nextValue;
  },
  insert: function (
    el: Elem,
    parent: Elem,
    anchor?: Elem | null | undefined
  ): void {
    if (el.parent) {
      em[el.parent].children.splice(em[el.parent].children.indexOf(el.id), 1);
      el.parent = null;
    }
    if (anchor) {
      parent.children.splice(parent.children.indexOf(anchor.id), 0, el.id);
    } else {
      parent.children.push(el.id);
    }
    el.parent = parent.id || null;
  },
  remove: function (el: Elem): void {
    if (el.parent) {
      em[el.parent].children.splice(em[el.parent].children.indexOf(el.id), 1);
      el.parent = null;
      delete em[el.id];
    }
  },
  createElement: function (type: string): Elem {
    const elem = new Elem(type + "-" + Math.random().toString(36).substring(2));
    em[elem.id] = elem;
    return elem;
  },
  createText: function (text: string): Elem {
    const ret = new Elem("#text-" + Math.random().toString(36).substring(2));
    ret.text = text;
    em[ret.id] = ret;
    return ret;
  },
  createComment: function (text: string): Elem {
    const ret = new Elem("#comment-" + Math.random().toString(36).substring(2));
    ret.text = text;
    em[ret.id] = ret;
    return ret;
  },
  setText: function (element: Elem, text: string): void {
    element.text = text;
  },
  setElementText: function (element: Elem, text: string): void {
    element.text = text;
  },
  nextSibling: function (element: Elem): Elem | null {
    return (
      em[
        em[element.parent || ""].children[
          em[element.parent || ""].children.indexOf(element.id) + 1
        ]
      ] || null
    );
  },
  parentNode: function (node: Elem): Elem | null {
    return em[node.parent || ""] || null;
  },
});

createApp(SomeComponent).mount(em.__root__);
