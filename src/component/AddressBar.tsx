import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import Input from "@material-ui/core/Input";
import {pushToStack, setAddressBar, setCurrentDir} from "../Redux/filesReducer";
import {ReducersType} from "../Redux/store";

const AddressBar: React.FC = () => {
    const dispatch = useDispatch();

    const [addressBarValue, setAddressBarValue] = useState(``);
    const [editMode, setEditMode] = useState(false);

    const files = useSelector((state: ReducersType) => state.files.files);
    const addressBar = useSelector((state: ReducersType) => state.files.addressBar);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressBarValue(e.currentTarget.value)
    };

    const selectFolder = files.filter(file => addressBarValue.toLowerCase() === file.path);

    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === `Enter`) {
            if (selectFolder.length === 0) {
                console.error(`путь не найден`)
            } else {
                dispatch(setCurrentDir(selectFolder[0].id));
                dispatch(pushToStack(selectFolder[0]));
                dispatch(setAddressBar(selectFolder[0].path))
            }
            setEditMode(false)


        }
    };
    const pathTextValue = `enter path:`;
    return (
        <div className="breadcrumb">
            <span
                onClick={() => setEditMode(true)}
            >
                {pathTextValue.toUpperCase()}
            </span>
            {editMode ? <Input
                    autoFocus={true}
                    onKeyDown={onSubmit}
                    onChange={handleChange}
                    value={addressBarValue}
                    onBlur={() => {
                        setEditMode(false)
                    }}
                /> :
                <div
                    onClick={() => {
                        setEditMode(true)
                    }}
                >
                    <span> {addressBar} </span>
                </div>
            }
        </div>
    );
};

export default AddressBar;
