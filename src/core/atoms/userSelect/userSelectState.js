import { atom } from "recoil";

export const UserSelectState = atom({
    key: 'USER_SELECT_STATE', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            type: "",
            name: "",
            position: "",
            checkData: {
                title: "",
                content: [],
            },
        },
    ]
});