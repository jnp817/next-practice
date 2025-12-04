"use client"
import { TaskCardData } from "@/lib/data/TaskCardData";
import TaskCard from '@/components/practice1/TaskCard';
import { useEffect, useState } from "react";
import { TaskCard as Task } from "@/types/practice1/TaskCard"
import TaskCardInput from "@/components/practice1/TaskCardInput";

type FilterType = 'all' | 'active' | 'completed';

export default function Practice1Home() {
  const [tasks, setTasks] = useState(TaskCardData);
  const [filter, setFilter] = useState<FilterType>('all');
  const [taskCount, setTaskCount] = useState({
    all: 0,
    active: 0,
    completed: 0,
  })

  const countTasks = () => {
    const allData = tasks;
    const activeData = tasks.filter(task => !task.completed);
    const completedData = tasks.filter(task => task.completed);

    setTaskCount({
      all: allData.length,
      active: activeData.length,
      completed: completedData.length
    })
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });


  const handleCompleted = (id: string, newValue: boolean) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: newValue } : task
      )
    );
  };

  const handleSubmit = (newTask: Task) => {
    const nextId = crypto.randomUUID();

    setTasks(prev => [
      { ...newTask, id: nextId, completed: false },
      ...prev
    ]);
  };

  // 確認ダイアログ付き（オプション）
  const handleDelete = (id: string) => {
    if (window.confirm('このタスクを削除しますか？')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleCompletedDelete = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  }

  useEffect(() => {
    countTasks();
  }, [tasks]);

  return (
    <>
      <div className="my-20 flex gap-2 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          完了済
        </button>

      </div>

      <div className="flex gap-4 justify-center mb-10">
        <p>完了：{taskCount.all}</p>
        <p>未完了：{taskCount.active}</p>
        <p>完了済：{taskCount.completed}</p>
      </div>

      <button className="block mx-auto mb-10" onClick={handleCompletedDelete}>
        <span className="border p-4 rounded-2xl hover:bg-blue-500">完了済みを削除</span>
      </button>

      <div className="mx-auto grid grid-cols-1 gap-4 max-w-[800px] md:grid-cols-2 lg:grid-cols-3">
        <TaskCardInput onSubmitValue={handleSubmit} />
        {
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              handleCompleted={handleCompleted}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    </>
  );
}
