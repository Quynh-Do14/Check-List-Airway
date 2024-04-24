import { atom } from "recoil";

export const ListCheckState = atom({
    key: 'LIST_CHECK_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        label: "",
        checkName: "",
        userSelect: {
            name: "",
            position: "",
        },
        data: []
    }, // default value (aka initial value)
});