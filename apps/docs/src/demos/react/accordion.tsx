import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemTitle,
  Button,
} from "@konj-org/react-ui";

const data = [
  {
    id: "tos",
    title: "Accepting Terms of service",
    icon: (
      <Button
        color="successful"
        component="a"
        compact={true}
        className="font-light text-xs"
      >
        Completed
      </Button>
    ),
    content: (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        similique ducimus ipsa nostrum neque natus iusto, ea deleniti, dicta
        minima eos mollitia eius omnis totam esse. Perferendis cum impedit
        recusandae.
      </p>
    ),
  },
  {
    id: "verifying",
    title: "Verifying your documents",
    icon: (
      <Button
        color="warning"
        component="a"
        compact={true}
        className="font-light text-xs"
      >
        Waiting for verification
      </Button>
    ),
    content: (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        similique ducimus ipsa nostrum neque natus iusto, ea deleniti, dicta
        minima eos mollitia eius omnis totam esse. Perferendis cum impedit
        recusandae.
      </p>
    ),
  },
  {
    id: "usage",
    title: "Starting your journey",
    icon: (
      <Button
        color="danger"
        component="a"
        compact={true}
        className="font-light text-xs"
      >
        Waiting for completion of verification
      </Button>
    ),
    content: (
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        similique ducimus ipsa nostrum neque natus iusto, ea deleniti, dicta
        minima eos mollitia eius omnis totam esse. Perferendis cum impedit
        recusandae.
      </p>
    ),
  },
];

export const AccordionDemo = () => {
  const [selected, setSelected] = useState<null | string>(null);

  return (
    <div className="w-full mx-2 md:mx-[10%] min-h-[60vh] md:min-h-[28rem] flex items-center">
      <Accordion
        selected={selected}
        onSelected={setSelected}
        className="w-full my-2"
      >
        {data.map(({ content, icon, id, title }) => (
          <AccordionItem id={id} key={id}>
            <AccordionItemTitle className="flex flex-col gap-2 md:flex-row justify-between items-center content-center text-left">
              <span>{title}</span>
              <span className="flex gap-2 items-center content-center gow w-full md:w-auto justify-end">
                {icon}
              </span>
            </AccordionItemTitle>
            <AccordionItemBody>{content}</AccordionItemBody>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
