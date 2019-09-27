const baseUrl = 'http://10.0.2.2:3000/tasks'; //10.0.2.2
    const getTasks = async () => {
        const response = await fetch(baseUrl);
        const Tasks = await response.json();
        return Tasks;
    }

     const addTask = async () => {
        const response = await fetch(baseUrl, {
            method: 'Task',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Task),
        });
        const TaskToAdd = await response.json();
        return TaskToAdd;
    }

    const updateTask = async () => {
        const response = await fetch(`${baseUrl}/${Task.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Task),
        });
        const TaskToUpdate = await response.json();
        return TaskToUpdate;
    }

    const deleteTask = async () => {
        return await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    }

    export const api = {
        getTasks,
        addTask,
        updateTask,
        deleteTask
    }; 