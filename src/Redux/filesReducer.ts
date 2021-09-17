const ADD_FILE = `ADD_FILE`;
const IS_OPEN_POPUP = `IS_OPEN_POPUP`;
const SET_CURRENT_DIR = `SET_CURRENT_DIR`;
const PUSH_TO_STACK = `PUSH_TO_STACK`;
const REMOVE_TO_STACK = `REMOVE_TO_STACK`;
const IS_OPEN_POPUP_FILE = `IS_OPEN_POPUP_FILE`;
const ADD_CURRENT_FILE = `ADD_CURRENT_FILE`;
const SET_CURRENT_FILE_NAME = `SET_CURRENT_FILE_NAME`;
const SET_CURRENT_FILE_TEXT = `SET_CURRENT_FILE_TEXT`;
const SET_ADDRESS_BAR = `SET_ADDRESS_BAR`;


export type InitialStateType = {
    files: Array<FileType>
    activeFile: string | null
    currentDir: string
    currentFile: string
    isOpenPopUp: boolean
    isOpenPopupFile: boolean
    addressBar: string
    dirStack: Array<FileType | string>
}
export type FileType = {
    id: string
    parentId: string
    name: string
    type: string
    text: string | null
    path: string
}

type ActionsTypes = AddFileActionType | SetCurrentDirActionType | IsOpenPopUpActionType | PushToStackActionType |
    SetCurrentFileActionType | IsOpenPopupFileActionType | SetCurrentFileNameActionType | SetCurrentFileTextActionType |
    SetAddressBarActionType | RemoveToStackActionType



const initialState: InitialStateType = {
    files : [
        {id: `1`, parentId: `0`, name: `root`, type: 'dir', text: `null`, path: `root`} ,
        {id: `2`, parentId: `0`, name: `text`, type: 'txt', text: `Test`, path: `root`} ,
    ],
    activeFile: null,
    currentDir: `0`,
    currentFile: `0`,
    isOpenPopUp: false,
    isOpenPopupFile: false,
    addressBar: ``,
    dirStack: [],
};


export const filesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload,],
            };

        case IS_OPEN_POPUP:
            return {
                ...state,
                isOpenPopUp: action.payload,
            };

        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload,
            };

        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            };

        case REMOVE_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack.slice(0, -1)]
            };

        case ADD_CURRENT_FILE:
            return {
                ...state,
                currentFile: action.payload
            };

        case IS_OPEN_POPUP_FILE:
            return {
                ...state,
                isOpenPopupFile: action.payload
            };

        case SET_CURRENT_FILE_NAME:
            return {
                ...state,
                files: state.files.map(el => {
                    if (el.id === state.currentFile) {
                        return {
                            ...el,
                            name: action.payload
                        }
                    }
                    return el;
                })
            };

        case SET_CURRENT_FILE_TEXT:
            return {
                ...state,
                files: state.files.map(el => {
                    if (el.id === state.currentFile) {
                        return {
                            ...el,
                            text: action.payload
                        }
                    }
                    return el;
                })
            };

        case SET_ADDRESS_BAR: return {
            ...state,
            addressBar: action.payload
        };

        default:
            return state
    }
};

type AddFileActionType = {
    type: typeof ADD_FILE
    payload: {id: string, parentId: string, name: string, type: string, text: string, path: string}
}

export const addFile = (parentId: string, name: string, type: string, text: string, path: string):AddFileActionType => ({
    type: ADD_FILE,
    payload: {id: Date.now().toString(), parentId, name, type, text, path}
});

type SetCurrentDirActionType = {type: typeof SET_CURRENT_DIR, payload: string}
export const setCurrentDir = (currentPage:string):SetCurrentDirActionType => ({type: SET_CURRENT_DIR, payload: currentPage});

type IsOpenPopUpActionType = {type: typeof IS_OPEN_POPUP, payload: boolean}
export const isOpenPopUp = (init:boolean):IsOpenPopUpActionType => ({type: IS_OPEN_POPUP, payload: init});

type PushToStackActionType = {type: typeof PUSH_TO_STACK, payload: FileType | string}
export const pushToStack = (dir:FileType | string):PushToStackActionType => ({type: PUSH_TO_STACK, payload: dir});

type RemoveToStackActionType = {type: typeof REMOVE_TO_STACK}
export const removeToStack = ():RemoveToStackActionType => ({type: REMOVE_TO_STACK});

type SetCurrentFileActionType = {type: typeof ADD_CURRENT_FILE, payload: string }
export const setCurrentFile = (file:string):SetCurrentFileActionType => ({type: ADD_CURRENT_FILE, payload: file});

type IsOpenPopupFileActionType = {type: typeof IS_OPEN_POPUP_FILE, payload: boolean}
export const isOpenPopupFile = (init:boolean):IsOpenPopupFileActionType => ({type: IS_OPEN_POPUP_FILE, payload: init});

type SetCurrentFileNameActionType = {type: typeof SET_CURRENT_FILE_NAME, payload: string}
export const setCurrentFileName = (name: string): SetCurrentFileNameActionType => ({type: SET_CURRENT_FILE_NAME, payload: name});
type SetCurrentFileTextActionType = {type: typeof SET_CURRENT_FILE_TEXT, payload: string}
export const setCurrentFileText = (text: string): SetCurrentFileTextActionType => ({type: SET_CURRENT_FILE_TEXT, payload: text});

type SetAddressBarActionType = {type: typeof SET_ADDRESS_BAR, payload: string}
export const setAddressBar = (address: string): SetAddressBarActionType => ({type: SET_ADDRESS_BAR, payload: address});