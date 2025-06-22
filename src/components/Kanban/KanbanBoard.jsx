import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import './KambanBoard.css';

const KanbanBoard = () => {
    const { theme } = useTheme();
    const [columns, setColumns] = useState([
        {
            id: 1,
            title: 'To Do',
            tasks: [
                { id: 1, content: 'Design new dashboard' },
                { id: 2, content: 'Create user documentation' },
            ],
        },
        {
            id: 2,
            title: 'In Progress',
            tasks: [
                { id: 3, content: 'Implement authentication' },
            ],
        },
        {
            id: 3,
            title: 'Done',
            tasks: [
                { id: 4, content: 'Setup development environment' },
            ],
        },
    ]);

    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedFromColumn, setDraggedFromColumn] = useState(null);

    const handleDragStart = (task, columnId) => {
        setDraggedTask(task);
        setDraggedFromColumn(columnId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (columnId) => {
        if (!draggedTask) return;

        const updatedColumns = columns.map(column => {
            // Remove task from original column
            if (column.id === draggedFromColumn) {
                return {
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== draggedTask.id),
                };
            }

            // Add task to new column
            if (column.id === columnId) {
                return {
                    ...column,
                    tasks: [...column.tasks, draggedTask],
                };
            }

            return column;
        });

        setColumns(updatedColumns);
        setDraggedTask(null);
        setDraggedFromColumn(null);
    };

    const addTask = (columnId, content) => {
        if (!content.trim()) return;

        const newTask = {
            id: Date.now(),
            content: content.trim(),
        };

        setColumns(columns.map(column => {
            if (column.id === columnId) {
                return {
                    ...column,
                    tasks: [...column.tasks, newTask],
                };
            }
            return column;
        }));
    };

    return (
        <div className={`kanban-board ${theme}`}>
            <h2>Kanban Board</h2>
            <div className="columns-container">
                {columns.map(column => (
                    <div
                        key={column.id}
                        className="kanban-column"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(column.id)}
                    >
                        <h3>{column.title}</h3>
                        <div className="tasks-list">
                            {column.tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="kanban-task"
                                    draggable
                                    onDragStart={() => handleDragStart(task, column.id)}
                                >
                                    {task.content}
                                </div>
                            ))}
                        </div>
                        <NewTaskInput columnId={column.id} addTask={addTask} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const NewTaskInput = ({ columnId, addTask }) => {
    const [newTaskContent, setNewTaskContent] = useState('');
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(columnId, newTaskContent);
        setNewTaskContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="new-task-form">
            <input
                type="text"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                placeholder="Add a new task..."
                className={`new-task-input ${theme}`}
            />
            <button type="submit" className="add-task-button">Add</button>
        </form>
    );
};

export default KanbanBoard;