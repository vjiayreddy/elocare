import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useFieldArray } from "react-hook-form";
import ChildInput from "./ChipInput";

export default ({
  nestIndex,
  control,
  setReorder,
}: {
  nestIndex: number;
  control: any;
  setReorder: any;
}) => {
  const { fields, append, move } = useFieldArray({
    control,
    name: `test.${nestIndex}.nestedArray`,
  });

  React.useEffect(() => {
    setReorder(`child-${nestIndex}`, (from: any, to: any) => {
      move(from, to);
    });
  }, [nestIndex, setReorder, move]);

  return (
    <div>
      <Droppable droppableId={`child-${nestIndex}`} type="childContainer">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {fields.map((item, k) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={k}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ChildInput
                        name={`test.${nestIndex}.nestedArray.${k}.value`}
                        // key={item.id}
                        {...{ control }}

                        // defaultValue={item.value}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <button onClick={() => append({ value: "0" })}>Append Child</button>
    </div>
  );
};
