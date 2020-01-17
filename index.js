const tree = {
    "id": 1,
    "items": [{
        "id": 2,
        "items": [{"id": 3}]
    }]
};
const fragment = new DocumentFragment;

function init(root) {
    const style = document.createElement('style');
    style.textContent = `my-tree {
                           display: block;
                           margin-left: 10px;
                           color: red;
                         }
                         my-leaf {
                          display: block;
                          margin-left: 10px;
                          color: blue;
                          }`;
    fragment.appendChild(style);
    createTree(tree, fragment);
    root.appendChild(fragment);
}

function createTree(tree, parent) {
    if (tree.items) {
        let node = document.createElement('my-tree');
        node.innerHTML = `<div> - ${tree.id}</div>`;
        parent.appendChild(node);
        for (let i = 0; i < tree.items.length; i++) {
            createTree(tree.items[i], node);
        }
    } else {
        let leaf = document.createElement('my-leaf');
        leaf.innerHTML = `<div> - ${tree.id}</div>`;
        parent.appendChild(leaf);
    }
}

class MyRoot extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({
            mode: 'open'
        });
        init(this.shadowRoot);
    }

}

class MyTree extends HTMLElement {
    constructor() {
        super();
    }
}

class MyLeaf extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define("my-root", MyRoot);
customElements.define("my-tree", MyTree);
customElements.define("my-leaf", MyLeaf);