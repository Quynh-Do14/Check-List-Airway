import { atom } from "recoil";

export const UserSelectState = atom({
    key: 'USER_SELECT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            name: "",
            position: "",
            checkName: "",
            label: ""
        }
    }, // default value (aka initial value)
});