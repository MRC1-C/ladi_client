import { Id, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {PhoneFilled,EyeOutlined} from '@ant-design/icons'
interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: false,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-purple-500  cursor-grab relative
      "
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-mainBackgroundColor ring-purple-300 ring-2 p-2.5 h-[150px] min-h-[150px] items-center justify-between flex rounded-xl hover:ring-2 hover:ring-inset hover:ring-purple-500 cursor-grab relative task"
        >
            <div className="w-[90%]">
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    <strong>Khách hàng:</strong> Đỗ Mạnh Quân
                </p>
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    <strong>Số điện thoại:</strong> 01324
                </p>
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    <strong>Địa chỉ:</strong> 01324
                </p>
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    <strong>Sản phẩm:</strong> Kẹp bạt
                </p>
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    <strong>Số lượng:</strong> 100 <span className="text-red-500 font-bold">100.000đ</span>
                </p>
                {/* <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                    {task.content}
                </p> */}
            </div>
            <div className="h-full flex flex-col justify-between">
            <EyeOutlined className="text-xl text-purple-500"/>
            <PhoneFilled className="text-xl text-green-500"/>
            </div>
        </div>
    );
}

export default TaskCard;