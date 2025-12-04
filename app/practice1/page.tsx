"use client"
import { TaskCardData } from "@/lib/data/TaskCardData";
import TaskCard from '@/components/practice1/TaskCard';
import { useState } from "react";

export default function Practice1Home() {
  const [tasks, setTasks] = useState(TaskCardData);

  const handleUpdate = (id: string, newValue: boolean) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isClose: newValue } : task
      )
    );
  };

  return (
    <div className="my-20 mx-auto grid grid-cols-3 gap-4 max-w-[800px]">
      {
        tasks.map(task => (
          <div
            key={task.id}
            className=""
          >
            <TaskCard task={task} handleUpdate={handleUpdate} />
          </div>
        ))
      }
    </div>
  );
}
