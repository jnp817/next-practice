// TaskCardInput.tsx
"use client"
import { TaskCard } from '@/types/practice1/TaskCard';
import React, { useState } from 'react'

type ValidationErrors = {
    title?: string;
    desc?: string;
}

type TaskCardInputProps = {
    onSubmitValue: (value: TaskCard) => void;
}

export default function TaskCardInput({ onSubmitValue }: TaskCardInputProps) {
    const [task, setTask] = useState<TaskCard>({
        id: "",
        title: "",
        desc: "",
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validate = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!task.title.trim()) {
            newErrors.title = 'タイトルを入力してください';
        } else if (task.title.length > 30) {
            newErrors.title = 'タイトルは30文字以内で入力してください';
        }

        if (!task.desc.trim()) {
            newErrors.desc = '説明を入力してください';
        } else if (task.desc.length > 200) {
            newErrors.desc = '説明は200文字以内で入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            onSubmitValue(task);
            // フォームをリセット
            setTask({ id: "", title: "", desc: "" });
            setErrors({});
        }
    };

    return (
        <form className="flex flex-col justify-between border rounded-2xl p-4 space-y-2 bg-white" onSubmit={handleSubmit}>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    タイトル
                </label>
                <input
                    type="text"
                    value={task.title}
                    className={`w-full border p-2 rounded ${errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    説明
                </label>
                <textarea
                    value={task.desc}
                    rows={4}
                    className={`w-full border p-2 rounded ${errors.desc ? 'border-red-500' : 'border-gray-300'
                        }`}
                    onChange={(e) => setTask({ ...task, desc: e.target.value })}
                />
                {errors.desc && (
                    <p className="text-red-500 text-sm">{errors.desc}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-xl transition-colors"
            >
                追加
            </button>
        </form>
    )
}