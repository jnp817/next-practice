import type { TaskCard } from '@/types/practice1/TaskCard'
import React from 'react'

type TaskCardProps = {
    task: TaskCard;
    handleUpdate: (id: string, newValue: boolean) => void;
}

export default function TaskCard({ task, handleUpdate }: TaskCardProps) {
    return (
        <div className={`border rounded-2xl p-4 space-y-2 ${task.isClose ? 'bg-gray-300' : 'bg-white'}`}>
            <p>{task.id}</p>
            <p>{task.title}</p>
            <p>{task.desc}</p>
            <button className="hover:bg-blue-500 cursor-pointer p-2 border rounded-xl" onClick={() => handleUpdate(task.id,!task.isClose)}>
                {
                    task.isClose ? '完了に戻す' : '完了にする'
                }
            </button>
        </div>
    )
}
