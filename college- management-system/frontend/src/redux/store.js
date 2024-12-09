import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore specific action types
                ignoredActions: ['user/loginUserFulfilled', 'user/loginUserRejected'], // Replace with your actions
                // Ignore specific field paths in actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore specific paths in the state
                ignoredPaths: ['user.error', 'user.status'],
            },
        }),
});

export default store;
