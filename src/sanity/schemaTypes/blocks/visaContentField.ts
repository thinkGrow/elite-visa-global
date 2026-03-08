import React from "react";
import { defineArrayMember } from "sanity";

const visaRichTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      {
        title: "Gold Text",
        value: "goldText",
        component: ({ children }: { children: React.ReactNode }) =>
          React.createElement(
            "span",
            { style: { color: "#d6a23a" } },
            children,
          ),
      },
      {
        title: "Blue Text",
        value: "blueText",
        component: ({ children }: { children: React.ReactNode }) =>
          React.createElement(
            "span",
            { style: { color: "#1c5aa8" } },
            children,
          ),
      },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          {
            name: "href",
            title: "URL",
            type: "url",
          },
        ],
      },
    ],
  },
});

const visaCalloutBlock = defineArrayMember({
  type: "object",
  name: "callout",
  title: "Callout",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text", rows: 3 },
    {
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
        ],
      },
      initialValue: "info",
    },
  ],
});

const visaTableBlock = defineArrayMember({
  type: "object",
  name: "tableBlock",
  title: "Table",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        }),
      ],
    },
  ],
});

export const visaContentField = {
  type: "array",
  of: [
    visaRichTextBlock,
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
    visaTableBlock,
    visaCalloutBlock,
  ],
};
