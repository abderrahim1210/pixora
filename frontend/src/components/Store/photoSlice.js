import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    fields: {
        title: "",
        description: "",
        category: "",
        location: ""
    },
    dirty: false,
    isEdit: {}
}

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        initEdit(state, action) {
            state.fields = { ...state.fields, ...action.payload };
            state.dirty = false;
            state.isEdit = {};
        },
        toggleEdit(state, action) {
            const field = action.payload;
            state.isEdit[field] = !state.isEdit[field];
            if (!state.isEdit[field]) {
                state.dirty = true;
            }
        },
        updateField(state, action) {
            const { field, value } = action.payload;
            state.fields[field] = value;
            state.dirty = true;
        }
    }
});
export const { initEdit, toggleEdit, updateField } = photoSlice.actions;
export default photoSlice.reducer;