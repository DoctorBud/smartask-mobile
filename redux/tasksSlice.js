import { createSlice } from '@reduxjs/toolkit';

const myTasks = [
    {
        id: '2021-01-12-1',
        task: "Create a to-do list",
        due: new Date("2021-07-25"),
        duration: 30,
        category: "Home",
        priority: 1,
        difficulty: 1,
        interest: 1,
        recurring: false,
        completed: true
    },
    {
            id: '2021-01-14-2',
            task: "Test my to-do list",
            due: new Date("2021-06-26"),
            duration: 30,
            category: "Work",
            priority: 1,
            difficulty: 1,
            interest: 2,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-3',
            task: "Implement error checking",
            due: new Date("2022-10-25"),
            duration: 120,
            category: "Other",
            priority: 2,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-4',
            task: "Fetch tasks from server",
            due: new Date("2021-03-25"),
            duration: 120,
            category: "Work",
            priority: 2,
            difficulty: 1,
            interest: 3,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-5',
            task: "Scheduling algorithm",
            due: new Date("2021-06-25"),
            duration: 180,
            category: "Work",
            priority: 3,
            difficulty: 3,
            interest: 3,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-6',
            task: "Preferences input page",
            due: new Date("2021-09-05"),
            duration: 30,
            category: "Work",
            priority: 3,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-7',
            task: "Split tasks into subtasks",
            due: new Date("2021-07-05"),
            duration: 60,
            category: "Work",
            priority: 2,
            difficulty: 4,
            interest: 1,
            recurring: false,
            completed: false
    },
];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [{
        id: '2021-01-12-1',
        task: "Create a to-do list",
        due: "2021-07-25",
        duration: 30,
        category: "Home",
        priority: 1,
        difficulty: 1,
        interest: 1,
        recurring: false,
        completed: true
    }],
    reducers: {
    // gets task properties from input through local state
    // adds task to state, overriding default values
        // addTask(state, action) {
        //     const defaultTask = {
        //         duration: null, 
        //         category: "Work", 
        //         priority: 0, 
        //         difficulty: 0, 
        //         interest: 0, 
        //         completed: false 
        //     };
        //     const task = action.payload;
        //     state.push({...defaultTask, ...task});
        // },
    // gets task id, toggles completed
        toggleCompleted(state, action) {
            const task = state.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
        
    }
});

export const { addTask, toggleCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;