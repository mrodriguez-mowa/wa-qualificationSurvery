import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
    isAuth: false,
    user: "",
    isAdmin: false
};

interface AuthState {
    isAuth: boolean;
    user: string;
    isAdmin: boolean;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInOK: (state: AuthState, action: PayloadAction<AuthState>) => {
            (state.isAuth = action.payload.isAuth),
                (state.user = action.payload.user);
                (state.isAdmin) = action.payload.isAdmin;
            if (typeof window != undefined) {
                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("userId", action.payload.user)
                localStorage.setItem("isAdmin", action.payload.isAdmin.toString())
            }
        },
        logout: (state: AuthState) => {
            

            if (typeof window != undefined) {
                localStorage.removeItem("userId")
                localStorage.removeItem("isAuthenticated")
                localStorage.removeItem("isAdmin")
            }

            (state.isAuth = false), (state.user = ""), (state.isAdmin = false)

        },
    },
});

export const { signInOK, logout } = authSlice.actions;

export default authSlice.reducer;
