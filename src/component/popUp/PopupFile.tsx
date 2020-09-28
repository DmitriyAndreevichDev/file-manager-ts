import React, {useState} from "react";
import {Dialog} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";


import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {isOpenPopupFile, setCurrentFileName, setCurrentFileText} from "../../Redux/filesReducer";
import {ReducersType} from "../../Redux/store";


const PopupFile: React.FC = () => {
    const dispatch = useDispatch();

    const currentFile = useSelector((state: ReducersType) => state.files.currentFile);
    const isOpen = useSelector((state: ReducersType) => state.files.isOpenPopupFile);
    const files = useSelector((state: ReducersType) => state.files.files);

    const fileSelect = files.filter(file => file.id === currentFile);

    const [editModeTitle, setEditModeTitle] = useState(false);
    const [editModeText, setEditModeText] = useState(false);

    const [title, setTitle] = useState(``);
    const [text, setText] = useState(``);


    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.currentTarget.value)
    };
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.currentTarget.value)
    };

    const handleSubmitTitle = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === `Enter`) {
            dispatch(setCurrentFileName(title));
            !title ? alert(`Введите значение`) : setEditModeTitle(false);
            setTitle(``)
        }
    };
    const handleSubmitText = (): void => {
        dispatch(setCurrentFileText(text));
        setEditModeText(false);
    };

    return (
        <Dialog open={isOpen}>
            <div className={`popup__content`}>
                {editModeTitle ?
                    <Input
                        onChange={handleChangeTitle}
                        value={title}
                        onKeyDown={handleSubmitTitle}
                        autoFocus={true}
                    /> :
                    <DialogTitle id="simple-dialog-title"
                                 onClick={() => setEditModeTitle(true)}
                    >
                        {fileSelect.map(el => <span>{el.name}</span>)}
                    </DialogTitle>
                }
                {editModeText ?
                    <div>
                        <textarea
                            className={`textarea`}
                            id="time"
                            onChange={handleChangeText}
                            onBlur={handleSubmitText}
                            value={text}
                            autoFocus={true}
                            wrap="hard"
                        />
                        <Button
                            color="inherit"
                            variant="contained"
                            onClick={handleSubmitText}
                        >
                            Сохранить
                        </Button>
                    </div> :
                    <p onClick={() => setEditModeText(true)}>{fileSelect.map(el => !el.text ?
                        <span>Enter Text</span> :
                        <span className={`text-area`}>{el.text}</span>)}
                    </p>
                }
                <Button color="secondary"
                        variant="contained"
                        onClick={() => {
                            dispatch(isOpenPopupFile(false))
                        }}>Закрыть</Button>
            </div>
        </Dialog>
    );
};

export default PopupFile;
