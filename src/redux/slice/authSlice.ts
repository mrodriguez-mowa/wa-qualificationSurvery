import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
    isAuth: false,
    user: "",
};

interface AuthState {
    isAuth: boolean;
    user: string;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInOK: (state: AuthState, action: PayloadAction<AuthState>) => {
            (state.isAuth = action.payload.isAuth),
                (state.user = action.payload.user);
            if (typeof window != undefined) {
                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("userId", action.payload.user)
            }
        },
        logout: (state: AuthState) => {
            

            if (typeof window != undefined) {
                localStorage.removeItem("userId")
                localStorage.removeItem("isAuthenticated")
            }

            (state.isAuth = false), (state.user = "");

        },
    },
});

export const { signInOK, logout } = authSlice.actions;

export default authSlice.reducer;
