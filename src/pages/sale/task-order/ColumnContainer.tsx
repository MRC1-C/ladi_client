import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;

    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

function ColumnContainer({
    column,
    tasks,
    deleteTask,
    updateTask,
}: Props) {

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: false,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        border: '1px solid lightgray'
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-purple-500
      w-full
      h-full
      rounded-md
      flex
      flex-col
      "
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
  bg-columnBackgroundColor
  w-full
  h-full
  rounded-md
  overflow-y-hidden
  "
        >
            <div
                {...attributes}
                {...listeners}
                className={`
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
       p-3
       text-white
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      items-center
      justify-center
      ${column.color}
      `}
            >
                {column.title}
            </div>

            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-4 p-2 h-[calc(100%-60px)] overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default ColumnContainer;