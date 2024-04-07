class PaperStamp extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "paper-stamp", PaperStamp)
    }
  }

  static css = `
    :host {
      background-image:
        radial-gradient(
          calc(var(--stamp-perforation, 8px) / 2),
          transparent 95%,
          var(--stamp-color, antiquewhite)
        ),
        linear-gradient(var(--stamp-color, antiquewhite) 0 0);
      background-size:
        calc(var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / 2) calc(var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / 2),
        calc(100% - var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / 2) calc(100% - var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / 2);
      background-position:
        calc(var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / -4) calc(var(--stamp-perforation, 8px) * var(--stamp-spacing, 3.5) / -4),
        50%;
      background-repeat:
        round,
        no-repeat;
      max-inline-size: 100%;
      display: inline-block;
      image-rendering: pixelated;
    }
    :host img {
      display: block;
      padding: var(--stamp-padding, 15px);
    }
  `

  static observedAttributes = ["color", "padding", "perforation", "spacing"]

  connectedCallback() {
    this.initTemplate()
  }

  getBaseCSS() {
    let sheet = new CSSStyleSheet()
    sheet.replaceSync(PaperStamp.css)
    return sheet
  }

  setCSS() {
    let stylesheets = [this.getBaseCSS()]
    if (this.hasAttribute("color") && this.getAttribute("color") !== "") {
      let sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :host {
          --stamp-color: ${this.getAttribute("color")};
        }
      `)
      stylesheets.push(sheet)
    }
    if (this.hasAttribute("padding") && this.getAttribute("padding") !== "") {
      let sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :host {
          --stamp-padding: ${this.getAttribute("padding")};
        }
      `)
      stylesheets.push(sheet)
    }
    if (this.hasAttribute("perforation") && this.getAttribute("perforation") !== "") {
      let sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :host {
          --stamp-perforation: ${this.getAttribute("perforation")};
        }
      `)
      stylesheets.push(sheet)
    }
    if (this.hasAttribute("spacing") && this.getAttribute("spacing") !== "") {
      let sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :host {
          --stamp-spacing: ${this.getAttribute("spacing")};
        }
      `)
      stylesheets.push(sheet)
    }
    this.shadowRoot.adoptedStyleSheets = stylesheets
  }

  initTemplate() {
    if (this.shadowRoot) {
      this.setCSS()
      return
    }

    this.attachShadow({ mode: "open" })

    this.setCSS()

    let template = document.createElement("template")
    template.innerHTML = this.innerHTML
    this.innerHTML = ""
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  attributeChangedCallback() {
    this.initTemplate()
  }
}

PaperStamp.register()
