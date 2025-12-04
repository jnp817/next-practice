import type { TaskCard } from '@/types/practice1/TaskCard'
import React from 'react'

type TaskCardProps = {
    task: TaskCard;
    handleCompleted: (id: string, newValue: boolean) => void;
    handleDelete: (id: string) => void;
}

export default function TaskCard({ task, handleCompleted, handleDelete }: TaskCardProps) {
    return (
        <div className={`flex flex-col  justify-between border rounded-2xl p-4 space-y-2 ${task.completed ? 'bg-gray-300' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
                <p className='truncate'>{task.id}</p>
                <span
                    onClick={() => handleDelete(task.id)}
                    className='border rounded-full aspect-square w-[30px] h-[30px] flex justify-center items-center hover:bg-blue-500'
                >
                    ×
                </span>
            </div>
            <p className='truncate'>{task.title}</p>
            <p className='line-clamp-3'>{task.desc}</p>
            <button className="hover:bg-blue-500 cursor-pointer p-2 border rounded-xl" onClick={() => handleCompleted(task.id, !task.completed)}>
                {
                    task.completed ? '完了に戻す' : '完了にする'
                }
            </button>
        </div>
    )
}
