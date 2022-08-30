import React from "react";

import "./styles.css";
import EditableBlock from "./editableBlock";
import uid from "./utils/uid";
import { setCaretToEnd } from "./utils/caretHelpers";

const initialBlock = { id: uid(), html: "", tag: "p" };

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.state = { blocks: [initialBlock] };
  }

  updatePageHandler(updatedBlock) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    this.setState({ blocks: updatedBlocks });
  }

  addBlockHandler(currentBlock) {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    this.setState({ blocks: updatedBlocks }, () => {
      currentBlock.ref.nextElementSibling.focus();
    });
  }

  deleteBlockHandler(currentBlock) {
    // Only delete the block, if there is a preceding one
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      this.setState({ blocks: updatedBlocks }, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }

  render() {
  //   const html = `<div style="position: relative; text-align: left; box-sizing: border-box; padding: 0px; overflow: hidden; font-family: &quot;Fira code&quot;, &quot;Fira Mono&quot;, monospace; font-size: 12px;"><pre aria-hidden="true" style="margin: 0px; border: 0px; background: none; box-sizing: inherit; display: inherit; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-ligatures: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; tab-size: inherit; text-indent: inherit; text-rendering: inherit; text-transform: inherit; white-space: pre-wrap; word-break: keep-all; overflow-wrap: break-word; position: relative; pointer-events: none; padding: 10px;"><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  //   <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  // <span class="token punctuation">}</span><br></pre><textarea class="npm__react-simple-code-editor__textarea" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" data-gramm="false" style="margin: 0px; border: 0px; background: none; box-sizing: inherit; display: inherit; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-ligatures: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; tab-size: inherit; text-indent: inherit; text-rendering: inherit; text-transform: inherit; white-space: pre-wrap; word-break: keep-all; overflow-wrap: break-word; position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; resize: none; color: inherit; overflow: hidden; -webkit-font-smoothing: antialiased; -webkit-text-fill-color: transparent; padding: 10px;">function add(a, b) {
  //   return a + b;
  // }</textarea><style type="text/css">
  // /**
  //  * Reset the text fill color so that placeholder is visible
  //  */
  // .npm__react-simple-code-editor__textarea:empty {
  //   -webkit-text-fill-color: inherit !important;
  // }
  
  // /**
  //  * Hack to apply on some CSS on IE10 and IE11
  //  */
  // @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  //   /**
  //     * IE doesn't support '-webkit-text-fill-color'
  //     * So we use 'color: transparent' to make the text transparent on IE
  //     * Unlike other browsers, it doesn't affect caret color in IE
  //     */
  //   .npm__react-simple-code-editor__textarea {
  //     color: transparent !important;
  //   }
  
  //   .npm__react-simple-code-editor__textarea::selection {
  //     background-color: #accef7 !important;
  //     color: transparent !important;
  //   }
  // }
  // </style></div>`
    return (
      <div className="Page">
        {this.state.blocks.map((block, key) => {
          return (
            <EditableBlock
              key={key}
              id={block.id}
              tag={block.tag}
              html={block.html}
              updatePage={this.updatePageHandler}
              addBlock={this.addBlockHandler}
              deleteBlock={this.deleteBlockHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default EditablePage;
