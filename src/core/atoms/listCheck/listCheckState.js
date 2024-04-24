import { atom } from "recoil";

export const ListCheckState = atom({
    key: 'LIST_CHECK_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        label: "",
        checkName: "",
        data: []
    }, // default value (aka initial value)
});